import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Divider,
  FormControl,
  InputAdornment,
  TextareaAutosize,
} from '@material-ui/core'
import { Message as MessageIcon } from '@material-ui/icons'
import { colors } from '../../../styles/breakpoints'
import {
  UserProfileContainer,
  AdminButtonPro,
} from '../../../styles/AdminStyles'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateAnnouncement,
  getAnnouncement,
} from '../../../redux/actions/userActions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const AnnouncementManager = () => {
  const classes = useStyles()
  const [announcement, setAnnouncement] = useState('')
  const dispatch = useDispatch()
  const { announcement: savedAnnouncement } = useSelector(
    (state) => state.announcement,
  )

  useEffect(() => {
    dispatch(getAnnouncement())
  }, [dispatch])

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault()
    dispatch(updateAnnouncement(announcement))
    setAnnouncement('')
  }

  return (
    <UserProfileContainer>
      <form className="messagecontainer" onSubmit={handleAnnouncementSubmit}>
        <Card className="card__content">
          <CardContent>
            <div className="heading">
              <h2>Set homepage announcement</h2>
            </div>
            <Divider />
            <div className="contents">
              <div className="fullwidth">
                <FormControl className={classes.formControl}>
                  <TextareaAutosize
                    aria-label="minimum height"
                    onChange={(e) =>
                      setAnnouncement({
                        ...savedAnnouncement,
                        info: e.target.value,
                      })
                    }
                    rowsMin={5}
                    startAdornment={
                      <InputAdornment position="start">
                        <MessageIcon />{' '}
                      </InputAdornment>
                    }
                    placeholder={
                      savedAnnouncement?.info
                        ? savedAnnouncement.info
                        : 'Add announcement'
                    }
                  />
                </FormControl>
              </div>
            </div>

            <Divider />
            <div className="actions">
              <AdminButtonPro type="submit" color={colors.goldish}>
                Save
              </AdminButtonPro>
            </div>
          </CardContent>
        </Card>
      </form>
    </UserProfileContainer>
  )
}

export default AnnouncementManager
