import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import React from "react";
import Home from "./components/home/Home.tsx"
import TopicsMain from "./components/topics/TopicsMain";
import TopicForm from "./components/topics/TopicForm";
import SubjectList from "./components/subjects/subject_list/SubjectList";
import TopicSingle from "./components/topics/TopicSingle";
import SubjectForm from "./components/subjects/subject_form/SubjectForm";
import NavMenu from "./components/nav_menu/NavMenu.tsx";
import Login from "./components/login/Login.tsx";
import Teacher from "./components/teacher/Teacher.tsx";
import Sessions from "./components/sessions/Sessions.tsx";
import StudentSide from "./components/StudentSide";

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
            <Route path='student' element={<StudentSide />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
