import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import { TabContainer } from "../../styles/TabStyle"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "./TabPanel"
import a11yProps from "./allProps"
import { colors } from "../../styles/breakpoints"
import TabItems from "./tabJsonAPI"
import TabChildren from "./TabChildren"
import { Link } from 'react-router-dom';

export default function FullWidthTabs({ firstChild, secondChild, thirdChild, fourthChild }) {
  const [activeFirst, setActiveFirst] = useState(true)
  const [activeSecond, setActiveSecond] = useState(false)
  const [activeThird, setActiveThird] = useState(false)
  const [activeFourth, setActiveFourth] = useState(false)

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
  }

  const handleSecondTab = () => {
    setActiveFirst(false)
    setActiveSecond(true)
    setActiveThird(false)
    setActiveFourth(false)
  }

  const handleThirdTab = () => {
    setActiveFirst(false)
    setActiveSecond(false)
    setActiveThird(true)
    setActiveFourth(false)
  }

  const handleFourthTab = () => {
    setActiveFirst(false)
    setActiveSecond(false)
    setActiveThird(false)
    setActiveFourth(true)
  }
  return (
    <TabContainer >

      <Tabs
        className="tabs"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="Features tabs"

      >
        <Tab label="Buy Tokens/Pins"
          {...a11yProps(0)}
          style={{ backgroundColor: activeFirst && colors.lightergray }}
          onClick={handleFirstTab} />
        <Tab label="Correction of Data "
          {...a11yProps(1)}
          style={{ backgroundColor: activeSecond && colors.lightergray }}
          onClick={handleSecondTab} />
        <Tab label="Result Upload"
          {...a11yProps(2)}
          style={{ backgroundColor: activeThird && colors.lightergray }}
          onClick={handleThirdTab} />
        <Tab label="Other Services"
          {...a11yProps(2)}
          style={{ backgroundColor: activeFourth && colors.lightergray }}
          onClick={handleFourthTab} />
      </Tabs>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          TabItems.map((item, index) => (
            <TabPanel value={value} key={index} index={index} dir={theme.direction}>
              <TabChildren
                heading={item.heading}
                description={item.description}
                image={item.image}
              >
                {
                  item.details.map((detail, ind) => (
                    <div key={ind} className="child__item">
                      <i className={detail.icon}></i>
                      <div>
                        <h4>{detail.head}</h4>
                        <span>{detail.desc}</span>
                      </div>
                    </div>
                  ))
                }
                <span className='cta'>Click <Link to={item.link}>here</Link> to proceed</span>
              </TabChildren>
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </TabContainer>
  );
}
