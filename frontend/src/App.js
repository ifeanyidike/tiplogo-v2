import React, { useEffect } from 'react'
import tawkTo from 'tawkto-react'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import AllServicesPage from './pages/AllServicesPage'
import ProfilePage from './pages/ProfilePage'
import CardPage from './pages/CardPage'
import AllCardsPage from './pages/AllCardsPage'
import ChangeOfCourseInstitutionPage from './pages/ChangeOfCourseInstitutionPage'
import EditItem from './pages/EditItemPage'
import PayOrder from './pages/PayOrderPage'
import OLevelUploadPage from './pages/OLevelUploadPage'
import JambPasswordResetPage from './pages/JambPasswordResetPage'
import ActivateAccount from './pages/ActivateAccount'
import ResendEmail from './pages/ResendEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AdminEmailMain from './pages/Admin/Emails/ManageEmails'
import AdminUsers from './pages/Admin/Users/UsersMain'
import AdminCards from './pages/Admin/Cards/CardsMain'
import AdminCardOrders from './pages/Admin/CardOrders/CardOrdersMain'
import AdminChangeOfCourse from './pages/Admin/ChangeOfCourse/ChangeOfCourseMain'
import AdminOLevelUpload from './pages/Admin/OLevelUpload/OLevelUploadMain'
import AdminJambPasswordReset from './pages/Admin/JambPasswordReset/JambPasswordResetMain'
import AdminServiceSettings from './pages/Admin/ServiceSettings/ServiceMain'
import AdminAnnouncementSettings from './pages/Admin/Announcement'
import NotFoundPage from './pages/NotFoundPage'
import UnauthorizedPage from './pages/UnauthorizedPage'
import HelpPage from './pages/HelpPage'
import { Switch, Route } from 'react-router-dom'
// import { AnimatePresence } from "framer-motion"
import SideDrawer from './components/SideDrawer'
import Footer from './components/Footer'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DRAWER_CLOSE } from './redux/constants/utilConstants'
import ScrollButton from './components/ScrollButton'
import { animateScroll as scroll } from 'react-scroll'

function App() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const pathname = location.pathname.split(/\//)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    dispatch({ type: DRAWER_CLOSE })
  }, [dispatch])

  useEffect(() => {
    if (pathname.includes('admin')) {
      if ((userInfo && !userInfo.isAdmin && !userInfo.isEditor) || !userInfo) {
        history.push('/unauthorized')
      }
    }
  }, [pathname, userInfo, history])

  return (
    <>
      <SideDrawer key="sidedrawer" />
      <Switch>
        <Route path="/" exact>
          <HomePage />
          <Footer />
        </Route>
        <Route path="/help">
          <HelpPage />
          <Footer />
        </Route>
        <Route path="/admin/announcement">
          <AdminAnnouncementSettings />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/service-settings">
          <AdminServiceSettings />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/emails">
          <AdminEmailMain />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/jambpasswordreset">
          <AdminJambPasswordReset />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/olevelupload">
          <AdminOLevelUpload />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/changeofcourse">
          <AdminChangeOfCourse />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/cardorders">
          <AdminCardOrders />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/cards">
          <AdminCards />
          <Footer hide={true} />
        </Route>
        <Route path="/admin/users">
          <AdminUsers />
          <Footer hide={true} />
        </Route>
        <Route path="/admin" exact>
          <AdminUsers />
          <Footer hide={true} />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
          <Footer />
        </Route>
        <Route path="/data-correction/change-of-course-institution">
          <ChangeOfCourseInstitutionPage />
          <Footer />
        </Route>
        <Route path="/data-correction/result-upload">
          <OLevelUploadPage />
          <Footer />
        </Route>
        <Route path="/data-correction/jamb-password-reset">
          <JambPasswordResetPage />
          <Footer />
        </Route>
        <Route path="/data-correction">
          <AllServicesPage />
          <Footer />
        </Route>
        <Route path="/profile">
          <ProfilePage />
          <Footer />
        </Route>
        <Route path="/buycards/:id">
          <CardPage />
          <Footer />
        </Route>
        <Route path="/edititem/:item">
          <EditItem />
          <Footer />
        </Route>
        <Route path="/payorder/:item/">
          <PayOrder />
          <Footer />
        </Route>
        <Route path="/auth/activate/:token/">
          <ActivateAccount />
          <Footer />
        </Route>
        <Route path="/auth/forgotpassword/">
          <ForgotPassword />
          <Footer />
        </Route>
        <Route path="/auth/resendemail/">
          <ResendEmail />
          <Footer />
        </Route>
        <Route path="/auth/passwordreset/:token/">
          <ResetPassword />
          <Footer />
        </Route>
        <Route path="/allcards">
          <AllCardsPage />
          <Footer />
        </Route>
        <Route path="/unauthorized">
          <UnauthorizedPage />
          <Footer />
        </Route>
        <Route>
          <NotFoundPage />
          <Footer />
        </Route>
      </Switch>
      <ScrollButton />
    </>
  )
}

export default App
