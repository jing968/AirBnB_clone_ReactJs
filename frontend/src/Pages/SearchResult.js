import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GlobalVars } from '../Global';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import BedIcon from '@mui/icons-material/Bed';
import Slider from '@mui/material/Slider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListingCard from '../Components/ListingCard';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  text-align: center;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  } 
  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`;

const Filter = styled.div`
  width: 310px;
  height: 100%;
  background-color: #FF385C;
  color: white;
  text-align: center;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  } 
  @media (max-width: 400px) {
    height: 300px;
    width: 100%;
  }
`;

const FilterHeading = styled.label`
  margin: auto;
  padding-top: 15px;
  color: white;
  font-size: 22px;
  font-weight: bold;
`;

const FilterOption = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 25px;
`;

const FilterButton = styled.button`
  width: 120px;
  height: 35px;
  margin: 20px 0px auto auto;
  border-radius: 8px;
  border: 1px solid #FF385C;
  background-color: white;
  color: #FF385C;
  font-size: 22px;
  font-weight: bold;
  opacity: 0.8;
  &:hover{
    opacity: 1;
  }
`;

const Display = styled.div`
  width: calc(100% - 310px);
  background-color: #cfbbd8;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const SearchResult = () => {
  const { query } = useParams();
  const context = useContext(GlobalVars);
  const setProfile = context.navProfile[1];
  const setViews = context.navViews[1];
  const [search, setSearch] = useState('');
  const [properties, setProperties] = useState([]);
  const [beds, setBeds] = useState(1);
  const [range, setRange] = useState([200, 400]);
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
      <Filter>
        <FilterHeading><>Filter your search</></FilterHeading>
        <InputBase
          sx={{ ml: 1, width: '75%' }}
          placeholder="Start your search"
          value={query + search}
          inputProps={{
            'aria-label': 'Start your search'
          }}
          onChange={(e) => setSearch(e.target.value)}
          style={{ color: 'white', border: '1px solid white', padding: '5px', borderRadius: '8px', marginTop: '10px', width: '90%' }}
          fullWidth
        />
        <FilterOption>
          <label>Number of beds in the property<br/></label>
          <BedIcon />
          <Slider
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            aria-labelledby="input-slider"
            step={1}
            marks
            min={1}
            max={10}
            style={{ width: '55%', marginLeft: '20px' }}
          />
          <>{beds}</>
        </FilterOption>
        <FilterOption>
          <label>Price range per night<br/></label>
          <AttachMoneyIcon />
          <>{range[0]}</>
          <Slider
            value={range}
            onChange={(e) => setRange(e.target.value)}
            aria-labelledby="input-slider"
            step={10}
            marks
            min={100}
            max={2500}
            style={{ width: '55%', marginLeft: '20px' }}
          />
          <>{range[1]}</>
        </FilterOption>
        <FilterButton>Filter</FilterButton>
      </Filter>
      <Display>
        {
          (properties.length > 0)
            ? properties.map((data) => {
                return (<ListingCard key={data.id} details={data} />)
              })
            : null
        }
      </Display>
    </Container>
  )
}

export default SearchResult;
