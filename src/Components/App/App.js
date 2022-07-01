import React, {useState, useEffect, useContext} from "react";

import './App.css';
import {Header} from '../header/header';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom"; 
import {Hotel} from '../Hotel/hotel';
import {Direction} from '../Direction/direction'; 
import {Favorites} from '../Favorite/favorite';
import {Itinerary} from '../Itinerary/itinerary';


export const hotelContext = React.createContext();
export const dAddressContext = React.createContext();
export const dCityContext = React.createContext();
export const dStateContext = React.createContext();
export const dZipContext = React.createContext();
export const locationContext = React.createContext();
export const locContext = React.createContext();

function App() {
  const [favHotels, setFavHotels] = useState([ ]);
  const [dAddress, setDAddress] = useState("Address");
  const [dCity,setDCity] = useState("City");
  const [dState,setDState] = useState("State");
  const [dZip,setDZip] = useState("Zip");
  const [locationID, setLocationID] = useState("1506246")
  const [location, setLocation] =useState("New York");


  return (
    <div className="App">
     
        <hotelContext.Provider value = {{favHotels, setFavHotels}}>
        <dAddressContext.Provider value = {{dAddress, setDAddress}}>
        <dCityContext.Provider value = {{dCity, setDCity}}>
        <dStateContext.Provider value = {{dState, setDState}}>
        <dZipContext.Provider value = {{dZip, setDZip}}>
        <locationContext.Provider value = {{locationID, setLocationID}}>
        <locContext.Provider value = {{location, setLocation}}>

        
         

        <HashRouter>
        <Header/>
          <Routes>
            
            <Route path="/" element={<Hotel/>}></Route> 
            <Route path="/directions" element={<Direction/>}/> 
            <Route path="/favorite" element={<Favorites/>}/>
            <Route path="/itinerary" element={<Itinerary/>}/>
            
              
          </Routes>
        </HashRouter>
        </locContext.Provider> 
        </locationContext.Provider>
        </dZipContext.Provider>
        </dStateContext.Provider>
        </dCityContext.Provider>
        </dAddressContext.Provider>
        </hotelContext.Provider>

        
    </div>
  );
}

export default App;
