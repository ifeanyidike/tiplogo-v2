import styled from 'styled-components'
import {motion} from "framer-motion"
import {device, colors} from "./breakpoints"

export const CountContainer = styled(motion.div)`
    span{        
        color: ${colors.white};
        font-size: 3rem;
        font-weight: 700;
    }
`