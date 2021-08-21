import styled from 'styled-components'
import { device, colors } from "./breakpoints"
import { AdminButtonPro } from "./AdminStyles"

export const HelpContainer = styled.div`
    
    .topimage{
        background-image: url(/images/slide4.jpg);
        background-color: ${colors.darktext};
        background-blend-mode: lighten;
        background-position: center;
        height: 30vh;        
         display: grid; 
         place-items: center; 
         h2{
             color: ${colors.white}
         }
    }
    
    h2{
        font-family: 'Aclonica', sans-serif;
        font-size: 1.6rem;
        text-align: center;
        width: fit-content;
        border-bottom: 2px solid ${colors.goldish};
        margin: 40px auto;
    }
    .content{
        display: grid;
        place-items: center;
        margin: 0 30px 40px 30px;
        @media ${device.tablet}{
            margin: 0 0 40px 0;
        }
        
        .topcontent{
            display: grid;        
            grid-template-columns: repeat(2, 1fr);  
            
            @media ${device.tablet}{
                grid-template-columns: 1fr;  
            }
            grid-gap: 40px;            
            width: 100%;
            .card{
                padding: 20px;
            }
        }
    }

    .formcontrol{
        margin: 1rem;
        min-width: 100%;
        width: 100%;
        @media ${device.tablet}{
            margin: 1rem 0; 
        }
    }
    
    .altcontact{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        h2{
            font-family: 'Aclonica', sans-serif            
        }
        .text{
            margin: 30px auto;
            p{
                padding: 15px;
                @media ${device.tablet}{
                   padding: 15px 10px;                   
                }
            }
            
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
            border-radius: 10px;
        }
        .buttons{
            width: 100%;                        
            display: flex;
            justify-content: space-around;
            @media ${device.tablet}{
                   flex-direction: column;                 
                }
            div{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
            }
        }
    }
`

export const HelpButtonPro = styled(AdminButtonPro)`
    padding: 5px 15px 5px 15px;
    a{
        text-decoration: none;
        color: ${colors.darkblue};
        display: flex;
        align-items: center;
        .MuiSvgIcon-root{
            margin-right: 3px;
        }
    }
`