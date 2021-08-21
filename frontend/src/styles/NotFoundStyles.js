import styled from 'styled-components'
import { device, colors } from "./breakpoints"
import { Button } from "./HomeStyle"

export const NotFoundContainer = styled.div`
    height: 88vh;    
    
    .notfound{
        display: grid;
        place-items: center;   
        margin-top: 85px; 
        
        p {
            color: ${colors.white};        
            font-size: 10rem;
            @media ${device.mobile_lg}{
                font-size: 5rem;
            }
            font-weight: 700;
            display: flex;
            font-family: 'Aclonica', sans-serif;
        }
        p span {            
            transform-style: preserve-3d;
            perspective: 500;
            -webkit-font-smoothing: antialiased;
        }
        p span::before,
        p span::after {
            
            position: absolute;
            top: 0;
            left: -1px;
            transform-origin: left top;
            transition: all ease-out 0.3s;
            content: attr(data-text);
        }
        p span::before {
            z-index: 1;
            color: rgba(0,0,0,0.2);
            transform: scale(1.1, 1) skew(0deg, 20deg);
        }
        p span::after {
            z-index: 2;
            color: ${colors.lightred};
            text-shadow: -1px 0 1px #684da3, 1px 0 1px rgba(0,0,0,0.8);
            transform: rotateY(-40deg);
        }
        p span:hover::before {
            transform: scale(1.1, 1) skew(0deg, 5deg);
        }
        p span:hover::after {
            transform: rotateY(-10deg);
        }
        p span + span {
            margin-left: 0.1rem;
        }
        
        .caption{
            font-family: 'Aclonica', sans-serif;
            margin: 20px 0 10px 0;
            font-size: 2rem;
            @media ${device.mobile_lg}{
                font-size: 1rem;
            }
        }
        .text{
            font-size: 1rem;
            margin-bottom: 5px;
            text-align: center;
            @media ${device.mobile_lg}{
                font-size: 0.75rem;
            }
        }
    }
`

export const UnAuthorizedContainer = styled(NotFoundContainer)`
    .notfound {
        p{
            @media ${device.tablet_md}{
                font-size: 7rem;
            }
            @media ${device.mobile_lg}{
                font-size: 5rem;
            }
            @media ${device.mobile_md}{
                font-size: 4rem;
            }
            @media ${device.mobile_sm}{
                font-size: 3rem;
            }
        }
        
    }
    
    
`
export const AccessButton = styled(Button)`
    background: ${colors.darkblue};
    margin: 0.7rem auto;
    padding: 0.4rem 0.8rem;
    border: 1px solid ${colors.darkblue};
    border-radius: 20px;
`