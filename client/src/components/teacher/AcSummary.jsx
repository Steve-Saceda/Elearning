import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate, createSearchParams} from "react-router-dom";

export default function AcSummary(props){
    const [lessonId] = useState(props.id);
    const navigate = useNavigate();
    //console.log(props)

    const watchVideo = () => {
        //setVideoId(props.id)
        //console.log(videoId)
        navigate({
          pathname: "/user/watch",
          search: `?${createSearchParams({lessonId})}`, // inject code value into template
        },{state: {lessonId : lessonId, 
                  chapter_number : props.chapter_number,
                  chapter_name: props.chapter_name,
                  desc: props.desc,
                  vid : props.vid,
                  date : props.date
                }});
    }



    return (
      <>
        <div className='stdntContainer'>
          <Accordion sx={{backgroundColor: "grey", color: "white"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{fontFamily: "croissant one"}}>Chapter {props.chapter_number} {props.chapter_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.desc.substring(0,250)}
                <Box component="div" sx={{ 
                    display: 'block', 
                    textAlign: { xs: "center", sm: "center", md: "right" },
                    /*backgroundColor: { xs: "blue", sm: "red", md: "yellow" }*/
                  }}>
                    <Button
                      sx={{ width: {xs: 1, sm: 1/2, md: 1/4},  
                            fontSize: 12,
                            marginTop: 1
                          }}
                      onClick={watchVideo}
                      variant="contained" 
                      component="label">
                        Watch Video
                    </Button>
                  </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    );
}