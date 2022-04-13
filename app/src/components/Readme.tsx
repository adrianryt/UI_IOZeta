import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
        <div id="readme">
            <pre>{readmeText}</pre> 
            {/* TODO - formatowanie */}
        </div>
    )


}
export default Readme
