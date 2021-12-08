import React, { useContext, useState, useEffect } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalVars } from '../Global';
import styled from 'styled-components';
import noImage from '../Assets/no_image.jpg';
import loading from '../Assets/loading.gif';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BookingControl from '../Components/BookingControl';
import Popup from '../Components/Popup';

const Container = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  text-align: center;
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
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const Delete = styled.button`
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

const Title = styled.label`
  padding-left: 10px;
`;

const Image = styled.img`
  width: 85%;
  height: 45%;
  max-width: 600px;
`;

const Details = styled.div`
  row-gap: 10px;
  width: 100%;
`;

const NumberFields = styled.div`
  display: flex;
  width: 95%;
  margin: auto;
  flex-direction: row;
  column-gap: 20px;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Edit = styled.div`
  position: absolute;
  left: 30px;
  height: 50px;
  width: 100px;
  color: white;
  font-weight: bold;
  background-color: black;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  font-size: 19px;
  z-index: 2;
`;

const Booking = styled.div`
  position: absolute;
  left: 130px;
  height: 50px;
  width: 100px;
  font-weight: bold;
  color: #3c6da7;
  background-color: orange;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  font-size: 19px;
  z-index: 2;
`;

const Info = styled.div`
  position: absolute;
  color: #a755c9;
  left: 230px;
  height: 50px;
  width: 100px;
  font-weight: bold;
  background-color: pink;
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  font-size: 19px;
  z-index: 2;
`;

const Publish = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  left: 85%;
  font-size: 30px;
  font-weight: bold;
  align-items: center;
`;

const ReviewTitle = styled.div`
  margin: auto;
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const ReviewContainer = styled.div`
  border-radius: 9px;
  width: 85%;
  height: 56%;
  margin: auto;
  margin-top: 20px;
  border: 5px solid pink;
  background-color: #cfbbd8;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
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

const Helper = styled.div`
  color: grey;
  margin-top: 20px;
`;

const OtherInfo = styled.div`
  border-radius: 9px;
  text-align: left;
  padding: 10px;
  width: 85%;
  height: 15%;
  margin: auto;
  margin-top: 110px;
  border: 5px solid pink;
  font-size: 18px;
  background-color: #cfbbd8;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 0px;
  }
`;

const Reviews = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 20px;
  border-radius: 8px;
  border: 2px solid white;
  padding: 10px;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const Loading = styled.img`
  margin-top: 15%;
