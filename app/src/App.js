import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Home from "./Home.tsx"
import TopicsMain from "./TopicsMain";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="topics" element={<TopicsMain />} />
            {/*<Route path="teams" element={<Teams />}>*/}
            {/*  <Route path=":teamId" element={<Team />} />*/}
            {/*  <Route path="new" element={<NewTeamForm />} />*/}
            {/*  <Route index element={<LeagueStandings />} />*/}
            {/*</Route>*/}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
