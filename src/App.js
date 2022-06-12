import './App.css';
import { BrowserRouter, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import React, {useEffect, useState} from "react";
import Home from "./components/home/Home.tsx"
import TopicForm from "./components/topics/TopicForm";
import SubjectList from "./components/subjects/subject_list/SubjectList";
import TopicSingle from "./components/topics/TopicSingle";
import SubjectForm from "./components/subjects/subject_form/SubjectForm";
import NavMenu from "./components/nav_menu/NavMenu.tsx";
import Login from "./components/login/Login.tsx";
import Teacher from "./components/teacher/Teacher.tsx";
import Sessions from "./components/sessions/Sessions.tsx";
import StudentPage from './components/student/StudentPage';
import AssignmentProgress from "./components/sessions/AssignmentProgress"
import SignUp from "./components/SignIn/SignUp";
import CookieService from "./objects/services/CookieService";


function App() {
    const [loggedUserName, setLoggedUserName] = useState(null);

    useEffect(() => {
        setLoggedUserName(CookieService.getCookie("username"));
    }, [])

    const userShouldBeLoggedIn = (component) => {
        if(loggedUserName !== "" && loggedUserName !== undefined){
            return component;
        }
        return <Navigate to="/login" replace={true}/>
    }

    const userShouldNotBeLoggedIn = (component) => {
        if(loggedUserName === "" || loggedUserName === undefined || loggedUserName === null){
            return component;
        }
        return <Navigate to="/teacher" replace={true}/>
    }

  return (
    <BrowserRouter>
        <NavMenu loggedUserName={loggedUserName} setLoggedUser={setLoggedUserName}/>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={userShouldNotBeLoggedIn(<Login setUserLogin={setLoggedUserName} />)} />
            <Route path="/signup" element={userShouldNotBeLoggedIn(<SignUp setUserLogin={setLoggedUserName} />)} />
            <Route path="/teacher" element={loggedUserName !== null ? userShouldBeLoggedIn(<Teacher/>) : null} />
            <Route path="/topics/new" element={loggedUserName !== null ? userShouldBeLoggedIn(<TopicForm />) : null} />
            <Route path="/subjects" element={loggedUserName !== null ? userShouldBeLoggedIn(<SubjectList />) : null} />
            <Route path="/subjects/new" element={loggedUserName !== null ? userShouldBeLoggedIn(<SubjectForm />) : null} />
            <Route path="/topic/:topicID" element={loggedUserName !== null ? userShouldBeLoggedIn(<TopicSingle />) : null} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path='/student' element={<StudentPage />} />
            <Route path='/dashboard/:sessionID' element={<AssignmentProgress />} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
