import React, {useState} from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import PersonIcon from '@material-ui/icons/Person';
import DraftsIcon from '@material-ui/icons/Drafts';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import {IconButton}  from "@material-ui/core"
import {useSelector, useDispatch} from "react-redux"
import {ProfileButton} from "../../styles/ProfileStyle"
import {updateUser} from "../../redux/actions/userActions"
import MessageModal from "../Utils/MessageModal"


const Edits = ({values, setValues}) => {
    const dispatch = useDispatch()
    const [openPass, setOpenPass] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    
    
    const {userInfo} = useSelector(state => state.userLogin)
    const {loading, success, error} = useSelector(state => state.userUpdate)
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };    
    
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!values.password){
            dispatch(updateUser({
                _id: userInfo._id,
                name: values.name || userInfo.name,                        
                profile:{
                    ...userInfo.profile, 
                    address: values.address || userInfo.address,
                    phoneNo: values.phoneNo || userInfo.phoneNo
                }
            }))  
            if(success || error ){
                setOpenMessage(true)
            }
            
                 
        }else{
            if(values.password === values.confirmPassword){
                dispatch(updateUser({
                    _id: userInfo._id,
                    name: values.name || userInfo.name,                        
                    profile:{
                        ...userInfo.profile, 
                        address: values.address || userInfo.address,
                        phoneNo: values.phoneNo || userInfo.phoneNo
                    },
                    password: values.password
                }))             
                if(success || error ){
                    setOpenMessage(true)
                }
                
            }else{                
                setOpenPass(true)
            }
        }
        
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="contentpane">
                <h2>Basic Info</h2>
                    <FormControl fullWidth  variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            value={values.name}
                            disabled = {userInfo.type !== 'local'}
                            placeholder={userInfo.name}
                            onChange={handleChange('name')}                            
                            startAdornment={
                                <InputAdornment position="start">
                                    <PersonIcon />
                                    </InputAdornment>
                                }
                            labelWidth={45}
                        />
                        </FormControl>                            
                                                    
                        <FormControl fullWidth  variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                value={values.email}
                                onChange={handleChange('email')}
                                disabled
                                placeholder={userInfo.email}                                        
                                startAdornment={
                                    <InputAdornment position="start">
                                    <DraftsIcon />
                                    </InputAdornment>
                                }
                                labelWidth={45}
                            />
                        </FormControl>   
                    </div>
                    <div className="contentpane">
                        <h2>Additional Info</h2>
                        <FormControl fullWidth  variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-phone">Phone No.</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone"
                                value={values.phoneNo}
                                placeholder={userInfo.profile && userInfo.profile.phoneNo}
                                onChange={handleChange('phoneNo')}
                                startAdornment={
                                    <InputAdornment position="start">
                                    <PhoneIcon />
                                    </InputAdornment>
                                }
                                labelWidth={75}
                            />
                        </FormControl>   
                            
                        <FormControl fullWidth  variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-address"
                                value={values.address}
                                placeholder={userInfo.profile && userInfo.profile.address}
                                onChange={handleChange('address')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BusinessIcon />
                                        </InputAdornment>
                                    }
                                labelWidth={60}
                            />
                        </FormControl>
                    </div>
                        
                    {
                        userInfo.type === 'local' &&
                        <div className="contentpane">
                            <h2>Password</h2>
                            
                            <FormControl  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>                              
                                                        
                            <FormControl  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password-confirm">
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-confirm"
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    value={values.confirmPassword}
                                    onChange={handleChange('confirmPassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={135}
                                />
                            </FormControl>                              
                        </div>
                    }
                    <div className="submit">
                        <ProfileButton 
                            disabled = {!Object.values(values).some(x => (x !== null && x !== ''))}
                            type="submit">Submit
                        </ProfileButton>
                    </div>               
                <MessageModal 
                    open={openPass}
                    setOpen={setOpenPass}
                    caption="Mismatched" 
                    message = "Passwords do not match"             
                />
                <MessageModal 
                    open={openMessage}
                    setOpen={setOpenMessage}
                    caption={error ? "Error" : success ? "Successful" : null} 
                    message = {
                     loading ? "Loading" :  
                        error ? error : 
                        success ? "Details updated" : null
                    }             
                />
        </form>        
    )
}

export default Edits
