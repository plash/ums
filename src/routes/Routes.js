import Users from "../components/users/Users";
import UserDetail from "../components/users/UserDetail";

import NotFound from "../components/not-found/NotFound";

const routes = [
  { path: "/", exact: true, name: "Users", component: Users },
  { path: "/users", exact: true, name: "Users", component: Users },
  {
    path: "/user/:id",
    exact: true,
    name: "User Details",
    component: UserDetail
  },
  { name: "Not Found", component: NotFound }
];

export default routes;
