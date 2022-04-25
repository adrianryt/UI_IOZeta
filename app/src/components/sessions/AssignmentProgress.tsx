import * as React from "react";
import { Table } from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import { useEffect, useState } from "react";
import axios from "axios";

type propsType = {
    checkpoints: CheckpointObject[]
}
let n = ["rozgrzewka", "zadanie1", "zadanie2"]

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
const AssignmentProgress = (props: propsType) => {

    const [progress, setProgress] = useState([])
    useEffect(() => {
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
                    {n.map(
                        (name: String) =>
                            <th scope="col" >{name}</th>
                    )}

                </tr>
            </thead>
            <tbody>


                {progress.map(
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