`;

const config = require('../config.json');
const port = config.BACKEND_PORT;

const ListingProfile = () => {
  const { id } = useParams();
  const context = useContext(GlobalVars);
  const [authToken] = context.authtoken;
  const setProfile = context.navProfile[1];
  const setViews = context.navViews[1];
  const [update, setUpdate] = useState('');
  const [remove, setRemove] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState();
  const [img, setImg] = useState('');
  const [type, setType] = useState('');
  const [bath, setBath] = useState(0);
  const [bed, setBed] = useState(0);
  const [master, setMaster] = useState(0);
  const [guest, setGuest] = useState(0);
  const [amenities, setAmenities] = useState('');
  const [published, setPublished] = useState(false);
  const [avaliability, setAvaliability] = useState([]);
  const [review, setReview] = useState([]);
  const [details, setDetails] = useState({});
  const [option, setOption] = useState(1);
  const [same, setSame] = useState(true);
  const [profit, setProfit] = useState(0);
  const [complete, setComplete] = useState(false);
  const [msg, setMsg] = useState('');
  // Fetch data from backend on render and change when user is changed
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    }
    axios.get('http://127.0.0.1:' + port + '/listings/' + id, { headers: headers }).then((res) => {
      setDetails(res.data.listing);
      setTitle(res.data.listing.title);
      setAddress(res.data.listing.address);
      setPrice(res.data.listing.price);
      setImg(res.data.listing.thumbnail);
      setType(res.data.listing.metadata.type);
      setBath(res.data.listing.metadata.bath);
      setBed(res.data.listing.metadata.bed);
      setMaster(res.data.listing.metadata.master);
      setGuest(res.data.listing.metadata.guest);
      setAmenities(res.data.listing.metadata.amenities);
      setPublished(res.data.listing.published);
      setAvaliability(res.data.listing.availability);
      setReview(res.data.listing.reviews);
      setSame(true);
    }).catch((err) => {
      console.log(err);
    })
  }, [authToken, published])
  // Helper function to days and profit
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    };
    axios.get('http://127.0.0.1:' + port + '/bookings', { headers: headers }).then((res) => {
      res.data.bookings.forEach(elem => {
        if (elem.listingId === id && elem.status === 'accepted') {
          setProfit(parseInt(price) + parseInt(elem.totalPrice));
        }
      });
    }).catch((err) => {
      console.log(err);
    })
  }, []);
  // Handler for updating listing details
  const handleUpdate = () => {
    // define headers
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    };
    // define object
    axios.put('http://127.0.0.1:' + port + '/listings/' + id, {
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
    }, { headers: headers }).then((res) => {
      setSame(true);
      setDetails({
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
      })
      setMsg('Successfully updated')
    }).catch((err) => {
      console.log(err);
      setMsg('Something went wrong, updated failed')
    })
  }
  // Handler for deleting listing
  const handleDelete = () => {
    // define headers
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    };
    axios.delete('http://127.0.0.1:' + port + '/listings/' + id, { headers: headers }).then((res) => {
      setComplete(true);
    }).catch((err) => {
      console.log(err);
      setMsg('Something went wrong, delete failed')
    })
  }
  // image conversion
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
    <>
      {
        (authToken !== '')
          ? <Container onClick={() => {
            setViews(false);
            setProfile(false);
          }}>
              { (complete) ? <Redirect to={'/manage'}/> : null }
              {
                (details !== undefined)
                  ? <>
                      { (msg !== '') ? <Popup observable={msg} setter={setMsg} /> : null }
                      { (update !== '') ? <Popup observable={update} setter={setUpdate} confirm={handleUpdate} /> : null }
                      { (remove !== '') ? <Popup observable={remove} setter={setRemove} confirm={handleDelete} /> : null }
                      <Banner>
                        <Title>Profile for listing with ID - {id}</Title>
                        <Delete onClick={() => setRemove('Are you sure you wanto to delete this listing?') }>Delete this listing</Delete>
                      </Banner>
                      <Edit style={(option === 1) ? { height: '70px', width: '110px', zIndex: '3', opacity: '0.9' } : { opacity: '0.5' }} onClick={() => setOption(1)}>Edit</Edit>
                      <Booking id='booking' style={(option === 2) ? { height: '70px', width: '110px', zIndex: '3', opacity: '0.7' } : { opacity: '0.5' }} onClick={() => setOption(2)}>Bookings</Booking>
                      <Info style={(option === 3) ? { height: '70px', width: '110px', zIndex: '3', opacity: '0.8' } : { opacity: '0.5' }} onClick={() => setOption(3)}>Other Info</Info>
                      {
                        (option === 1)
                          ? <>
                          <Image src={ img === '' ? noImage : img }></Image>
                          <Details>
                            <TextField
                              label="Title of your listing"
                              name='title'
                              value={title}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                if (e.target.value !== details.title) {
                                  setSame(false);
                                } else setSame(true);
                                setTitle(e.target.value);
                              }}
                              required
                              style={{ width: '95%', margin: 'auto', marginTop: '15px' }}
                            />
                            <TextField
                              label="Address of your listing"
                              value={address}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                if (e.target.value !== details.address) {
                                  setSame(false);
                                } else setSame(true);
                                setAddress(e.target.value);
                              }}
                              required
                              style={{ width: '95%', margin: 'auto', marginTop: '15px' }}
                            />
                            <TextField
                              label="Price of your listing"
                              value={price}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                if (e.target.value !== details.price) {
                                  setSame(false);
                                } else setSame(true);
                                setPrice(e.target.value);
                              }}
                              required
                              style={{ width: '95%', margin: 'auto', marginTop: '15px' }}h
                            />
                            <TextField
                              label="Type of your listing"
                              value={type}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                if (e.target.value !== details.type) {
                                  setSame(false);
                                } else setSame(true);
                                setType(e.target.value);
                              }}
                              required
                              style={{ width: '95%', margin: 'auto', marginTop: '15px' }}
                            />
                            <NumberFields>
                              <TextField
                                label="Number of bathroom"
                                value={bath}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => {
                                  if (parseInt(e.target.value) !== details.metadata.bath) {
                                    setSame(false);
                                  } else setSame(true);
                                  if (e.target.value < 0) {
                                    setBath(0);
                                  } else setBath(parseInt(e.target.value));
                                }}
                                type='number'
                                required
                                style={{ marginTop: '15px' }}
                                fullWidth
                              />
                              <TextField
                                label="Number of bed"
                                value={bed}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => {
                                  if (parseInt(e.target.value) !== details.metadata.bed) {
                                    setSame(false);
                                  } else setSame(true);
                                  if (e.target.value < 0) {
                                    setBed(0);
                                  } else setBed(parseInt(e.target.value));
                                }}
                                type='number'
                                required
                                style={{ marginTop: '15px' }}
                                fullWidth
                              />
                              <TextField
                                label="Number of master bedroom"
                                value={master}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => {
                                  if (parseInt(e.target.value) !== details.metadata.master) {
                                    setSame(false);
                                  } else setSame(true);
                                  if (e.target.value < 0) {
                                    setMaster(0);
                                  } else setMaster(parseInt(e.target.value));
                                }}
                                type='number'
                                required
                                style={{ marginTop: '15px' }}
                                fullWidth
                              />
                              <TextField
                                label="Number of guest bedroom"
                                value={guest}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                type='number'
                                onChange={(e) => {
                                  if (parseInt(e.target.value) !== details.metadata.guest) {
                                    setSame(false);
                                  } else setSame(true);
                                  if (e.target.value < 0) {
                                    setGuest(0);
                                  } else setGuest(parseInt(e.target.value));
                                }}
                                required
                                style={{ marginTop: '15px' }}
                                fullWidth
                              />
                            </NumberFields>
                            <TextField
                              label="Amenities if any"
                              value={amenities}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                if (e.target.value !== details.metadata.amenities) {
                                  setSame(false);
                                } else setSame(true);
                                setAmenities(e.target.value);
                              }}
                              required
                              style={{ width: '95%', margin: 'auto', marginTop: '15px' }}
                            />
                            <TextField
                              label="Thumbnail to display"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={(e) => {
                                if (e.target.value !== details.thumbnail) {
                                  setSame(false);
                                  uploadImage(e);
                                } else setSame(true);
                              }}
                              type='file'
                              required
                              style={{ width: '95%', margin: 'auto', marginTop: '15px' }}
                            />
                            <Buttons>
                              <Button variant="outlined" startIcon={<ArrowBackIosNewIcon />} >
                                <Link to={'/manage'} style={{ textDecoration: 'none', color: '#1976d2' }}>Back</Link>
                              </Button>
                              <Button variant="contained" endIcon={<ArrowUpwardIcon />} disabled={same} onClick={() => {
                                setUpdate('Are you sure you want to update?')
                              }}>
                                Update
                              </Button>
                            </Buttons>
                          </Details>
                          </>
                          : (option === 2)
                              ? <>
                                <Publish>
                                  <div>
                                    {
                                      (published)
                                        ? (details.postedOn !== null && details.postedOn !== undefined)
                                            ? 'Published on ' + details.postedOn.split('T')[0]
                                            : 'Published on: loading ...'
                                        : 'Publish Status: Hidden'}
                                  </div>
                                </Publish>
                                <BookingControl id={parseInt(id)} published={published} setPublished={setPublished} avaliability={avaliability} setAvaliability={setAvaliability} />
                              </>
                              : <>
                                <OtherInfo>
                                  <div>Total number of days this listing is booked for: {profit / price}</div>
                                  <div>Total profit earned on this listing: {profit}</div>
                                </OtherInfo>
                                <ReviewTitle>Reviews for your listing</ReviewTitle>
                                <ReviewContainer>
                                {
                                  (review.length === 0)
                                    ? <Helper>No body commented on this listing yet</Helper>
                                    : <> {
                                      review.map(elem => {
                                        return (<Reviews key={elem}>{elem}</Reviews>)
                                      })}
                                    </>
                                }
                                </ReviewContainer>
                              </>
                      }
                    </>
                  : <Loading src={loading} />
              }
            </Container>
          : <Redirect to={'/auth'}/>
        }
    </>
  )
}

export default ListingProfile;
