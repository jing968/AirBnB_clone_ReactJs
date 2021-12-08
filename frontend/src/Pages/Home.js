import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ListingCard from '../Components/ListingCard';
import home from '../Assets/home6.png';
import smallhome from '../Assets/home4.png';
import { GlobalVars } from '../Global';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
`;

const Listings = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  background-color: #FF385C;
  width: 100%;
  height: calc(100% - 460px);
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
  @media (max-width: 400px) {
    height: calc(100% - 300px);
    width: 100%;
  }
`;

const Slogan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 460px;
  background-color: transparent;
  color: white;
  font-size: 35px;
  text-align: center;
  background-image: url(${home});
  @media (max-width: 400px) {
    height: 300px;
    background-image: url(${smallhome});
    width: 100%;
  }
`;

const Quote = styled.div`
  margin-auto;
  font-size: 45px;
  font-style: italic;
  font-weight: bolder;
  color: #FF385C;
`;

const Heading = styled.div`
  text-align: center;
  width: 100%;
  background-color: #FF385C;
  margin-top: 0px;
  margin-bottom: 0px;
  color: white;
  font-size: 22px;
  font-weight: bold;
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const Home = () => {
  const context = useContext(GlobalVars);
  const setProfile = context.navProfile[1];
  const setViews = context.navViews[1];
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState(false);
  // Load all properties on render
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.get('http://127.0.0.1:' + port + '/listings', { headers: headers }).then((res) => {
      setProperties(res.data.listings);
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  // Filter out unpublished listings
  const check = () => {
    if (filtered) return;
    properties.forEach(data => {
      axios.get('http://127.0.0.1:' + port + '/listings/' + data.id).then((res) => {
        if (!res.data.listing.published) {
          const temp = properties.filter(elem => elem.id !== data.id);
          setProperties(temp);
          setFiltered(true);
        }
      }).catch((err) => {
        console.log(err);
      })
    })
  }
  return (
    <Container onClick={() => {
      setViews(false);
      setProfile(false);
    }}>
      { check() }
      <Slogan>
        <Quote><br/>Spend LESS AND Experience MORE </Quote>
        <Quote>at ANYWHERE with AirBrB</Quote>
      </Slogan>
      <Heading>Popular among our users</Heading>
      <Listings>
        {
          (properties.length > 0)
            ? properties.map((data) => {
                return (<ListingCard key={data.id} details={data} />)
              })
            : null
        }
      </Listings>
    </Container>
  )
}

export default Home;
