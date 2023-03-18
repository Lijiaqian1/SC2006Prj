import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Honda from '../ResultComponent/Images/Honda.png';
import '../Results/Results.css';
import MiniCooper from '../ResultComponent/Images/Mini-Cooper.jpg';

const ResultComponent = (props) => {

    let carName = props.carsdata.name;

    return(
    <Card className="mx-2">
      <Card.Header className="header" as="h5">{props.carsdata.name}</Card.Header>
      <Card.Body>
        <Row>
            <Col>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={Honda}/>
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
            <Button className="col-md-3 mx-auto" variant="primary">View</Button>
        </Row>
        
      </Card.Body>
    </Card>
    )
}

export default ResultComponent;