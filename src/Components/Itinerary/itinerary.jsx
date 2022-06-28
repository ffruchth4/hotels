// import Data from "./data.json"
import React, {useState} from "react";
import {  
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Box,
  ButtonGroup

 
} from "@mui/material";
import '../../index.css';


import amusementPark from "../../Images/amusementPark.jpg";
import archery from "../../Images/archery.jpg";
import aquarium from "../../Images/aquarium.jpg";
import beach from "../../Images/beach.jpg";
import biking from "../../Images/biking.jpg";
import boating from "../../Images/boating.jpg";
import bowling from "../../Images/bowling.jpg";
import escapeTheRoom from "../../Images/escapeTheRoom.jpg";
import fishing from "../../Images/fishing.jpg";
import golf from "../../Images/golf.jpg";
import pottery from "../../Images/pottery.jpg";
import rollerSkating from "../../Images/rollerSkating.jpg";
import scubaDiving from "../../Images/scubaDiving.jpg";
import segway from "../../Images/Segway.jpg";
import skiing from "../../Images/skiing.jpg";
import sledding from "../../Images/sledding.jpg";
import snowballFight from "../../Images/snowballFight.jpg";
import snowtubing from "../../Images/snowtubing.jpg";
import trampoline from "../../Images/trampoline.jpg";
import zipline from "../../Images/zipline.jpg";

const Data = [
  {
      name: "Skiing",
      image: skiing,
      weather: "cold",
      loc:"outdoor"
  },
  {
      name: "Bowling",
      image: bowling,
      weather:"",
      loc:"indoor"
  },
  {
      name: "Beach",
      image: beach,
      weather: "hot",
      loc:"outdoor"
  },
  {
      name: "Roller Skating",
      image: rollerSkating,
      weather:"",
      loc:"indoor"
  },
  {
      name: "Pottery",
      image: pottery,
      weather:"",
      loc:"indoor"
  },
  {
      name: "Snowtubing",
      image: snowtubing,
      weather: "cold",
      loc:"outdoor"
  },
  {
    name: "Segway Tour",
    image: segway,
    weather: "hot",
    loc:"outdoor"
  },  
  {
      name: "Biking",
      image: biking,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Archery",
      image: archery,
      weather:"",
      loc:"outdoor"
  },
  {
      name: "Zipline",
      image: zipline,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Trampoline",
      image: trampoline,
      weather:"",
      loc:"indoor"
  },
  {
      name: "Aquarium",
      image: aquarium,
      weather:"",
      loc:"indoor"
  },
  {
      name: "Amusement Park",
      image: amusementPark,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Snowball Fight",
      image: snowballFight,
      weather:"cold",
      loc:"outdoor"
  },
  {
      name: "Fishing",
      image: fishing,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Golf",
      image: golf,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Escape The Room",
      image: escapeTheRoom,
      weather:"",
      loc:"indoor"

  },
  {
      name: "Scuba Diving",
      image: scubaDiving,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Boating",
      image: boating,
      weather:"hot",
      loc:"outdoor"
  },
  {
      name: "Sledding",
      image: sledding,
      weather:"cold",
      loc:"outdoor"
  }
];


function Itinerarys(props) {
    const [query, setQuery] = useState("");
    const [checked, setChecked] = React.useState(true);
    const[temp,setTemp]=React.useState("");
    const[loc, setLoc]=React.useState("");



    function onlyCold(e){
        setTemp("cold");
    };
    function onlyHot(e){
      setTemp("hot");
    };
    function allWeather(e){
      setTemp("");
    };
    function onlyIndoor(e){
      setLoc("indoor");
    };
    function onlyOutdoor(e){
      setLoc("outdoor");
    };
    function allLoc(e){
      setLoc("");
    };
    return(
        <div>
          <div id="header">Itinerary</div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          > 
          <Grid container spacing={1}>
            <Grid item xs={4}>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button onClick={onlyCold}>Cold</Button>
              <Button onClick={onlyHot}>Hot</Button>
              <Button onClick={allWeather}>All</Button>
            </ButtonGroup>

            </Grid>
            <Grid item xs={4}>
            <TextField id="search" label="Search Activity" variant="outlined" onChange={event => setQuery(event.target.value)}/>

            </Grid>
            <Grid item xs={4}>
            <ButtonGroup variant="text" aria-label="text button group">
              <Button onClick={onlyIndoor}>Indoor</Button>
              <Button onClick={onlyOutdoor}>Outdoor</Button>
              <Button onClick={allLoc}>All</Button>
            </ButtonGroup>
            </Grid>
            
          </Grid>
          </Box>
          <Grid container spacing={1} columns={8} justify="center">
            {
  Data.filter(post => {
    if(temp==='cold'){
      if(post.weather==='cold'){
        return post
      }
    }
    else if(temp==='hot'){
      if(post.weather==='hot'){
        return post
      }
    }
    else if(loc==='outdoor'){
      if(post.loc==='outdoor'){
        return post
      }
    }
    else if(loc==='indoor'){
      if(post.loc==='indoor'){
        return post
      }
    }
    else if (query === '') {
      return post;
    } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  }).map((post, index) => (
    
    <Card item sx={{width:"15%"}}
      style={{marginRight:"5%",marginLeft:"5%", marginTop:"1%", marginBottom:"1%"}}
     >
      <Grid item sx={{width:"100%"}}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <p>{post.name}</p>
      </Typography>
      
      <CardMedia
                        component="img"
                        height="100"
                        image={post.image}
                        alt={`${post.name} image`}
                      />
      
    </CardContent>
    </Grid>
  </Card>
  ))
}</Grid>
        </div>
    )
};

export const Itinerary= () => {
    return <Itinerarys/>;
  };