import { SidebarOnly } from '~/Layouts';

import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import CreatePost from '~/pages/CreatePost';

const publicRoutes = [
  { path: '/login', component: Login, layout: null },
  { path: '/signup', component: Signup, layout: null },
  { path: '/', component: Home, layout: SidebarOnly },
  { path: '/profile', component: Profile, layout: SidebarOnly },
  { path: '/createpost', component: CreatePost, layout: SidebarOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
