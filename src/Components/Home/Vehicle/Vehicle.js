import React from 'react';
import './Vehicle.css'

const Vehicle = (props) => {
    const { name, price, img } = props.vehicle;
    // const imgUrl = `../../../images/${name}.png`;
    console.log(img)
    return (
        <div className="vehicle-card" onClick={() => props.handleClick(props.vehicle)} style={{ cursor: 'pointer' }}>
            <div id='image'>
                <img src={img} alt="" />
            </div>
            <h5>{name}</h5>
            <h6>Starts From: {price}</h6>
        </div>
    );
};

export default Vehicle;