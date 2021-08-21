import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {Socials} from "../styles/SocialStyle"

const SocialNetworks = ({fbBool, twBool, inBool, lnBool, ytBool, custom}) => {
    return (
        <Socials custom={custom}>
        <a style={{display: fbBool ? 'none' : 'block'}}
            href="http://www.facebook.com/softechy"
            target= "_blank"
            rel="noreferrer noopener"
            >
            <FacebookIcon className="facebook" /> 
        </a>        
            
        <a style={{display: twBool ? 'none' : 'block'}}
            href="http://www.facebook.com/softechy"
            target= "_blank"
            rel="noreferrer noopener"
            >
            <TwitterIcon className="twitter" />
        </a>
        
        <a style={{display: ytBool ? 'none' : 'block'}}
            href="http://www.facebook.com/softechy"
            target= "_blank"
            rel="noreferrer noopener"
            >
            <YouTubeIcon className="youtube" />
        </a>
        
        <a style={{display: lnBool ? 'none' : 'block'}}
            href="http://www.facebook.com/softechy"
            target= "_blank"
            rel="noreferrer noopener"
            >
            <LinkedInIcon className="linkedIn" />
        </a>
        
        <a style={{display: inBool ? 'none' : 'block'}}
            href="http://www.facebook.com/softechy"
            target= "_blank"
            rel="noreferrer noopener"
            >
            <InstagramIcon className="instagram" />
        </a>                                                                    
            
        </Socials>
    )
}

export default SocialNetworks
