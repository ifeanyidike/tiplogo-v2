import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  ListFeatureElement,
  ButtonGroup,
  NextButton,
  NoMarginBackButton,
} from '../../styles/ServiceStyle'
import { colors } from '../../styles/breakpoints'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

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
}))

const CourseChangeReview = ({
  year,
  type,
  name,
  profileCode,
  OTP,
  regNo,
  programme,
  institution,
  course,
  moreInfo,
  activeStep,
  setActiveStep,
  jambAmountPay,
  setJambAmountPay,
}) => {
  const classes = useStyles()
  return (
    <div>
      <List>
        <ListItem className={classes.listItem} key={`year ${year}`}>
          <ListItemText primary="Exam year" secondary="Year" />
          <Typography variant="body2">{year}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={`type ${type}`}>
          <ListItemText
            primary="Upload Type"
            secondary="UTME or Direct Entry"
          />
          <Typography variant="body2">{type}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={`name ${name}`}>
          <ListItemText
            primary="Candidate's Name"
            secondary={`Name of ${type} candidate`}
          />
          <Typography variant="body2">{name}</Typography>
        </ListItem>
        <ListItem
          className={classes.listItem}
          key={`profileCode ${profileCode}`}
        >
          <ListItemText
            primary="Candidate's Profile Code"
            secondary={`Profile Code ${type} candidate`}
          />
          <Typography variant="body2">{profileCode}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={`otp ${OTP}`}>
          <ListItemText
            primary="One Time Password"
            secondary={`OTP on ${type} candidate's purchase`}
          />
          <Typography variant="body2">{OTP}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={`regNo ${regNo}`}>
          <ListItemText
            primary="Candidate's Registration Number"
            secondary={`Registration Number of ${type} candidate`}
          />
          <Typography variant="body2">{regNo}</Typography>
        </ListItem>

        <ListFeatureElement>
          <ListItem
            className={classes.listItem}
            key={`programme ${programme.first}`}
          >
            <ListItemText
              primary="First Preferred Programme"
              secondary="Your first programme of choice"
            />
            <Typography variant="body2">{programme.first}</Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            key={`institution ${institution.first}`}
          >
            <ListItemText
              primary="First Institution"
              secondary={`Institution for ${programme.first}`}
            />
            <Typography variant="body2">{institution.first}</Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            key={`programme ${course.first}`}
          >
            <ListItemText
              primary="First course"
              secondary={`Course for ${institution.first}`}
            />
            <Typography variant="body2">{course.first}</Typography>
          </ListItem>
        </ListFeatureElement>

        <ListFeatureElement>
          <ListItem
            className={classes.listItem}
            key={`programme ${programme.second}`}
          >
            <ListItemText
              primary="Second Preferred Programme"
              secondary="Your second programme of choice"
            />
            <Typography variant="body2">{programme.second}</Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            key={`institution ${institution.second}`}
          >
            <ListItemText
              primary="Second Institution"
              secondary={`Institution for ${programme.second}`}
            />
            <Typography variant="body2">{institution.second}</Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            key={`programme ${course.second}`}
          >
            <ListItemText
              primary="Second course"
              secondary={`Course for ${institution.second}`}
            />
            <Typography variant="body2">{course.second}</Typography>
          </ListItem>
        </ListFeatureElement>
        {programme.third && (
          <ListFeatureElement>
            <ListItem
              className={classes.listItem}
              key={`programme ${programme.third}`}
            >
              <ListItemText
                primary="Third Preferred Programme"
                secondary="Your third programme of choice"
              />
              <Typography variant="body2">{programme.third}</Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              key={`institution ${institution.third}`}
            >
              <ListItemText
                primary="Third Institution"
                secondary={`Institution for ${programme.third}`}
              />
              <Typography variant="body2">{institution.third}</Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              key={`programme ${course.third}`}
            >
              <ListItemText
                primary="Third course"
                secondary={`Course for ${institution.third}`}
              />
              <Typography variant="body2">{course.third}</Typography>
            </ListItem>
          </ListFeatureElement>
        )}

        {programme.fourth && (
          <ListFeatureElement>
            <ListItem
              className={classes.listItem}
              key={`programme ${programme.fourth}`}
            >
              <ListItemText
                primary="Fourth Preferred Programme"
                secondary="Your fourth programme of choice"
              />
              <Typography variant="body2">{programme.fourth}</Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              key={`institution ${institution.fourth}`}
            >
              <ListItemText
                primary="Fourth Institution"
                secondary={`Institution for ${programme.fourth}`}
              />
              <Typography variant="body2">{institution.fourth}</Typography>
            </ListItem>
            <ListItem
              className={classes.listItem}
              key={`programme ${course.fourth}`}
            >
              <ListItemText
                primary="Fourth course"
                secondary={`Course for ${institution.fourth}`}
              />
              <Typography variant="body2">{course.fourth}</Typography>
            </ListItem>
          </ListFeatureElement>
        )}

        {moreInfo && (
          <ListItem
            className={classes.listItem}
            key={`additional information ${moreInfo}`}
          >
            <ListItemText
              primary="Additional Information"
              secondary="Further details you need to add"
            />
            <Typography variant="body2">{moreInfo}</Typography>
          </ListItem>
        )}

        <ButtonGroup>
          <NoMarginBackButton
            variant={colors.darkred}
            onClick={() => setActiveStep(activeStep - 1)}
          >
            <NavigateBeforeIcon /> Previous
          </NoMarginBackButton>
          <NextButton
            variant={colors.darkblue}
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next <NavigateNextIcon />
          </NextButton>
        </ButtonGroup>
      </List>
    </div>
  )
}

export default CourseChangeReview
