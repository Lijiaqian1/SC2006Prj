import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../App/App.css';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';


function AboutUs(){
    return(
        <Container>
        <Row className="mt-5">
            <h5 className="H5title">About Us</h5>
        </Row>
        <Row className="mt-2">
            <Col  md={6}>
                <p className="aboutPara">Welcome to CCRentals, your one-stop-shop for finding the best car rental deals across the world. Our mission is to make car rental easy, affordable and accessible to everyone, no matter where you are in the world. </p>
                <h5 className="H5title">Our team</h5>
                <p className="aboutPara">Our team is made up of experienced travel experts and technology enthusiasts who are passionate about making car rental simple and hassle-free. We work tirelessly to find the best deals and the most reliable rental companies, so you can book with confidence and peace of mind.</p>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
                <img src='./CarRentingPic.jpg' alt='CCRentals' width="400"></img>
            </Col>
        </Row>
  
        <Row className="mt-5 mb-5">
            <Col md={ 6 }>
                <img src='./CarRentingPicBanner.jpg' alt='CCRentals' width="400"></img>
            </Col>
            <Col md={{ span: 6}}>
                <p className="aboutPara">At CCRentals, we understand that renting a car can be confusing and time-consuming process, which is why we created a platform that makes it simple to compare prices and book the perfect car for your needs. Whether you are looking for a small fuel-efficient car for a weekend gateaway, or a large SUV for a family vacation, we have you covered.  </p>
                <p className="aboutPara">Our website is user-friendly and easy to navigate, with intuitive search filters and a simple booking process. We also offer a range of helpful tools and resources to make your car rental experience as smooth as possible, including detailed car specifications, driving tips, and local travel guides.</p>
            </Col>
        </Row>

        <Row className="mt-5">
            <h3 className="H3title text-center">Comparison of Car Rental Service</h3>
        </Row>

        <Row className = "mb-5 mt-3">
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src="./getgo.jfif" height="225px"/>
                    <Card.Body>
                        <Card.Text>
                            <p>GetGo is the largest carsharing service in Singapore with no deposit or membership fees. </p>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Subscription Fees?</Accordion.Header>
                                    <Accordion.Body>
                                        None
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Insurance Provided</Accordion.Header>
                                    <Accordion.Body>
                                        Yes. $1,605 to $10,700
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Petrol Included?</Accordion.Header>
                                    <Accordion.Body>
                                        Yes. 
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Car rental fee (Hourly rate)</Accordion.Header>
                                    <Accordion.Body>
                                        <p className="mb-2">Yes</p>
                                        <ListGroup as="ol">
                                            <ListGroup.Item as="li">Economy: $3-7</ListGroup.Item>
                                            <ListGroup.Item as="li">Standard: $3-9</ListGroup.Item>
                                            <ListGroup.Item as="li">Premium: $6-12</ListGroup.Item>
                                            <ListGroup.Item as="li">Standard Electric: $4-10</ListGroup.Item>
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Fleet Size</Accordion.Header>
                                    <Accordion.Body>
                                        1,400
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>Car Sharing Station</Accordion.Header>
                                    <Accordion.Body>
                                        1,300
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src="./carLite.jpg " height="225px" />
                    <Card.Body>
                        <Card.Text>
                            <p>CarLite is one of the largest car rental service which allows you to experience rental with less hassle and with a whole lot of control. </p>
                            <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Subscription Fees?</Accordion.Header>
                                <Accordion.Body>
                                    None
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Insurance Provided</Accordion.Header>
                                <Accordion.Body>
                                    Yes. Insurance excess from $1,605 to $12,840
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Petrol Included?</Accordion.Header>
                                <Accordion.Body>
                                    No. All are self pump and petrol cost are borne by drivers
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Car rental fee (15 mins rate)</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol">
                                        <ListGroup.Item as="li">Tier 1: $0.80</ListGroup.Item>
                                        <ListGroup.Item as="li">Tier 2: $1</ListGroup.Item>
                                        <ListGroup.Item as="li">Tier 3: $1.20</ListGroup.Item>
                                        <ListGroup.Item as="li">Tier 4: $1.40</ListGroup.Item>
                                        <ListGroup.Item as="li">Tier 3: $1.55</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Fleet Size</Accordion.Header>
                                <Accordion.Body>
                                    400
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Car Sharing Station</Accordion.Header>
                                <Accordion.Body>
                                    300+
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src="./tribeCar.jpg" height="225px" />
                    <Card.Body>
                        <Card.Text>
                        <p>Singapore largest car-sharing. With over 950 different vehicles located at 750+ convenient locations.</p>

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Subscription Fees?</Accordion.Header>
                                <Accordion.Body>
                                    $100 deposit
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Insurance Provided</Accordion.Header>
                                <Accordion.Body>
                                    Yes. Insurance excess from $1,605 to $12,840
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Petrol Included?</Accordion.Header>
                                <Accordion.Body>
                                    No. You need to pump to 1/4 tank.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Car rental fee (Hourly rate)</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol">
                                        <ListGroup.Item as="li">Super off-peak: $2.14/hour</ListGroup.Item>
                                        <ListGroup.Item as="li">Off-peak: $4.82/hour</ListGroup.Item>
                                        <ListGroup.Item as="li">Peak: $6.96/hour</ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Fleet Size</Accordion.Header>
                                <Accordion.Body>
                                    950
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Car Sharing Station</Accordion.Header>
                                <Accordion.Body>
                                    750+
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            
        </Row>
  
      
      </Container>
    )
}

export default AboutUs;