import * as React from "react";
import {Outlet} from "react-router-dom";
import {Button, Card, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("student");
        // request na endpoint sprawdzający kod
        // request na enpoint do bazy
        // w responsie dostaje dane z bazy: checkpoint, adress gh, readme - opis zadania
        // przekierowanie no /student
        navigate("/student");

    }


    return (
        <div className="content">
            <Card className="w-50 m-auto mt-5" >
                <Card.Header as="h5">Join Session</Card.Header>
                <Card.Body>
                    <Card.Title>To join session provide name and entrance code</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Github username</Form.Label>
                            <Form.Control placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSessionCode">
                            <Form.Label>Session Code</Form.Label>
                            <Form.Control placeholder="Session Code" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Join Session
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Outlet/>
        </div>
    )
}
export default Home;
