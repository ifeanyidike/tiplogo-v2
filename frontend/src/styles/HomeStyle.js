import styled from 'styled-components'
import { motion } from 'framer-motion'
import { device, colors } from './breakpoints'
import { TestimonialContainer } from './TestimonialStyle'

export const HomeTopContainer = styled.div`
  background: ${colors.background};
  height: fit-content;
  position: relative;
  .wavebottom {
    position: absolute;
    width: 100%;
    transform: rotateX(180deg);
    transform: rotateZ(180deg);
    background: ${colors.white};
  }
`

export const HomeTabContainer = styled.div`
  background: rgb(254, 254, 254);
  background: linear-gradient(
    180deg,
    rgba(254, 254, 254, 1) 12%,
    rgba(253, 254, 254, 1) 27%,
    rgba(253, 253, 253, 1) 41%,
    rgba(248, 248, 250, 1) 57%,
    rgba(245, 246, 248, 1) 70%,
    rgba(244, 245, 247, 1) 83%
  );
  height: fit-content;
  padding: 120px 80px 40px 80px;
  @media ${device.mobile_lg} {
    padding: 40px;
  }
`

export const HomeAltCardContainer = styled.div`
  background: ${colors.background};
  padding: 40px 80px;

  @media ${device.mobile_lg} {
    padding: 40px;
  }

  h2 {
    font-family: 'Aclonica', sans-serif;
    font-weight: 100;
    margin-top: 80px;
    font-size: 2rem;
    color: ${colors.darktext};
  }
  .top__paragraph {
    font-family: 'Jost', sans-serif;
    margin-top: 20px;
    width: 50vw;
    font-weight: 300;
  }

  .card__container {
    height: fit-content;
    margin-top: 30px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    @media ${device.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
    @media ${device.mobile_lg} {
      grid-template-columns: 1fr;
    }
  }
`

export const HomeCardContainer = styled.div`
  background: ${colors.background};
  height: fit-content;
  padding: 50px 0;
  .card__container {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
  }

  @media ${device.laptop} {
    .card__container {
      width: 90%;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media ${device.tablet} {
    .card__container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media ${device.mobile_lg} {
    .card__container {
      grid-template-columns: 1fr;
    }
  }
`

export const HomeCounterContainer = styled.div`
  font-family: 'Exo 2', sans-serif;
  background: ${colors.darkgray};
  height: fit-content;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-center: center;

  .counter__pane {
    margin: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      color: ${colors.background};
      font-size: 2rem;
    }
    p {
      color: ${colors.white};
      text-align: center;
    }
  }
`
export const HomeTestimonialContainer = styled(TestimonialContainer)`
  padding: 40px 80px;
  @media ${device.mobile_lg} {
    padding: 40px;
  }
  .testimonial__content {
    h2 {
      font-family: 'Aclonica', sans-serif;
      color: ${colors.darkblue};
    }
    p {
      font-family: 'Jost', sans-serif;
      margin: 20px 0 50px 0;
    }

    padding: 80px 0;
  }
`

export const ScreenDiv = styled.div`
  marquee {
    font-family: 'Jost', sans-serif;
    color: ${colors.darktext};
  }
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 50px;
    a {
      text-decoration: none;
    }

    div {
      .topcards {
        display: flex;
        @media ${device.tablet_md} {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }

      h1 {
        font-family: 'Aclonica', sans-serif;
        font-weight: 400;
        font-size: 3rem;
        line-height: 60px;
        color: ${colors.darktext};
        margin-top: 30px;
      }
      p {
        font-family: 'Jost', sans-serif;
        font-size: 1.3rem;
        line-height: 30px;
        color: ${colors.darktext};
        span {
          color: ${colors.darkred};
          font-weight: bold;
        }
        @media ${device.mobile_sm} {
          width: 70%;
          margin: 0 auto;
        }
      }
    }

    @media ${device.tablet} {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 0;
      text-align: center;

      div {
        margin: 10px 20px;
      }
      div h1 {
        font-size: 2.5rem;
        line-height: 35px;
        margin-bottom: 10px;
      }
      div p {
        font-size: 1rem;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }

    @media ${device.mobile_lg} {
      div h1 {
        font-size: 2rem;
      }
      div p {
        font-size: 0.89rem;
      }
    }
  }
`

export const Image = styled.img`
  width: ${(props) =>
    props.width || (props.variant === 'homeTopVector' && '500px') || '500px'};
  height: ${(props) =>
    props.height || (props.variant === 'homeTopVector' && '500px') || '500px'};

  margin: ${(props) => props.variant === 'homeTopVector' && '50px 80px'};

  @media ${device.tablet} {
    width: ${(props) =>
      (props.variant === 'homeTopVector' && '450px') || '400px'};
    height: ${(props) =>
      (props.variant === 'homeTopVector' && '350px') || '250px'};
    margin: ${(props) => props.variant === 'homeTopVector' && '20px auto'};
  }
  @media ${device.mobile_lg} {
    width: ${(props) =>
      (props.variant === 'homeTopVector' && '300px') || '300px'};
    height: ${(props) =>
      (props.variant === 'homeTopVector' && '250px') || '250px'};
    margin: ${(props) => props.variant === 'homeTopVector' && '20px auto'};
  }
`

export const Button = styled(motion.button)`
  background: ${colors.darkred};
  color: white;
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  margin: 1rem auto;
  padding: 0.8rem 1rem;
  border: 2px solid ${colors.darkred};
  border-radius: 3px;
  width: 200px;
  justify-self: center;
  align-self: center;
  cursor: pointer;
`
