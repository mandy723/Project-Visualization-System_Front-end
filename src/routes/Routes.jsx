import Login from '../App/component/Login'
import SelectProject from '../App/component/SelectProject'
import CommitPage from '../App/component/CommitPage'
import IssuePage from '../App/component/IssuePage'


const routes = [
  {path: "/", redirect: true, to:"/login"},
  {path: "/login", component: Login, loginRequired: false},
  {path: "/select", component: SelectProject, loginRequired: true},
  {path: "/commit", component: CommitPage, loginRequired: true},
  {path: "/issue", component: IssuePage, loginRequired: true},
]

export default routes