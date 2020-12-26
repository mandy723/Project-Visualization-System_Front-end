import React, { useEffect } from 'react'
import logo_p from './../../p.png'
import logo_v from './../../v.png'
import logo_s from './../../s.png'
import { useHistory } from 'react-router-dom'
import { Menu, 
  ExitToApp, 
  ArrowBack, 
  ExpandLess,
  ExpandMore,
  Code,
  GpsFixed
} from '@material-ui/icons'
import { 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  Collapse,
  Tooltip 
} from '@material-ui/core'
import { AiFillBug } from 'react-icons/ai'
import { IoGitCommitSharp, IoNuclear } from 'react-icons/io5'
import { GoIssueOpened } from 'react-icons/go'
import { HiDocumentDuplicate } from 'react-icons/hi'
import { SiGithub, SiSonarqube } from 'react-icons/si'
import { RiDashboardFill } from 'react-icons/ri'
import clsx from 'clsx'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import { useState } from 'react'
import { connect } from 'react-redux'
import { setStartMonth, setEndMonth } from './../../redux/action'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     marginLeft: theme.spacing(3),
  //     width: 'auto',
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: '100%',
  //   position: 'absolute',
  //   pointerEvents: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputRoot: {
  //   color: 'inherit',
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create('width'),
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: '20ch',
  //   },
  // },
  list: {
    width: 200,
    height: 'calc(100%)',
    width: 'auto'
  },

  logout: {
    position: "absolute",
    bottom: 0,
  },
  menuList: {
    height: 'calc(100%)',
  },
  monthSelector: {
    width: 204, 
    padding: theme.spacing(0, 3, 0),
  },
  innerList:{
    backgroundColor: "#fafafa"
  }
}))

