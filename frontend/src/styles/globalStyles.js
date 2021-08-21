import styled, { createGlobalStyle } from "styled-components"
import { colors } from "./breakpoints"

export const globalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }  
`
export const Divider = styled.hr`
    height: 2px;
    border: 0;
    background-color: ${colors.darkbackground}        
    
`




