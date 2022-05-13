import * as React from "react";
import {Button, Card, FormGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent} from "react";



const SignUp = () =>{

    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        navigate("/teacher");
    }

    return(
        <div className=" d-flex justify-content-center">
            <Card className="mt-5">
                <Card.Header>Sign up as lecturer</Card.Header>
                <Card.Body>
                    <form className="" onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <label>
                                First name:
                                <input name="firstName" className="form-control" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Surname:
                                <input name="surname" className="form-control" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github nickname:
                                <input name="nickname" className="form-control" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github token:
                                <input name="token" className="form-control" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Password:
                                <input name="password" className="form-control mb-3" type="password"/>
                            </label>
                        </FormGroup>
                        <input className="btn btn-outline-dark" type="submit" value="Create account"/>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUp;
