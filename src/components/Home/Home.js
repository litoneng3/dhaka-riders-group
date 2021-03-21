import React from 'react';
import Vehicle from '../Vehicle/Vehicle';

const Home = () => {


    const vehicles = [
        {
            title: 'CAR',
            id: 1,
            img: 'https://4.imimg.com/data4/XL/IS/GLADMIN-10841631/3-500x500.jpg',
            price: 119
        },
        {
            title: 'Taxi',
            id: 2,
            img: 'https://st2.depositphotos.com/3591429/5992/i/600/depositphotos_59926519-stock-photo-yellow-sedan-taxi-car.jpg',
            price: 219
        },
        {
            title: 'Bus',
            id: 3,
            img: 'https://i.pinimg.com/originals/0e/94/f3/0e94f32677af8b9a5eda0f1f76606410.jpg',
            price: 19
        },
        {
            title: 'Bike',
            id: 4,
            img: 'https://images.carandbike.com/bike-images/medium/bajaj/pulsar-150/bajaj-pulsar-150.webp?v=39',
            price: 112
        },
    ]

    return (
        <div>
            {
                vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
            }
        </div>
    );
};

export default Home;