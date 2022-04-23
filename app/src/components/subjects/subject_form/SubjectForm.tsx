import * as React from "react";
import {Alert, Badge, Card, Form, FormControl, FormGroup, FormText} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Lecturer from "../../../objects/Lecturer";

const SubjectForm = () => {

    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const lecturersOptions = lecturers.map((lecturer) => <option key={"key-option-topic"+lecturer.name} value={lecturer.id}>{lecturer.name} {lecturer.surname} ({lecturer.gitNick})</option>)

    useEffect(() => {
        axios.get("/mocked_lecturers.json").then((response) => {
            setLecturers(response.data);
        }).catch((e) => {
            console.error("cannot fetch lecturers: "+ e);
        })
    }, [])

    const [name, setName] = useState<string>("");
    const [repoName, setRepoName] = useState<string>("");
    const [lecturer, setLecturer] = useState<string>("");

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleRepoNameChange = (e:React.ChangeEvent<HTMLInputElement>) => setRepoName(e.target.value);
    const handleLecturerChange = (e:React.ChangeEvent<HTMLSelectElement>) => setLecturer(e.target.value);

    const handleRequestSucceed = () => {
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 3000)
        setName("");
        setRepoName("");
        setLecturer(lecturers.length > 0 ? lecturers[0].id.toString() : "");
    }

    const handleRequestFailed = () => {
        setShowFailAlert(true);
        setTimeout(() => {
            setShowFailAlert(false);
        }, 3000)
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return(
        <Card className="w-50 ms-5 p-3 bg-light">
            <h2>Subjects  <Badge bg="secondary">New</Badge> </h2>
            {showSuccessAlert ? <Alert variant="success">Topic Added Successfully</Alert> : null }
            {showFailAlert ? <Alert variant="danger">An error occurred while adding topic</Alert> : null }
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <label htmlFor="NameSubjectForm" >Subject</label>
                    <FormControl id="NameSubjectForm" placeholder="Enter Name" value={name} onChange={handleNameChange} />
                    <FormText className="text-danger me-5"></FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RepositoryNameSubjectForm">Repository Name</label>
                    <FormControl id="RepositoryNameSubjectForm" placeholder="Enter Repository Name" value={repoName} onChange={handleRepoNameChange} />
                    <FormText className="text-danger me-5"></FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="LecturerSubjectForm">Lecturer</label>
                    <Form.Select value={lecturer} onChange={handleLecturerChange}>
                        {lecturersOptions}
                    </Form.Select>
                    <FormText className="text-danger me-5"></FormText>
                </FormGroup>
                <input className="btn btn-primary" type="submit" value="Create" />
            </form>
        </Card>
    )
}

export default SubjectForm;