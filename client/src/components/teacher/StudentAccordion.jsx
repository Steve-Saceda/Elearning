import * as React from 'react';
import Axios from "axios";
import "../../css/teacher/modal.css";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import AccordionModal from './AccordionModal';
import Button from '@mui/material/Button';
import AcSummary from "./AcSummary";

export default function StudentAccordion() {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [chapter, setChapter] = useState([]);
  const toggleModal = () => {
    setModal(!modal);
  }

  Axios.defaults.withCredentials = true;

  //console.log(location.state.kindofuser)


  //Fetch the lesson chapters
  useEffect(()=>{
    const getChapter = () => {
      Axios.get("http://localhost:5000/api/user/fetchChapter",{
        params: {
          tb_lessonId : location.state.lessonId
        }
      }).then((response) => {
        setChapter(response.data.result)
      }).catch((error) => {
        console.log(error.response);
      })
    }
    // /console.log(location.state.lessonId)
    getChapter();
  }, [location.state.lessonId,chapter]);

  //map data
  const fetchData = (data) => {
    return (
      <AcSummary 
        key = {data.id}
        id = {data.id}
        chapter_name = {data.chapter_name}
        chapter_number = {data.chapter_number}
        desc = {data.description}
        vid = {data.url}
        date = {data.date_uploaded}
      />
    );
  }

  return (
    <div className="student-wrap-accord">
      <div className="add-chapter" style={location.state.kindofuser === 'student' ? {display: 'none'} : null}>
        <Button 
          variant="contained"
          onClick={toggleModal}
        >
          Create Chapter
        </Button>
      </div>
      {modal && (
        <div className="modal" id="student-modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <AccordionModal 
              tb_createLesssonId = {location.state.lessonId}
            />
          </div>
        </div>
      )}
      <div className="studentAccord">
        {chapter?.map(fetchData)}
      </div>
    </div>
  );
}
