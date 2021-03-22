import mapboxgl from 'mapbox-gl';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, VehicleContext } from '../../App';
import './OrderPage.css';
import Header from '../Home/Header/Header';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FiaXJiZCIsImEiOiJja21ob2F4OW4wOThhMm9wZmN5cGRqZWxnIn0.kTJMNqydGoC1VYX73lgKrw';

const OrderPage = () => {
    const availableOption = ["OPTION1", "OPTION2", "OPTION3", "OPTION3"];
  
    const [selection, setSelection] = useContext(VehicleContext);
    const mapContainer = useRef();
    const [lng, setLng] = useState(89.242778);
    const [lat, setLat] = useState(25.757445);
    const [zoom, setZoom] = useState(16);


    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/sabirbd/ckmkt2b8p6ed618np4zglgu3t',
            center: [lng, lat],
            zoom: zoom
        });
        return () => map.remove();
    }, [lat]);



    const [location, setLocation] = useState([]);

    const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        event.preventDefault();
        let user = {};
        for (let entry of formData.entries()) {
            user[entry[0]] = entry[1]
        }
        setLocation(user);
    }

    const objSize = Object.keys(location).length;
    let show = objSize > 1 ? true : false;


    return (
        <div>
            <div className="header-container">
                <Header></Header>
            </div>

            <div className="search-container">
                <div className="search-place">
                    <div id="location-input" style={show ? { display: "none" } : { display: "block" }}>
                        <form id="search-form" onSubmit={handleSubmit}>
                            <label htmlFor="from">Pick From</label>
                            <br />
                            <input type="text" name="from" required />
                            <br />
                            <label htmlFor="to">Drop off</label>
                            <br />
                            <input type="text" name="to" required />
                            <br />
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                    <div id="after-submit" style={show ? { display: "block" } : { display: "none" }}>
                        <div className="searchedLocation">

                            <Timeline align="left">
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot></TimelineDot>
                                        <TimelineConnector></TimelineConnector>
                                    </TimelineSeparator>
                                    <TimelineContent>{location.from}</TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot></TimelineDot>
                                    </TimelineSeparator>
                                    <TimelineContent>{location.to}</TimelineContent>
                                </TimelineItem>
                            </Timeline>

                        </div>

                        {
                            <div className="ride-option">

                                {
                                    availableOption.map(data =>
                                        <div className="rideCard">
                                            <p><i className={selection.icon || "fa fa-motorcycle"}></i> &nbsp;{selection.name || 'bike'} &nbsp; &nbsp; <i className="fa fa-users"></i> {selection.capacity || 4} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${selection.price || 75}</p>
                                        </div>
                                    )
                                }

                            </div>
                        }
                    </div>
                </div>
                <div className="map-container" ref={mapContainer} />
            </div>
        </div>
    );

}

export default OrderPage;