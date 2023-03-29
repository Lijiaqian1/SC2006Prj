import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {NavLink, useNavigate} from 'react-router-dom';


const BookMarkComponent = (props) => {
    return (
    <div>
    <Card className="mx-4 mt-5 mb-3">
      <Card.Header className="header" as="h5">{props.bookMarkdata.pickupLocation}</Card.Header>
      <Card.Body>
        <Row>
            <Col>
                <h3>Duration</h3>
                <Row>
                    <p className="resultsdetails">{props.bookMarkdata.duration}</p>
                </Row>
            </Col>

            <Col></Col>
            <Col></Col>

            <Col className="mt-4">
              <NavLink to='/search'>
              <button type="submit" className="btn btn-primary px-5">Continue to Search</button>
              </NavLink>
            </Col>
        </Row>
      </Card.Body>
    </Card>
    </div>
    )
}

export default BookMarkComponent;