import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import axios from 'axios';
import { GlobalVars } from '../Global';
import Popup from '../Components/Popup';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  align-items: center;
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
  padding-left: 15px;
`;

const InputWrapper = styled.div`
  margin: auto;
  margin-top: 15px;
  width: 80%;
`;

const Buttons = styled.div`
  margin: auto;
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;  
  @media (max-width: 400px) {
    padding-bottom: 20px;
  }
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const NewListing = () => {
  const context = React.useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState();
  const [img, setImg] = useState('');
  const [type, setType] = useState('');
  const [bath, setBath] = useState(1);
  const [bed, setBed] = useState(1);
  const [master, setMaster] = useState(1);
  const [guest, setGuest] = useState(1);
  const [amenities, setAmenities] = useState('');
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');
  const [complete, setComplete] = useState(false);
  const handleSubmit = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.post('http://127.0.0.1:' + port + '/listings/new', {
      title: title,
      address: address,
      price: price,
      thumbnail: img,
      metadata: {
        type: type,
        bath: bath,
        bed: bed,
        master: master,
        guest: guest,
        amenities: amenities
      }
    }, { headers: headers }).then(
      (res) => {
        setSuccess('Successfully created new listing, you can view them in your listings now');
        setComplete(true);
      }
    ).catch((err) => {
      console.log(err);
      setErr('Something went wrong, please try again');
    })
  };
  // images conversion
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImg(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    (!complete)
      ? <Container>
          { (authToken === '') ? <Redirect to={'/auth'} /> : null }
          { (success !== '') ? <Popup observable={success} setter={setSuccess} /> : null }
          { (err !== '') ? <Popup observable={err} setter={setErr} /> : null }
          <Banner>
            <Title>Add a new listing</Title>
        </Banner>
        <InputWrapper>
            <TextField
              label="Title of your listing"
              name='title'
              value={title}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              fullWidth
            />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Address of your property"
            name='address'
            value={address}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Price per night ($)"
            name='price'
            value={price}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Type"
            name='type'
            value={type}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setType(e.target.value);
            }}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Number of bathroom"
            name='bath'
            value={bath}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0) setBath(parseInt(e.target.value));
            }}
            type='number'
            defaultValue={1}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Number of beds"
            name='beds'
            value={bed}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0) setBed(parseInt(e.target.value));
            }}
            type='number'
            defaultValue={1}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Number of master bedroom"
            name='master'
            value={master}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0) setMaster(parseInt(e.target.value));
            }}
            type='number'
            defaultValue={1}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Number of guest bedroom"
            name='guest'
            value={guest}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 0) setGuest(parseInt(e.target.value));
            }}
            type='number'
            defaultValue={1}
            required
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Amenities if any"
            name='amenities'
            value={amenities}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setAmenities(e.target.value);
            }}
            fullWidth
          />
        </InputWrapper>

        <InputWrapper>
          <TextField
            label="Thumbnail to display"
            name='thumbnail'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              uploadImage(e);
            }}
            type='file'
            required
            fullWidth
          />
        </InputWrapper>

        <Buttons>
          <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />}>
            <Link to={'/manage'} style={{ textDecoration: 'none', color: '#1976d2' }}>Back</Link>
          </Button>
          <Button variant="contained" endIcon={<AddBusinessIcon />} onClick={ () => { handleSubmit() } }>
            Add
          </Button>
        </Buttons>
      </Container>
      : <Redirect to={'/manage'} />
  )
}

export default NewListing;
