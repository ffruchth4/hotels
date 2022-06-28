import React, {useState, useEffect, useContext} from "react";

import {  
    Typography,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Card,
    Grid,
    CardContent,
    CardActions
  
   
  } from "@mui/material";
  import {hotelContext} from '../App/App.js'
  import '../../index.css';
  import tulmar from "../../Images/tulmar.jpg";
  import colline from "../../Images/colline.jpg";
  import ikos from "../../Images/ikios.jpg";
  import istanbul from "../../Images/istanbul.jpg";
  import omnia from "../../Images/omnia.jpg";
  import caves from "../../Images/caves.jpg";
  import six from "../../Images/six.jpg";
  import ham from "../../Images/ham.jpg";
  import padma from "../../Images/padma.jpg";
  import bless from "../../Images/bless.jpg";

  


  const Top10 = [
    {
        name: "Tulemar Bungalows & Villas: Manuel Antonio, Costa Rica",
        image: tulmar,
       
    },
    {
        name: "Hotel Colline de France: Gramado, Brazil",
        image: colline,
        
    }
    ,
    {
        name: "Ikos Aria: Kefalos, Kos island, Greece",
        image: ikos,
        
    }
    ,
    {
        name: "Romance Istanbul Hotel: Istanbul, Turkey",
        image: istanbul,
        
    }
    ,
    {
        name: "THE OMNIA: Zermatt, Switzerland",
        image: omnia,
        
    }
    ,
    {
        name: "Kayakapi Premium Caves: Cappadocia; Urgup, Turkey",
        image: caves,
        
    }
    ,
    {
        name: "Six Senses Laamu: Olhuveli Island, Maldives",
        image: six,
        
    }
    ,
    {
        name: "Hamanasi Adventure and Dive Resort: Hopkins, Belize",
        image: ham,
        
    }
    ,
    {
        name: "Padma Resort Ubud: Payangan, Indonesia",
        image: padma,
        
    }
    ,
    {
        name: "BLESS Hotel Madrid: Madrid, Spain",
        image: bless,
        
    }
  ];
  const style = {
     width: '200%',
     maxWidth: "50%",
     alignItems: "center",
     marginRight: "25%",
     marginLeft:"25%"
  };
  function Top(props){
    
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
          
        </CardContent>
        
        </Grid>
      </Card>
    )
  }

  function Favorite(props){
    
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
          
        </CardContent>
        <CardActions>
        <Avatar>
                  <button style={{background:"red", marginLeft:"2%",marginRight:"2%"}} onClick = {()=> props.removeFav(props.index)}>x</button>
                  </Avatar>
        </CardActions>
        </Grid>
      </Card>
    )
  }


  function FavoriteHotels(){    
    const {favHotels, setFavHotels} = useContext(hotelContext);  
    let favorite=(favHotels.length===0) ? null : "FAVORITE"
    const removeFav = index => {
      const newFavs = [...favHotels];
      newFavs.splice(index, 1);
      setFavHotels(newFavs);
    }
  
    
  
     return(
      <div>
         <div id ="header">Top 10 Hotels in the World</div>
         <Grid container spacing={1} columns={8} justify="center">        
         {Top10.map((top, index) => (
            <Top
              name = {top.name}
              image={top.image}
              index = {index}
              key = {index}
              />
          ))}
        </Grid>
        <div id ="header">{favorite}</div>
        <Grid container spacing={1} columns={8} justify="center">         
         {favHotels.map((fav, index) => (
            <Favorite
              name = {fav.name}
              image={fav.optimizedThumbUrls.srpDesktop}
              index = {index}
              removeFav = {removeFav}
              key = {index}
              />
          ))}
        </Grid>
       
        
      </div>
    );
  }


  export const Favorites = () =>{
    return <FavoriteHotels/>;
  }


