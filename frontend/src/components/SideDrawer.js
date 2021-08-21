import React, { useEffect } from 'react'
import { Backdrop, Drawer, DrawerContent } from "../styles/DrawerStyle"
import { motion, AnimatePresence } from "framer-motion"
import { makeStyles } from '@material-ui/core/styles';
import {
    backdropVariant,
    drawerVariant,
    mainListVariants,
} from "../animationVariants/DrawerVariants"
import SocialNetworks from "../components/SocialNetworks"
import CloseIcon from '@material-ui/icons/Close';
import { Link, useLocation, useHistory } from "react-router-dom"
import { DRAWER_CLOSE } from "../redux/constants/utilConstants"
import { useDispatch, useSelector } from "react-redux"
import { colors } from "../styles/breakpoints"
import { logout } from '../redux/actions/userActions'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

const SideDrawer = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const path = location.pathname

    useEffect(() => {
        dispatch({ type: DRAWER_CLOSE })
    }, [dispatch])

    const drawerToggle = useSelector(state => state.drawerToggle)
    const { drawerState } = drawerToggle

    const animateDrawer = () => {
        const navLinks = document.querySelectorAll("nav ul li.item");
        navLinks.forEach((link, ind) => {
            if (link.style.animation) {
                link.style.animation = ''
            }
        })
    }

    const handleCancelClick = () => {
        animateDrawer()
        dispatch({ type: DRAWER_CLOSE })
    }

    const handleBackDropClose = () => {
        dispatch({ type: DRAWER_CLOSE })
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const photo = useSelector(state => state.photo)
    const { imageUrl } = photo

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/auth')
    }

    const classes = useStyles();


    return (
        <AnimatePresence>
            <>
                {drawerState && (
                    <Backdrop
                        key="backdrop"
                        variants={backdropVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={handleBackDropClose}
                    />
                )}
                <Drawer
                    key="drawer"
                    variants={drawerVariant}
                    initial="hidden"
                    animate="visible"
                    style={{ transform: drawerState ? "translateX(0)" : "translateX(-100%)" }}
                >
                    <DrawerContent>
                        <motion.ul
                            variants={mainListVariants}
                            initial="initial"
                            animate="animate"

                        >
                            <li className="sidedrawer__firstchild">
                                <CloseIcon
                                    fontSize='large'
                                    className='closeIcon'
                                    onClick={handleCancelClick}
                                />
                                {/* <Link to="/">
                                    <SvgIcon />
                                </Link> */}

                                <Link to='/' className="logo">
                                    <img src='/images/pincafes-logo.png' alt='Pin Cafes logo' />
                                </Link>

                                <span>Welcome to Pin Cafes!</span>
                            </li>
                            <Link
                                onClick={() => dispatch({ type: DRAWER_CLOSE })}
                                to='/allcards'
                                className="drawer__link first">
                                <motion.li
                                    style={{
                                        fontWeight: path === '/allcards' && 'bold',
                                        backgroundColor: path === '/allcards' && colors.lightgray
                                    }}
                                    className='item' >
                                    <i className="fas fa-graduation-cap"></i>
                                    <span>Buy Pin</span>
                                </motion.li>
                            </Link>
                            <Link
                                onClick={() => dispatch({ type: DRAWER_CLOSE })}
                                to='/data-correction'
                                className="drawer__link"
                                style={{
                                    fontWeight: path === '/data-correction' && 'bold',
                                    color: path === '/data-correction' && colors.lightred
                                }}
                            >
                                <motion.li className='item' >
                                    <i className="fas fa-cogs"></i>
                                    <span>Data Correction</span>
                                </motion.li>
                            </Link>

                            <Link
                                onClick={() => dispatch({ type: DRAWER_CLOSE })}
                                to='/help'
                                style={{
                                    fontWeight: path === '/help' && 'bold',
                                    color: path === '/help' && colors.lightred
                                }}
                                className="drawer__link">
                                <motion.li className='item' >
                                    <i className="fas fa-file-signature"></i>
                                    <span>Get Help</span>
                                </motion.li>
                            </Link>

                            {
                                userInfo ?
                                    <>
                                        <Link
                                            onClick={logoutHandler}
                                            to='/' className="drawer__link">
                                            <motion.li className='item' >
                                                <i className="fas fa-info-circle"></i>
                                                <span>Logout</span>
                                            </motion.li>
                                        </Link>

                                        <Link
                                            onClick={() => dispatch({ type: DRAWER_CLOSE })}
                                            to="/profile"
                                            style={{
                                                fontWeight: path === '/profile' && 'bold',
                                                color: path === '/profile' && colors.lightred
                                            }}
                                            className="drawer__link">
                                            <motion.li className='item' >
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
                                                <span>Profile</span>
                                            </motion.li>
                                        </Link>

                                    </>
                                    :
                                    <Link
                                        onClick={() => dispatch({ type: DRAWER_CLOSE })}
                                        to='/auth' className="drawer__link">
                                        <motion.li className='item' >
                                            <i className="fas fa-info-circle"></i>
                                            <span>Join</span>
                                        </motion.li>
                                    </Link>
                            }


                            <motion.li>
                                <SocialNetworks />
                            </motion.li>
                        </motion.ul>
                    </DrawerContent>
                </Drawer>
            </>

        </AnimatePresence >
    )
}

export default SideDrawer
