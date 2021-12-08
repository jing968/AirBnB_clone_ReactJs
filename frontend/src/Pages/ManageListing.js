import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ListingCard from '../Components/ListingCard';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { GlobalVars } from '../Global';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  background-color: #cfbbd8;
`;

const Banner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #FF385C;
  color: white;
  font-size: 23px;
  font-weight: bold;
  height: 50px;
  justify-content: space-between;
`;

const Title = styled.label`
  padding-left: 10px;
`;

const Add = styled.button`
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  width: 100px;
  height: 40px;
  margin-right: 15px;
  background-color: white;
  color: #FF385C;
  border-radius: 6px;
  border: 1px solid transparent;
  &:hover{
    font-weight: bold;
    transform: scale(1.02);
  }
`;

const Listings = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
    flex-warp: no-wrap;
  }
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const ManageListing = () => {
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [email] = context.email;
  const setProfile = context.navProfile[1];
  const setViews = context.navViews[1];
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.get('http://127.0.0.1:' + port + '/listings', { headers: headers }).then((res) => {
      setProperties(res.data.listings);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <Container onClick={() => {
      setViews(false);
      setProfile(false);
    }}>
      { (authToken === '') ? <Redirect to={'/auth'} /> : null }
      <Banner>
        <Title>My Listings</Title>
        <Add><Link to={'/newlisting'} style={{ textDecoration: 'none' }}>Add a new property</Link></Add>
      </Banner>
      <Listings>
        {
          (properties.length > 0)
            ? properties.map(data => (
                (data.owner === email)
                  ? <ListingCard key={data.id} details={data}/>
                  : null
              ))
            : null
        }
      </Listings>
    </Container>
  )
}

export default ManageListing;
