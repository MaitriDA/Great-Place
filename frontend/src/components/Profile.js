import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CancelIcon from '@material-ui/icons/Cancel';
import './Profile.css';
import axios from "axios";

export default function Profile({ setProfile }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [pins1, setPins1] = useState([]);
    const [pins2, setPins2] = useState([]);
    useEffect(() => {
        const getPins = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/server/pin/${user.username}`);
                const pins=res.data;
                console.log(pins);
                let l=pins.length
                const pinarr1=[];
                const pinarr2=[];
                let c=0;
                while(c<l){
                    pinarr1.push(pins[c]);
                    c=c+1;
                    if(c<l){
                        pinarr2.push(pins[c]);
                        c=c+1;
                    }
                }
                setPins1(pinarr1);
                setPins2(pinarr2);
            } catch (err) {
                console.log(err);
            }
        }
        getPins();
    }, [])
    return <div>
        <div className="profileContainer">
            <div className="logo">
                <LocationOnIcon className="logoIcon" />
                <span>A Great Place</span>
            </div>
            <div>PROFILE</div>
            <div className="profileInfo">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="profilePicture" />
                <h4 className="profileUsername">{user.username}</h4>
                <span className="profileEmail">{user.email}</span>
            </div>
            <div className="yourPinsContainer">
                <div className="yourPins">Your Pins</div>
                    <div className="pinsContainer"><div className="pinsContainerCol">
                        {pins1.map(p=>(
                                <div>
                                    <div className="pins">
                                        <LocationOnIcon style={{ fontSize: "25px", color: "tomato" }} />
                                        {p.title}
                                    </div>
                                    <div className="pinDescription">{`${p.description.substring(0, 80)}...`}</div>
                                </div>
                        ))}
                        </div>
                        <div className="pinsContainerCol">
                            {pins2.map(p=>(
                                <div>
                                    <div className="pins">
                                        <LocationOnIcon style={{ fontSize: "25px", color: "tomato" }} />
                                        {p.title}
                                    </div>
                                    <div className="pinDescription">{`${p.description.substring(0, 80)}...`}</div>
                                </div>

                            ))}
                        </div>
                    </div>
                

            </div>
            <CancelIcon className="profileCancel" onClick={()=>setProfile(false)}/>
        </div>
    </div>;;
};

