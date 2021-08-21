import React, { useEffect } from 'react'
import { Image, ScreenDiv, Button } from '../styles/HomeStyle'
import examPerson from '../svg/proctor.svg'
import { buttonVariants } from '../animationVariants/HomeVariants'
import TopCard from './Cards/TopCard'
import { topcard_features } from './JsonAPIs'
import { Link } from 'react-scroll'
import { useDispatch, useSelector } from 'react-redux'
import { getAnnouncement } from '../redux/actions/userActions'

const TopSection = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAnnouncement())
  }, [dispatch])
  const { announcement } = useSelector((state) => state.announcement)
  console.log(announcement)
  return (
    <div className="main-first-content">
      <ScreenDiv>
        {announcement?.info && (
          <marquee direction="right">{announcement.info}</marquee>
        )}

        <div className="content">
          <Image src={examPerson} variant="homeTopVector" alt="with laptop" />
          <div>
            <div className="topcards">
              {topcard_features.map(({ icon, title, bcolor, href }, index) => (
                <TopCard
                  key={index}
                  icon={icon}
                  title={title}
                  bcolor={bcolor}
                  href={href}
                />
              ))}
            </div>
            <h1>CBT Solutions</h1>
            <p>
              Access topnotch CBT solutions including{' '}
              <span>cards, pins & tokens</span>
            </p>
            <p>Join thousands of learners today.</p>
            <Link to="services" smooth={true}>
              <Button
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="onHover"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </ScreenDiv>
    </div>
  )
}

export default TopSection
