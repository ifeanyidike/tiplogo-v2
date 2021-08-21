import styled from 'styled-components'
import { motion } from "framer-motion"
import { device, colors } from "./breakpoints"


export const Backdrop = styled(motion.div)`
    
    @media ${device.tablet}{
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;    
    }
    
`

export const Drawer = styled.nav`
    @media ${device.desktopL}{
        display:none
    }
    
    @media ${device.tablet}{            
        display: block;
        font-family: "Jost";        
        background: white;
        -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        top: 0;
        left: 0;
        width: 70%;
        height: 100%;
        z-index: 5;
        margin: 0 !important;
        padding: 0 !important;
        position: fixed;    
        transform: translateX(-100%);
        transition: transform 0.3s ease-out;
        
                
        .open{
            transform: translateX(0);
        }                
    }               
    @media ${device.mobile_lg}{  
        width: 80%;
    }
`;


export const DrawerContent = styled(motion.div)`
    height: 100%;    
    .closeIcon{
            background-color: transparent !important;            
            color: #fff;
            margin-bottom: 20px !important;
            &:hover{
                background-color: rgba(219, 219, 219, 0.5) !important;
            }
        }                
    
    ul{
        height: 100%;
        list-style: none;
        display: flex;
        flex-direction: column;        
        font-size: 1.2rem;
        li{            
            padding: 40px 20px 40px 20px;
            @media ${device.mobile_lg}{  
                padding: 30px 20px 20px 20px;
            }
            @media ${device.mobile_md}{  
                padding: 20px 20px 10px 20px;
            }
        }
        li.item{
            display: flex;
            align-items: center;    
            font-weight: 500;
            border-bottom: 1px solid ${colors.lightergray};
            opacity: 0;
            
            i, .MuiAvatar-root{
                margin-right: 20px;
                color: ${colors.lightred};
                &:hover{
                    color: ${colors.white};
                }
            }
            span{
                font-size: 1.2rem;
                color: ${colors.darktext}
            }                                 
        }
        
        li.sidedrawer__firstchild {
            margin: 0 !important;            
            padding: 30px 20px 40px 20px;
            background-color: ${colors.lightred};
            
            @media ${device.mobile_md}{  
                padding: 20px 20px 20px 20px;
            }
            .logo{
               
                height: 5px;
                img{
                   width: 90%;
                    height: 50%;
                }
            } 
            svg{
                margin-bottom: 30px;                
            }
            .cls-1{
                fill: #fff;      
            }
            .cls-2 {
                fill: ${colors.darktext}; 
            }
            span{
                color: ${colors.white}
            }
            
        }  
        li:last-child{
            
            margin-top: auto;
        }   
        
        a.drawer__link.first:hover{
            border-top: 4px solid ${colors.lightgray}
        } 
        
        a.drawer__link:hover{
            background: ${colors.lightred};            
            span{
                color: ${colors.white}
            }
            i{
                color: ${colors.white}
            }            
        }
        
          
    }
    
    a {
        color: #521751;
        text-decoration: none;
        font-size: 1.2rem;
    }
    a:hover, a:active{
        color: #fa923f;
    }    
`;

export const CloseIconElem = styled(motion.div)`
    position: relative;
    margin: 20px 0;    
    width: 50px;
    height: 50px;
    
    div{
        position: absolute;
        top: 20px;
        left: 0;
        background: #000;
        width: 90%;
        height: 2px;
        
    }
    
    &:hover{
        border-radius: 10px;
        background: #DBDBDB;
    }
`


