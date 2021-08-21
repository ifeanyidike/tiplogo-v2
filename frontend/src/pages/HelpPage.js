import React, { useState, useEffect } from 'react'
import MainHeader from "../components/MainHeader"
import { HelpContainer, HelpButtonPro } from "../styles/HelpStyles"
import { Person as PersonIcon, Message as MessageIcon } from '@material-ui/icons'
import EmailIcon from '@material-ui/icons/Email';
import MenuBookIcon from "@material-ui/icons/MenuBook"
import {
    Input, FormControl, InputLabel, InputAdornment, Card, CardContent,
} from '@material-ui/core'
import { TextField } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { colors } from "../styles/breakpoints"
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import { useDispatch, useSelector } from "react-redux"
import { createContact } from '../redux/actions/contactActions';
import Loader from "../components/Loaders/SimpleLoader"
import Message from "../components/Message"
import Meta from "../components/Meta"
import { animateScroll as scroll } from 'react-scroll'

const Help = () => {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [purpose, setPurpose] = useState("")


    const dispatch = useDispatch()

    useEffect(() => {
        scroll.scrollToTop()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createContact({
            name,
            email,
            purpose,
            message
        }))
        setName("")
        setEmail("")
        setPurpose("")
        setMessage("")
    }


    const { loading, error, message: contactMessage } = useSelector(state => state.contactCreate)

    return (
        <HelpContainer>
            <Meta />
            <MainHeader />
            <div className="topimage">
                <h2>Need any help?</h2>
            </div>
            <h2> Contact us</h2>
            <main className="content">

                <div className="topcontent">
                    <form className="contactitem" onSubmit={handleSubmit}>
                        {
                            loading ? <Loader />
                                :
                                error ? <Message variant="error">{error}</Message>
                                    :
                                    contactMessage ? <Message variant="info">{contactMessage}</Message>
                                        :
                                        null
                        }
                        <Card className="card">
                            <CardContent className="card_content">

                                <div className="fullwidth">
                                    <FormControl fullWidth className="formcontrol">
                                        <InputLabel htmlFor="standard-adornment-name">Full Name</InputLabel>
                                        <Input
                                            id="standard-adornment-name"
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                            startAdornment={<InputAdornment position="start"><PersonIcon /> </InputAdornment>}
                                        />
                                        <FormHelperText id="standard-weight-helper-text">Your fullname here</FormHelperText>
                                    </FormControl>
                                </div>

                                <div className="fullwidth">
                                    <FormControl fullWidth className="formcontrol">
                                        <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                                        <Input
                                            id="standard-adornment-email"
                                            helperText="Choose the purpose"
                                            type="email"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <EmailIcon /> </InputAdornment>
                                            }
                                        />
                                        <FormHelperText id="standard-weight-helper-text">Your email address here</FormHelperText>
                                    </FormControl>
                                </div>

                                <div>
                                    <TextField
                                        select
                                        required
                                        className="formcontrol"
                                        label="Purpose"
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><MenuBookIcon /> </InputAdornment>
                                        }}
                                        helperText="Choose the purpose"
                                    >

                                        <option value="">Choose an option</option>
                                        <option value="Card loading issues">Card loading issues</option>
                                        <option value="Change of course issues">Change of course issues</option>
                                        <option value="Result upload issues">Result upload issues</option>
                                        <option value="Jamb password reset issues">Jamb password reset issues</option>

                                    </TextField>
                                </div>

                                <div className="fullwidth">
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Message here"
                                        className="formcontrol"
                                        multiline
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={6}
                                        helperText="Enter your message"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MessageIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <HelpButtonPro type="submit">Send message</HelpButtonPro>
                                </div>
                            </CardContent>
                        </Card>
                    </form>

                    <div className="altcontact">
                        <h2>Contact Us</h2>
                        <div className="text">
                            <p>
                                Need help with any of our service? We are just a call or message away.
                        </p>

                            <p>You can contact us via the contact form or call/email us and we'll get back to you right away.</p>

                        </div>
                        <div className="buttons">
                            <div>
                                <span>Email us</span>
                                <HelpButtonPro color={colors.goldish}>
                                    <a href="mailto:pincafes@gmail.com">
                                        <AlternateEmailIcon /> pincafes@gmail.com
                                </a>
                                </HelpButtonPro>
                            </div>
                            <div>
                                <span>Call us</span>
                                <HelpButtonPro color={colors.darkblue} >
                                    <a href="tel:08069598685" style={{ color: 'white' }}>
                                        <PhoneIcon /> 08069598685
                                </a>
                                </HelpButtonPro>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </HelpContainer>
    )
}

export default Help
