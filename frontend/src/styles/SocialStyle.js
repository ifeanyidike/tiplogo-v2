import styled from "styled-components"
import {motion} from "framer-motion"

export const Socials = styled(motion.div)`
    display: flex;
    justify-content: ${props => props.custom || 'space-between'};
    .MuiSvgIcon-root{
        font-size: ${props => props.size || '40px'};
        
    }
    
    .facebook{
        color: #3b5998;        
    };   
    .twitter{
        color: #00acee;
    };
    .youtube{
        color: #FF0000;
    };
    .linkedIn{
        color: #0e76a8;
    };
    .instagram{
        color: #DD2A7B;
    }
`