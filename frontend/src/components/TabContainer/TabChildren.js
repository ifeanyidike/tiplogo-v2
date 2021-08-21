import React from 'react'
import {ChildContainer} from '../../styles/TabStyle'

const TabChildren = ({heading, description, image, children}) => {
    return (
        <ChildContainer>
            <div className="leftchild">
                <h2>{heading}</h2>
                <p>{description}</p>
                <div className="child__items">
                    {children}                    
                </div>
            </div>
            <div className="rightchild">
                <img src={image} alt=""/>
            </div>
            
        </ChildContainer>
    )
}

export default TabChildren
