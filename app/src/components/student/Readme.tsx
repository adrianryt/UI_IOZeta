import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

type propsType = {
    readmeUrl: string
}
const Readme = (props: propsType) => {

    const [readmeText, setReadmeText] = useState("")
    useEffect(() => {
        axios.get(props.readmeUrl).then((response: any) => {
            return response.data.content
        }).then((res) => {
            //setReadmeText(window.atob(res))
            axios.post("https://api.github.com/markdown", { //markdown to HTML 
                text: window.atob(res)
            }, {
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            }).then((response) => {
                setReadmeText(response.data)
            }).catch((e) => {
                console.error("cannot parse readme: " + e);
            })
        }).catch((e) => {
            console.error("cannot fetch readme: " + e);
        })

    }, [props.readmeUrl])

    return (
        <Card id="readme" className="w-80 m-auto">
            <Card.Header>
                Nazwa tematu
            </Card.Header>
            <Card.Body dangerouslySetInnerHTML={{ __html: readmeText }}/>

        </Card>
    )



}
export default Readme
