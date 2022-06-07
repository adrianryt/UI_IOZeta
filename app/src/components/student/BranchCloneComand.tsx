import * as React from "react";
import {Button, Card, OverlayTrigger, Popover} from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import {useState} from "react";
import axios from "axios";
import CookieService from "../../objects/services/CookieService";
import "./Checkpoints.css"
import Branch from "../../objects/Branch";

const BranchCloneComand = (props: {branch: Branch}) => {

    const branch = props.branch;

    return(

        <div id="branchClone" className="">

            <Card className="checkpoint">
                <Card.Header>
                    {"TYTUł"}
                </Card.Header>
                <Card.Body>
                    <p>{"OPIS"}</p>
                    <textarea readOnly rows={1}
                              value={"KOMENDA DO SKOPIOWANIA BRANCHA"}>
                                </textarea><br />
                    <Button onClick={() => {
                        navigator.clipboard.writeText("KOMENDA DO SKOPIOWANIA BRANCHA");  //copy git command
                    }
                    }>Copy</Button>
                </Card.Body>
            </Card>
        </div>
    );

}

export default BranchCloneComand;
