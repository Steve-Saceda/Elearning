import {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import "../../css/teacher/modal.css";
import UserNavbar from "../global/UserNavbar";
import Course from "./Course";
import Button from '@mui/material/Button';
import StudentFound from "./StudentFound";

export default function Courses(){
    const [modal, setModal] = useState(false);
    const [nextModal, setNextModal] = useState(false);
    const location = useLocation();
    //console.log(location.state.kindofuser);
    //const [update, setUpdate] = useState(false);


    const [lesson, setLesson] = useState("");
    const [glevel, setGlevel] = useState("");


    const [fetchLesson, setFetchLesson] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

    const [student, setStudent] = useState();
    const [fetchStudent, setFetchStudent] = useState([]);
    console.log(fetchStudent);

    //const [searchResult, setSearchResult] = useState();


    Axios.defaults.withCredentials = true;

    const toggleModal = () => {
        setModal(!modal);
    }

    const toggleNextModal = () => {
        setNextModal(!nextModal);
    }

    const skip = () => {
        setModal(false);
        setNextModal(false);
    }


    const createLesson = () => {
        Axios.post("http://localhost:5000/api/user/createLesson", {
            lesson:lesson,
            glevel: glevel
        }).then((response) => {
            alert(response.data.message);
        })
    }

    
      const searchStudents = (e) => {
        setStudent(e.target.value);
      };
      
      const search = () => {
        const fetchStudents = async () => {
            try {
              const response = await Axios.get(
                "http://localhost:5000/api/user/searchStudent",
                {
                  params: {
                    student: student,
                  },
                }
              );
              setFetchStudent(response.data.result);
  
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchStudents();
      }

    useEffect(() => {
        const getResult = () => {
            Axios.get("http://localhost:5000/api/user/fetchLesson").then((response) => {
                if(isInitialRender){
                    setIsInitialRender(false);
                    setFetchLesson(response.data.result);
                    //console.log(fetchLesson);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getResult();
    });


    const fetchData = (data) => {
        return (
            <Course 
                key = {data.id}
                id = {data.id}
                lessonName = {data.lesson_name}
                gradeLevel = {data.grade_level}
                kindofuser = {location.state.kindofuser}
            />
        );
    }

    const fetch = (data) => {
        console.log("function is called");
        return (
            <StudentFound 
                key = {data.id}
                id = {data.id}
                firstname = {data.firstname}
                lastname = {data.lastname}
            />
        )
    }

    return (
        <div className="teacher-containter">
            <UserNavbar />
            {location.state.kindofuser}
            <div className="add-course" style={location.state.kindofuser === 'student' ? {display: 'none'} : null}>
                <Button variant="contained" onClick={toggleModal}>Create Lesson</Button>
            </div>
            {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content" >
                    <div className="modal-wrap" style={nextModal === true ? {display: 'none'} : null}>
                        <h2>Create a Lesson</h2>
                        <form className="modal-form">
                            <label>Lesson Name:</label>
                            <input 
                                type="text" 
                                onChange={(e) => {
                                    setLesson(e.target.value);
                                }}
                            />
                            <label>Grade Level:</label>
                            <input 
                                type="text"
                                onChange={(e) => {
                                    setGlevel(e.target.value);
                                }}
                            />
                        </form>

                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    
                        <div className="modal-next">
                            <Button variant="contained" onClick={() => {
                                toggleNextModal();
                                createLesson();
                            }}>Next</Button>
                        </div>
                    </div>
                    {nextModal &&(
                        <div className="add-student-modal">
                            <h2>Add a student</h2>
                            <div className="search-student-wrap-modal">
                                <input 
                                    type="text" 
                                    placeholder="Search here"
                                    onChange={searchStudents}
                                />
                                <Button variant="contained" onClick={search}>Search</Button>
                            </div>
                            <div className="student-list-modal">
                                {fetchStudent.length > 0 && fetchStudent.map(fetch)}
                            </div>
                            <div className="student-list-btn-modal">
                                <Button variant="outlined"
                                onClick={skip}
                                >
                                    Skip
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
            <div className="course-wrap">
                {fetchLesson?.map(fetchData)}
            </div>
        </div>
    );
}