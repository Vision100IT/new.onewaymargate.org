import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {mapsKey} from '../../lib/config';
import MapOverlay from './map-overlay';

const HomeSection = styled('div')`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px 200px;
  color: #444446;
  @media (min-width: 420px) {
    height: calc(100vh - 300px);
    grid-template-columns: 3fr 3fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const HomeMapInner = styled('div')`
  grid-column: 1;
  grid-row: 1;
  @media (min-width: 420px) {
    grid-column: 1/3;
    grid-row: 1/4;
  }
`;

export default function MapLayout({
  heading,
  actions,
  details,
  location
}) {
  return (
    <HomeSection>
      <HomeMapInner>
        <LoadScript id="script-loader" googleMapsApiKey={mapsKey}>
          <GoogleMap
            mapContainerStyle={{
              height: '100%',
              width: '100%'
            }}
            zoom={16}
            center={
              window.innerWidth < 600
                ? {
                    lat: location.location.lat,
                    lng: location.location.lng
                  }
                : {
                    lat: location.latcentrepoint,
                    lng: location.longcentrepoint
                  }
            }
            options={{
              disableDefaultUI: true
            }}
          >
            <Marker
              position={{
                lat: location.location.lat,
                lng: location.location.lng
              }}
            />
          </GoogleMap>
        </LoadScript>
      </HomeMapInner>
      <MapOverlay heading={heading} details={details} actions={actions} lat={location.location.lat} long={location.location.lng} />
    </HomeSection>
  );
}

MapLayout.propTypes = {
  heading: PropTypes.string,
  blurb: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};
