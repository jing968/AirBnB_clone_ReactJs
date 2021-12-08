import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { GlobalVars } from '../Global';
import Button from '@mui/material/Button';
import axios from 'axios';
import CommentRequest from '../Components/CommentRequest';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CommentIcon from '@mui/icons-material/Comment';
import CancelIcon from '@mui/icons-material/Cancel';
import Popup from '../Components/Popup';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  background-color: #cfbbd8;
  margin-bottom: 20px;
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

const Body = styled.div`
  height: calc(100% - 50px);
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
`;
const Card = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const BookingCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-top: 15px;
  border-radius: 9px;
  border: 1px solid #3c6da7;
  background-color: #c0d0e2;
`;

const BookingCred = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  column-gap: 20px;
  color: #5e6062;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const BookingResponse = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  margin-top: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Status = styled.label`
  margin: auto;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #be8b2d;
`;

const Helper = styled.div`
  font-size: 22px;
  font-weight: 400px;
  margin: auto;
  margin-top: 25px;
  text-align: center;
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const BookingHistory = () => {
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [email] = context.email;
  const [bookings, setBookings] = useState([]);
  const [comment, setComment] = useState(false);
  const [bookingID, setBookingID] = useState('');
  const [listingID, setListingID] = useState('');
  const [msg, setMsg] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [cancel, setCancel] = useState('');
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    };
    axios.get('http://127.0.0.1:' + port + '/bookings', { headers: headers }).then((res) => {
      setBookings(res.data.bookings);
    }).catch((err) => {
      console.log(err);
    })
  }, [refresh]);
  const handleCancel = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    };
    axios.delete('http://127.0.0.1:' + port + '/bookings/' + bookingID, { headers: headers }).then((res) => {
      setMsg('Booking with ID:' + bookingID + ' is now canceled');
      setRefresh(!refresh);
    }).catch((err) => {
      console.log(err);
      setMsg('Something went wrong, you request to cancel has failed.');
    })
  }
  return (
    <Container>
      { (authToken === '') ? <Redirect to={'/home'}/> : null }
      <Banner>
        <Title>My Bookings</Title>
      </Banner>
      <Body>
      { (cancel !== '') ? <Popup observable={cancel} setter={setCancel} confirm={handleCancel}/> : null }
      { (msg !== '') ? <Popup observable={msg} setter={setMsg}/> : null }
      { (comment ? <CommentRequest setter={setComment} listingID={listingID} bookingID={bookingID}/> : null) }
      {
        bookings.map(elem => {
          if (email === elem.owner) {
            return (
              <BookingCard>
                <BookingCred>
                  <div>Booking ID: {elem.id}</div>
                  <div>Requested by: {elem.onwer}</div>
                  <div>Price: ${elem.totalPrice}</div>
                </BookingCred>
                <Card>
                  <TextField
                    label='Requested Start Date'
                    value={elem.dateRange.start}
                    disabled
                    type='date'
                    style={{ width: '45%', margin: 'auto', marginTop: '15px' }}
                  />
                  <TextField
                    label='Requested End Date'
                    value={elem.dateRange.end}
                    disabled
                    type='date'
                    style={{ width: '45%', margin: 'auto', marginTop: '15px' }}
                  />
                </Card>
                {
                  (elem.status !== 'pending')
                    ? (elem.status === 'accepted')
                        ? <>
                          <Status>Status: Accepted</Status>
                          <BookingResponse>
                            <Button variant="contained" endIcon={<HomeWorkIcon />} color='success'><Link to={'/view/listingProfile/' + elem.listingId } style={{ textDecoration: 'none', color: 'white' }}>Listing Profile</Link></Button>
                            <Button variant="contained" endIcon={<CommentIcon />} onClick={() => {
                              setBookingID(elem.id);
                              setListingID(elem.listingId);
                              setComment(true);
                            }}>Review</Button>
                          </BookingResponse>
                        </>
                        : <>
                          <Status>Status: Rejected</Status>
                          <BookingResponse>
                            <Button variant="contained" endIcon={<HomeWorkIcon />} color='success'><Link to={'/view/listingProfile/' + elem.listingId } style={{ textDecoration: 'none', color: 'white' }}>Listing Profile</Link></Button>
                          </BookingResponse>
                        </>
                    : <>
                      <Status>Status: Pending</Status>
                      <BookingResponse>
                        <Button variant="contained" endIcon={<HomeWorkIcon />} color='success'><Link to={'/view/listingProfile/' + elem.listingId } style={{ textDecoration: 'none', color: 'white' }}>Listing Profile</Link></Button>
                        <Button variant='contained' endIcon={<CancelIcon />} color='error' onClick={() => {
                          setBookingID(elem.id);
                          setCancel('Are you sure you want to cancel this booking?');
                        }}>Cancel Booking</Button>
                      </BookingResponse>
                    </>
                }
              </BookingCard>
            )
          } else return null
        })
      }
     {
        ((bookings.filter(elem => elem.owner === email).length === 0))
          ? <Helper>You have no make any bookings yet </Helper>
          : <br />
      }
      </Body>
    </Container>
  )
}

export default BookingHistory;
