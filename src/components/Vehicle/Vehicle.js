import React from 'react';
import { useHistory } from 'react-router';
import './Vehicle.css';

const Vehicle = (props) => {
    const { title, img, price } = props.vehicle;

    const history = useHistory();
    const handleBookNow = () => {
        history.push(`/vehicle/${title}`);
    }
    return (
        <div className="vehicle card text-center mt-5">
            <img src={img} alt="" />
            <h4>{title}</h4>
            <p>$ {price}</p>
            <button className="btn btn-primary" onClick={() => handleBookNow(title)}>Book Now</button>
        </div>
    );
};

export default Vehicle;