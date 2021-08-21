import React, { useEffect } from 'react'
import { Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Header, HeaderRightItems, Hamburger } from "../styles/HeaderStyle"
import {
    headerRightVariants,
    headerTextVariants,
    hamburgerVariants,
    hamburgerItemsVariants
} from "../animationVariants/HeaderVariants"
import { motion } from "framer-motion"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/actions/userActions"
import { DRAWER_OPEN } from "../redux/constants/utilConstants"
import { setUserImage } from "../redux/actions/userActions"

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const MainHeader = ({ setShowDrawer }) => {
    const classes = useStyles();
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()


    const path = location.pathname

    const photo = useSelector(state => state.photo)
    const { imageUrl } = photo

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch(setUserImage())
    }, [dispatch])

    const animateDrawer = () => {
        const navLinks = document.querySelectorAll("nav ul li.item");
        navLinks.forEach((link, ind) => {
            link.style.animation = `navlinkfade 1s ease forwards ${ind / 2 + 0.8}s`
        })
    }
    const handleHamburgerClick = () => {
        animateDrawer()
        dispatch({ type: DRAWER_OPEN })
    }
    const logoutHandler = () => {
        dispatch(logout())
        history.push('/auth')
    }


    return (
        <>

            <Header>
                <Hamburger
                    variants={hamburgerVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="onHover"
                    onClick={handleHamburgerClick}
                >
                    <motion.div variants={hamburgerItemsVariants} className="line1"></motion.div>
                    <motion.div variants={hamburgerItemsVariants} className="line2"></motion.div>
                    <motion.div variants={hamburgerItemsVariants} className="line3"></motion.div>
                </Hamburger>
                {/* <SvgIcon /> */}
                <Link to='/' className="logo">
                    <img src='/images/pincafes-logo.png' alt='Pin Cafes logo' />
                </Link>
                <HeaderRightItems variants={headerRightVariants} initial="hidden" animate="visible">
                    <ul>
                        {/* <motion.li
                            variants={headerTextVariants}
                            initial="initial"
                            whileHover="onHover"
                        >
                            <Link
                                to="/"
                                style={{ fontWeight: path === '/' && 'bold' }}>
                                About
                        </Link>
                        </motion.li> */}
                        <motion.li
                            variants={headerTextVariants}
                            initial="initial"
                            whileHover="onHover"
                        >
                            <Link
                                to="/allcards"
                                style={{ fontWeight: path === '/allcards' && 'bold' }}
                            >
                                Buy Pin
                        </Link>
                        </motion.li>
                        <motion.li
                            variants={headerTextVariants}
                            initial="initial"
                            whileHover="onHover"
                        >
                            <Link
                                to="/data-correction"
                                style={{ fontWeight: path === '/data-correction' && 'bold' }}
                            >
                                Data Correction
                        </Link>
                        </motion.li>
                        <motion.li
                            variants={headerTextVariants}
                            initial="initial"
                            whileHover="onHover"
                        >
                            <Link
                                to="/help"
                                style={{ fontWeight: path === '/help' && 'bold' }}
                            >Get Help</Link>
                        </motion.li>
                        <motion.li
                            variants={headerTextVariants}
                            initial="initial"
                            whileHover="onHover"
                        >

                            {userInfo ?
                                (
                                    <Link
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </Link>
                                )
                                :
                                (
                                    <Link
                                        to="/auth"
                                        style={{ fontWeight: path === '/join' && 'bold' }}
                                    >
                                        Join
                                    </Link>
                                )

                            }

                        </motion.li>


                        {userInfo && (
                            <>

                                {
                                    (userInfo.isAdmin || userInfo.isEditor) &&
                                    <motion.li
                                        variants={headerTextVariants}
                                        initial="initial"
                                        whileHover="onHover"
                                    >
                                        <Link
                                            to="/admin"
                                            style={{ fontWeight: path === '/admin' && 'bold' }}
                                        >
                                            Admin Page
                                </Link>
                                    </motion.li>
                                }

                                <motion.li
                                    variants={headerTextVariants}
                                    initial="initial"
                                    whileHover="onHover"
                                >
                                    <Link
                                        to="/profile"
                                        style={{ fontWeight: path === '/profile' && 'bold' }}
                                    >
                                        <Avatar
                                            className={classes.small}
                                            src={
                                                imageUrl ? imageUrl :
                                                    userInfo.profile && userInfo.profile.picture ?
                                                        userInfo.profile.picture
                                                        :
                                                        '/images/default-avatar.jpg'
                                            }
                                        />
                                    </Link>
                                </motion.li>
                            </>
                        )}
                    </ul>
                </HeaderRightItems>
            </Header>
        </>
    )
}

export default MainHeader
