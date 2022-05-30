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
            axios.get("http://localhost:8080/subjects/all?username=" + CookieService.getCookie("username"),
                {
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

    const [checkpointsNumber, setCheckpointsNumber] = useState<undefined | number>(undefined)
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showFailAlert, setShowFailAlert] = useState<boolean>(false);

    const [addFilesLink, setAddFilesLink] = useState<string>("");

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleGithubUsernameChange= (e:React.ChangeEvent<HTMLInputElement>) => setGithubUsername(e.target.value);
    const handleSubjectChange = (e:React.ChangeEvent<HTMLSelectElement>) => setSubject(e.target.value);
    const handleRepoNameChange = (e:React.ChangeEvent<HTMLInputElement>) => setRepoName(e.target.value);

    const handleCheckpointNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value !== "" && !isNaN(Number(e.target.value)) && parseInt(e.target.value, 10) >= 0 && parseInt(e.target.value, 10) <= 50){
            const currentValue = parseInt(e.target.value, 10);
            if (currentValue > checkpoints.length) {
                const checkPointsTitleErrorsNewArray: string[] = []
                const checkPointsDescriptionErrorsNewArray: string[] = []
                let newArray = [
                    ...checkpoints,
                    ...new Array(currentValue - checkpoints.length),
                ].map(element => {
                    checkPointsDescriptionErrorsNewArray.push("")
                    checkPointsTitleErrorsNewArray.push("")
                    if(element === undefined){
                        return {}
                    }
                    else{
                        return element;
                    }
                })
                setCheckPointTitleErrors(checkPointsTitleErrorsNewArray)
                setCheckPointDescriptionErrors(checkPointsDescriptionErrorsNewArray)
                setCheckpoints(newArray);
            }
            setCheckpointsNumber(currentValue);
        }
        else{
            setCheckpointsNumber(undefined);
        }
    };

    const handleRequestSucceed = () => {
        setShowSuccessAlert(true);
        const link = "https://github.com/" + githubUsername + "/" + repoName + "/upload/main"
        setAddFilesLink(link);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 5000)
        setTitle("");
        setSubject(subjects.length > 0 ? subjects[0].name.toString() : "");
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
            topicValidator.validateGithubUsername(githubUsername)){
            topicValidator.validateCheckPointNumber(checkpointsNumber) &&
            topicValidator.validateCheckPointTitles(checkpoints.map(checkpoint => checkpoint.title ? checkpoint.title : "")) &&
            topicValidator.validateCheckPointDescription(checkpoints.map(checkpoint => checkpoint.description ? checkpoint.description : ""))){

            axios({
                url: "http://localhost:8080/task/add",
                method: "post",
                headers: {
                    "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
                },
                data: {
                    'taskName': title,
                    'subject': subject,
                    'repositoryName': repoName,
                    'lecturerGitNick': CookieService.getCookie('username'),
                    'checkpointsContent': checkpoints.slice(0, checkpointsNumber)
                }
            }).then((response) => {
                if (response.status === 200) {
                    setMessage("");
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
        setRepoNameError(topicValidator.repoNameError);
        setCheckPointNumberError(topicValidator.checkPointNumberError);
        setCheckPointDescriptionErrors(topicValidator.checkPointDescriptionErrors);
        setCheckPointTitleErrors(topicValidator.checkPointTitleErrors);
    }

    const [titleError, setTitleError] = useState<string>("");
    const [subjectError, setSubjectError] = useState<string>("");
    const [repoNameError, setRepoNameError] = useState<string>("");
    const [readmeLinkError, setReadmeLinkError] = useState<string>("");
    const [checkPointNumberError, setCheckPointNumberError] = useState<string>("");
    const [checkPointTitleErrors, setCheckPointTitleErrors] = useState<string[]>([]);
    const [checkPointDescriptionErrors, setCheckPointDescriptionErrors] = useState<string[]>([]);

    return(
    <div className="d-flex justify-content-center">
        <Card className="col-md-8 col-lg-6 col-11 ms-2 mt-2 m-lg-3 p-3 bg-light">
            {!!message && <div>{message}</div>}
            <h2>Topics  <Badge bg="secondary">New</Badge> </h2>
            {showSuccessAlert ? <Alert variant="success">Topic Added Successfully</Alert> : null }
            {showFailAlert ? <Alert variant="danger">An error occurred while adding topic</Alert> : null }
            {!!addFilesLink && <Card.Header className="mt-3">
                <p><strong>To add your project please visit this website:</strong></p>
                <a href={addFilesLink} target="_blank">{addFilesLink}</a>
                <p className="mt-2"><strong>If you're new to github, please follow steps described below: </strong></p>
                <ul>
                    <li>1. Drag folder with your code to "Drag files area"</li>
                    <li>2. Write your commit name in "Add files via upload" label ex. "Add base code"</li>
                    <li>3. Optional - You can describe your commit in "Add an optional extended description label"</li>
                    <li>4. Click green "Commit changes" button</li>
                    <li>5. That's all! </li>
                </ul>
            </Card.Header>}
            <form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <label htmlFor="titleTopicForm">Title</label>
                    <FormControl id="titleTopicForm" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    <FormText className="text-danger me-5">{titleError}</FormText>
                </FormGroup>
                <FormGroup>
                    <label  htmlFor="repoNameForm">Repository Name</label>
                    <FormControl id="repoNameForm" placeholder="Enter repository name" value={repoName} onChange={handleRepoNameChange} />
                    <FormText className="text-danger me-5">{repoNameError}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="subjectTopicForm">Subject</label>
                        <Form.Select value={subject} onChange={handleSubjectChange}>
                            {subjectOptions}
                        </Form.Select>
                        <FormText className="text-danger me-5">{subjectError}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="checkpointsNumber">Number of checkpoints (1 - 50)</label>
                        <FormControl id="checkpointsNumber" type="number" placeholder="Enter number of checkpoints" value={checkpointsNumber} onChange={handleCheckpointNumberChange} />
                        <FormText className="text-danger me-5">{checkPointNumberError}</FormText>
                    </FormGroup>
                    {checkpoints.slice(0, checkpointsNumber ? checkpointsNumber : 0).map((el, id) => (
                            <div key={id}>
                                <FormGroup>
                                    {id + 1}{" "}
                                    <FormControl  id="checkpointsTitle"
                                                  className="mb-2"
                                                  placeholder="Enter checkpoint title"
                                                  value={el.title}
                                                  onChange={(e) => {
                                                      const arr = [...checkpoints];
                                                      arr[id] = {
                                                          ...arr[id],
                                                          title: e.target.value,
                                                      }
                                                      setCheckpoints(arr);
                                                    }}/>
                                    <FormText className="text-danger me-5">{checkPointTitleErrors[id]}</FormText>
                                    <FormControl id="checkpointsDescription"
                                                 className="mb-2"
                                                 placeholder="Enter checkpoint description"
                                                 value={el.description}
                                                 onChange={(e) => {
                                                     const arr = [...checkpoints];
                                                     arr[id] = {
                                                         ...arr[id],
                                                         description: e.target.value,
                                                     }
                                                     setCheckpoints(arr);
                                                 }}/>
                                    <FormText className="text-danger me-5">{checkPointDescriptionErrors[id]}</FormText>
                                </FormGroup>
                            </div>

                        ))}

                    <input className="btn btn-primary mt-4" type="submit" value="Create" />
                </form>
            </Card>
        </div>
    )
}

export default TopicForm;
