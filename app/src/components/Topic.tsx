import * as React from "react";
import {Button, Card} from "react-bootstrap";
import TopicObject from ".././objects/TopicObject";

type propsType = {
    topic: TopicObject
}

const Topic = (props: propsType) => {
    return(
        <Card>
            <Card.Header>{props.topic.title} | {props.topic.subject}</Card.Header>
            <Card.Body>
                <div>{props.topic.description}</div>
                <Button>Create Session</Button>
            </Card.Body>
        </Card>
    )

}

export default Topic;