import config from '~/config';
import { SidebarOnly } from '~/Layouts';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Following from '~/pages/Following';
import CreatePost from '~/pages/CreatePost';
import UserProfile from '~/components/UserProfile';

const publicRoutes = [
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
];

const privateRoutes = [
  { path: config.routes.home, component: Home, layout: SidebarOnly },
  { path: config.routes.profile, component: Profile, layout: SidebarOnly },
  { path: config.routes.following, component: Following, layout: SidebarOnly },
  {
    path: config.routes.createPost,
    component: CreatePost,
    layout: SidebarOnly,
  },
  {
    path: config.routes.userProfile,
    component: UserProfile,
    layout: SidebarOnly,
  },
];

export { publicRoutes, privateRoutes };
