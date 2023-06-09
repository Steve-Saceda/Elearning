import {Route,Routes} from "react-router-dom";
import LandingPage from "./components/index/LandingPage";
import Authentication from "./components/authentication/Authentication";
import TeacherIndex from "./components/teacher/TeacherIndex";
import StudentMainPage from "./components/teacher/StudentMainPage";
import Video from "./components/teacher/LessonVideo";
import AdminIndex from "./components/admin/AdminIndex";
import AdminPage2 from "./components/admin/AdminPage2";
import AdminPage3 from "./components/admin/adminPage3";
import GamesPage from "./components/games/GamesPage";
import Game1 from "./components/games/Game1";
import Game2 from "./components/games/Game2";

export default function app() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="auth" element={<Authentication />}/>
        <Route path="user" element={<TeacherIndex />}/>
        <Route path="user/chapter" element={<StudentMainPage />} />
        <Route path="user/watch" element={<Video />} />

        <Route path="games/games-list" element={<GamesPage />}/>
        <Route path="games/game1" element={<Game1 />}/>
        <Route path="games/game2" element={<Game2 />}/>


        <Route path="/admin/dashboard" element={<AdminIndex />}/>
        <Route path="/admin/user-list" element={<AdminPage2 />}/>
        <Route path="/admin/course-list" element={<AdminPage3 />}/>
        

      </Routes>
    </>
  );
}
