import { SidebarOnly } from '~/Layouts';

import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Following from '~/pages/Following';
import CreatePost from '~/pages/CreatePost';
import UserProfile from '~/components/UserProfile';

const publicRoutes = [
  { path: '/login', component: Login, layout: null },
  { path: '/signup', component: Signup, layout: null },
];

const privateRoutes = [
  { path: '/', component: Home, layout: SidebarOnly },
  { path: '/profile', component: Profile, layout: SidebarOnly },
  { path: '/following', component: Following, layout: SidebarOnly },
  { path: '/createpost', component: CreatePost, layout: SidebarOnly },
  { path: '/profile/:userid', component: UserProfile, layout: SidebarOnly },
];

export { publicRoutes, privateRoutes };
