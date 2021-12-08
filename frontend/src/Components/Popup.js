import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

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
  max-width: 600px;
  border-radius: 8px;
  border: 2px solid #FF385C;
  background-color: #e5e5e5;
  z-index: 5;
  @media (max-width: 400px) {
    margin-top: 150px;
    width: 250px;
  }
`;

const Banner = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: 25px;
  color: #FF385C;
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

const Close = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Confirm = styled.button`
  width: 75px;
  height: 30px;
  font-size: 17px;
  color: white;
  background-color: #e75d76;
  border-radius: 6px;
  border: none;
  margin-top: auto;
  margin-bottom: 5%;
  opacity: 0.75;
  &:hover{
    opacity: 1;
    transform: scale(1.01);
  }
`;

const Popup = ({ observable, setter, confirm }) => {
  Popup.propTypes = {
    observable: PropTypes.string,
    setter: PropTypes.func,
    confirm: PropTypes.func
  }

  return (
    <Form>
      <Banner>
          <Title>System Message
            <Close><CloseIcon onClick={() => setter('')}/></Close>
          </Title>
        </Banner>
      <div>{observable}</div>
      <Confirm onClick={ () => {
        if (confirm !== undefined) confirm();
        setter('');
      }}>Confirm</Confirm>
    </Form>
  )
}

export default Popup;
