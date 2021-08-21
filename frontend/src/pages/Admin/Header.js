import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { useStyles } from '../../components/Admin/adminThemes'
import a11yProps from '../../components/TabContainer/allProps'
import { useSelector, useDispatch } from 'react-redux'
import { MESSAGE_RESET } from '../../redux/constants/utilConstants'
import { AdminHeader } from '../../styles/AdminStyles'

function Header({ onDrawerToggle, value, setValue, labels }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { message } = useSelector((state) => state.message)
  console.log('message', message)
  const handleChange = (e, newVal) => {
    dispatch({ type: MESSAGE_RESET })
    setValue(newVal)
  }

  return (
    <AdminHeader>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            {message ? (
              <Grid item xs>
                <Typography className="message" variant="span" component="p">
                  {message}
                </Typography>
              </Grid>
            ) : (
              <Grid item xs></Grid>
            )}

            <Grid item>
              <Link className={classes.link} href="#" variant="body2"></Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar
                  src={userInfo && userInfo.profile && userInfo.profile.picture}
                  alt="My Avatar"
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography color="inherit" variant="h5" component="h1">
                Admin Panel
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={value} textColor="inherit" onChange={handleChange}>
          {labels &&
            labels.map((label, index) => (
              <Tab
                key={index}
                textColor="inherit"
                label={label}
                {...a11yProps(index)}
              />
            ))}
        </Tabs>
      </AppBar>
    </AdminHeader>
  )
}

export default Header
