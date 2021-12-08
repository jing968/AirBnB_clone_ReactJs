import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import noImage from '../Assets/no_image.jpg';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import loading from '../Assets/loading.gif';
import BookingRequest from '../Components/BookingRequest';
import { GlobalVars } from '../Global';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
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
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const Title = styled.label`
  padding-left: 10px;
  margin: auto;
`;

const Info = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 90%;
  margin: auto;
  max-width: 550px;
  max-height: 440px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  overflow-y: auto;
  padding-left: 10px;
  padding-right: 10px;
  &::-webkit-scrollbar{
    width: 0px;
  }
`;

const FieldWrapper = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const Attribute = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
`;

const Value = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
`;

const Bottom = styled.div`
  width: 100%;
  height: 45%;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  border-top: 2px solid #FF385C;
  border-bottom: 2px solid #FF385C;
  color: #FF385C;
`;

const Booking = styled.button`
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

const Comments = styled.div`
  width: 90%;
  margin: auto;
  text-align: center;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
`;

const Helper = styled.div`
  color: grey;
  margin-top: 20px;
`;

const Reviews = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #b4bce0;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  color: rgb(66 58 58 / 87%);
`;

const Loading = styled.img`
  margin: auto;
  margin-top: 15%;
  width: 70px;
  height: 70px;
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const ViewListingProfile = () => {
  const { id } = useParams();
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [details, setDetails] = useState({});
  const [book, setBook] = useState(false);
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.get('http://127.0.0.1:' + port + '/listings/' + id, { headers: headers }).then((res) => {
      setDetails(res.data.listing);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <Container>
      { (book ? <BookingRequest setter={setBook} availability={details.availability} id={id} price={details.price} /> : null) }
      {
        (details !== undefined && details.metadata !== undefined)
          ? <>
          { console.log(details) }
            <Banner>
              <Title>{details.title}</Title>
              <Booking onClick={() => setBook(true) }
                disabled={ authToken === '' }
                style={ (authToken === '') ? { backgroundColor: 'grey', color: 'white' } : {} }
              >
                { (authToken === '') ? 'Sign in to book' : 'Book Now' }
              </Booking>
            </Banner>
            <Info>
              <Image src={(details.thumbnail === '') ? noImage : details.thumbnail}></Image>
              <Details>
                <FieldWrapper>
                  <Attribute>Owner of the property: &nbsp;</Attribute>
                  <Value>{details.owner}</Value>
                </FieldWrapper>
                <FieldWrapper>
                  <Attribute>Price per night: &nbsp;</Attribute>
                  <Value>${details.price}</Value>
                </FieldWrapper>
                <FieldWrapper>
                  <Attribute>Amenities included: &nbsp;</Attribute>
                  <Value>{details.metadata.amenities}</Value>
                </FieldWrapper>
                <FieldWrapper>
                  <Attribute><BedIcon />Beds included: &nbsp;</Attribute>
                  <Value>{details.metadata.bed} </Value>
                </FieldWrapper>
                <FieldWrapper>
                  <Attribute><BathtubIcon />Bathrooms included: &nbsp;</Attribute>
                  <Value>{details.metadata.bath} </Value>
                </FieldWrapper>
                <FieldWrapper>
                  <Attribute><BedroomParentIcon />Master bedrooms included: &nbsp;</Attribute>
                  <Value>{details.metadata.master} </Value>
                </FieldWrapper>
                <FieldWrapper>
                  <Attribute><BedroomChildIcon />Guest bedrooms included: &nbsp;</Attribute>
                  <Value>{details.metadata.guest} </Value>
                </FieldWrapper>
              </Details>
            </Info>
            <Bottom>
              <Comment><Title>Reviews</Title></Comment>
              <Comments>
              {
                (details.reviews.length === 0)
                  ? <Helper>No body commented on this listing yet</Helper>
                  : <> {
                    details.reviews.map(elem => {
                      return (<Reviews key={elem}>{elem}</Reviews>)
                    })}
                  </>
              }
              </Comments>
            </Bottom>
          </>
          : <Loading src={loading} />
      }
    </Container>
  )
}

export default ViewListingProfile;
