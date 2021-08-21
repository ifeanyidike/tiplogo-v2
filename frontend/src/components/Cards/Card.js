import React from 'react'
import {CardDeck, CardButton} from "../../styles/CardStyle"
import SocialNetworks from "../SocialNetworks"
import PortableWifiOffIcon from '@material-ui/icons/PortableWifiOff';
import {Link} from "react-router-dom"

const Card = ({
    src, 
    firstCategory, 
    secondCategory, 
    caption,
    title,
    icon,
    description,
    cta
}) => {
    
    
    
    return (
        <CardDeck className="card__deck">            
            <div className="card__front">
                <img src={src} alt=""/>
                <div className="card__frontElements">
                    <div className="categories">
                        <span>{firstCategory}</span>
                        <span>{secondCategory}</span>
                    </div>
                    <p>{caption}</p>
                </div>                
            </div>
            
            <div className="card__back">                 
                <SocialNetworks inBool={true} twBool={true} custom='space-evenly' />       
                <h4>{caption}</h4>
                <div className="card__backTag">
                    <i className={`${icon} icon`}></i>
                    <span>{title}</span> 
                </div>
                
                <p>
                    {description}                    
                </p>
                <div className="link"> <Link  to="/">More Information</Link></div>
            </div>
            
            <CardButton>{cta}</CardButton>
        </CardDeck>
    )
}

export default Card
