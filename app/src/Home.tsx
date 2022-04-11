import * as React from "react";
import {Outlet} from "react-router-dom";

const Home = () => {
    return (
        <>
            <h2 className="ms-3 mt-4">Share your code during classes</h2>
            <Outlet/>
        </>
    )
}
export default Home;