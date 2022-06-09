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
    return decodeURIComponent(Array.prototype.map.call(window.atob(str), function (c: any) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

function getRepoAddr(url: string) {
    console.log(url)
    //for a readme url, returns string: "[username]/[repository name]"
    try {
        let temp = url.split("/")
        return temp.splice(temp.indexOf("repos") + 1, 2).join("/")

    } catch (error) {
        return ""
    }

}



const Readme = (props: propsType) => {


    const [readmeText, setReadmeText] = useState("");
    const [topicName, setTopicName] = useState("");

    function prefixImageSources(text: string, repoPath: string) {
        console.log(repoPath)
        return text.replace(/\!\[(.*?)\]\((?!.*[a-z]\:\/\/)(.*?)\)/g, "![$1](https://raw.githubusercontent.com/" + repoPath + "/main/$2)")
    }

    useEffect(() => {
        setTopicName(props.topicName);
        axios({
            url: props.readmeUrl,
            method: "get"
        }).then((response: any) => {
            return response.data.content
        }).then((res) => {
            setReadmeText(prefixImageSources(b64DecodeUnicode(res), getRepoAddr(props.readmeUrl)))
        }).catch((e) => {
            console.error("cannot fetch readme: " + e);
        })

    }, [props.readmeUrl, props.topicName])

    return (
        <Card id="readme" className="w-80">
            {topicName === "" ?
                <div />
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
