import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, useMediaQuery, Typography, Rating } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const Map = ({setCoordinates,setBounds,coordinates}) => {
  

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
  }, []);

  const isMobile = useMediaQuery('(min-width:600px)');
  
  const mapContainerStyle = {
    height: '85vh',
    width: '200%', 
  };

  const cardStyle = {
    padding: '0.5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '1050px',
    elevation: 3,
  };

  const markerContainerStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': {
      zIndex: 2,
    },
  };

  const pointerStyle = {
    cursor: 'pointer',
  };
  
  return (
    <div style={mapContainerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCuKEZRvdYROtxcm-_GF47-pUJDoaqw9Pw' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat , lng: e.center.lng});
          setBounds({ ne:e.marginBounds.ne,sw:e.marginBounds.sw})

        }}
        onChildClick={''}
      />
      <Paper elevation={3} style={cardStyle}>
        <LocationOn color="primary" fontSize="large" />
        <Typography variant="h6">Location Details</Typography>
        <Rating name="read-only" value={4.5} readOnly />
      </Paper>
    </div>
  );
};

export default Map;