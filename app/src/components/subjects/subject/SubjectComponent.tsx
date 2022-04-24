import * as React from "react";
import {Card} from "react-bootstrap";
import Subject from "../../../objects/Subject";
import {Link} from "react-router-dom";

type propsType = {
    subject: Subject
}

const SubjectComponent = ({subject}: propsType) => {

    const topicList = subject.topics.map((topic) => <div key={topic.subject+""+topic.description+""+topic.title+"in_div"}>
       <Link to={"/topic/"+topic.id}>{topic.title}</Link>
    </div>)

    return(
        <Card className="ms-2 mb-5 border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info">
                {subject.name} | {subject.lecturer.name} {subject.lecturer.surname}
            </Card.Header>
            <Card.Body>
                <div>
                    <h4>List of topics:</h4>
                    {topicList}
                </div>
                <hr />
               <div>
                   <Link to={"/topics/new?chosen_subject="+subject.id} className="btn btn-primary">Add new topic</Link>
               </div>
            </Card.Body>
        </Card>
    )
}

export default SubjectComponent;
