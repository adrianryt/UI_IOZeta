import * as React from "react";
import {Alert, Badge, Card, FormControl, FormGroup, FormText} from "react-bootstrap";
import {useState} from "react";
import SubjectValidator from "../../../objects/validators/SubjectValidator";
import axios from "axios";
import CookieService from "../../../objects/services/CookieService";
import {useCookies} from "react-cookie";

const SubjectForm = () => {
    const [name, setName] = useState<string>("");

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const [nameError, setNameError] = useState("");

    const handleRequestSucceed = () => {
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 3000)
        setName("");
    }

    const handleRequestFailed = () => {
        setShowFailAlert(true);
        setTimeout(() => {
            setShowFailAlert(false);
        }, 3000)
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const subjectValidator = new SubjectValidator();
        if(subjectValidator.validateName(name)){

            axios({
                url: "http://localhost:8080/subjects/save",
                method: "post",
                headers: {
                    "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
                },
                data: {
                    'name': name,
                    'lecturer': {
                        'id': CookieService.getCookie("lecturer_id")
                    }
                }
            }).then((response) =>{

            }).catch((e) => {
                // TODO wezcie jakos error obsluzcie 🥺
            })
            handleRequestSucceed();
        }
        else{
            handleRequestFailed();
        }
        setNameError(subjectValidator.nameError);
    }

    return(
        <Card className="col-md-8 col-lg-6 col-11 ms-2 mt-2 m-lg-3 p-3 bg-light">
            <h2>Subjects  <Badge bg="secondary">New</Badge> </h2>
            {showSuccessAlert ? <Alert variant="success">Subject Added Successfully</Alert> : null }
            {showFailAlert ? <Alert variant="danger">An error occurred while adding subject</Alert> : null }
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <label htmlFor="NameSubjectForm" >Subject</label>
                    <FormControl id="NameSubjectForm" placeholder="Enter Name" value={name} onChange={handleNameChange} />
                    <FormText className="text-danger me-5">{nameError}</FormText>
                </FormGroup>
                <input className="btn btn-primary" type="submit" value="Create" />
            </form>
        </Card>
    )
}

export default SubjectForm;
