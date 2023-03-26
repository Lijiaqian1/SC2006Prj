import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BookMarkComponent = (props) => {
    return (
    <div>
    <Card className="mx-4 mt-5 mb-3">
      <Card.Header className="header" as="h5">{props.bookMarkdata.pickuplocation}</Card.Header>
      <Card.Body>
        <Row>
            <Col>
                <h3>Duration</h3>
                <Row>
                    <p className="resultsdetails">{props.bookMarkdata.duration}</p>
                </Row>
            </Col>
        </Row>
      </Card.Body>
    </Card>
    </div>
    )
}

export default BookMarkComponent;