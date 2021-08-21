import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, IconButton, InputAdornment, Box } from '@material-ui/core';
import DraftsIcon from '@material-ui/icons/Drafts';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { AuthButton } from "../../styles/AuthStyle"
// import {FacebookButton} from "../../styles/AuthStyle"
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookButton from "./Facebook"
import Loader from "../Loaders/SimpleLoader"
import Message from "../../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/userActions"
import { useHistory, Link } from "react-router-dom"

const ConfirmLink = () => (
  <div>
    <span>You should first confirm your email </span>
    <Link to="/auth/resendemail">Resend Code</Link>
  </div>
)

export default function SignIn() {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    email: '',
    message: ''
  });

  const history = useHistory()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login(values.email, values.password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push("/")
    }
  }, [history, userInfo])


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };




  return (
    <React.Fragment>

      <Box className="register__text" mt={2} mb={4} >
        {loading && <Loader />}
        <Typography variant="h6" gutterBottom>
          Welcome back!
          </Typography>

        <p>
          Signin to get started
            {values.message && <Message variant="info">{values.message}</Message>}
          {error && <Message variant="error">
            {error.includes('not confirmed') ?
              <ConfirmLink />
              : error}
          </Message>}

        </p>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              required
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              fullWidth
              autoComplete="email"
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
            <div style={{ width: '100%', textAlign: 'right' }}>
              <Link
                to="/auth/forgotpassword"
                style={{ textDecoration: 'none' }}>
                <small>
                  Forgot password?
              </small>
              </Link>
            </div>

          </Grid>

          <div className="actioncontainer">
            <AuthButton>Sign In</AuthButton>

            <FacebookButton>
              <FacebookIcon /> <span>Signin with Facebook</span>
            </FacebookButton>
          </div>

        </Grid>
      </form>

    </React.Fragment>
  );
}