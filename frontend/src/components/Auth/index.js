import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../TabContainer/TabPanel"
import a11yProps from "../TabContainer/allProps"
import { colors } from "../../styles/breakpoints"
import Register from "./Register"
import SignIn from "./SignIn"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {

  },
}));

export default function Auth() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [signInActive, setSignInActive] = useState(false)
  const [signUpActive, setSignUpActive] = useState(true)

  const history = useHistory()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      // history.goBack()
    }
  }, [userInfo, history])

  const borderStyle = `0.5px solid ${colors.background}`

  const handleSignInButton = () => {
    setSignInActive(true)
    setSignUpActive(false)
  }

  const handleSignUpButton = () => {
    setSignInActive(false)
    setSignUpActive(true)
  }

  return (
    <div className={classes.root}>
      <Tabs
        className="tabs"
        value={value}
        onChange={(e, newVal) => setValue(newVal)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="Auth tab"
      >
        <Tab
          label="Sign In"
          icon={<i className="fas fa-sign-in-alt"></i>} {...a11yProps(0)}
          style={{
            backgroundColor: signUpActive && colors.white,
            borderLeft: signInActive && borderStyle,
            borderBottom: signInActive && borderStyle
          }}
          onClick={handleSignUpButton}
        />

        <Tab
          label="Sign Up"
          icon={<i className="fas fa-user-plus"></i>} {...a11yProps(1)}
          style={{
            backgroundColor: signInActive && colors.white,
            borderRight: signUpActive && borderStyle,
            borderBottom: signUpActive && borderStyle,
          }}
          onClick={handleSignInButton}
        />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={(index) => setValue(index)}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <SignIn />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Register />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
