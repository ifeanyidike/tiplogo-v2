import React from 'react'
import { FooterElement } from "../styles/FooterStyle"
import PublicIcon from '@material-ui/icons/Public';
import { Link, useHistory } from 'react-router-dom';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

const Footer = ({ hide }) => {
    const history = useHistory()
    return (
        <FooterElement>

            <div className="topfooter" style={{ display: hide ? 'none' : 'grid' }}>
                <div className="description">
                    <img src="/images/pincafes-logo.png" alt="Logo" onClick={() => history.push('/')} />
                    <p>
                        Buy WAEC/NECO Scratch Cards, all JAMB correction of data, JAMB Regularisation, etc.
                    </p>
                </div>
                <div className='links'>
                    <h4>Links</h4>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/allcards'>Buy cards</Link>
                        </li>
                        <li>
                            <Link to='/data-correction'>Jamb services</Link>
                        </li>
                        <li>
                            <Link to='/help'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to='/auth'>Sign up</Link>
                        </li>
                    </ul>
                </div>
                <div className="contact">
                    <h4>Contacts</h4>
                    <ul>
                        <li><LocationOnIcon /> 2 John Kay Street, Okitipupa, Ondo State.</li>
                        <li><MailOutlineIcon /> pincafes@gmail.com</li>
                        <li><PhoneIcon /> <span>08066120596</span></li>
                    </ul>
                </div>


            </div>
            <div className='bottombar'>
                <div>
                    <label><PublicIcon /> Pin Cafes</label>
                </div>
                <div className="footer__items">
                    <small><Link to="/help">Contact Pin Cafes</Link> </small>
                    <small><Link to='/'>Privacy</Link> </small>
                    <small><Link to='/'>Terms of use</Link> </small>
                    <small><Link to="/help">Help</Link> </small>
                    <small>&copy; {new Date().getFullYear()} </small>
                </div>
            </div>
        </FooterElement>
    )
}

export default Footer
