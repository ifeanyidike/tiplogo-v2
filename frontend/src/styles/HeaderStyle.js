import styled from 'styled-components'
import { motion } from "framer-motion"
import { device, colors } from "./breakpoints"

export const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;         
    .logo{
        height: 60px;
        img{
            height: 100%;
        }
    }   
    @media ${device.tablet}{
        margin-bottom: 10px;
        justify-content: unset;
        .svgDiv, .logo{
            margin: 0 auto; 
        }
        
    }
`

export const HeaderRightItems = styled(motion.div)`    
    flex-grow: 0.7;
    font-family: 'Jost', sans-serif;
    ul{               
        display: flex;
        justify-content: flex-end;        
        align-items: center;        
        
        li{
            list-style:none;
            margin-right: 30px;
            a{
                text-decoration: none;
                color: ${colors.darktext};
                &:hover{
                    border-bottom: 2px solid ${colors.goldish};
                    font-weight: bold;
                }
            }
        }
    }
    
    @media ${device.tablet}{
        display:none;
    }
`


export const Image = styled.img`
    max-width: 200px;    
`

export const Hamburger = styled(motion.div)`
    position: relative;
    width: 40px;    
    background-color: transparent;
    align-self: flex-start;
    padding-left: 30px;
    div{
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: ${colors.darktext};                
    }
    .line1{
        top: 5px;
    }
    .line2{
        top: 15px;
    }
    .line3{
        top: 25px
    }
    
    .avatar{
        width: 12px !important;
        height: 12px !important;
    }
    
    @media ${device.desktop}{
        display:none;
    }
    
    @media ${device.tablet}{
        display:block;
    }    
`
