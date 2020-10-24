import Login from '../App/component/Login';
import SelectRepository from '../App/component/SelectRepository';
import ShowChart from '../App/component/ShowChart';

const routes = [
  {path: "/", redirect: true, to:"/login"},
  {path: "/login", component: Login, loginRequired: false},
  {path: "/select", component: SelectRepository, loginRequired: true},
  {path: "/show", component: ShowChart, loginRequired: true},
]

export default routes;