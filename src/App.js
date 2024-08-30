import React, { useState } from 'react';
import Sidebar from "./components/SIdebar"
import './App.css';
import { Button } from '@mui/material';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);

  const handleAddSpeaker = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSave = () => {
    console.log('Selected Speakers:', selectedSpeakers);
    setIsSidebarOpen(false);
  };

  return (
    <div className="container">
      {/* <Button variant="contained" onClick={handleAddSpeaker}>
        Add Speaker
      </Button> */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        selectedSpeakers={selectedSpeakers}
        setSelectedSpeakers={setSelectedSpeakers}
        onSave={handleSave}
      />
    </div>
  );
};

export default App;

