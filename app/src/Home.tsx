import * as React from "react";
import {Outlet} from "react-router-dom";

const Home = () => {
    return (
        <>
            <div> SIEMANO</div>
            <Outlet/>
        </>

    )
}
export default Home;