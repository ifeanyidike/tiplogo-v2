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

const OLevelUploadReview = ({
  type,
  name,
  profileCode,
  upload,
  schoolAttended,
  schoolType,
  activeStep,
  setActiveStep,
  entries,
}) => {
  const classes = useStyles()
  return (
    <div className="olevel-upload-review">
      <List>
        <ListItem className={classes.listItem} key={type}>
          <ListItemText primary="Upload Type" secondary="NECO or WAEC?" />
          <Typography variant="body2">{type}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={name}>
          <ListItemText
            primary="Candidate's Name"
            secondary={`Name of ${type} candidate`}
          />
          <Typography variant="body2">{name}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={profileCode}>
          <ListItemText
            primary="Candidate's Profile Code"
            secondary={`Profile Code ${type} candidate`}
          />
          <Typography variant="body2">{profileCode}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={schoolAttended}>
          <ListItemText
            primary="Candidate's School Attended Code"
            secondary={`Profile Code ${type} candidate`}
          />
          <Typography variant="body2">{schoolAttended}</Typography>
        </ListItem>
        <ListItem className={classes.listItem} key={schoolType}>
          <ListItemText
            primary="Candidate's School Type Code"
            secondary={`Profile Code ${type} candidate`}
          />
          <Typography variant="body2">{schoolType}</Typography>
        </ListItem>

        {upload.files &&
          upload.files.map((file, index) => (
            <ListFeatureElement key={index}>
              <ListItem className={classes.listItem} key={file.name}>
                <ListItemText
                  primary="File Name"
                  secondary="Name of the file"
                />
                <Typography variant="body2">{file.name}</Typography>
              </ListItem>
              <ListItem className={classes.listItem} key={file.type}>
                <ListItemText primary="File Type" secondary="Type the file" />
                <Typography variant="body2">{file.type}</Typography>
              </ListItem>
              <ListItem className={classes.listItem} key={file.size}>
                <ListItemText primary="File Size" secondary="Size the file" />
                <Typography variant="body2">
                  {file.size / 1024 ** 2 < 1
                    ? `${(file.size / 1024).toFixed(2)}KB`
                    : `${(file.size / 1024 ** 2).toFixed(2)}MB`}
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem} key={file.lastModified}>
                <ListItemText
                  primary="Uploaded At"
                  secondary="Time of Upload"
                />
                <Typography variant="body2">
                  {new Date(file.lastModified).toDateString()}
                </Typography>
              </ListItem>
            </ListFeatureElement>
          ))}

        <ListFeatureElement>
          <ListItem className="entriesrow">
            <ListItemText primary="Subjects" />
            <ListItemText primary="Grades" />
            <ListItemText primary="Exam No." />
            <ListItemText primary="Exam Types" />
            <ListItemText primary="Exam Year" />
          </ListItem>
          {(entries.first.grade ||
            entries.first.examNumber ||
            entries.first.examType ||
            entries.first.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.first.subject} />
              <ListItemText primary={entries.first.grade} />
              <ListItemText primary={entries.first.examNumber} />
              <ListItemText primary={entries.first.examType} />
              <ListItemText primary={entries.first.examYear} />
            </ListItem>
          )}

          {(entries.second.grade ||
            entries.second.examNumber ||
            entries.second.examType ||
            entries.second.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.second.subject} />
              <ListItemText primary={entries.second.grade} />
              <ListItemText primary={entries.second.examNumber} />
              <ListItemText primary={entries.second.examType} />
              <ListItemText primary={entries.second.examYear} />
            </ListItem>
          )}
          {(entries.third.grade ||
            entries.third.examNumber ||
            entries.third.examType ||
            entries.third.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.third.subject} />
              <ListItemText primary={entries.third.grade} />
              <ListItemText primary={entries.third.examNumber} />
              <ListItemText primary={entries.third.examType} />
              <ListItemText primary={entries.third.examYear} />
            </ListItem>
          )}
          {(entries.fourth.grade ||
            entries.fourth.examNumber ||
            entries.fourth.examType ||
            entries.fourth.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.fourth.subject} />
              <ListItemText primary={entries.fourth.grade} />
              <ListItemText primary={entries.fourth.examNumber} />
              <ListItemText primary={entries.fourth.examType} />
              <ListItemText primary={entries.fourth.examYear} />
            </ListItem>
          )}
          {(entries.fifth.grade ||
            entries.fifth.examNumber ||
            entries.fifth.examType ||
            entries.fifth.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.fifth.subject} />
              <ListItemText primary={entries.fifth.grade} />
              <ListItemText primary={entries.fifth.examNumber} />
              <ListItemText primary={entries.fifth.examType} />
              <ListItemText primary={entries.fifth.examYear} />
            </ListItem>
          )}
          {(entries.sixth.grade ||
            entries.sixth.examNumber ||
            entries.sixth.examType ||
            entries.sixth.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.sixth.subject} />
              <ListItemText primary={entries.sixth.grade} />
              <ListItemText primary={entries.sixth.examNumber} />
              <ListItemText primary={entries.sixth.examType} />
              <ListItemText primary={entries.sixth.examYear} />
            </ListItem>
          )}
          {(entries.seventh.grade ||
            entries.seventh.examNumber ||
            entries.seventh.examType ||
            entries.seventh.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.seventh.subject} />
              <ListItemText primary={entries.seventh.grade} />
              <ListItemText primary={entries.seventh.examNumber} />
              <ListItemText primary={entries.seventh.examType} />
              <ListItemText primary={entries.seventh.examYear} />
            </ListItem>
          )}
          {(entries.eighth.grade ||
            entries.eighth.examNumber ||
            entries.eighth.examType ||
            entries.eighth.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.eighth.subject} />
              <ListItemText primary={entries.eighth.grade} />
              <ListItemText primary={entries.eighth.examNumber} />
              <ListItemText primary={entries.eighth.examType} />
              <ListItemText primary={entries.eighth.examYear} />
            </ListItem>
          )}
          {(entries.nineth.grade ||
            entries.nineth.examNumber ||
            entries.nineth.examType ||
            entries.nineth.examYear) && (
            <ListItem className="entriesrow">
              <ListItemText primary={entries.nineth.subject} />
              <ListItemText primary={entries.nineth.grade} />
              <ListItemText primary={entries.nineth.examNumber} />
              <ListItemText primary={entries.nineth.examType} />
              <ListItemText primary={entries.nineth.examYear} />
            </ListItem>
          )}
        </ListFeatureElement>

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

export default OLevelUploadReview
