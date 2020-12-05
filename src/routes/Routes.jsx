import Login from '../App/component/Login';
import SelectProject from '../App/component/SelectProject';
import ShowChart from '../App/component/ShowChart';

const routes = [
  {path: "/", redirect: true, to:"/login"},
  {path: "/login", component: Login, loginRequired: false},
  {path: "/select", component: SelectProject, loginRequired: true},
  {path: "/show", component: ShowChart, loginRequired: true},
]

export default routes;