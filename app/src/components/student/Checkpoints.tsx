import * as React from "react";
import CheckpointObject from "../../objects/CheckpointObject";
import Checkpoint from "./Checkpoint";

type propsType = {
    checkpoints: CheckpointObject[],
}



const Checkpoints = (props: propsType) => {

    return (

        < ol id="checkPointList">
            {
                props.checkpoints.map((checkpoint: CheckpointObject) =>
                    <Checkpoint checkpoint={checkpoint}></Checkpoint>
                )
            }
        </ol >

    )

}

export default Checkpoints;
