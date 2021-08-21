import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Divider, FormControl, InputLabel, Input, InputAdornment, TextareaAutosize, Grid, Typography }
    from '@material-ui/core'
import Loader from "../../../components/Loaders/SimpleLoader"
import { Person as PersonIcon, Message as MessageIcon } from '@material-ui/icons'
import { colors } from '../../../styles/breakpoints';
import { UserProfileContainer, AdminButtonPro, AdminHeader } from "../../../styles/AdminStyles"
import { useDispatch, useSelector } from "react-redux"
import { emailAUserByEmail, emailAllUsers } from '../../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}))

const EmailManager = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [singleEmailSubject, setSingleEmailSubject] = useState("")
    const [singleEmailBody, setSingleEmailBody] = useState("")

    const [multipleEmailSubject, setMultipleEmailSubject] = useState("")
    const [multipleEmailBody, setMultipleEmailBody] = useState("")

    const [email, setEmail] = useState("")

    const userEmailByEmail = useSelector(state => state.userEmailByEmail)
    const { loading, message } = userEmailByEmail

    const usersEmail = useSelector(state => state.usersEmail)
    const { loading: emailsLoading, message: messageAll } = usersEmail

    const handleMultipleEmailSend = (e) => {
        e.preventDefault()
        dispatch(emailAllUsers({
            subject: multipleEmailSubject,
            message: multipleEmailBody
        }))
    }

    const handleSingleEmailSend = (e) => {
        e.preventDefault()
        dispatch(emailAUserByEmail(email, {
            subject: singleEmailSubject,
            message: singleEmailBody
        }))
    }


    return (
        <UserProfileContainer>
            <form className="messagecontainer" onSubmit={handleMultipleEmailSend}>
                {
                    messageAll &&
                    <AdminHeader>
                        <Grid item xs>
                            <Typography className="message" variant="span" component="p">
                                {messageAll}
                            </Typography>
                        </Grid>
                    </AdminHeader>

                }
                {
                    emailsLoading ? <Loader />
                        :
                        <Card className="card__content">
                            <CardContent >
                                <div className="heading">
                                    <h2>Send message to All Users</h2>
                                </div>
                                <Divider />
                                <div className="contents">
                                    <div className="fullwidth">
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="standard-adornment-name">Subject</InputLabel>
                                            <Input
                                                id="standard-adornment-name"
                                                value={multipleEmailSubject}
                                                required
                                                onChange={(e) => setMultipleEmailSubject(e.target.value)}
                                                startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="fullwidth">
                                        <FormControl className={classes.formControl}>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                onChange={e => setMultipleEmailBody(e.target.value)}
                                                value={multipleEmailBody}
                                                required
                                                rowsMin={5}
                                                startAdornment={<InputAdornment position="start"><MessageIcon /> </InputAdornment>}
                                                placeholder="Additional Information" />
                                        </FormControl>
                                    </div>

                                </div>

                                <Divider />
                                <div className="actions">

                                    <AdminButtonPro
                                        type="submit"
                                        color={colors.goldish}
                                    >Send message</AdminButtonPro>
                                </div>

                            </CardContent>
                        </Card>
                }
            </form>



            {/* Email a user */}

            <form className="messagecontainer" onSubmit={handleSingleEmailSend}>
                {
                    message &&
                    <AdminHeader>
                        <Grid item xs>
                            <Typography className="message" variant="span" component="p">
                                {message}
                            </Typography>
                        </Grid>
                    </AdminHeader>

                }
                {
                    loading ? <Loader />
                        :
                        <Card className="card__content">
                            <CardContent >
                                <div className="heading">
                                    <h2>Send email to a Users</h2>
                                </div>
                                <Divider />
                                <div className="contents">
                                    <div className="fullwidth">
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                                            <Input
                                                id="standard-adornment-email"
                                                value={email}
                                                type="email"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                                startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="fullwidth">
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="standard-adornment-subject">Subject</InputLabel>
                                            <Input
                                                id="standard-adornment-subject"
                                                value={singleEmailSubject}
                                                required
                                                onChange={(e) => setSingleEmailSubject(e.target.value)}
                                                startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                            />
                                        </FormControl>
                                    </div>

                                    <div className="fullwidth">
                                        <FormControl className={classes.formControl}>
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                onChange={e => setSingleEmailBody(e.target.value)}
                                                value={singleEmailBody}
                                                required
                                                rowsMin={5}
                                                startAdornment={<InputAdornment position="start"><MessageIcon /> </InputAdornment>}
                                                placeholder="Additional Information" />
                                        </FormControl>
                                    </div>

                                </div>

                                <Divider />
                                <div className="actions">

                                    <AdminButtonPro
                                        type="submit"
                                        color={colors.goldish}
                                    >Send message</AdminButtonPro>
                                </div>

                            </CardContent>
                        </Card>
                }
            </form>
        </UserProfileContainer>
    )
}

export default EmailManager
