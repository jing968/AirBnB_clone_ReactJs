import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { GlobalVars } from '../Global';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Form = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20%;
  width: 30%;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  min-width: 300px;
  max-width: 600px;
  border-radius: 8px;
  border: 2px solid #1565c0;
  background-color: #e5e5e5;
  z-index: 5;
`;

const Banner = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: 25px;
  color: #1565c0;
  background-color: white;
  font-size: 19px;
  font-weight: 500;
  height: 25px;
  justify-content: space-between;
  text-align: center;
`;

const Title = styled.div`
  margin: auto;
`;

const Buttons = styled.div`
  margin: auto;
  margin-top: 30px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-between;
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const CommentRequest = ({ setter, listingID, bookingID }) => {
  const [comment, setComment] = useState('');
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [err, setErr] = useState(false);
  const [complete, setComplete] = useState('');
  CommentRequest.propTypes = {
    setter: PropTypes.func,
    listingID: PropTypes.string,
    bookingID: PropTypes.number
  }
  const handlePost = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    };
    axios.put('http://127.0.0.1:' + port + '/listings/' + listingID + '/review/' + bookingID, {
      review: comment
    }, { headers: headers }).then((res) => {
      setComplete(true);
    }).catch((err) => {
      console.log(err);
      setErr(true);
    })
  }
  return (
    <Form>
      <Banner>
        <Title>New Comment</Title>
      </Banner>
      { complete ? <Redirect to={'/view/listingProfile/' + listingID } /> : null}
      <TextField
          label="content"
          multiline
          rows={4}
          value={comment}
          variant="filled"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          error={err}
          helperText={(err) ? 'Failed to comment, please try again later' : ''}
          fullWidth
        />
      <Buttons>
        <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => setter(false)}>Cnacel</Button>
        <Button variant="contained" endIcon={<SendIcon />} disabled={ (comment === '') } onClick={() => { handlePost() }}>Post</Button>
      </Buttons>
    </Form>
  )
}

export default CommentRequest;
