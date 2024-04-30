import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box, FormControl, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = ({ type, setType, rating, setRating }) => {
  const [localRating, setLocalRating] = useState('');

  const handleRatingChange = (event) => {
    setLocalRating(event.target.value);
    setRating(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0.2em 1em' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Travel Advisor
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ marginRight: '1em' }}>
            Explore new places
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <SearchIcon
              sx={{
                position: 'absolute',
                left: '0.5em',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: 'white',
              }}
            />
            <InputBase
              placeholder="Search…"
              sx={{
                flex: 1,
                padding: '0.5em 0.5em 0.5em 2.5em', // Adjust padding as needed
                color: 'white', // Set text color to white
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set background color to white with 50% opacity
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;