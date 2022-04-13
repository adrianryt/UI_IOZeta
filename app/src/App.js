import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import React from "react";
import Home from "./components/Home.tsx"
import TopicsMain from "./components/TopicsMain";
import TopicForm from "./components/TopicForm";
import StudentSide from "./components/StudentSide"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="topics" element={<TopicsMain />} />
          <Route path="topics/new" element={<TopicForm />} />
          <Route path='student' element={<StudentSide />} />
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
