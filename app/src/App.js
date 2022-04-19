import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Home from "./Home.tsx"
import TopicsMain from "./TopicsMain";
import TopicForm from "./TopicForm";
import SubjectList from "./components/subjects/subject_list/SubjectList";
import TopicSingle from "./TopicSingle";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="topics" element={<TopicsMain />} />
            <Route path="topics/new" element={<TopicForm />} />
            <Route path="subjects" element={<SubjectList />} />
            <Route path="topic/:topicID" element={<TopicSingle />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
