import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { GlobalVars } from '../Global';
import Popup from '../Components/Popup';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  background-color: black;
`;

const Form = styled.div`
  margin: auto;
  margin-top: 180px;
  width: 50%;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  max-width: 600px;
  @media (max-width: 400px) {
    height: 450px;
    width: 350px;
  }
`;

const Banner = styled.div`
  width: 100%;
  background-color: #FF385C;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white;
  font-size: 23px;
  text-align: center;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  margin-top: 20px;
  width: 80%;
`;

const Buttons = styled.div`
  margin-top: auto;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
`;

const Heading = styled.label`
  font-size: 20px;
  font-weight: 400;
`;

const Register = styled.label`
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 25px;
  font-size: 20px;
  font-weight: 400;
  &:hover{
    text-decoration: underline;
  }
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const Auth = () => {
  const context = useContext(GlobalVars);
  const [authToken, setAuthToken] = context.authtoken;
  const setLoggedinEmai = context.email[1];
  const setProfile = context.navProfile[1];
  const setViews = context.navViews[1];
  const [err, setErr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleAuth = () => {
    axios.post('http://127.0.0.1:' + port + '/user/auth/login', { email: email, password: password }).then(
      (res) => {
        if (res.status === 200) {
          setAuthToken(res.data.token);
          setLoggedinEmai(email);
          return <Redirect to={'/manage'} />
        }
      }
    ).catch((err) => {
      console.log(err);
      setErr('Incorrect email or password');
    })
  }
  return (
    <>
      {
        (authToken === '')
          ? <Container onClick={() => {
            setViews(false);
            setProfile(false);
          }}>
            { (err !== '') ? <Popup observable={err} setter={setErr}/> : null }
            <Form>
              <Banner>Welcome to AirBrB</Banner>
              <Heading>Already have an account?</Heading>
              <InputWrapper>
                <TextField
                  label="Email"
                  name='email'
                  onChange={(e) => { setEmail(e.target.value) } }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  fullWidth
                />
              </InputWrapper>

              <InputWrapper>
                <TextField
                  label="Password"
                  name='password'
                  onChange={(e) => { setPassword(e.target.value) } }
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  fullWidth
                />
              </InputWrapper>

              <Register><Link to={'/register'} style={{ textDecoration: 'none' }}>Don&apos;t have an account? Register Today!</Link></Register>
              <Buttons>
                <Button variant="outlined" startIcon={<HomeIcon />}>
                  <Link to={'/'} style={{ textDecoration: 'none' }}>Home</Link>
                </Button>
                <Button variant="contained" endIcon={<LoginIcon />} onClick={ () => { handleAuth() } }>
                  Login
                </Button>
              </Buttons>
            </Form>
          </Container>
          : <Redirect to={'/manage'} />
      }
    </>
  )
}

export default Auth;
