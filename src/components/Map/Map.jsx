import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, useMediaQuery, Typography, Rating } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const Map = ({ setCoordinates, setBounds, coordinates, places ,setChildClicked}) => {
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

  const isMobile = useMediaQuery('(max-width:600px)');
  

  const mapContainerStyle = {
    height: '85vh',
    width: '210%', 
  };

  const cardStyle = {
    padding: '0.5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '150px', 
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
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            key={i}
            style={markerContainerStyle}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            
          >
            {isMobile? (
              <LocationOn color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  style={pointerStyle}
                  src={place.photo? place.photo.images.small.url : ''}
                  alt={place.name}
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
      <Paper elevation={3} style={cardStyle}>
        <LocationOn color="primary" fontSize="small" />
      </Paper>
    </div>
  );
};

export default Map;