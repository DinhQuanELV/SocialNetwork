import classNames from 'classnames/bind';

import style from './Chat.module.scss';
import DefaultAvatar from '~/assets/images/DefaultAvatar.png';
import { IoIosSend } from 'react-icons/io';
import { MdInsertEmoticon } from 'react-icons/md';

const cx = classNames.bind(style);

const Chat = () => {
  const contacts = [
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
    {
      name: 'John',
      status: 'Active',
      avatar: DefaultAvatar,
    },
  ];

  return (
    <div className={cx('wrapper')}>
      <div className={cx('chat-list')}>
        {contacts.map((contact) => {
          return (
            <div className={cx('chat-item')}>
              <img className={cx('avatar')} src={contact.avatar} alt="Avatar" />
              <div className={cx('info')}>
                <p className={cx('name')}>{contact.name}</p>
                <p className={cx('status')}>{contact.status}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cx('chat-detail')}>
        <div className={cx('header')}>
          <img className={cx('avatar')} src={DefaultAvatar} alt="Avatar" />
          <div className={cx('info')}>
            <p className={cx('name')}>Dinh Quan</p>
            <p className={cx('status')}>active 2 hour ago</p>
          </div>
        </div>
        <div className={cx('messages')}>
          <div className={cx('my-message')}>
            <div className={cx('content')}>
              Hello ádasdasdhow are you todaáda sdas dy? asd asj ashdjk asjkhd
              asfjhjk asd asd
            </div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>
              I'm gooHello ádasdasdhow are you todaáda sdas dy? asd asj ashdjk
              asjkhd asfjhjk asd asdd, how about you?
            </div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello, how are you today?</div>
          </div>
          <div className={cx('user-message')}>
            <img
              className={cx('message-avatar')}
              src={DefaultAvatar}
              alt="Avatar"
            />
            <div className={cx('content')}>I'm good, how about you?</div>
          </div>
          <div className={cx('my-message')}>
            <div className={cx('content')}>Hello,ss how are you today?</div>
          </div>
        </div>
        <div className={cx('footer')}>
          <div className={cx('emoji')}>
            <MdInsertEmoticon className={cx('emoji-icon')} />
          </div>
          <input
            className={cx('message-input')}
            type="text"
            placeholder="Type a message..."
          />
          <button className={cx('send-btn')} type="submit">
            <IoIosSend className={cx('send-icon')} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
