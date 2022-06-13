import * as React from "react";
import CheckpointObject from "../../objects/CheckpointObject";
import Checkpoint from "./Checkpoint";

type propsType = {
    checkpoints: CheckpointObject[],
}



const Checkpoints = (props: propsType) => {

    return (
        <div id="checkPointListWrapper">
        < ol id="checkPointList" >
            {
                props.checkpoints.map((checkpoint: CheckpointObject, index) =>
                    <Checkpoint checkpoint={checkpoint} idNumber={index}></Checkpoint>
                )
            }
        </ol >
        </div>    )

}

export default Checkpoints;
