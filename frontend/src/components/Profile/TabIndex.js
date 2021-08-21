import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { TabContainer } from "../../styles/TabStyle"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../TabContainer/TabPanel"
import a11yProps from "../TabContainer/allProps"
import { colors } from "../../styles/breakpoints"
import Editables from "./Edits"
import MyCardOrders from "./MyCardOrders"
import MyResultUploadOrders from "./MyResultUploadOrders"
import MyJambPasswordReset from "./MyJambPasswordReset"
import MyChangeOfCourseOrders from "./MyChangeOfCourseOrders"
import Review from "./Review"

export default function FullWidthTabs({
  values,
  setValues
}) {
  const [activeFirst, setActiveFirst] = useState(true)
  const [activeSecond, setActiveSecond] = useState(false)
  const [activeThird, setActiveThird] = useState(false)
  const [activeFourth, setActiveFourth] = useState(false)
  const [activeFifth, setActiveFifth] = useState(false)
  const [activeSixth, setActiveSixth] = useState(false)

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleFirstTab = () => {
    setActiveFirst(true)
    setActiveSecond(false)
    setActiveThird(false)
    setActiveFourth(false)
    setActiveFifth(false)
    setActiveSixth(false)
  }

  const handleSecondTab = () => {
    setActiveFirst(false)
    setActiveSecond(true)
    setActiveThird(false)
    setActiveFourth(false)
    setActiveFifth(false)
    setActiveSixth(false)
  }

  const handleThirdTab = () => {
    setActiveFirst(false)
    setActiveSecond(false)
    setActiveThird(true)
    setActiveFourth(false)
    setActiveFifth(false)
    setActiveSixth(false)
  }

  const handleFourthTab = () => {
    setActiveFirst(false)
    setActiveSecond(false)
    setActiveThird(false)
    setActiveFourth(true)
    setActiveFifth(false)
    setActiveSixth(false)
  }

  const handleFifthTab = () => {
    setActiveFirst(false)
    setActiveSecond(false)
    setActiveThird(false)
    setActiveFourth(false)
    setActiveFifth(true)
    setActiveSixth(false)
  }

  const handleSixthTab = () => {
    setActiveFirst(false)
    setActiveSecond(false)
    setActiveThird(false)
    setActiveFourth(false)
    setActiveFifth(false)
    setActiveSixth(true)
  }
  return (
    <TabContainer variant="center">

      <Tabs
        className="tabs"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="Features tabs"

      >
        <Tab label="Profile"
          {...a11yProps(0)}
          style={{ backgroundColor: activeFirst && colors.lightergray }}
          onClick={handleFirstTab} />
        <Tab label="Card Order Details"

          {...a11yProps(1)}
          style={{ backgroundColor: activeSecond && colors.lightergray }}
          onClick={handleSecondTab} />
        <Tab label="Data Corrections"
          {...a11yProps(2)}
          style={{ backgroundColor: activeThird && colors.lightergray }}
          onClick={handleThirdTab} />
        <Tab label="Result Uploads"
          {...a11yProps(2)}
          style={{ backgroundColor: activeFourth && colors.lightergray }}
          onClick={handleFourthTab} />
        <Tab label="Jamb Password Reset"
          {...a11yProps(2)}
          style={{ backgroundColor: activeFifth && colors.lightergray }}
          onClick={handleFifthTab} />
        <Tab label="Leave Review"
          {...a11yProps(2)}
          style={{ backgroundColor: activeSixth && colors.lightergray }}
          onClick={handleSixthTab} />
      </Tabs>



      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Editables values={values} setValues={setValues} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} id='cardorderpane'>
          <MyCardOrders />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <MyChangeOfCourseOrders />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <MyResultUploadOrders />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <MyJambPasswordReset />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <Review />
        </TabPanel>

      </SwipeableViews>
    </TabContainer>
  );
}
