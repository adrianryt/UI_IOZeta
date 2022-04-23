import * as React from "react";
import {Badge, Card, Form, FormControl, FormGroup, FormText} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Lecturer from "../../../objects/Lecturer";

const SubjectForm = () => {

    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const lecturersOptions = lecturers.map((lecturer) => <option key={"key-option-topic"+lecturer.name} value={lecturer.name+" "+lecturer.surname+" "+lecturer.gitNick}>{lecturer.name} {lecturer.surname} ({lecturer.gitNick})</option>)

    useEffect(() => {
        axios.get("/mocked_lecturers.json").then((response) => {
            setLecturers(response.data);
        }).catch((e) => {
            console.error("cannot fetch lecturers: "+ e);
        })
    }, [])

    return(
        <Card className="w-50 ms-5 p-3 bg-light">
            <h2>Subjects  <Badge bg="secondary">New</Badge> </h2>
            {/*{showSuccessAlert ? <Alert variant="success">Topic Added Successfully</Alert> : null }
            {showFailAlert ? <Alert variant="danger">An error occurred while adding topic</Alert> : null }*/}
            <form>
                <FormGroup>
                    <label htmlFor="NameSubjectForm" >Subject</label>
                    <FormControl id="NameSubjectForm" placeholder="Enter Name" />
                    <FormText className="text-danger me-5"></FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="RepositoryNameSubjectForm">Repository Name</label>
                    <FormControl id="RepositoryNameSubjectForm" placeholder="Enter Repository Name" />
                    <FormText className="text-danger me-5"></FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="LecturerSubjectForm">Lecturer</label>
                    <Form.Select>
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