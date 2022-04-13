import *  as React from 'react'
import Checkpoints from './Checkpoints';
import Readme from './Readme';
import { useEffect, useState } from "react";
import axios from "axios";

const StudentSide = (props: any) => {

    const [checkpoints, setCheckpoints] = useState([]);
    const [readmeUrl, setReadmeUrl] = useState("")

    useEffect(() => {
        axios.get("/mocked_class.json")
            .then((response: any) => {   //TODO: endpoint z danymi sesji
                 console.log(response)
                setCheckpoints(response.data.checkpoints)
                setReadmeUrl(response.data.readmeUrl)
            }).catch((e) => {
                console.error("cannot fetch class data: " + e);
            })
    }, [])



    return (

        <div >
            <div id="checkpoints">
                <Checkpoints checkpoints={checkpoints} />
            </div>
            <div id="readme">
                <Readme readmeUrl={readmeUrl} />
            </div>
        </div >

    );


}
export default StudentSide
