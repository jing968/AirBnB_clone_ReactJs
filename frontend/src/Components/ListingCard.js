import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import noImage from '../Assets/no_image.jpg';
import { Link } from 'react-router-dom';
import { GlobalVars } from '../Global';

const Container = styled.div`
  margin: auto;
  margin-bottom: 0px;
  width: 400px;
  height: 160px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border: 1px solid white;
  border-radius: 8px;
  padding: 3px;
  &:hover{
    transform: scale(1.03);
  }
  @media (max-width: 400px) {
    width: 350px;
    height: 150px;
  }
`;

const Thumbnail = styled.div`
  width: 220px;
  height: 100%;
  @media (max-width: 400px) {
    height: 150px;
  }
`;

const Information = styled.div`
  width: calc(100% - 220px);
  height: 165px;
  background-color: rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  color: white;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
  @media (max-width: 400px) {
    height: 150px;
    font-size: 14px;
  }
`;

const InfoField = styled.div`
  padding: 5px;
`;

const ListingCard = ({ details }) => {
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const [email] = context.email;
  const {
    address,
    id,
    price,
    owner,
    thumbnail,
    title
  } = details
  // Prop types
  ListingCard.propTypes = {
    details: PropTypes.object,
    address: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.string,
    owner: PropTypes.string,
    reviews: PropTypes.array,
    thumbnail: PropTypes.string,
    title: PropTypes.string
  };
  // Helper function to check if the listing belongs to the user
  const isOwner = () => {
    // if not signed in
    if (authToken === '') return false;
    // if signed but not owner
    if (owner !== email) return false;
    return true;
  }
  return (
    <Container>
      <Link to={(isOwner()) ? '/listingProfile/' + id : '/view/listingProfile/' + id} style={{ textDecoration: 'none', color: 'black', display: 'flex', width: '100%' }}>
        <Thumbnail>
          <img src={(thumbnail === '') ? noImage : thumbnail} style={{ width: '100%', height: '100%' }}/>
        </Thumbnail>
        <Information>
          <InfoField>{title}</InfoField>
          <InfoField>LOCATED at: {address}</InfoField>
          <InfoField>ID: {id}</InfoField>
          <InfoField>Price per night: ${price}</InfoField>
        </Information>
      </Link>
    </Container>
  )
}

export default ListingCard;
