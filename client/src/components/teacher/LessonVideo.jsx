import UserNavbar from "../global/UserNavbar";
import "../../css/teacher/video.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import RatingWidth from "./RatingWidth";
import Ratings from "./Ratings";
import StarRating from "./StarRating";
import Avatar from '@mui/material/Avatar';
import { FiYoutube } from 'react-icons/fi';



export default function LessonVideo(){
    //const [value] = useState(4);
    const location = useLocation();

    const [wid] = useState(50);

    const [value, setValue] = useState(0);



    return(
        <>
            <UserNavbar />
            <div className="vid-container">
                <div className="main">
                    <iframe 
                        src={`${location.state.vid}`}
                        height="500px" 
                        width="95%"
                        title="React"
                    >
                    </iframe>
                    <h1 className="vid-title">
                        Chapter {location.state.chapter_number} {location.state.chapter_name}
                        {/*Chapter {location.state.chapter_number} {location.state.chapter_name}*/}
                        
                    </h1>
                    <p className="vid-title">{location.state.date}</p>
                    <p className="vid-title">{/*{location.state.desc}*/} {location.state.desc}</p>

                    <div className="vid-title feedback">
                        <h2>Student Rating</h2>
                        <div className="ratings">
                            <div className="overall">
                                <h1 className="overall-rating">50%</h1>
                            </div>
                            <div className="stars">
                                <div className="horizontal-div">
                                    <RatingWidth 
                                        wid = {wid}
                                    />                                               
                                </div>
                                <Box component="div" sx={{display: 'flex', flexDirection: 'column', marginTop: '1px'}}>
                                    <StarRating />
                                </Box>
                            </div>
                            <div className="percent">
                                <Ratings />
                            </div>
                        </div>
                    </div>
                    <div className="vid-title feedback">
                        <h2>Feedback</h2>
                        <div className="add-feedback">
                            <div className="feedback-pic">
                                <Avatar alt="John Doe" src="/static/images/avatar/2.jpg" />
                            </div>
                            <div className="comment">
                                <div className="input-comment">
                                    <textarea placeholder="Create a feedback"/>
                                </div>
                                <div className="add-comment">
                                    <div className="star">
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                        />
                                    </div>
                                    <div className="enter">
                                        <Button>Cancel</Button>
                                        <Button>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="add-feedback">
                            <div className="feedback-pic">
                                <Avatar alt="John Doe" src="/static/images/avatar/2.jpg" />
                            </div>
                            <div className="comment">
                                <div className="input-comment">
                                    <div className="user-info">
                                        <div className="username">John Doe</div>
                                        <div className="comment-date">18/03/2023</div>
                                    </div>
                                    <div className="user-rating">
                                        <Rating name="read-only" 
                                            value={3} 
                                            readOnly 
                                        />
                                    </div>
                                    <div className="user-feedback">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illum consectetur ratione facere veniam nobis repellat repellendus reprehenderit quos alias?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="next">
                    <div className="recommendations">
                        <p>Chapter 2 Try Hack Me</p>
                        <div className="read-only-div">
                            <FiYoutube style={{paddingBottom:'2px', marginRight: '3px'}}/>
                            <Rating name="read-only" 
                                value={3} 
                                readOnly 
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}