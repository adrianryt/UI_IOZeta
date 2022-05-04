import * as React from "react";
import {Button, Card} from "react-bootstrap";
import TopicObject from "../../objects/TopicObject";

type propsType = {
    topic: TopicObject
}

const Topic = (props: propsType) => {
    return(
        <Card className="ms-2 mt-2 mb-5 border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info">{props.topic.title} | {props.topic.subject}</Card.Header>
            <Card.Body>
                <div className="mb-3">{props.topic.description}</div>
                <div className="mb-3">repository name: {props.topic.repoName}</div>
                <Button>Create Session</Button>
            </Card.Body>
        </Card>
    )

}

export default Topic;
