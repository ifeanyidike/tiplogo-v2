import styled from 'styled-components'
import { motion } from 'framer-motion'
import { device, colors } from "./breakpoints"

export const TestimonialContainer = styled(motion.div)`
    background: rgb(254,254,254);
    background: linear-gradient(180deg, 
    rgba(244,245,247,1) 12%, 
    rgba(245,246,248,1) 27%, 
    rgba(248,248,250,1) 41%, 
    rgba(253,253,253,1) 57%, 
    rgba(253,254,254,1) 70%, 
    rgba(254,254,254,1) 83%);

    font-family: 'Jost', sans-serif;
    .carousel{                
        .carousel__slide{
            ${'' /* height: 150px !important;                     */}
        }
        
        .carousel__inner-slide{
                    
            .slide__item{                
                display:flex;
                justify-content: center;
                align-items: center;
                @media ${device.tablet}{
                    flex-direction: column;
                }
                div{
                    
                    p{                        
                        margin: 0;  
                    }
                }
                
                height: 100%;
                .avatar{
                    width: 100px;                    
                    height: 100px;
                }
                               
                p{
                    font-weight: 300;                    
                    padding: 3px 10px;
                    font-size: 1rem;   
                                     
                }
                small{
                    font-family: 'Aclonica';    
                    font-size: 0.7rem;        
                    padding: 0 10px;
                }
                p, small{
                    @media ${device.tablet}{                        
                        padding: 5px 60px;    
                    }
                    @media ${device.mobile_lg}{                        
                        padding: 5px 35px;    
                    }
                    @media ${device.mobile_md}{                        
                        padding: 0 0 0 15px;
                    }
                    @media ${device.mobile_sm}{                        
                        padding: 0 5px;    
                    }
                }
            }            
        }
        
        position: relative;
        .carousel__back-button, .carousel__next-button{
            position: absolute;
            top: 40%;                    
            @media ${device.tablet}{                        
                top: 20%;    
            }
            border: none;
            outline: none;
            background-color: transparent;
            color: ${colors.darkred};
        };
        .carousel__back-button{
            left: -20px;
            @media ${device.mobile_lg}{                        
                left: 0;
            }
            
            @media ${device.mobile_md}{                        
                left: -15px;
            }
            @media ${device.mobile_sm}{                        
                left: -25px;
            }
        }
        .carousel__next-button{                             
            right: 0;
            @media ${device.mobile_md}{                        
                right: -20px;
            }
            @media ${device.mobile_md}{                        
                right: -30px;
            }
        }
    }
`