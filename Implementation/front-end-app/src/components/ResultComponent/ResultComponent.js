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


const ResultComponent = (props) => {

    let carName = props.carsdata.name;

    function CarPicture({name}){
        if(name.includes("Honda")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={HondaLogo}/>
        }

        else if(name.includes("Mini Cooper")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={MiniCooperLogo}/>
        }

        else if(name.includes("Toyota")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={ToyotaLogo}/>
        }

        else if(name.includes("Mazda")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={MazdaLogo}/>
        }

        else if(name.includes("BMW")){
            return <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src={BMWLogo}/>
        }

        else if(name.includes("Mercedes")){
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
    <Card className="mx-4 mt-5">
      <Card.Header className="header" as="h5">{props.carsdata.name}</Card.Header>
      <Card.Body>
        <Row>
            <Col>
            <Figure>
                <CarPicture name={carName}/>
            </Figure>

            </Col>

            <Col>
                <h3>Details</h3>
                <Row>
                    <p>Seats: {props.carsdata.noOfSeats}</p>
                </Row>

                <Row>
                    <p>Transmission: {props.carsdata.transmission}</p>
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

        <Row>
            <Button className="col-md-3 mx-auto" variant="primary">Let's Go!</Button>
        </Row>

      </Card.Body>
    </Card>
    )
}

export default ResultComponent;