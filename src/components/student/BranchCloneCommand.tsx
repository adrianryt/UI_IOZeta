import * as React from "react";
import {Button, Card, OverlayTrigger, Popover} from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import {useState} from "react";
import axios from "axios";
import CookieService from "../../objects/services/CookieService";
import "./Checkpoints.css"
import Branch from "../../objects/Branch";

const BranchCloneCommand = (props: {branch: Branch}) => {

    const branch = props.branch;

    return(

        <div id="branchClone" className="">

            <Card className="checkpoint">
                <Card.Header>
                    Commands to clone the project
                </Card.Header>
                <Card.Body>

                    <textarea readOnly rows={3}
                              value={branch.getCommand()}>
                                </textarea><br />
                    <Button onClick={() => {
                        navigator.clipboard.writeText(branch.getCommand());  //copy git command
                    }
                    }>Copy</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

export default BranchCloneCommand;
