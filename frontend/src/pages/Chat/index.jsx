import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import style from './Chat.module.scss';
import DefaultAvatar from '~/assets/images/DefaultAvatar.png';
import { IoIosSend } from 'react-icons/io';
import { MdInsertEmoticon } from 'react-icons/md';
import { UserContext } from '~/App';
import { useSocket } from '~/hooks/useSocket';

const cx = classNames.bind(style);

const Chat = () => {
  const [chatId, setChatId] = useState('');
  const [receiver, setReceiver] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const { state } = useContext(UserContext);
  const inputRef = useRef(null);
  const refMessageContainer = useRef(null);

  const { emitEvent, subscribeEvent, unSubscribeEvent } = useSocket();

  const handleShowChats = (userId) => {
    fetch(`/chat/show/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((error) => console.log(error));
  };

  const handleShowSuggestAccount = (userId) => {
    fetch(`/user/show/all/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (state) {
      const userId = state._id;
      handleShowChats(userId);
      handleShowSuggestAccount(userId);
    }
  }, [state]);

  const handleShowMessage = (chatId, receiver) => {
    setChatId(chatId);
    setReceiver(receiver);
    setMessages({});
  };

  useEffect(() => {
    if (!chatId) return;
    fetch(`/message/show/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Messages: ', data);

        setMessages({ messages: data, receiver, chatId });
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const handleCreateChat = (user) => {
    if (state) {
      const userId = state._id;
      fetch('/chat/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          senderId: userId,
          receiverId: user.receiverId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          handleShowChats(userId);
          handleShowSuggestAccount(userId);
          handleShowMessage(data._id, user);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSendMessage = () => {
    if (state) {
      fetch('/message/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          chatId: messages?.chatId,
          senderId: state?._id,
          message,
          receiverId: messages?.receiver?._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (inputRef.current) {
            setMessage('');
            inputRef.current.focus();
          }

          emitEvent(
            'message:send',
            { ...data, avatar: state.avatar },
            (res) => {
              console.log(res);

              setMessages((prevMessages) => ({
                ...prevMessages,
                messages: [...prevMessages.messages, res],
              }));
            },
          );
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!chatId) return;
    subscribeEvent('message:sent', (message) => {
      console.log('message: ', message);

      setMessages((prevMessages) => ({
        ...prevMessages,
        messages: [...prevMessages.messages, message],
      }));
    });

    emitEvent('chat:join', chatId);

    return () => {
      unSubscribeEvent('message:sent');
      emitEvent('chat:leave', chatId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (refMessageContainer.current) {
      refMessageContainer.current.scrollTop =
        refMessageContainer.current.scrollHeight;
    }
  }, [messages, chatId]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('chat-list')}>
        <div className={cx('title')}>Suggest Account</div>
        <div className={cx('suggest')}>
          {users.map((user) => {
            return (
              <div
                className={cx('suggest-item')}
                key={user.receiverId}
                onClick={() => handleCreateChat(user)}
              >
                <img
                  className={cx('avatar')}
                  src={user.avatar || DefaultAvatar}
                  alt="Avatar"
                />
                <p className={cx('suggest-username')}>{user.username}</p>
              </div>
            );
          })}
        </div>
        <div className={cx('title')}>Messages</div>
        {chats.map(({ chatId, user }) => {
          return (
            <div
              className={cx('chat-item')}
              key={chatId}
              onClick={() => handleShowMessage(chatId, user)}
            >
              <img
                className={cx('avatar')}
                src={user.avatar || DefaultAvatar}
                alt="Avatar"
              />
              <div className={cx('info')}>
                <p className={cx('username')}>{user.username}</p>
                <p className={cx('status')}>Click to chat</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cx('chat-detail')}>
        {messages?.receiver?.username && (
          <div className={cx('header')}>
            <img
              className={cx('avatar')}
              src={messages?.receiver?.avatar || DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('info')}>
              <p className={cx('username')}>{messages?.receiver?.username}</p>
              <p className={cx('status')}>Offline</p>
            </div>
          </div>
        )}
        <div className={cx('messages')} ref={refMessageContainer}>
          {messages?.messages?.map((message) => {
            if (state && message.senderId === state?._id) {
              return (
                <div className={cx('sender-message')} key={message._id}>
                  <div className={cx('content')}>{message.content}</div>
                </div>
              );
            } else {
              return (
                <div className={cx('receiver-message')} key={message._id}>
                  <img
                    className={cx('message-avatar')}
                    src={message.avatar}
                    alt="Avatar"
                  />
                  <div className={cx('content')}>{message.content}</div>
                </div>
              );
            }
          })}
        </div>
        <div className={cx('footer')}>
          <div className={cx('emoji')}>
            <MdInsertEmoticon className={cx('emoji-icon')} />
          </div>
          <form
            className={cx('message-form')}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              className={cx('message-input')}
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={inputRef}
            />
            <button className={cx('send-btn')} type="submit">
              <IoIosSend className={cx('send-icon')} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
