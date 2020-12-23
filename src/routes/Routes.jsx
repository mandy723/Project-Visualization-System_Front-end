import Login from '../App/component/Login'
import SelectProject from '../App/component/SelectProject'
import CommitPage from '../App/component/CommitPage'
import IssuePage from '../App/component/IssuePage'
import CodeBasePage from '../App/component/CodeBasePage'
import CodeCoveragePage from '../App/component/CodeCoveragePage'
import BugPage from '../App/component/BugPage'
import CodeSmellPage from '../App/component/CodeSmellPage'
import DuplicationPage from '../App/component/DuplicationPage'

const routes = [
  {path: "/", redirect: true, to:"/login"},
  {path: "/login", component: Login, loginRequired: false},
  {path: "/select", component: SelectProject, loginRequired: true},
  {path: "/commit", component: CommitPage, loginRequired: true},
  {path: "/issue", component: IssuePage, loginRequired: true},
  {path: "/codebase", component: CodeBasePage, loginRequired: true},
  {path: "/code_coverage", component: CodeCoveragePage, loginRequired: true},
  {path: "/bug", component: BugPage, loginRequired: true},
  {path: "/code_smell", component: CodeSmellPage, loginRequired: true},
  {path: "/duplication", component: DuplicationPage, loginRequired: true},
]

export default routes