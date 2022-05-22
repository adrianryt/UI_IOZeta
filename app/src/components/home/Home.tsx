import * as React from "react";
import {Outlet} from "react-router-dom";
import {Button, Card, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {useCookies} from "react-cookie";



const Home = () => {

    const ADD_STUDENT_URL = "http://localhost:8080/student/add-to-session";
    const navigate = useNavigate();

    const [message, setMessage] = useState<string>("");
    const [githubUsername, setGithubUsername] = useState<string>("");
    const [code, setCode] = useState<string>("");

    const [cookies, setCookie, removeCookie] = useCookies(['session_id', 'student_id']);

    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => setGithubUsername(e.target.value);
    const handleCodeChange = (e:React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const data = {
            githubUsername,
            code
        }
        axios
            .post(ADD_STUDENT_URL, data)
            .then((response) => {
                if(response.status === 200) {
                    //set cookie                                                          2h v - can be changed
                    setCookie("session_id", response.data.session_id, {maxAge: 60*60*2, path: "/", secure: true});
                    setCookie("student_id", response.data.student_id, {maxAge: 60*60*2, path: "/", secure: true});
                    navigate("/student");
                } else {
                    setMessage("Error while joining session")

                }
            })
            .catch(() => setMessage("Error while joining session"))
    }

    return (
        <div className="content">
            <Card className="w-50 m-auto mt-5" >
                {!!message && <div>{message} </div>}
                <Card.Header as="h5">Join Session</Card.Header>
                <Card.Body>
                    <Card.Title>To join session provide name and entrance code</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Github username</Form.Label>
                            <Form.Control placeholder="Username" value={githubUsername} onChange={handleUsernameChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSessionCode">
                            <Form.Label>Session Code</Form.Label>
                            <Form.Control placeholder="Session Code" value={code} onChange={handleCodeChange} />
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
