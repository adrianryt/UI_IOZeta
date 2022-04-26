import * as React from "react";
import { Table } from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SessionDataObject from "../../objects/SessionDataObject";

function translate(status: number) {
    switch (status) {
        case 0:
            return "-"
        case 1:
            return "awaiting review"
        case 2:
            return "corrections needed"
        case 3:
            return "accepted"
        default:
            return "-"
    }

}
const AssignmentProgress = () => {
    const params = useParams();
    const [progress, setProgress] = useState(new SessionDataObject([], []));
    useEffect(() => {
        //axios.get("/session/"+params.sessionID)  //TODO: get session info by session id
        axios.get("/mocked_progress.json")
            .then((response: any) => {
                setProgress(response.data)
            }).catch((e) => {
                console.error("cannot fetch progress data: " + e);
            })
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {progress.checkpointNames.map(
                        (name: String) =>
                            <th scope="col" >{name}</th>
                    )}

                </tr>
            </thead>
            <tbody>


                {progress.students.map(
                    (checkpoint: any) =>
                        <tr>
                            <th scope="row" >{checkpoint.name}</th>
                            {checkpoint.commits.map((commit: any) =>
                                <th scope="row" key={commit.url}><a href={commit.url}>{translate(commit.stat)}</a></th>
                            )}
                        </tr>

                )}


            </tbody>
        </Table>
    )

}

export default AssignmentProgress;