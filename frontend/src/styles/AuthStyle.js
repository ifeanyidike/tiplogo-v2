import styled from 'styled-components'
import { motion } from 'framer-motion'
import { device } from "./breakpoints"
import { TabContainer } from "./TabStyle"
import { Button } from "./HomeStyle"

export const AuthMainContainer = styled.div`
    min-height: 70vh;
    display: grid;
    place-items: center;
`

export const AuthTabContainer = styled(TabContainer)`
    
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    width:40%;
    margin: 50px auto; 
    
    
    @media ${device.tablet}{
        width:100%;
    }
   
    .register__text{        
        font-family: 'Jost', sans-serif;
        text-align: center;
        *{
            margin-bottom: 20px;
        }
        h6{
            font-family: 'Aclonica', sans-serif;
            font-weight: 400
        }
        p{
            font-weight: 300 !important;
        }   
    }

    .actioncontainer{
        margin: 0 auto;
        width: 100%;
    }
    
    .tabs div div{
        
        width: 100%;
        @media ${device.tablet}{            
            flex-direction: row;
        };       
    }   
    .tabs div div button{
        font-family: 'Jost', sans-serif !important;
        border-radius: 0 !important;
        background-color: #F9F9F9;
        
    }
                                   
    .login__buttons{
        display:flex;
        flex-direction: column;
    }
`;

export const AuthButton = styled(Button)`
    width: 100% !important;
`

export const FacebookButton = styled(motion.div)`
    
    width: 100% !important;        
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    span{
        border-radius: 10px !important;
        width: 100%
    }
    
    .MuiSvgIcon-root{
        margin-right: 5px;
    }
    .kep-login-facebook{
        font-family: 'Jost', sans-serif !important;
        font-weight: 500 !important;
        text-transform: capitalize;
        width: 100% !important;
       
    }
`

export const GoogleButton = styled(Button)``

export const EmailConfirmation = styled(motion.div)`
    
    height: 90vh;    
    display: grid;
    place-items: center;
    div{
        display: grid;
        place-items: center;
    }
`;

export const PasswordResetContainer = styled(motion.div)`
    height: 90vh;    
    display: grid;
    place-items: center;
    font-family: 'Jost', sans-serif;    
    .content{
        .MuiInputLabel-root, .content, input, .message{
            font-family: 'Jost', sans-serif;
        }
        .MuiFormControl-root, h2{
            margin-bottom: 15px;
        }
        .message{
            text-align: center;
            margin-bottom: 20px;
        }
        -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        padding: 50px;
        border-radius: 10px
    }
`

export const ResetButton = styled(Button)`
    width: 100% !important;
`