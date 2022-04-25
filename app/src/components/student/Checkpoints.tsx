import * as React from "react";
import { Button } from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";

type propsType = {
    checkpoints: CheckpointObject[],
}

const Checkpoints = (props: propsType) => {

    return (

        < ol >
            {
                props.checkpoints.map((checkpoint: CheckpointObject) =>
                    <li key={checkpoint.title}>
                        <h3>{checkpoint.title}</h3>
                        <p>{checkpoint.description}</p>
                        <input type="text" readOnly
                            value={checkpoint.command}>
                        </input>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(checkpoint.command);  //kopiuj komendę gitową do schowka
                        }
                        }>Skopiuj</Button>
                    </li>
                )
            }
        </ol >

    )

}

export default Checkpoints;
