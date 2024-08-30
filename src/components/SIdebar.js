
import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  TextField,
  IconButton,
  Button,
  Box,
  Divider,
  InputAdornment,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import searchIcon from "../assests/search_icon.svg";
import editIcon from "../assests/edit_icon.svg";
import speakers from "../utils";


const Sidebar = () => {
  const [speakerList, setSpeakerList] = useState([])
  const [open, setOpen] = useState(false);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    setSpeakerList(speakers)
  }, [])

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClose = () =>{
    setSelectedSpeakers([]);
    toggleDrawer();
  }

  const handleSelectSpeaker = (id) => {
    setSelectedSpeakers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((speakerId) => speakerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSpeakers = speakerList?.filter((speaker) =>
    speaker?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="sidebarMain">
      <Button variant="contained" color="primary" onClick={toggleDrawer} className={"add-speaker-btn-main"}>
        Add Speaker
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer} className="sidebarDrawer-container">
        <Box sx={{ width: 360, padding: 2 }} className="sidebarDrawer">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <h2 id="add-speaker-slider-heading">Add Speaker</h2>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }} className="searchbar-container-div">
            <TextField
              placeholder="Search..."
              variant="standard"
              fullWidth
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={searchIcon} alt="search icon" style={{ width: '20px', height: '20px' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Divider />
          <List sx={{ maxHeight: "65vh", overflowY: "auto" }} className="speaker-list">
            {filteredSpeakers?.map((speaker) => (
              <ListItem
                key={speaker.id}
                button
                onClick={() => handleSelectSpeaker(speaker.id)}
                className={`speaker-list-item ${selectedSpeakers.includes(speaker.id) ? "selected-speaker" : ""}`}
              >
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={speaker.name}
                  secondary={`${speaker.title} | ${speaker.organization}`}
                  secondary={
                    <>
                    <Typography component="span" variant="body2" color="textSecondary">
                      {`${speaker.title} | ${speaker.organization}`}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary" className="edit-speaker-btn-typography">
                      <span className="edit-speaker-btn" onClick={(e)=>{e.stopPropagation();console.log("Edit button clicked")}}><img src={editIcon} alt="edit-text"/>{"Edit Sepaker"}</span>
                    </Typography>
                  </>
                  }
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleSelectSpeaker(speaker.id)}
                    checked={selectedSpeakers.includes(speaker.id)}
                    className="speaker-checkbox"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2}}>
            <Button variant="contained" color="primary" disabled={selectedSpeakers.length === 0} className={`add-btn ${selectedSpeakers.length > 0 ?"enable-add-btn":"disable-add-btn"}`}>
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose} className={'cancel-btn'}>
              Cancel
            </Button>
            <Button variant="text" color="primary" className={"create-speaker-btn"}>
              Create a speaker
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;

