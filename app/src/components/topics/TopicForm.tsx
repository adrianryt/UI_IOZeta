import * as React from "react";
import {Alert, Badge, FormControl, FormGroup, FormText, Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import TopicValidator from "../../objects/validators/TopicValidator";
import axios from "axios";
import Subject from "../../objects/Subject";
import {useSearchParams} from "react-router-dom";
import CookieService from "../../objects/services/CookieService";


type Checkpoint = {
    title?: string,
    description?: string,
}

const TopicForm = () => {

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.get("chosen_subject") !== null){
            axios.get("http://localhost:8080/subjects/"+searchParams.get("chosen_subject"), {
                headers: {
                    "authorization": `Bearer ${CookieService.getCookie("access_token")}`
                }
            }).then((response) => {
                setSubjects([response.data])
                setSubject(response.data.name)
            }).catch((e) => {
                console.error("cannot fetch subject: "+e);
            })
        }
        else{
            axios.get("http://localhost:8080/subjects/all", {
                headers: {
                    "authorization": `Bearer ${CookieService.getCookie("access_token")}`
                }
            }).then((response) => {
                setSubjects(response.data)
                response.data.length > 0 ? setSubject(response.data[0].name.toString()) : setSubject("")
            }).catch((e) => {
                console.error("cannot fetch subject: "+e);
            })
        }

    }, [])

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const subjectOptions = subjects.map((subject) => <option key={"key-option-topic"+subject.name} value={subject.name}>{subject.name}</option>)

    const [message, setMessage] = useState<string>("");

    const [title, setTitle] = useState<string>("");
    const [githubUsername, setGithubUsername] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [repoName, setRepoName] = useState<string>("");
    const [readmeLink, setReadmeLink] = useState<string>("");

    const [checkpointsNumber, setCheckpointsNumber] = useState<undefined | number>(undefined)
    const [checkpoints, setCheckpoints] = useState<(Checkpoint | undefined)[]>([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleGithubUsernameChange= (e:React.ChangeEvent<HTMLInputElement>) => setGithubUsername(e.target.value);
    const handleSubjectChange = (e:React.ChangeEvent<HTMLSelectElement>) => setSubject(e.target.value);
    const handleRepoNameChange = (e:React.ChangeEvent<HTMLInputElement>) => setRepoName(e.target.value);
    const handleReadmeLinkChange = (e:React.ChangeEvent<HTMLInputElement>) => setReadmeLink(e.target.value);

    const handleCheckpointNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let currentValue = parseInt(e.target.value, 10);
        if (!checkpoints|| currentValue > checkpoints.length) {
            setCheckpoints([
                ...checkpoints,
                ...new Array(currentValue - checkpoints.length),
            ]);
        }
        setCheckpointsNumber(currentValue);
    };

    const handleRequestSucceed = () => {
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 3000)
        setTitle("");
        setSubject(subjects.length > 0 ? subjects[0].id.toString() : "");
        setRepoName("");
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
        if(topicValidator.validateTitle(title) &&
            topicValidator.validateSubject(subject) &&
            topicValidator.validateRepoName(repoName) &&
            topicValidator.validateGithubUsername(githubUsername) &&
            topicValidator.validateReadmeLink(readmeLink)){
            // TODO make POST/PUT request to add Topic to database

            const data = {
                taskName: title,
                lecturerGitNick: githubUsername,
                repositoryName: repoName,
                subject,
                readmeLink: readmeLink,
                checkpointsContent: checkpoints,
            }
            axios
                .post("http://localhost:8080/task/add",
                    data, {
                        headers: {
                            "authorization": `Bearer ${CookieService.getCookie("access_token")}`
                        }
                    })
                .then((response) => {
                    if (response.status === 200) {
                        setMessage("Topic added");
                        handleRequestSucceed();
                    } else {
                        setMessage("Error while adding topic");
                        handleRequestFailed();
                    }
                })
                .catch(() => setMessage("Error while adding topic"));
        }
        else{
            handleRequestFailed();
        }
        setSubjectError(topicValidator.subjectError);
        setTitleError(topicValidator.titleError);
        setGithubUsernameError(topicValidator.githubUsernameError)
        setRepoNameError(topicValidator.repoNameError);
        setReadmeLinkError(topicValidator.readmeLinkError);
    }

    const [titleError, setTitleError] = useState<string>("");
    const [githubUsernameError, setGithubUsernameError] = useState<string>("");
    const [subjectError, setSubjectError] = useState<string>("");
    const [repoNameError, setRepoNameError] = useState<string>("");
    const [readmeLinkError, setReadmeLinkError] = useState<string>("");

    return(
        <Card className="col-md-8 col-lg-6 col-11 ms-2 mt-2 m-lg-3 p-3 bg-light">
            {!!message && <div>{message} </div>}
            <h2>Topics  <Badge bg="secondary">New</Badge> </h2>
            {showSuccessAlert ? <Alert variant="success">Topic Added Successfully</Alert> : null }
            {showFailAlert ? <Alert variant="danger">An error occurred while adding topic</Alert> : null }
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <label htmlFor="titleTopicForm">Title</label>
                    <FormControl id="titleTopicForm" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    <FormText className="text-danger me-5">{titleError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="githubUsernameForm">Github Username</label>
                    <FormControl id="githubUsernameForm" placeholder="Enter github username" value={githubUsername} onChange={handleGithubUsernameChange} />
                    <FormText className="text-danger me-5">{githubUsernameError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="repoNameForm">Repository Name</label>
                    <FormControl id="repoNameForm" placeholder="Enter repository name" value={repoName} onChange={handleRepoNameChange} />
                    <FormText className="text-danger me-5">{repoNameError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="ReadMeLinkForm">README Link</label>
                    <FormControl id="ReamMeLinkForm" placeholder="Enter README link" value={readmeLink} onChange={handleReadmeLinkChange} />
                    <FormText className="text-danger me-5">{readmeLinkError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="subjectTopicForm">Subject</label>
                    <Form.Select value={subject} onChange={handleSubjectChange}>
                        {subjectOptions}
                    </Form.Select>
                    <FormText className="text-danger me-5">{subjectError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="checkpointsNumber">Number of checkpoints</label>
                    <FormControl id="checkpointsNumber" placeholder="Enter number of checkpoints" value={checkpointsNumber} onChange={handleCheckpointNumberChange} />
                </FormGroup>
                {!!checkpointsNumber &&
                    checkpoints.slice(0, checkpointsNumber).map((el, id) => (
                        <div key={id}>
                            <FormGroup>
                                {id + 1}{" "}
                                <FormControl  id="checkpointsTitle"
                                              className="mb-2"
                                              placeholder="Enter checkpoint title"
                                              value={el?.title}
                                              onChange={(e) => {
                                                  const arr = [...checkpoints];
                                                  arr[id] = {
                                                      ...arr[id],
                                                      title: e.target.value,
                                                  }
                                                  setCheckpoints(arr);
                                                }}/>
                                <FormControl id="checkpointsDescription"
                                             className="mb-2"
                                             placeholder="Enter checkpoint description"
                                             value={el?.description}
                                             onChange={(e) => {
                                                 const arr = [...checkpoints];
                                                 arr[id] = {
                                                     ...arr[id],
                                                     description: e.target.value,
                                                 }
                                                 setCheckpoints(arr);
                                             }}/>
                            </FormGroup>
                        </div>

                    ))}

                <input className="btn btn-primary" type="submit" value="Create" />
            </form>
        </Card>
    )
}

export default TopicForm;
