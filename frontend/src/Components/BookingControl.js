import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from 'axios';
import { GlobalVars } from '../Global';
import AvaliabilityCard from './AvaliabilityCard';

const Heading = styled.div`
  width: 100%;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  margin-top: 0;
  color: #3c6da7;
  background-color: orange;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const Helper = styled.div`
  color: #FF385C;
  font-size: 18px;
  font-weight: 400px;
`;

const ChooseAvaliability = styled.div`
  width: 85%;
  height: 37%;
  margin: auto;
  margin-top: 15px;
  border-radius: 9px;
  border: 1px solid grey;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
`;

const IncomingBookings = styled.div`
  border-radius: 9px;
  width: 85%;
  height: 37%;
  margin: auto;
  margin-top: 30px;
  border: 1px solid grey;
  overflow-y: auto;
  margin-bottom: 10px;
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

const Line = styled.div`
  width: 100%;
  height: 2px;
  border-top: 2px dotted #3c6da7;
  margin-top: 15px;
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
    font-size: 17px;
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

const config = require('../config.json');
const port = config.BACKEND_PORT;

const BookingControl = ({ id, published, setPublished, avaliability, setAvaliability }) => {
  BookingControl.propTypes = {
    id: PropTypes.number,
    published: PropTypes.bool,
    setPublished: PropTypes.func,
    avaliability: PropTypes.array,
    setAvaliability: PropTypes.func
  }
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [starterr, setStartErr] = useState(false);
  const [enderr, setEndErr] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
  // Handler for adding avaliability
  const handleAdd = () => {
    const newSlot = {
      start: start,
      end: end
    };
    avaliability.push(newSlot);
    setStart('dd/mm/yyyy');
    setEnd('dd/mm/yyyy');
  }
  // Handler for publishing
  const handlePublish = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.put('http://127.0.0.1:' + port + '/listings/publish/' + id, { availability: avaliability }, { headers: headers }).then((res) => {
      setPublished(true);
    }).catch((err) => {
      console.log(err);
    })
  }
  // Handler for unpublishing
  const handleUnpublish = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.put('http://127.0.0.1:' + port + '/listings/unpublish/' + id, {}, { headers: headers }).then((res) => {
      setPublished(false);
    }).catch((err) => {
      console.log(err);
    })
  }
  // Hanlder for accepting booking
  const handleAccept = (bookingid) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.put('http://127.0.0.1:' + port + '/bookings/accept/' + bookingid, {}, { headers: headers }).then((res) => {
      console.log(res);
      setRefresh(!refresh);
    }).catch((err) => {
      console.log(err);
    })
  }
  // Hanlder for rejecting booking
  const handleDecline = (bookingid) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.put('http://127.0.0.1:' + port + '/bookings/decline/' + bookingid, {}, { headers: headers }).then((res) => {
      console.log(res);
      setRefresh(!refresh);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <ChooseAvaliability>
        <Heading>Manage your avalibility</Heading>
        {
          (published)
            ? <>
              { avaliability.map((slot) => {
                return (
                  <Card key={slot.start + '|' + slot.end}>
                    <TextField
                      label='Start Date'
                      value={slot.start}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled
                      type='date'
                      style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
                    />
                    <TextField
                      label='End Date'
                      value={slot.end}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled
                      type='date'
                      style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
                    />

                  </Card>
                )
              }) }
              <Button variant="contained" color="error" endIcon={<DeleteForeverIcon /> } style={{ textDecoration: 'none', height: '56px', marginTop: '15px', marginBottom: '20px' }} onClick={() => handleUnpublish() }>
                Unpublish this listing
              </Button>
            </>
            : <>
              <Helper>
                  <div>{'You havn\'t publish this listing'}</div>
                  <div>Add avaliability to publish your listing today!</div>
              </Helper>
              { avaliability.map((slot) => {
                return (
                  <AvaliabilityCard key={slot.start + '|' + slot.end} start={slot.start} end={slot.end} avaliability={avaliability} setAvaliability={setAvaliability} />
                )
              }) }
              <Line />
              <Card>
                <TextField
                  label='New Start Date'
                  name='startDate'
                  value={start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    const today = new Date();
                    const curYear = today.getFullYear();
                    const curMonth = today.getMonth() + 1;
                    const curDay = today.getDate();
                    const input = e.target.value.split('-');
                    const year = parseInt(input[0]);
                    const month = parseInt(input[1]);
                    const day = parseInt(input[2]);
                    if (year === curYear) {
                      if (month === curMonth && day >= curDay) {
                        if (starterr) setStartErr(false);
                        setStart(e.target.value);
                      } else if (month > curMonth) {
                        if (starterr) setStartErr(false);
                        setStart(e.target.value);
                      } else {
                        setStartErr(true);
                      }
                    } else if (year > curYear) {
                      if (starterr) setStartErr(false);
                      setStart(e.target.value);
                    } else {
                      setStartErr(true);
                    }
                    setStart(e.target.value);
                  }}
                  error={starterr}
                  helperText={ (starterr) ? 'Please input a valid date' : '' }
                  type='date'
                  style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
                />
                <TextField
                  label='New End Date'
                  name='endDate'
                  value={end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    const startDate = start.split('-');
                    const startYear = parseInt(startDate[0]);
                    const startMonth = parseInt(startDate[1]);
                    const startDay = parseInt(startDate[2]);
                    const input = e.target.value.split('-');
                    const year = parseInt(input[0]);
                    const month = parseInt(input[1]);
                    const day = parseInt(input[2]);
                    if (year === startYear) {
                      if (month === startMonth && day >= startDay) {
                        if (enderr) setEndErr(false);
                        setEnd(e.target.value);
                      } else if (month > startMonth) {
                        if (enderr) setEndErr(false);
                        setEnd(e.target.value);
                      } else {
                        setEndErr(true);
                      }
                    } else if (year > startYear) {
                      if (enderr) setEndErr(false);
                      setEnd(e.target.value);
                    } else {
                      setEndErr(true);
                    }
                    setEnd(e.target.value);
                  }}
                  error={enderr}
                  helperText={ (enderr) ? 'Pleaseinput a valid date' : '' }
                  disabled={ start === undefined || starterr }
                  type='date'
                  style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
                />
                <Button variant="outlined" endIcon={<AddBoxIcon /> } disabled={ (start === undefined) || (end === undefined) || starterr || enderr } style={{ textDecoration: 'none', height: '56px', marginTop: '15px' }} onClick={() => handleAdd() }>
                    Add
                </Button>
              </Card>
              <Button variant="contained" color="success" endIcon={<ArrowUpwardIcon /> } style={{ textDecoration: 'none', height: '56px', marginTop: '15px', marginBottom: '15px' }} onClick={() => handlePublish() }>
                Publish Now
              </Button>
            </>
        }
      </ChooseAvaliability>
      <IncomingBookings>
        <Heading>Your incoming reservations</Heading>
        {
          bookings.length === 0
            ? <>You do not have any booking request for this listing</>
            : <>
              {
                bookings.map(elem => {
                  if (parseInt(elem.listingId) === id) {
                    return (
                      <BookingCard>
                        <BookingCred>
                          <div>Booking ID: {elem.id}</div>
                          <div>Requested by: {elem.owner}</div>
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
                          (elem.status === 'pending')
                            ? <BookingResponse>
                              <Button variant="contained" color='error' onClick={() => handleDecline(elem.id) }>Decline</Button>
                              <Button variant="contained" onClick={() => handleAccept(elem.id) }>Accept</Button>
                            </BookingResponse>
                            : <Status>Status: {elem.status}</Status>
                        }
                      </BookingCard>
                    )
                  } else return null
                })
              }
          </>
        }
      </IncomingBookings>
    </>
  )
}

export default BookingControl;
