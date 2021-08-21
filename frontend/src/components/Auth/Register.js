import React, {useState, useEffect} from 'react';
import {Grid, Typography, TextField, IconButton, InputAdornment, Box} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DraftsIcon from '@material-ui/icons/Drafts';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {AuthButton} from "../../styles/AuthStyle"
import {useDispatch, useSelector} from "react-redux"
import {register} from "../../redux/actions/userActions"
import Loader from "../Loaders/SimpleLoader"
import Message from "../../components/Message"
import {useHistory} from "react-router-dom"


export default function Register() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const userRegister = useSelector(state => state.userRegister)
    const{loading, error, result } = userRegister
    
    useEffect(()=>{
    
    }, [history])
    
  
    const [values, setValues] = useState({        
        password: '',        
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
        email: '',
        name: '',
        message: ''                        
    });
    
    const handleSubmit = (e) =>{
      e.preventDefault()
      //Dispatch register
      if(values.password !== values.confirmPassword){
        setValues({...values, message: 'Passwords do not match'})
      }else{
        dispatch(register(
                  values.name, 
                  values.email, 
                  values.password
          ))                 
      }      
    }
    
    
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
    
  return (
    <React.Fragment>
    
      <Box className="register__text" mt={2} mb={4} >      
        <Typography variant="h6" gutterBottom>
            Welcome!
            
          </Typography>
      
        <p>
            SignUp with Pin Cafes to get started
        </p>  
        <p> 
          {values.message && <Message variant="error">{values.message}</Message>}  
             
        </p>
        <p>         
          {
            loading ? <Loader /> :            
            error ? <Message variant="error">{error}</Message>  :
            result && <Message>{result.message}</Message>
          }  
        </p>
        
      </Box>
      
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={3}>        
      
      <Grid item xs={12}>
          <TextField
            required            
            label="Name"
            value={values.name}
            onChange={handleChange('name')}
            fullWidth
            autoComplete="Enter full name"
            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
          />
        </Grid>
                
        <Grid item xs={12}>
          <TextField
            required                
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            fullWidth
            autoComplete="off"
            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DraftsIcon />
                                </InputAdornment>
                            ),
                        }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField   
            required                     
            label="Password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            fullWidth
            autoComplete="Enter password"
            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-key"></i>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField         
            required               
            label="Confirm Password"
            value={values.confirmPassword}
            type={values.showConfirmPassword ? 'text' : 'password'}
            onChange={handleChange('confirmPassword')}
            fullWidth
            autoComplete="Enter password again"
            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-key"></i>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
          />
        </Grid>
        <AuthButton type="submit">Sign Up</AuthButton>
      </Grid>
      </form>
    </React.Fragment>
  );
}