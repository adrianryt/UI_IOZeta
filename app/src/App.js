import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Home from "./Home.tsx"
import NavMenu from "./NavMenu.tsx";
import Login from "./Login.tsx";


function App() {
  return (
      <BrowserRouter>
          <NavMenu />
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Home />} >

            {/*<Route index element={<Home />} />*/}
            {/*<Route path="teams" element={<Teams />}>*/}
            {/*  <Route path=":teamId" element={<Team />} />*/}
            {/*  <Route path="new" element={<NewTeamForm />} />*/}
            {/*  <Route index element={<LeagueStandings />} />*/}
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
