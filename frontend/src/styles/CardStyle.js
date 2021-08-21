import styled from "styled-components"
import { motion } from "framer-motion"
import { colors } from "./breakpoints"
import { Button } from "./HomeStyle"

export const CardDeck = styled(motion.div)`
    font-family: 'Didact Gothic', sans-serif;
    font-size: 0.89rem;
    background-color: ${colors.white};
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0;
    min-width: 230px;
    max-width: 250px;
    height: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    transition: all 5s ease;
    position: relative;
    
    .card__front{
        height: 80%;    
        position: absolute;
        visibility: visible;                
        transition: all 1s ease;
        
        
        img{
         width: 100%;
         height: 180px;
        }
                
        .card__frontElements{
            padding: 15px;
        }
        
        .card__frontElements .categories{
            display:flex;
            margin-bottom: 15px;
            span:nth-child(odd){                
                background-color: ${colors.darkgray}
            }
            span:nth-child(even){                
                background-color: ${colors.darkred}
            }
            span{
                border-radius: 3px;
                padding: 3px 10px;
                margin-right: 10px;
                color: ${colors.white}
            }
        }
        
        
    }
    
    .card__back{            
        position: absolute;
        visibility: hidden;
        opacity: 0;
        padding: 20px 15px;                                
                        
        h4{
            margin: 20px 0 10px 0;
            font-weight: 600;
            font-size: 1.1rem;
            text-align: center;
        }
        
        .card__backTag{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0 15px 0;
            .icon{
                font-size: 16px;
                color: ${colors.darkred};
                margin-right: 5px;
            }
            span{
                font-weight: 600;
                font-size: 0.9rem;
            }
            
        }
        p{
            text-align: center;
            margin: 21px 0 20px 0;
        }
        .link{            
            text-align: center;
            a{
                text-decoration: none;
                color: ${colors.lightred}
            }
        }
    } 
    
    
    
    &:hover{
        .card__front{
            transform: rotateY(180deg);
            visibility: hidden;
            opacity: 0                            
        }
        .card__back{
            visibility: visible;
            opacity: 1
        }
    }
`

export const CardButton = styled(Button)`
    position: absolute;
    bottom: 10px;
    font-family: 'Didact Gothic', sans-serif;
    width: 150px;
    padding: 0.5rem 0.8rem;
    
`

//Card Simple Definition
export const CardContainer = styled(motion.div)`
    max-width: 300px;    
    padding: 20px;
    background-color: ${props =>
        props.variant === 'darkblue' ? colors.darkblue :
            props.variant === 'lightgreen' ? colors.lightgreen :
                props.variant === 'lightblue' ? colors.lightblue :
                    props.variant === 'goldish' ? colors.goldish
                        : null
    };
    color: ${props =>
        props.variant === 'darkblue' ? colors.white :
            props.variant === 'lightgreen' ? colors.darktext :
                props.variant === 'lightblue' ? colors.white :
                    props.variant === 'goldish' ? colors.darktext
                        : null
    };
    .cardimage__panel{
        border-radius: 50%;
        width: 140px;
        background-color: ${props =>
        props.variant === 'darkblue' ? colors.lightergray :
            props.variant === 'lightgreen' ? colors.bluetext :
                props.variant === 'lightblue' ? colors.lightgray :
                    props.variant === 'goldish' ? colors.bluetext
                        : null
    };                                
        padding: 15px;
        img{            
            width: 100%;
        }
    }
        
    i{
        border-radius: 50%;
        color: ${colors.white};
        background-color: ${props =>
        props.variant === 'darkblue' ? colors.lightergray :
            props.variant === 'lightgreen' ? colors.bluetext :
                props.variant === 'lightblue' ? colors.lightgray :
                    props.variant === 'goldish' ? colors.bluetext
                        : null
    };                                
        padding: 30px;
        font-size: 4rem;
    };      
            
    h4{
        font-family: 'Aclonica', sans-serif;
        font-size: 1.2rem;  
        margin-top: 20px
    }; 
    a{
        text-decoration: none;     
        margin-top: 20px !important;
        color: ${props =>
        props.variant === 'darkblue' ? colors.white :
            props.variant === 'lightgreen' ? colors.bluetext :
                props.variant === 'lightblue' ? colors.white :
                    props.variant === 'goldish' ? colors.bluetext
                        : null
    }   
    };
    p,span, a{
        margin-top: 20px;
        font-family: 'Jost', sans-serif;
        font-size: 1.1rem;        
    }            
    p{
        margin-bottom: 20px;
    }
    
    &:hover{       
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.16), 0 12px 10px 0 rgba(0, 0, 0, 0.12);
    }
`

//Top card definition

export const TopCardPane = styled(motion.div)`
    background-color: ${colors.white};
    width: 120px;
    height: 120px;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    margin-right: 10px;
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i{
        color: ${colors.darkblue};
        font-size: 30px;   
        transition: all 1s ease-in-out;     
    }
    span{
        font-family: 'Jost', sans-serif;
        font-size: 0.9rem;
    }
    
    &:hover{
        transform: scale(1.1);
        border-radius: 0 0 8px 8px;
        border-top: 2px solid ${props =>
        props.bcolor === 'darkblue' ? colors.darkblue :
            props.bcolor === 'darkred' ? colors.darkred :
                props.bcolor === 'lightgray' ? colors.lightgray :
                    props.bcolor === 'goldish' ? colors.goldish :
                        colors.lightred
    };
        i{
          color: ${props =>
        props.bcolor === 'darkblue' ? colors.darkblue :
            props.bcolor === 'darkred' ? colors.darkred :
                props.bcolor === 'lightgray' ? colors.lightgray :
                    props.bcolor === 'goldish' ? colors.goldish :
                        colors.lightred};
            transform: rotate(360deg) scale(1.4);
            
        }
`