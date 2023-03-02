import React from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";


import {
  getLocationWithDitails
} from "../../redux/features/Locations/locationsSlice";

function LocationItem() {
  const { location } = useSelector((state) => state.locations);
  
  const { locationId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocationWithDitails(locationId));
  }, [locationId]);


  return (
    <div className="card-container">
      Current location
      <div className="current-location-card">
        <div className="current-location-card__name">{location?.name}</div>
        <div className="current-location-card__ditails">{location?.ditails}</div>
      </div>
    </div>
  );
}

export default LocationItem;
