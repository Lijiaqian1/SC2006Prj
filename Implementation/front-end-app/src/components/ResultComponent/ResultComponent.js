import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import '../Results/Results.css';
import HondaLogo from '../ResultComponent/HondaLogo.png'
import MiniCooperLogo from '../ResultComponent/MiniCooper.jpg';
import ToyotaLogo from '../ResultComponent/Toyota.jpg';
import MazdaLogo from '../ResultComponent/Mazda.jpg';
import CarLogo from '../ResultComponent/CarLogo.jpg';
import BMWLogo from '../ResultComponent/BMW.png';
import MercedesLogo from '../ResultComponent/Mercedes-Logo.png';
import { Link } from 'react-router-dom';
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import { useMemo, useState } from 'react';


const ResultComponent = (props) => {

    let carName = props.carsdata.model;

    function CarPicture({model}){
        if(model.includes("Honda")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={HondaLogo}/>
        }

        else if(model.includes("Mini Cooper")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={MiniCooperLogo}/>
        }

        else if(model.includes("Toyota")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={ToyotaLogo}/>
        }

        else if(model.includes("Mazda")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={MazdaLogo}/>
        }

        else if(model.includes("BMW")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={BMWLogo}/>
        }

        else if(model.includes("Mercedes")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={MercedesLogo}/>
        }

        else{
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={CarLogo}/>
        }


    }

    return(
    <Card className="mx-4 mt-5 mb-3">
      <Card.Header className="header" as="h5">{props.carsdata.model}</Card.Header>
      <Card.Body>
        <Row>
            <Col>
            <Figure>
                <CarPicture model={carName}/>
            </Figure>

            </Col>

            <Col>
                <h3>Details</h3>
                <Row>
                    <p>Seats: {props.carsdata.seats}</p>
                </Row>

                <Row>
                    <p>Rent Company: {props.carsdata.rent_company}</p>
                </Row>
            </Col>

            <Col>
                <h3>Pick-up Location</h3>
                <Row>
                    <p>{props.carsdata.location}</p>
                </Row>
            </Col>

            <Col>
                <h3>Price</h3>
                <Row>
                    <p className='priceNumber'>{props.carsdata.price}</p>
                </Row>
            </Col>


        </Row>

        <Row className="mx-auto">
            {props.carsdata.rent_company === 'TribeCar'? 
            <a href="https://www.tribecar.com/" target="_blank">
                <Button className="d-grid col-3 mx-auto" variant="primary">Let's Go!</Button>
            </a> : props.carsdata.rent_company === 'GetGo' ?
            <a href="https://getgo.sg/" target="_blank">
                <Button className="d-grid col-3 mx-auto" variant="primary">Let's Go!</Button>
            </a> : <a href="https://www.carlite.sg/" target="_blank">
                <Button className="d-grid col-3 mx-auto" variant="primary">Let's Go!</Button>
            </a>}
            
        </Row>

      </Card.Body>
    </Card>
    )
}

export default ResultComponent;