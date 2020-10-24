import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, ExitToApp } from '@material-ui/icons';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 200,
  },
}));

export default function Sidebar() {
	const classes = useStyles();

	const [drawerState, setDrawerState] = useState(false);
	const history = useHistory();

	const logout = () => {
		history.push('/login')
	}

	const list = () => (
      <div className={classes.list} role="presentation" >
        <List>
          <ListItem button onClick={logout}>
              <ListItemIcon>
                  <ExitToApp/>
              </ListItemIcon>
              <ListItemText primary="Logout"/>
          </ListItem>
        </List>
      </div>
    );

  return (
    <div>
      <IconButton onClick={() => {setDrawerState(true)}}>
        <Menu/>
      </IconButton>
      <Drawer anchor="left" open={drawerState} onClose={() => setDrawerState(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
