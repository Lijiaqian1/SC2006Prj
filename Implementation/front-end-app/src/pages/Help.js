import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import '../App/App.css';
import Accordion from 'react-bootstrap/Accordion';

function Help(){
    return(
        <Container>
            <Row className="mt-4 mb-5">
                <h2 className="H2title text-center">FAQ Page</h2>
                <p className="aboutPara text-center">Browse through our list of commonly ask questions</p>
            </Row>

            <div className="QuestionSection">
                <h3 className="ms-4 mt-3 p-3 ">Basic FAQ Questions</h3>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What is CCRental about?</Accordion.Header>
                    <Accordion.Body>
                    This is a car rental service comparison website which is a platform that allows users to compare the prices and features of 3 
                    popular car renting service in Singapore - GetGo, CarLite and TribeCar. 
                    These website provide information on rental cars, to allow users to make informed decisions about their travel plans.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How do I use a CCRental website?</Accordion.Header>
                    <Accordion.Body>
                    It is very easy to navigate the CCRental website. 
                    Simply fill in the serach bar with the filter of your own preference and press the "Search" button, the website will 
                    provide you with a list of options to choose from. You can then compare the prices, features, 
                    and reviews of each rental service to find the one that best suits your needs.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Are the prices on CCRental accurate?</Accordion.Header>
                    <Accordion.Body>
                    CCRental comparison strive to provide accurate pricing information, 
                    but prices can change frequently. 
                    It's always a good idea to double-check the price on the rental service's website before booking.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Can I book a rental service directly through CCRental?</Accordion.Header>
                    <Accordion.Body>
                    CCRental website does not allow users to book rental services directly through our platform. 
                    However, we will redirect you to the rental service's website to complete the booking.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Are there any fees for using a rental service comparison website?</Accordion.Header>
                    <Accordion.Body>
                    No, CCRental website are free to use.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                    <Accordion.Header>Is my personal information safe on a rental service comparison website?</Accordion.Header>
                    <Accordion.Body>
                    CCRental website will take and enforece measures to protect our users' personal information, 
                    such as using encryption and secure servers. We take high priority on our user's personal information, 
                    making sure that it is safe for everyone to use. 
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

    </div>


    <div className="QuestionSection mt-5 mb-5">
                <h3 className="ms-4 mt-3 p-3">Search Page FAQ</h3>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>What is the search page?</Accordion.Header>
                    <Accordion.Body>
                    The search page is a page where users are able to input their fields, for example they can input their pick-up location / current location, date, time 
                    for better filter of the results. After which, users can click the search button to view the displayed results.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How do I refine my search results?</Accordion.Header>
                    <Accordion.Body>
                    To refine search results, one can use the filter options at the side of the website on the results page. After filtering out to their own preference, 
                    a new displayed results will be shown. 
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>How frequently are the results being updated?</Accordion.Header>
                    <Accordion.Body>
                    CCRental comparison strive to provide accurate pricing information, 
                    but prices can change frequently. 
                    We strive to attain real-time updates, however, some of the pricing information might changed due to other circumstances.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Can I search for content in a specific language?</Accordion.Header>
                    <Accordion.Body>
                    CCRental is aiming to seek for improvement to include other language. However, at the moment, CCRental can only display contents in English (US).
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

    </div>



        </Container>
    )
}

export default Help;