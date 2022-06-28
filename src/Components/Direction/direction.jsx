import React, {useState, useContext} from "react";

import {  
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Paper,
    TextField,
    CssBaseline,
    Container,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Avatar,
    Stack

  } from "@mui/material";
  import { styled } from '@mui/material/styles';
  import '../../index.css';
  import arrow from "../../Images/arrow.png";
  import {dAddressContext} from '../App/App.js'
  import {dCityContext} from '../App/App.js'
  import {dStateContext} from '../App/App.js'
  import {dZipContext} from '../App/App.js'




function DirectionStepPrint(props){
  return(
    <CardContent>
      
        <Typography gutterBottom variant="h5" component="div">
        <Stack direction="row" spacing={2}>
        <Avatar alt="Arrow" src={arrow} />
          {props.name}
        
        </Stack>
        </Typography>
        </CardContent>
  );
}
function DirectionPrint(props){  
 
  return(
    

     <Card item 
      style={{marginRight:"20%",marginLeft:"20%", marginTop:"1%", marginBottom:"1%"}}
     >
      <Grid item sx={{width:"100%"}}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">        
            {props.steps?.map((step, index) => (
              <DirectionStepPrint 
                name={step.step_instructions_text}                
                index = {index}         
                key = {index}
               
                />
            ))}
          
        </Typography>
      </CardContent>
      
      </Grid>
    </Card>
  )
}

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#1976d2',
  }));

  function GetDirections(props){
    
  const changeBasedOnInput = (e) => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f4e17c26c0msh4582f1b1ac7988bp1d7f29jsne5d5fabbe2d3',
        'X-RapidAPI-Host': 'google-maps-directions.p.rapidapi.com'
      }
    };
    
    fetch(`https://google-maps-directions.p.rapidapi.com/directions?origin=${props.or}&destination=${props.des}&distance_units=auto&avoid_routes=ferries&include_timed_distance=false&expand_routes=true&language=en`,
     options)
      .then(response => response.json())
      .then(response=>props.setDirections(response.response.directions.routes[0].route_parts[0].steps))      
      .catch(err => console.error(err));
      
    

      fetch(`https://google-maps-directions.p.rapidapi.com/directions?origin=${props.or}&destination=${props.des}&distance_units=auto&avoid_routes=${props.avoid}&include_timed_distance=false&expand_routes=true&language=en`, options)
      .then(response => response.json())
      .then(response=>props.setDuration(response.response.directions.routes[0].duration_label))
            
      .catch(err => console.error(err));
     
  }
      return (
       
          <form onSubmit={changeBasedOnInput}>
          <Button  onClick={() => {changeBasedOnInput()}}
          variant="contained" style={{

       height: "95%",
       width: "75%", }}>Submit</Button>
          </form>
       
      );
  };


  function Directions(props) {
    const[fName, setFName]=React.useState('');
    const[lName, setLName]=React.useState('');
    const[oAddress,setOAddress]=React.useState('');
    const[oCity,setOCity]=React.useState('');
    const[oState,setOState]=React.useState('');
    const[oZip,setOZip]=React.useState('');
    const{dAddress, setDAddress} = useContext(dAddressContext);
    const{dCity,setDCity}=useContext(dCityContext);
    const{dState,setDState}=useContext(dStateContext);
    const{dZip,setDZip}=useContext(dZipContext);
    const [mode, setMode] = React.useState('');
    const [avoid, setAvoid] = React.useState('');
    const[directions,setDirections] = useState([]);
    const[duration,setDuration]=React.useState('');

    let welcome = (duration==="") ? null : "Welcome" + " " + fName + " " + lName
    let time= (duration==="")?null: "Your trip will take you"


    var address = oAddress.split(" ");
    let or="";
    for (var i= 0; i < address.length;i++) {
      or+=address[i]+ "%20";     
    }
    or+=oCity+ "%20" + oState+"%20"+oZip
    var desAddress = dAddress.split(" ");
    let des="";
    for (var i= 0; i < desAddress.length;i++) {
      des+=desAddress[i]+ "%20";     
    }
    des+=dCity+ "%20" + dState+"%20"+dZip
  
    
    const handleChangeAvoid = (event) => {
      setAvoid(event.target.value);
    };

    
      return(  
        <div> 
          <div id="header">DIRECTIONS
            </div>  
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Grid container spacing={2}>
        <Grid item xs={4}>
            <TextField id="fName" label="First Name" variant="standard" onChange={(e) => {setFName(e.target.value)}} />
        </Grid>
        <Grid item xs={4}>
            <TextField id="lName" label="Last Name" variant="standard" onChange={(e) => {setLName(e.target.value)}} />
        </Grid>
        <Grid item xs={4}>
          
        </Grid>

        <Grid item xs={12}>
          <Item>ORIGIN:</Item>
        </Grid>
        
        <Grid item xs={4}>
            <TextField id="address1" label="Address" variant="standard" onChange={(e) => {setOAddress(e.target.value)}}/>
        </Grid>
        <Grid item xs={4}>
            
        </Grid>
        <Grid item xs={4}>
        </Grid>

        <Grid item xs={4}>
            <TextField id="city" label="City" variant="standard" onChange={(e) => {setOCity(e.target.value)}} />
        </Grid>
        <Grid item xs={4}>
            <TextField id="state" label="State" variant="standard" onChange={(e) => {setOState(e.target.value)}}/>
        </Grid>
        <Grid item xs={4}>
            <TextField id="zip" label="Zip" variant="standard" onChange={(e) => {setOZip(e.target.value)}}/>
        </Grid>

        <Grid item xs={12}>
          <Item>DESTINATION:</Item>
        </Grid>
        
        <Grid item xs={4}>
            <TextField id="address1" label="Address" defaultValue={dAddress} variant="standard" onChange={(e) => {setDAddress(e.target.value)}} />
        </Grid>
        <Grid item xs={4}>
           
        </Grid>
        <Grid item xs={4}>
        </Grid>
        
        <Grid item xs={4}>
            <TextField id="city" label= "City" defaultValue={dCity} variant="standard"  onChange={(e) => {setDCity(e.target.value)}}/>
        </Grid>
        <Grid item xs={4}>
            <TextField id="state" label= "State" defaultValue= {dState} variant="standard" onChange={(e) => {setDState(e.target.value)}}/>
        </Grid>
        <Grid item xs={4}>
            <TextField id="zip" label= "Zip Code" defaultValue= {dZip} variant="standard" onChange={(e) => {setDZip(e.target.value)}}/>
        </Grid>
        
        <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Avoid</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={avoid}
                label="Avoid"
                onChange={handleChangeAvoid}
                >
                    <MenuItem value={"tolls"}>Tolls</MenuItem>
                    <MenuItem value={"highways"}>Highways</MenuItem>
                    <MenuItem value={"ferries"}>Ferries</MenuItem>
                    <MenuItem value={""}>None</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        <GetDirections
      setDirections={setDirections}
      setDuration={setDuration}
      or={or}
      des={des}
      avoid={avoid}/>
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
    <div style={{fontSize: "24px"}}>
    <br></br><hr/>
    <br></br>{welcome}  <br></br>
      {time} {duration}     
            {directions?.map((direction, index) => (
              <DirectionPrint   
                name={direction.step_instructions_text}  
                steps={direction.steps}
                index = {index}         
                key = {index}
                
                />
            ))}
          
     
      
    </div>
    </div>
      )
  }


  export const Direction = () => {
    return <Directions/>;
  };