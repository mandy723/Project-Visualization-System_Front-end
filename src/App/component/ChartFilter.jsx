import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { 
    Checkbox, 
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    Box,
    Typography,
    AppBar,
    Tabs,
    Tab
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    tab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    small: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(25),
    }
}))

function TabPanel({ children, value, index, ...other }) {  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function ChartFilter({ onTabChanged }) {
    const classes = useStyles()
    const [selectedCommitStartDate, handleCommitStartDateChange] = useState(new Date())
    const [selectedCommitEndDate, handleCommitEndDateChange] = useState(new Date())
    const [selectedIssueStartDate, handleIssueStartDateChange] = useState(new Date())
    const [selectedIssueEndDate, handleIssueEndDateChange] = useState(new Date())
    const [tabValue, setTabValue] = useState(0)

    const [state, setState] = React.useState({
        Tim: true,
        Mike: false,
        Jay: false,
    })

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
        onTabChanged(newValue)
    }

    const handleMemberChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }
    const { Tim, Mike, Jay } = state

    return (
        <div>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example" variant="fullWidth">
                    <Tab label="Commit" {...a11yProps(0)} />
                    <Tab label="Issue" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            fullWidth
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="Start Month and Year"
                            value={selectedCommitStartDate}
                            onChange={handleCommitStartDateChange}
                            autoOk
                        />
                        <br/><br/>
                        <DatePicker
                            fullWidth
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="End Month and Year"
                            value={selectedCommitEndDate}
                            onChange={handleCommitEndDateChange}
                            autoOk
                        />
                    
                </MuiPickersUtilsProvider>
                <div className={classes.root}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Team Member</FormLabel>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={Tim} onChange={handleMemberChange} name="Tim" />}
                            label="Tim"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Mike} onChange={handleMemberChange} name="Mike" />}
                            label="Mike"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={Jay} onChange={handleMemberChange} name="Jay" />}
                            label="Jay"
                        />
                        </FormGroup>
                    </FormControl>
                </div>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            fullWidth
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="Start Month and Year"
                            value={selectedIssueStartDate}
                            onChange={handleIssueStartDateChange}
                            autoOk
                        />
                        <br/><br/>
                        <DatePicker
                            fullWidth
                            variant="inline"
                            openTo="year"
                            views={["year", "month"]}
                            label="End Month and Year"
                            value={selectedIssueEndDate}
                            onChange={handleIssueEndDateChange}
                            autoOk
                        />
                </MuiPickersUtilsProvider>
            </TabPanel>
        </div>
    )
}