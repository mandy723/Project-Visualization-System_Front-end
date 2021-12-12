import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProjectAvatar from "./ProjectAvatar";
import DrawingBoard from "./DrawingBoard";
import Axios from "axios";
import moment from "moment";
import {
  CircularProgress,
  Backdrop,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    minWidth: "30px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function PullRequestPage(prop) {
  const classes = useStyles();
  const [pullRequestListData, setPullRequestListData] = useState([]);
  const [dataForCodeBaseChart, setDataForCodeBaseChart] = useState({
    labels: [],
    data: { additions: [], deletions: [] },
  });

  const [currentProject, setCurrentProject] = useState({});

  const projectId = localStorage.getItem("projectId");
  const jwtToken = localStorage.getItem("jwtToken");

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`, {
      headers: { Authorization: `${jwtToken}` },
    })
      .then((response) => {
        setCurrentProject(response.data);
      })
      .catch((e) => {
        alert(e.response.status);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(currentProject).length != 0) {
      handleToggle();
      const githubRepo = currentProject.repositoryDTOList.find(
        (repo) => repo.type == "github"
      );
      const query = githubRepo.url.split("github.com/")[1];
      Axios.get(`http://localhost:9100/pvs-api/github/pull-requests/${query}`, {
        headers: { Authorization: `${jwtToken}` },
      })
        .then((response) => {
          setPullRequestListData(response.data);
          handleClose();
        })
        .catch((e) => {
          alert(e.response.status);
          console.error(e);
        });
    }
  }, [currentProject, prop.startDate, prop.endDate]);

  useEffect(() => {
    let { startDate, endDate } = prop;
    startDate = moment(startDate);

    console.log(pullRequestListData);
    const data = pullRequestListData.filter((pullRequestListData) => {
      return moment(pullRequestListData.createdAt).isBetween(
        startDate,
        endDate,
        "days",
        "[]"
      );
    });
    console.log(startDate, endDate, data);
    let chartDataset = {
      labels: [],
      data: { open: [], closed: [], merged: [] },
    };

    let is_same_month = Math.abs(startDate.diff(endDate, "days")) <= 60;
    let unit = "days";
    let symbol = "YYYY-MM-DD";
    if (!is_same_month) {
      unit = "month";
      symbol = "YYYY-MM";
    }
    for (
      let date = startDate;
      date.isSameOrBefore(endDate, unit);
      date = date.add(1, unit)
    ) {
      chartDataset.labels.push(date.format(symbol));

      chartDataset.data.open.push(
        data.filter((pullRequest) => {
          return (
            moment(pullRequest.createdAt).format(symbol) ==
              date.format(symbol) && pullRequest.state == "open"
          );
        }).length
      );

      chartDataset.data.closed.push(
        data.filter((pullRequest) => {
          return (
            moment(pullRequest.createdAt).format(symbol) ==
              date.format(symbol) && pullRequest.state == "closed"
          );
        }).length
      );

      chartDataset.data.merged.push(
        data.filter((pullRequest) => {
          return (
            moment(pullRequest.mergedAt).format(symbol) ==
              date.format(symbol) && pullRequest.mergedAt !== null
          );
        }).length
      );
    }
    setDataForCodeBaseChart(chartDataset);
  }, [pullRequestListData, prop.startDate, prop.endDate]);

  return (
    <div style={{ marginLeft: "10px" }}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.root}>
        <ProjectAvatar size="small" project={currentProject} />
        <p>
          <h2>{currentProject.projectName}</h2>
        </p>
      </div>
      <div className={classes.root}>
        <div style={{ width: "67%" }}>
          <div>
            <h1>Team</h1>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={true} />}
                label="Open"
              />
              <FormControlLabel
                control={<Checkbox checked={true} />}
                label="Closed"
              />
              <FormControlLabel
                control={<Checkbox checked={true} />}
                label="Merged"
              />
            </FormGroup>
            <div>
              <DrawingBoard
                data={dataForCodeBaseChart}
                id="team-codebase-chart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    startDate: state.selectedDate.startDate,
    endDate: state.selectedDate.endDate,
  };
};

export default connect(mapStateToProps)(PullRequestPage);
