import styled from "styled-components"
import { motion } from "framer-motion"
import { colors } from "./breakpoints"


export const Modal = styled(motion.div)`
    position: fixed;
    top: 0;        
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display:grid;
    place-items: center;
    
    .modalitem{
        font-family: 'Jost', sans-serif;
        -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        background-color: ${colors.white};
        padding: 50px;
        border-radius: 10px;
        
        p{
            font-size: 1.5rem;
            margin-bottom: 10px;
        };
        div{
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            
            a{
                display: flex;
                align-items: center;
                color: ${colors.goldish};
                margin-right: 8px;
                .MuiSvgIcon-root{
                    margin-left: 3px;
                }
            }
        }
        
    }
`