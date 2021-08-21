import styled from 'styled-components'
import { motion } from 'framer-motion'
import { device, colors } from "./breakpoints"

export const TabContainer = styled(motion.div)`
    display: ${props => props.variant === 'center' ? 'grid' : null};
    place-items: ${props => props.variant === 'center' ? 'center' : null};
    
    .tabs{            
        
        div div{            
            width: 80vw;
            
           @media ${device.tablet}{
                width: 100%;
                display: flex;
                flex-direction: column;
           };               
        }
        div div button{  
            font-family: 'Russo One' !important;                       
            border-radius: 20px !important;    
            span.MuiTab-wrapper{
                text-transform: capitalize;
                font-size: 1rem;
            };
            @media ${device.mobile_lg}{
                margin-top: 20px;                
            }   
        }
        .MuiTabs-indicator{
            display:none;
        }
    }
`

export const ChildContainer = styled(motion.div)`
    
    font-family: 'Jost', sans-serif;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 20px 0;
    @media ${device.tablet}{
        grid-template-columns: 1fr;        
    }

    
    
    .leftchild{
        
        h2, h4{
            font-family: 'Aclonica';            
        }
        
        h2{            
            margin-bottom: 10px;            
            font-size: 3rem;
            color: ${colors.darktext};
            @media ${device.mobile_lg}{
                font-size: 1.5rem;                
                width: 70%;
            }
        }
        
        p{
            font-size: 1.5rem;
            color: ${colors.midtext};
            @media ${device.mobile_lg}{
                font-size: 1rem;                
                width: 70%;
            }        
        }
        .cta{
            margin-top: 10px;
            display: block;
            font-size: 1rem;
        }
        
        
        .child__items{
            
            .child__item{
                display:flex;
                align-items:center;  
                margin-top: 30px;
                i{
                    background-color: ${colors.darkbackground};
                    padding: 25px;
                    font-size: 2rem;
                    color: ${colors.bluetext};
                    margin-right: 30px;
                    &:hover{
                        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
                    };
                    @media ${device.mobile_lg}{
                        font-size: 1rem;
                        padding: 13px;
                    }
                    
                }      
                div{
                    color: ${colors.midtext};
                    font-size: 1rem;
                    @media ${device.mobile_lg}{
                       font-size: 0.9rem;                
                        width: 60%;
                    };                    
                } 
                div h4{                    
                    &:hover{
                        color: ${colors.bluetext};                        
                    }
                }    
                div span{
                    @media ${device.mobile_lg}{                      
                        display: block;
                        width: 60%;
                    };
                }   
            }
        }
        
    }
    
    .rightchild{
        img{
            margin-top: 100px;
            min-width: 500px;
            max-width: 700px;
            @media ${device.tablet}{
                min-width: 300px;
                max-width: 500px;
            }
            @media ${device.mobile_lg}{
                min-width: 200px;
                max-width: 250px;
            }
        }
    }
`