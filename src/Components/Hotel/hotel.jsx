import React, {useState, useEffect, useContext} from "react";

import {  
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  TextField
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import '../../index.css';

import {hotelContext} from '../App/App.js'
import {dAddressContext} from '../App/App.js'
import {dCityContext} from '../App/App.js'
import {dStateContext} from '../App/App.js'
import {dZipContext} from '../App/App.js'



function HotelPlace(props){  
  const navigate = useNavigate();
  const{favHotels, setFavHotels} = useContext(hotelContext);
  const{dAddress, setDAddress} = useContext(dAddressContext);
  const{dCity,setDCity} = useContext(dCityContext);
  const{dState,setDState}=useContext(dStateContext);
  const{dZip,setDZip}=useContext(dZipContext);
  const addFav = title =>{
    if(!favHotels.includes(title)){
      const newFavs = [...favHotels,title];
      setFavHotels(newFavs);
    }
    
  }
  const getDirections=props=>{
    setDAddress(props.address);
    setDCity(props.locality);
    setDState(props.region);
    setDZip(props.zip);
    navigate('/directions');
    
    
  }
  return(

    <Card item sx={{width:"23%"}}
      style={{marginRight:"1%",marginLeft:"1%", marginTop:"1%", marginBottom:"1%"}}
     >
      <Grid item sx={{width:"100%"}}>
      <CardMedia
        component="img"
        alt="Hotel"
        height="140"
        image = {props.image}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.address} {props.locality}, {props.region} {props.zip}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> getDirections(props)}>Get Directions</Button>
        <Button size="small" onClick={()=> addFav(props.hotel)}>Add To Favorites</Button> 
      </CardActions>
      </Grid>
    </Card>
  )
}


function FindID(props) {
  const [input, setInput] = useState("");
  const changeBasedOnInput = (e) => {
    e.preventDefault();
    if (!input) {
      console.log("error");
      return;
    }
    props.setLocation(input);
     setInput("");
    
        const params = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
      "X-RapidAPI-Key": "724c45ec09msh36c3421f4e82ee7p199f0ejsn97265fe63c98",
    },
  };
      fetch(
        `https://hotels4.p.rapidapi.com/locations/v2/search?query=${input}&locale=en_US&currency=USD`,
        params
      )
        .then((response) => response.json())
        .then((response) => props.setLocationID(response.suggestions[0].entities[0].destinationId))
        .catch((err) => console.error(err));
   
  };

  return (
    <div class="locationInput">
      <form onSubmit={changeBasedOnInput}>
        <TextField
          id="standard-basic"
          label="Location"
          variant="standard"          
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}


function Hotels(props) {
    const [hotels, setHotels] = useState([]);
    const [location, setLocation] =useState("New York");
    const[locationID,setLocationID] = useState("1506246");
    const loc = (location ===null) ? null : location.toUpperCase();
    const params = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
        "X-RapidAPI-Key": "724c45ec09msh36c3421f4e82ee7p199f0ejsn97265fe63c98",
      },
    };
   
      useEffect(() => {
        fetch(
          `https://hotels4.p.rapidapi.com/properties/list?destinationId=${locationID}&pageNumber=1&pageSize=28&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`,
          params
        )
          .then((response) => response.json())
          .then((response) => setHotels(response.data.body.searchResults.results))
          .catch((err) => console.error(err));
      }, [locationID]);
    
    
      return(
      <div>
        <div id="header">
          HOTELS {loc}
        </div>
        <div>
          <Typography class="header" >
            <FindID
              locationID = {locationID}
              setLocationID={setLocationID}
              location={location}
              setLocation={setLocation}
            />
          </Typography>
          <Grid container spacing={1} columns={8} justify="center">
            {hotels.map((hotel, index) => (
              <HotelPlace   
                hotel={hotel}       
                index = {index}         
                key = {index}
                name={hotel.name}
                address={hotel.address.streetAddress}
                locality={hotel.address.locality}
                region={hotel.address.region}
                zip={hotel.address.postalCode}
                image={hotel.optimizedThumbUrls.srpDesktop}
                
                />
            ))}
          </Grid>
        </div>
    </div>
    )
}

export const Hotel = () => {
  return <Hotels/>;
};