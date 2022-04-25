import * as React from "react";
import {Alert, Badge, FormControl, FormGroup, FormText, Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import TopicValidator from "./objects/validators/TopicValidator";
import axios from "axios";
import Subject from "./objects/Subject";
import {useSearchParams} from "react-router-dom";

const TopicForm = () => {

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.get("chosen_subject") !== null){
            axios.get("/subjects/"+searchParams.get("chosen_subject")).then((response) => {
                setSubjects([response.data])
                setSubject(response.data.id.toString())
            }).catch((e) => {
                console.error("cannot fetch subject: "+e);
            })
        }
        else{
            axios.get("/mocked_subjects.json").then((response) => {
                setSubjects(response.data)
                response.data.length > 0 ? setSubject(response.data[0].id.toString()) : setSubject("")
            }).catch((e) => {
                console.error("cannot fetch subject: "+e);
            })
        }

    }, [])

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const subjectOptions = subjects.map((subject) => <option key={"key-option-topic"+subject.name} value={subject.id}>{subject.name}</option>)

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [subject, setSubject] = useState<string>("");

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescriptionChange = (e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handleSubjectChange = (e:React.ChangeEvent<HTMLSelectElement>) => setSubject(e.target.value);

    const handleRequestSucceed = () => {
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 3000)
        setTitle("");
        setDescription("");
        setSubject(subjects.length > 0 ? subjects[0].id.toString() : "");
    }

    const handleRequestFailed = () => {
        setShowFailAlert(true);
        setTimeout(() => {
            setShowFailAlert(false);
        }, 3000)
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const topicValidator: TopicValidator = new TopicValidator();
        if(topicValidator.validateTitle(title) && topicValidator.validateDescription(description) && topicValidator.validateSubject(subject)){
            // TODO make POST/PUT request to add Topic to database
            handleRequestSucceed();
        }
        else{
            handleRequestFailed();
        }
        setSubjectError(topicValidator.subjectError);
        setTitleError(topicValidator.titleError);
        setDescriptionError(topicValidator.descriptionError);
    }

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [subjectError, setSubjectError] = useState("");

    return(
        <Card className="col-md-8 col-lg-6 col-11 ms-2 mt-2 m-lg-3 p-3 bg-light">
            <h2>Topics  <Badge bg="secondary">New</Badge> </h2>
            {showSuccessAlert ? <Alert variant="success">Topic Added Successfully</Alert> : null }
            {showFailAlert ? <Alert variant="danger">An error occurred while adding topic</Alert> : null }
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <label htmlFor="titleTopicForm" >Title</label>
                    <FormControl id="titleTopicForm" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    <FormText className="text-danger me-5">{titleError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="descriptionTopicForm">Description</label>
                    <FormControl id="descriptionTopicForm" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
                    <FormText className="text-danger me-5">{descriptionError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="subjectTopicForm">Subject</label>
                    <Form.Select value={subject} onChange={handleSubjectChange}>
                        {subjectOptions}
                    </Form.Select>
                    <FormText className="text-danger me-5">{subjectError}</FormText>
                </FormGroup>
                <input className="btn btn-primary" type="submit" value="Create" />
            </form>
        </Card>
    )
}

export default TopicForm;
