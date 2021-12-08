import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import travel from '../Assets/travel.png';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
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
  width: 80%;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  row-gap: 10px;
  max-width: 950px;
  @media (max-width: 400px) {
    height: 500px;
    width: 350px;
  }
`;

const Left = styled.div`
  width: 30%;
  background-color: #FF385C;
  color: white;
  font-size: 23px;
  text-align: center;
  font-weight: bold;
  height: 100%;
  @media (max-width: 400px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 70%;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  width: 80%;
`;

const Heading = styled.label`
  margin: auto;
  font-size: 20px;
  font-weight: 400;
  @media (max-width: 400px) {
    width: 100%;
    height: 35px;
    color: white;
    background-color: #FF385C;
    margin-top: -20px;
  }
`;

const Buttons = styled.div`
  margin: auto;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
`;

const Auth = styled.label`
  margin: auto;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 20px;
  font-weight: 400;
  &:hover{
    text-decoration: underline;
  }
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const Register = () => {
  const context = useContext(GlobalVars);
  const setProfile = context.navProfile[1];
  const setViews = context.navViews[1];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpw, setConfirmpw] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const handleRegsiter = () => {
    axios.post('http://127.0.0.1:' + port + '/user/auth/register', { email: email, password: password, name: name }).then(
      setMsg('Account successfully created')
    ).catch((err) => {
      console.log(err);
      setMsg('Username or email is already taken');
    })
  }
  return (
    <Container onClick={() => {
      setViews(false);
      setProfile(false);
    }}>
      { (msg !== '') ? <Popup observable={msg} setter={setMsg}/> : null }
      <Form>
        <Left>
            <br />
            <p>Join AirBrb today to get the most of your TRIP or PROPERTY!</p>
            <img src={travel} style={{ maxWidth: '250px', maxHeight: '250px' }}/>
        </Left>
        <Right>
            <Heading>Register for a new account?</Heading>
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
                label="Name"
                name='name'
                onChange={(e) => { setName(e.target.value) } }
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
                InputLabelProps={{
                  shrink: true,
                }}
                type='password'
                required
                fullWidth
            />
            </InputWrapper>

            <InputWrapper>
            <TextField
                label="Confirm Password"
                name='confirmPassword'
                onChange={(e) => { setConfirmpw(e.target.value) } }
                InputLabelProps={{
                  shrink: true,
                }}
                type='password'
                required
                error={ confirmpw !== password }
                fullWidth
                helperText={ (confirmpw !== password) ? 'Password doesn\'t match' : '' }
            />
            </InputWrapper>
            <Auth><Link to={'/auth'} style={{ textDecoration: 'none' }}>Already have an account?</Link></Auth>
            <Buttons>
              <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
                Back
              </Button>
              <Button variant="contained" endIcon={<LoginIcon />} disabled={confirmpw !== password || email === '' || name === '' || password === '' || confirmpw === ''} onClick={ () => { handleRegsiter() } }>
                SignUp
              </Button>
            </Buttons>
        </Right>
      </Form>
    </Container>
  )
}

export default Register;
