import *  as React from 'react'
import Checkpoints from './Checkpoints';
import Readme from './Readme';
import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentPage.css"

const StudentPage = (props: any) => {

    const [checkpoints, setCheckpoints] = useState([]);
    const [readmeUrl, setReadmeUrl] = useState("")

    useEffect(() => {
        axios.get("/mocked_class.json")
            .then((response: any) => {   //TODO: endpoint z danymi sesji
                setCheckpoints(response.data.checkpoints)
                setReadmeUrl(response.data.readmeUrl)
            }).catch((e) => {
                console.error("cannot fetch class data: " + e);
            })
    }, [])



    return (
        <div className="row">
            <div id="readme" className='d-flex justify-content-center col-lg-9 scrollbar-primary'>
                <Readme readmeUrl={readmeUrl} />
            </div>
            <div id="checkpoints" className='d-flex justify-content-center col-lg-3'>
                <Checkpoints checkpoints={checkpoints} />
            </div>

        </div >
    )

}
export default StudentPage
