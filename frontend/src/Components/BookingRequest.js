import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { GlobalVars } from '../Global';
import Popup from './Popup';

const Form = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20%;
  width: 500px;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  max-height: 550px;
  border-radius: 8px;
  border: 2px solid #1565c0;
  background-color: #e5e5e5;
  z-index: 5;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
  @media (max-width: 400px) {
    height: 500px;
    width: 390px;
  }
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

const Card = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
`;

const Buttons = styled.div`
  margin: auto;
  margin-top: 30px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  width: 85%;
  justify-content: space-between;
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const BookingRequest = ({ setter, availability, id, price }) => {
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [starterr, setStartErr] = useState(false);
  const [enderr, setEndErr] = useState(false);
  const [stays, setStays] = useState(0);
  const [msg, setMsg] = useState('');
  const [complete, setComplete] = useState(false);
  BookingRequest.propTypes = {
    setter: PropTypes.func,
    availability: PropTypes.array,
    id: PropTypes.string,
    price: PropTypes.string
  };
  // Helper function to check if the given date is within availability range
  const validDate = () => {
    const day = parseInt(start.split('-')[2]);
    const month = parseInt(start.split('-')[1]);
    const year = parseInt(start.split('-')[0]);
    const dday = parseInt(end.split('-')[2]);
    const mmonth = parseInt(end.split('-')[1]);
    const yyear = parseInt(end.split('-')[0]);
    for (let i = 0; i < availability.length; i++) {
      const element = availability[i];
      // Getting key numbers from each availability
      let valid = true;
      const startDay = parseInt(element.start.split('-')[2]);
      const startMonth = parseInt(element.start.split('-')[1]);
      const startYear = parseInt(element.start.split('-')[0]);
      const endDay = parseInt(element.end.split('-')[2]);
      const endMonth = parseInt(element.end.split('-')[1]);
      const endYear = parseInt(element.end.split('-')[0]);
      // check start date within range
      // check if later than start
      if (year === startYear) {
        if (month === startMonth && day < startDay) valid = false;
        else if (month < startMonth) valid = false;
      } else if (year < startYear) valid = false;
      // check if earlier than end
      if (year === endYear) {
        if (month === endMonth && day > endDay) valid = false;
        else if (month > endMonth) valid = false;
      } else if (year > endYear) valid = false;
      // check end date within range
      // check if later than start
      if (yyear === startYear) {
        if (mmonth === startMonth && dday < startDay) valid = false;
        else if (mmonth < startMonth) valid = false;
      } else if (yyear < startYear) valid = false;
      // check if aerlie than end
      if (yyear === endYear) {
        if (mmonth === endMonth && dday > endDay) valid = false;
        else if (mmonth > endMonth) valid = false;
      } else if (yyear > endYear) valid = false;
      if (valid) {
        return true;
      }
    }
    return false;
  }
  const handleBook = () => {
    if (validDate()) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`
      }
      const totalPrice = parseInt(price) * stays;
      axios.post('http://127.0.0.1:' + port + '/bookings/new/' + id, {
        dateRange: {
          start: start,
          end: end
        },
        totalPrice: totalPrice
      }, { headers: headers }).then((res) => {
        setComplete(true);
      }).catch((err) => {
        setMsg('Something went wrong, your booking request failed');
        console.log(err);
      })
    } else {
      setMsg('Your request cannot be fulfilled, please carefullycheck with availability listed above');
    }
  }
  return (
    <Form>
      { (authToken === '') ? <Redirect to={'/home'}/> : null }
      { complete ? <Redirect to={'/bookingHistory'}/> : null }
      { (msg !== '') ? <Popup observable={msg} setter={setMsg} /> : null }
      <Banner><Title>New booking request</Title></Banner>
      { availability.map((slot) => {
        return (
          <Card key={slot.start + '|' + slot.end}>
            <TextField
              label='Available Start Date'
              value={slot.start}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              type='date'
              style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
            />
            <TextField
              label='Available End Date'
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
      <Card>
        <TextField
          label='Your Start Date'
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
          label='Your End Date'
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
            // calculate the number of days if start and end are valid
            if (!(starterr && enderr)) {
              let days = 0;
              if (year - startYear > 1) {
                days += (year - startYear - 1) * 365;
                days += month * 30;
                days += day;
                days += (12 - startMonth) * 30;
                days += (30 - startDay);
              } else if (year - startYear === 1) {
                days += (month - 1) * 30;
                days += day;
                days += (12 - startMonth) * 30;
                days += (30 - startDay);
              } else {
                if (month === startMonth) {
                  days += (day - startDay);
                } else {
                  days += (month - startMonth) * 30;
                  days += (day - startDay);
                }
              }
              setStays(days);
            }
          }}
          error={enderr}
          helperText={ (enderr) ? 'Pleaseinput a valid date' : '' }
          disabled={ start === undefined || starterr }
          type='date'
          style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
        />
      </Card>
      <Buttons>
          <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => setter(false)}>Cnacel</Button>
          <Button variant="contained" endIcon={<SendIcon />} disabled={false} onClick={() => {
            handleBook();
          }}>Post</Button>
      </Buttons>
    </Form>
  )
}

export default BookingRequest;
