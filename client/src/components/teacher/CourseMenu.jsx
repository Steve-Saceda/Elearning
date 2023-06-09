import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Axios from "axios"

const ITEM_HEIGHT = 48;
export default function CourseMenu(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    //console.log(props.lessonId);

    Axios.defaults.withCredentials = true;

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null)
    }

    const addStudent = () => {
      setAnchorEl(null);

    };
  
    const analytics = () => {
      setAnchorEl(null);

    };

    const deleteLesson = () => {
      setAnchorEl(null);
      Axios.delete("http://localhost:5000/api/user/delete", {
        params: {
          lessonId : props.lessonId
        }
      }).then((response) => {
        alert("Deleted Succesfully");
      })
    };    
    
    return (
    <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >

          <MenuItem onClick={addStudent}>
            Add Student
          </MenuItem>

          <MenuItem onClick={analytics}>
            Analytics
          </MenuItem>

          <MenuItem onClick={deleteLesson}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      );
}