import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
var Markdown = require("react-remarkable")

type propsType = {
    readmeUrl: string
}

const Readme = (props: propsType) => {

    const [readmeText, setReadmeText] = useState("")
    useEffect(() => {
        axios.get(props.readmeUrl).then((response: any) => {
            return response.data.content
        }).then((res) => {
            setReadmeText(window.atob(res))
        }).catch((e) => {
            console.error("cannot fetch readme: " + e);
        })

    }, [props.readmeUrl])

    return (
        <Card id="readme" className="w-80 m-auto">
            <Card.Header>
                Nazwa tematu
            </Card.Header>
            <Card.Body>
                <Markdown>
                    {readmeText}
                </Markdown>
            </Card.Body>
        </Card>
    )



}
export default Readme
