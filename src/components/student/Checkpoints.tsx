import * as React from "react";
import { Button, Card } from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import Checkpoint from "./Checkpoint";

type propsType = {
    checkpoints: CheckpointObject[],
}



const Checkpoints = (props: propsType) => {

    return (

        < ol >
            {
                props.checkpoints.map((checkpoint: CheckpointObject) =>
                    <Checkpoint checkpoint={checkpoint}></Checkpoint>
                )
            }
        </ol >

    )

}

export default Checkpoints;
