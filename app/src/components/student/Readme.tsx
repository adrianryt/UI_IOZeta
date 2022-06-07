import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
var Markdown = require("react-remarkable")

type propsType = {
    topicName: string
    readmeUrl: string
}

function b64DecodeUnicode(str: any) {
    return decodeURIComponent(Array.prototype.map.call(window.atob(str), function(c: any) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

const Readme = (props: propsType) => {

    const [readmeText, setReadmeText] = useState("");
    const [topicName, setTopicName] = useState("");

    useEffect(() => {
        setTopicName(props.topicName);
        axios({
            url: props.readmeUrl,
            method: "get"
            }).then((response: any) => {
            return response.data.content
        }).then((res) => {
            setReadmeText(b64DecodeUnicode(res))
        }).catch((e) => {
            console.error("cannot fetch readme: " + e);
        })

    }, [props.readmeUrl, props.topicName])

    return (
        <Card id="readme-body" className="w-80">
            {topicName === "" ?
                <div/>
                :
                <Card.Header>
                    {topicName}
                </Card.Header>
            }
            <Card.Body >
                <Markdown>
                    {readmeText}
                </Markdown>
            </Card.Body>
        </Card>
    )



}
export default Readme
