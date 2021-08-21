import styled from 'styled-components'
import { device, colors } from "./breakpoints"

export const FooterElement = styled.footer`
    
    a{
        text-decoration: none;
    }
    .topfooter{
        background: ${colors.lightred};
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        @media ${device.tablet}{
            grid-template-columns: repeat(2, 1fr);
        }
        @media ${device.tablet_md}{
            grid-template-columns: 1fr;
            grid-gap: 20px;
        }
        place-items: center;
        padding: 50px 80px;
        grid-gap: 10px;

        h4{
            font-family: 'Aclonica', sans-serif;
            border-bottom: 2px solid ${colors.goldish};
            width: fit-content;
            
        }
        ul{
            list-style: none;
            li{
                font-family: 'Jost', sans-serif !important;
                margin: 15px 0;
                display: flex;
                align-items: center;
                a{
                    color: #000;
                    transition: all 0.5s ease;;
                    &:hover{
                        font-weight: 800; 
                        color: ${colors.goldish}
                    }
                }
                .MuiSvgIcon-root{
                    margin-right: 3px;
                    color: ${colors.darkblue}
                }
            }
        }
        .description{
            height: 100%;
            width: 100%;
          
            img{
                height: 70px;
                cursor: pointer;
            }
            p{
                font-family: 'Jost', sans-serif;
                width: 80%;
            }
        }
        .links{
            height: 100%;
            width: 100%;
        }
        .contact{
            height: 100%;
            width: 100%;
        }
        .account{
            font-weight: 500;
            height: 100%;
            width: 100%;
            ul li{
                text-transform: uppercase;
            }
        }
    }
    
    .bottombar{
        background: ${colors.background};
        padding: 40px 80px 20px 80px;
        @media ${device.tablet_md}{
            padding: 40px 10px 20px 10px;
        }
   
        display: flex;
        justify-content: space-between;
        a{
            text-decoration: none;    
            color: ${colors.darkblue}    
        }
        label{
            display: flex;
            align-items: center;
            .MuiSvgIcon-root{
                margin-right: 5px;
            }
        }
        .footer__items{
            flex-grow: 0.3;
            display: flex;
            justify-content: space-between;
            @media ${device.mobile_lg}{
                small:first-child{
                    display: none;
                }
                small:nth-child(4){
                    display: none;
                }
            }
        }
    }
`