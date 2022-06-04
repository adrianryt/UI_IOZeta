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
    const [noCommitError, setNoCommitError] = useState<string>("");

    const checkboxPopover = (
        <Popover id="popover-basic">
            <Popover.Body className="text-light bg-dark">
                {checked ? "Mark checkpoint as uncompleted" : "Mark checkpoint as completed"}
            </Popover.Body>
        </Popover>
    );

    const handleChange = () => {
      setChecked(!checked);
      setNoCommitError("");

      const session_id = CookieService.getCookie("session_id");
      const student_id = CookieService.getCookie("student_id");

      axios({
          method: "post",
          url: "https://io-spring-demo.herokuapp.com/progress/update",
          data: {
              "student_id": student_id,
              "session_id": session_id,
              "checkpoint_number": checkpoint.number
          }}).catch((e)=>setNoCommitError("Commit matching this checkpoint not found."));
    }

    return(

        <div id="checkpoint" className="">

            <Card className="checkpoint" key={checkpoint.title + ':' + checkpoint.description}>
                <Card.Header>

                    <OverlayTrigger
                        placement="left"
                        overlay={checkboxPopover}
                    >
                        <input id="progress-checkbox" className="me-1" type="checkbox" checked={checked} onChange={handleChange}/>
                    </OverlayTrigger>
                    {checkpoint.title}
                    <p className="text-danger me-5">
                        {noCommitError}
                    </p>
                </Card.Header>
                <Card.Body>
                    <p>{checkpoint.description}</p>
                    <textarea readOnly rows={checkpoint.commands.length}
                              value={checkpoint.commands.join("\n")}>
                                </textarea><br />
                    <Button onClick={() => {
                        navigator.clipboard.writeText(checkpoint.commands.join(" & "));  //copy git command
                    }
                    }>Copy</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Checkpoint;
