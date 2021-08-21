import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {ButtonGroup, NextButton, NoMarginBackButton} from "../../styles/ServiceStyle"
import {colors} from "../../styles/breakpoints"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
  }));

const OLevelUploadReview = ({
    name, 
    email, 
    dateOfBirth,
    password,
    activeStep,
    setActiveStep
}) => {
    const classes = useStyles();        
  return (
    <>
        <List>            
            <ListItem className={classes.listItem} key={name}>
                <ListItemText primary="Candidate's Name" secondary='Name of the candidate`'  />
                <Typography variant="body2">{name}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={email}>
                <ListItemText primary="Candidate's email" secondary="email used for Jamb registration" />
                <Typography variant="body2">{email}</Typography>
            </ListItem>
            <ListItem className={classes.listItem} key={dateOfBirth}>
                <ListItemText primary="Candidate's Date of Birth" secondary="Date of birth registered in JAMB"  />
                <Typography variant="body2">
                  {dateOfBirth._d ? dateOfBirth._d.toDateString() : dateOfBirth.toDateString()}
                </Typography>
            </ListItem>                        
            
            <ListItem className={classes.listItem} key={password}>
                <ListItemText primary="Candidate's New Password" secondary="The New Password You Wish to Change to"  />
                <Typography variant="body2">{password}</Typography>
            </ListItem>                        
            
            <ButtonGroup>
              <NoMarginBackButton 
                variant={colors.darkred}
                onClick={() => setActiveStep(activeStep - 1)}>
                <NavigateBeforeIcon /> Previous
              </NoMarginBackButton>
              <NextButton 
                variant={colors.darkblue}
                onClick={() => setActiveStep(activeStep + 1)}>
                 Next <NavigateNextIcon/>
              </NextButton>
            </ButtonGroup>
        </List>      
    </>
  )
}

export default OLevelUploadReview
