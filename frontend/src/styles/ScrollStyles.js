import styled from 'styled-components'
import { motion } from 'framer-motion'
import { colors } from "./breakpoints"

export const ScrollContainer = styled.div`
    z-index: 5;
    position: fixed;
    bottom: 20px;
    left: 20px;

    button{
        border-radius: 10px !important;
        box-shadow: 2px 6px 5px 0px rgba(0,0,0,0.75);
        background-color: ${colors.darkgray};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        transform: rotateZ(-15deg);
        transition: all 0.5s ease;
        &:hover{
            transform: rotateZ(0);
            background-color: ${colors.darktext};
           
        }
        i{
            color: ${colors.white}
        }
    }
`