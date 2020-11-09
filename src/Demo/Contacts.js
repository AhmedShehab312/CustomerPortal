import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import Aux from "../hoc/_Aux";


class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <Aux>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Contacts</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <p style={{ textAlign: "center", fontSize: "30px", marginBottom: "30px", marginTop: "30px" }}>No Contacts</p>
                    </Card.Body>
                </Card>
            </Aux>
        )
    }
}


export default Contacts;