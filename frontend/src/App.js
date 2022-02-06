import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './App.css';
import axios from 'axios';
import PinCard from '../src/components/Card.js';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")))
  const URL = process.env.REACT_APP_URL;
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 19,
    longitude: 72,
    zoom: 4
  });
  const [title,setTitle]=useState(null);
  const [description,setDescription]=useState(null);

  const [login,setLogin]=useState(false);
  const [register,setRegister]=useState(false);
  const [profile,setProfile]=useState(false);

  const handleRegister=()=>{
    setRegister(true);
  }
  const handleLogin=()=>{
    setLogin(true);
  }
  const handleProfile=()=>{
    setProfile(true);
  }
  const handleLogout=()=>{
    localStorage.removeItem("user")
    setCurrentUser(null);

  }
  const handleMarkerClick = (id,lat,lon) => {
    setCurrentPlaceId(id);
    setViewport({...viewport,latitude:lat,longitude:lon})
  }
  const handleAddMarker = (e) => {
    const [lon, lat] = e.lngLat;
    setNewPlace({
      lat, lon
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPin={
      username:currentUser.username,
      title:title,
      description:description,
      lat:newPlace.lat,
      lon:newPlace.lon
    }
    try{
      const res=await axios.post("http://localhost:8800/server/pin/",newPin);
      setPins([...pins,res.data])
      setNewPlace(null);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/server/pin/");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getPins();
  }, [])
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
      onDblClick={handleAddMarker}
      transitionDuration="300"
    >
      {pins.map((p) => (
        
        <>
          <Marker latitude={p.lat} longitude={p.lon} offsetLeft={-viewport.zoom *3.5} offsetTop={-viewport.zoom *7}>
            <div className="marker">
              <LocationOnIcon style={{ fontSize: viewport.zoom *7, color: currentUser ? (p.username === currentUser.username ? "tomato" : "slateblue") :"slateblue", cursor: "pointer" }} onClick={() => handleMarkerClick(p._id,p.lat,p.lon)} className="marker-icon"/>
            </div>
          </Marker>
          {p._id === currentPlaceId && (
            <div className="card">
          
          <Popup
              latitude={p.lat}
              longitude={p.lon}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left" >
                <PinCard data={p} key={p._id} />
            </Popup>
            </div>
            
          )}
        </>
      ))}
      {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.lon}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left" >
          <div>
          <form onSubmit={handleSubmit} className="addMarker">
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus onChange={(e)=>setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    rows={6} onChange={(e)=>setDescription(e.target.value)}
                  />
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
          </div>
        </Popup>

      )}
      {currentUser?(
        <div className="buttons">
          <button className="button login" onClick={handleProfile}>Profile</button>
      <button className="button register" onClick={handleLogout}>Logout</button>
        </div>
      ):(<div className="buttons">
      <button className="button login" onClick={handleLogin}>Login</button>
      <button className="button register" onClick={handleRegister}>Register</button>
    </div>)}
    {register && (<Register setRegister={setRegister} setCurrentUser={setCurrentUser}/>)}
    {login && (<Login setLogin={setLogin} setCurrentUser={setCurrentUser}/>)}
    {profile && (<Profile setProfile={setProfile}/>)}
    </ReactMapGL>
  );
}

export default App;


{/* <LocationOnIcon style={{ fontSize: viewport.zoom *7, color: currentUser ? (p.username === currentUser.username ? "tomato" : "slateblue") :"slateblue", cursor: "pointer" }} onClick={() => handleMarkerClick(p._id,p.lat,p.lon)} /> */}