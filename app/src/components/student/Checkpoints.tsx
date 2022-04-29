import * as React from "react";
import { Button, Card } from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";

type propsType = {
    checkpoints: CheckpointObject[],
}

const Checkpoints = (props: propsType) => {

    return (

        < ol >
            {
                props.checkpoints.map((checkpoint: CheckpointObject) =>
                    <Card className="checkpoint w-80 m-auto" key={checkpoint.title}>
                        <Card.Header>
                            {checkpoint.title}
                        </Card.Header>
                        <Card.Body>
                            <p>{checkpoint.description}</p>
                            <input type="text" readOnly
                                value={checkpoint.command}>
                            </input><br />
                            <Button onClick={() => {
                                navigator.clipboard.writeText(checkpoint.command);  //copy git command
                            }
                            }>Skopiuj</Button>
                        </Card.Body>
                    </Card>
                )
            }
        </ol >

    )

}

export default Checkpoints;
