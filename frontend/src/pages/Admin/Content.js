import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Header from './Header';
import { theme, drawerWidth, useStyles } from "../../components/Admin/adminThemes"
import SwipeableViews from 'react-swipeable-views';
import TabPanel from "../../components/TabContainer/TabPanel"
import { useDispatch } from "react-redux"
import { MESSAGE_RESET } from '../../redux/constants/utilConstants';

function Paperbase({ labels, TabContent, value, setValue }) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: MESSAGE_RESET })
    }, [dispatch])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer}>
                    <Hidden smUp implementation="js">
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        />
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                    </Hidden>
                </nav>
                <div className={classes.app}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        value={value}
                        labels={labels}
                        setValue={setValue} />
                    <main className={classes.main}>

                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={(index) => setValue(index)}
                        >
                            {
                                TabContent &&
                                TabContent.map((content, index) => (
                                    <TabPanel key={index} value={value} index={index} dir={theme.direction}>
                                        {content}
                                    </TabPanel>
                                ))
                            }

                        </SwipeableViews>
                    </main>
                    {/* <footer className={classes.footer}>
                        <Copyright />
                    </footer> */}
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Paperbase;