import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { PiUserCheck, PiUserCheckFill } from 'react-icons/pi';
import { PiCameraPlus, PiCameraPlusFill } from 'react-icons/pi';
import { PiChatTextLight, PiChatTextFill } from 'react-icons/pi';
import { CgDetailsMore } from 'react-icons/cg';

import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Search from '~/components/Search';
import { UserContext } from '~/App';
import SidebarMenu from '~/components/Popovers/SidebarMenu';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const { state } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <aside className={cx('wrapper')}>
      <Link to={config.routes.home} className={cx('logo')}>
        dqelv
      </Link>
      <Menu>
        <MenuItem
          title="Home"
          to={config.routes.home}
          icon={<GoHome className={cx('icon')} />}
          activeIcon={<GoHomeFill className={cx('icon')} />}
        />
        <Search title="Search" />
        <MenuItem
          title="Following"
          to={config.routes.following}
          icon={<PiUserCheck className={cx('icon')} />}
          activeIcon={<PiUserCheckFill className={cx('icon')} />}
        />
        <MenuItem
          title="Create Post"
          to={config.routes.createPost}
          icon={<PiCameraPlus className={cx('icon')} />}
          activeIcon={<PiCameraPlusFill className={cx('icon')} />}
        />
        <MenuItem
          title="Chat"
          to={config.routes.chat}
          icon={<PiChatTextLight className={cx('icon')} />}
          activeIcon={<PiChatTextFill className={cx('icon')} />}
        />
        <MenuItem
          title="Profile"
          to={config.routes.profile}
          icon={
            <img
              src={state && state.avatar && state.avatar}
              alt="avatar"
              className={cx('avatar')}
            />
          }
          activeIcon={
            <img
              src={state && state.avatar && state.avatar}
              alt="avatar"
              className={cx('avatar-active')}
            />
          }
        />
      </Menu>

      <Tippy
        visible={isVisible}
        onClickOutside={() => setIsVisible(false)}
        interactive
        placement="top"
        offset={10}
        render={(attrs) => (
          <div
            className={cx('more-option')}
            tabIndex="-1"
            {...attrs}
            onClick={() => setIsVisible(false)}
          >
            <SidebarMenu />
          </div>
        )}
      >
        <button
          className={cx('more-btn')}
          onClick={() => setIsVisible(!isVisible)}
        >
          <CgDetailsMore className={cx('icon')} />
          <span className={cx('title')}>More</span>
        </button>
      </Tippy>
    </aside>
  );
};

export default Sidebar;
