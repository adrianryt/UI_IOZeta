import * as React from "react";
import {Button, Card, OverlayTrigger, Popover} from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import {useState} from "react";
import axios from "axios";
import CookieService from "../../objects/services/CookieService";
import "./Checkpoints.css"

const Checkpoint = (props: {checkpoint: CheckpointObject}) => {

    const checkpoint = props.checkpoint;

    const [checked, setChecked] = useState(checkpoint.progressCheckBox);

    const checkboxPopover = (
        <Popover id="popover-basic">
            <Popover.Body className="text-light bg-dark">
                {checked ? "Mark checkpoint as uncompleted" : "Mark checkpoint as completed"}
            </Popover.Body>
        </Popover>
    );

    const handleChange = () => {
      setChecked(!checked);

      const session_id = CookieService.getCookie("session_id");
      const student_id = CookieService.getCookie("student_id");

      // axios({
      //     method: "post",
      //     url: "http://localhost:8080/",
      //     headers: {
      //
      //     }
      //     }
      // );

    }

    return(

        <div id="checkpoint" className="">

            <Card className="checkpoint" key={checkpoint.title + ':' + checkpoint.description}>
                <Card.Header>

                    <OverlayTrigger
                        placement="left"
                        overlay={checkboxPopover}
                    >
                        <input id="progress-checkbox" className="me-1" type="checkbox" checked={checkpoint.progressCheckBox} onChange={handleChange}/>
                    </OverlayTrigger>
                    {checkpoint.title}
                </Card.Header>
                <Card.Body>
                    <p>{checkpoint.description}</p>
                    <textarea readOnly rows={checkpoint.commands.length}
                              value={checkpoint.commands.join("\n")}>
                                </textarea><br />
                    <Button onClick={() => {
                        navigator.clipboard.writeText(checkpoint.commands.join(" & "));  //copy git command
                    }
                    }>Skopiuj</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Checkpoint;
