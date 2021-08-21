import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAUser,
  setProfilePhoto,
  setUserImage,
} from '../redux/actions/userActions'
import { ProfileContainer } from '../styles/ProfileStyle'
import Header from '../components/MainHeader'
import NotLoggedIn from '../components/Utils/NotLoggedIn'
import { IconButton } from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import TabIndex from '../components/Profile/TabIndex'
import Loader from '../components/Loaders/SimpleLoader'
import Wallet from '../components/Utils/Wallet'
import { DropzoneDialog } from 'material-ui-dropzone'
import Meta from '../components/Meta'
import { animateScroll as scroll } from 'react-scroll'

const ProfilePage = () => {
  const [upload, setUpload] = useState({
    open: false,
    files: [],
  })
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNo: '',
    image: '',
    message: '',
  })
  const dispatch = useDispatch()

  const profilePhoto = useSelector((state) => state.profilePhoto)
  const { loading: photoLoading, success, photoUrl } = profilePhoto

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    scroll.scrollToTop()
  }, [])

  useEffect(() => {
    dispatch(setUserImage())
    if (success) {
      dispatch(getAUser(userInfo._id))
    }
  }, [dispatch, userInfo, success])

  const handleFileSave = (files) => {
    setUpload({ files: files, open: false })
    const formData = new FormData()
    formData.append('image', files[0])
    dispatch(setProfilePhoto(userInfo._id, formData))
  }

  return (
    <div>
      <Meta />
      <Header />
      {!userInfo ? (
        <NotLoggedIn />
      ) : (
        <>
          <ProfileContainer>
            <div className="backgroundheader">
              <div className="wallet">
                <Wallet mb={15} />
              </div>
            </div>
            <div className="profileimage">
              {photoLoading ? (
                <Loader />
              ) : (
                <img
                  src={
                    photoUrl
                      ? photoUrl
                      : userInfo.profile && userInfo.profile.picture
                      ? userInfo.profile.picture
                      : 'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg'
                  }
                  alt=""
                />
              )}
              <IconButton className="filebutton">
                <AddAPhotoIcon
                  onClick={() => setUpload({ ...upload, open: true })}
                />
                <DropzoneDialog
                  open={upload.open}
                  filesLimit={1}
                  clearOnUnmount={false}
                  // onChange={(files) => console.log('Files:', files)}
                  onSave={handleFileSave}
                  submitButtonText="Add image"
                  acceptedFiles={['image/jpeg', 'image/png']}
                  showPreviews={true}
                  maxFileSize={60000}
                  onClose={() => setUpload({ ...upload, open: false })}
                />
              </IconButton>
            </div>
            <div></div>

            <>
              <TabIndex values={values} setValues={setValues} />
            </>
          </ProfileContainer>
        </>
      )}
    </div>
  )
}

export default ProfilePage
