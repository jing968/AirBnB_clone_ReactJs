import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Card = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
`;

const AvaliabilityCard = ({ start, end, avaliability, setAvaliability }) => {
  AvaliabilityCard.propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    avaliability: PropTypes.array,
    setAvaliability: PropTypes.func
  }
  // Handle for removing avaliability
  const handleRemove = () => {
    const target = {
      start: start,
      end: end
    };
    const modAvaliability = avaliability.filter(slot => (slot.start !== target.start && slot.end !== target.end));
    setAvaliability(modAvaliability);
  }

  return (
    <Card>
      <TextField
        label='Start Date'
        value={start}
        InputLabelProps={{
          shrink: true,
        }}
        disabled
        type='date'
        style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
      />
      <TextField
        label='End Date'
        value={end}
        InputLabelProps={{
          shrink: true,
        }}
        disabled
        type='date'
        style={{ width: '40%', margin: 'auto', marginTop: '15px' }}
      />
      <Button variant="contained" color="error" endIcon={<DeleteForeverIcon /> } style={{ textDecoration: 'none', height: '56px', marginTop: '15px' }} onClick={() => handleRemove() }>
        Remove
      </Button>
    </Card>
  )
}

export default AvaliabilityCard;
