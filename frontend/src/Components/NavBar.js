import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GlobalVars } from '../Global';
import axios from 'axios';

const Navbar = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(133, 133, 133);
  background-color: white;
`;

const Left = styled.div`
  width: 20%;
  padding-left: 5%;
  color: #FF385C;
  font-size: 35px;
  font-weight: 500;
  margin-top: 15px;  
  @media (max-width: 400px) {
    margin-top: 25px;
    font-size: 22px;
  }
`;

const Middle = styled.div`
  width: 55%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  @media (max-width: 400px) {
    width: 50%;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  align-text: center;
  @media (max-width: 400px) {
    padding-right: 5px;
    width: 25%;
  }
`;

const SearchBar = styled.div`
  width: 90%;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 7px;
  border: 1px solid grey;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
`;

const Profile = styled.button`
  display: flex;
  flex-direction: row;
  height: 50px;
  border-radius: 45px;
  border: 0px solid rgb(248, 248, 248);
  margin-top: 15px;
  margin-left: auto;
  margin-right: 30px;
`;

const Options = styled.div`
  position: absolute;
  margin-top: 55px;
  margin-left: -35px;
  display: flex;
  flex: direction: column;
  border-radius: 5px;
  width: 150px;
  background-color: white;
  border: 1px solid rgb(248, 248, 248);
  display: flex;
  flex-direction: column;
  padidng: 15px;
  @media (max-width: 400px) {
    width: 100px;
  }
`;

const Option = styled.div`
  height: 45px;
  width: 100%;
  font-size: 18px;
  text-align: center;
  &:hover{
    background-color: rgb(248, 248, 248);
  }
  @media (max-width: 400px) {
    font-size: 15px;
  }
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const NavBar = () => {
  const context = useContext(GlobalVars);
  const [authToken, setAuthToken] = context.authtoken;
  const [profile, setProfile] = context.navProfile;
  const [views, setViews] = context.navViews;
  const [hovera, setHovera] = useState(false);
  const [hoverb, setHoverb] = useState(false);
  const [search, setSearch] = useState('');
  const handleLogout = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.post('http://127.0.0.1:' + port + '/user/auth/logout', {}, { headers: headers }).then(
      res => {
        console.log(res);
        setAuthToken('');
      }).catch((err) => { console.log(err) })
  }
  return (
    <Navbar>
        <Left><Link to={'/home'} style={{ textDecoration: 'none' }}>AirBrB</Link></Left>
        <Middle>
          <SearchBar>
            <InputBase
              sx={{ ml: 1, width: '75%' }}
              placeholder="Start your search"
              inputProps={{ 'aria-label': 'Start your search' }}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </SearchBar>
          <Link to={(search === '') ? '/search/!all!' : '/search/' + search }>
            <SearchIcon sx={{ color: 'white', background: '#FF385C', borderRadius: '50%', width: '25px', height: '25px', padding: '14px', marginTop: '10px', marginLeft: '3px' }} />
          </Link>
        </Middle>

        <Right>
          <Profile>
          <MenuIcon
              sx={{ p: '10px' }}
              aria-label="menu"
              onClick={() => { setViews(!views); setProfile(false) } }
              style={ (hovera) ? { borderRadius: '50%', opacity: 0.4, backgroundColor: 'rgb(187 181 181 / 38%)' } : { opacity: 0.8 } }
              onMouseEnter={ () => setHovera(true) }
              onMouseLeave={ () => setHovera(false) }
            />
            <AccountCircleIcon
              id='profile'
              sx={{ p: '10px' }}
              aria-label="account"
              onClick={() => { setProfile(!profile); setViews(false) } }
              style={ (hoverb) ? { borderRadius: '50%', opacity: 0.4, backgroundColor: 'rgb(187 181 181 / 38%)' } : { opacity: 0.8 } }
              onMouseEnter={ () => setHoverb(true) }
              onMouseLeave={ () => setHoverb(false) }
            />
            {
              profile
                ? (authToken === '')
                    ? <Options>
                  <Option onClick={() => setProfile(false)}><Link to={'/auth'} style={{ textDecoration: 'none' }}>Login / Signup</Link></Option>
                </Options>
                    : <Options>
                  <Option onClick={() => setProfile(false)}><Link to={'/bookingHistory'} style={{ textDecoration: 'none' }}>Bookings</Link></Option>
                  <Option id='logout' onClick={() => handleLogout()}><Link to={'/home'} style={{ textDecoration: 'none' }}>Log out</Link></Option>
                </Options>
                : null
            }
            {
              views
                ? <Options>
                <Link to={'/manage'} style={{ textDecoration: 'none' }}><Option>Manage listings</Option></Link>
                <Link to={'/home'} style={{ textDecoration: 'none' }}><Option>Home</Option></Link>
              </Options>
                : null
            }
          </Profile>
        </Right>
    </Navbar>
  )
}

export default NavBar;
