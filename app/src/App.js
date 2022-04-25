import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Home from "./Home.tsx"
import TopicsMain from "./TopicsMain";
import TopicForm from "./TopicForm";
import SubjectList from "./components/subjects/subject_list/SubjectList";
import TopicSingle from "./TopicSingle";
import SubjectForm from "./components/subjects/subject_form/SubjectForm";
import NavMenu from "./NavMenu.tsx";
import Login from "./Login.tsx";
import Teacher from "./Teacher.tsx";
import Sessions from "./Sessions.tsx";

function App() {
  return (
      <BrowserRouter>
          <NavMenu />
        <Routes>
          <Route path="/" element={<Home />}>

          </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/teacher" element={<Teacher/>} />
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<TopicsMain />} />
            <Route path="/topics/new" element={<TopicForm />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/subjects/new" element={<SubjectForm />} />
            <Route path="/topic/:topicID" element={<TopicSingle />} />
            <Route path="/sessions" element={<Sessions />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