function Sidebar(prop) {
  //todo seperate sidebar and appbar~~~ 
  
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const history = useHistory()
  const classes = useStyles()
  const [githubMenuOpen, setGithubMenuOpen] = useState(true)
  const [sonarMenuOpen, setSonarMenuOpen] = useState(true)
  const isSelectPage = () =>{
    return window.location.pathname == '/select' 
  }

  const list = () => (
    <div className={classes.list} role="presentation" >
      <List className={classes.menuList} width="inher">
        { !isSelectPage() &&
        <div>
        <Tooltip title="Select" placement="down" disableHoverListener={open}>
          <ListItem button onClick={goToSelect}>
              <ListItemIcon>
                  <ArrowBack/>
              </ListItemIcon>
              <ListItemText primary="Select"/>
          </ListItem>
        </Tooltip>
      
        <Divider className={classes.divider} />
        <ListItem button onClick={goToDashBoard}>
            <ListItemIcon>
                <RiDashboardFill size={30}/>
            </ListItemIcon>
            <ListItemText primary="DashBoard"/>
        </ListItem>
        <Divider className={classes.divider} />
         
        <ListItem button onClick={() => {setGithubMenuOpen(!githubMenuOpen)}}>
          <ListItemIcon>
            <SiGithub size={30}/>
          </ListItemIcon>
          <ListItemText primary="GitHub"/>
          {githubMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Divider />
        <Collapse in={githubMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.innerList}>
            <Tooltip title="Commits" placement="down" disableHoverListener={open}>
              <ListItem button className={classes.nested} onClick={goToCommit}>
                <ListItemIcon>
                  <IoGitCommitSharp size={24.5}/>
                </ListItemIcon>
                <ListItemText primary="Commits" />
              </ListItem>
            </Tooltip>

            <Tooltip title="Issues" placement="down" disableHoverListener={open}>
              <ListItem button className={classes.nested} onClick={goToIssue}>
                <ListItemIcon>
                  <GoIssueOpened size={24.5}/>
                </ListItemIcon>
                <ListItemText primary="Issues" />
              </ListItem>
            </Tooltip>
        
            <Tooltip title="Code Base" placement="down" disableHoverListener={open}>
              <ListItem button className={classes.nested} onClick={goToCodeBase}>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText primary="Code Base" />
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>
        <Divider className={classes.divider}/>
        <ListItem button onClick={() => {setSonarMenuOpen(!sonarMenuOpen)}} >
          
          <ListItemIcon>
            <SiSonarqube size={30} />
          </ListItemIcon>
          <ListItemText primary="SonarQube" />
          {sonarMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Divider />
        <Collapse in={sonarMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.innerList}>
            <Tooltip title="Code Coverage" placement="down" disableHoverListener={open}>
              <ListItem button onClick={goToCodeCoverage} >
                <ListItemIcon>
                  <GpsFixed />
                </ListItemIcon>
                <ListItemText primary="Code Coverage" />
              </ListItem>
            </Tooltip>

            <Tooltip title="Bugs" placement="down" disableHoverListener={open}>
              <ListItem button onClick={goToBug}>
                <ListItemIcon>
                  <AiFillBug size={24.5}/>
                </ListItemIcon>
                <ListItemText primary="Bugs" />
              </ListItem>
            </Tooltip>

            <Tooltip title="Code Smells" placement="down" disableHoverListener={open}>
              <ListItem button onClick={goToCodeSmell}>
                <ListItemIcon>
                  <IoNuclear size={24.5}/>
                </ListItemIcon>
                <ListItemText primary="Code Smells" />
              </ListItem>
            </Tooltip>

            <Tooltip title="Duplications" placement="down" disableHoverListener={open}>
              <ListItem button onClick={goToDuplication}>
                <ListItemIcon>
                  <HiDocumentDuplicate size={24.5}/>
                </ListItemIcon>
                <ListItemText primary="Duplications" />
              </ListItem>
            </Tooltip>
          </List>
        <Divider />
        </Collapse>
        </div>
        }

        <ListItem className={classes.logout} button onClick={logout}>
            <ListItemIcon>
                <ExitToApp/>
            </ListItemIcon>
            <ListItemText primary="Logout"/>
        </ListItem>
      </List>
    </div>
  )
  
  const logout = () => {
		history.push('/login')
  }
  
  const goToSelect = () => {
    history.push("/select")
  }

  const goToDashBoard = () => {
    history.push("/dashboard")
  }

  const goToCommit = () => {
    history.push("/commits")
  }

  const goToIssue = () => {
    history.push("/issues")
  }

  const goToCodeBase = () => {
    history.push("/codebase")
  }

  const goToCodeCoverage = () => {
    history.push("/code_coverage")
  }

  const goToBug = () => {
    history.push("/bugs")
  }

  const goToCodeSmell = () => {
    history.push("/code_smells")
  }

  const goToDuplication = () => {
    history.push("/duplications")
  }


  useEffect(() => {
    let projectId = localStorage.getItem("projectId")
  },[])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <img src={logo_p}/>
          <img src={logo_v}/>
          <img src={logo_s}/>
            <div className={classes.monthSelector}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker className={classes.datepicker}
                    fullWidth
                    // variant="inline"
                    focused={false}
                    openTo="year"
                    views={["year", "month"]}
                    label="Start Month and Year"
                    value={prop.startMonth}
                    onChange={prop.setStartMonth}
                    // autoOk
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.monthSelector}>
              <MuiPickersUtilsProvider utils={MomentUtils}> 
                <DatePicker
                    fullWidth
                    // variant="inline"
                    focused={false}
                    openTo="year"
                    views={["year", "month"]}
                    label="End Month and Year"
                    value={prop.endMonth}
                    onChange={prop.setEndMonth}
           
                />
              </MuiPickersUtilsProvider>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.drawerContent}></div>
        <Divider />
        {list()}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.drawerContent} />
        {prop.children}
      </main>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    startMonth: state.selectedMonth.startMonth,
    endMonth: state.selectedMonth.endMonth
  }
}

const mapActionToProps = (dispatch) => {
  return {
    setStartMonth: (startMonth) => dispatch(setStartMonth(startMonth)),
    setEndMonth: (endMonth) => dispatch(setEndMonth(endMonth))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Sidebar)