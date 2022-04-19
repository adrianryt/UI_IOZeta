import * as React from "react";
import {Card} from "react-bootstrap";
import Subject from "../../../objects/Subject";

type propsType = {
    subject: Subject
}

const SubjectComponent = ({subject}: propsType) => {
    return(
        <Card>
            <Card.Header>
                {subject.name} | {subject.lecturer.name} {subject.lecturer.surname}
            </Card.Header>
            <Card.Body>
                <div>
                    <h4>List of topics:</h4>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SubjectComponent;