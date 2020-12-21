import Login from '../App/component/Login'
import SelectProject from '../App/component/SelectProject'
import CommitPage from '../App/component/CommitPage'
import IssuePage from '../App/component/IssuePage'
import CodeBasePage from '../App/component/CodeBasePage'
import SonarQubePage from '../App/component/SonarQubePage'

const routes = [
  {path: "/", redirect: true, to:"/login"},
  {path: "/login", component: Login, loginRequired: false},
  {path: "/select", component: SelectProject, loginRequired: true},
  {path: "/commit", component: CommitPage, loginRequired: true},
  {path: "/issue", component: IssuePage, loginRequired: true},
  {path: "/codebase", component: CodeBasePage, loginRequired: true},
  {path: "/sonarqube", component: SonarQubePage, loginRequired: true},
]

export default routes