import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { VehicleContext } from '../../App';
import data from '../../FakeData/data.json';
import Header from './Header/Header';
import './Home.css';
import Vehicle from './Vehicle/Vehicle';

const Home = () => {

    let history = useHistory();
    const [vehicle, setVehicle] = useState([]);
    useEffect(() => {
        setVehicle(data);
    }, []);
    const [selection, setSelection] = useContext(VehicleContext);
    const handleClick = (vehicle) => {
        setSelection(vehicle);
        // console.log("selected data", vehicle);
        history.push('/destination');
        // console.log("handle:", vehicle);
    }

    return (
        <div className="full-body">
            <Header></Header>
            <div className="container col">
                <div className="cards">
                    {
                        vehicle.map(vehicle => <Vehicle
                            handleClick={handleClick}
                            vehicle={vehicle}
                            key={vehicle.id}>
                        </Vehicle>)
                    }
                </div>
            </div>
        </div>

    );
};

export default Home;