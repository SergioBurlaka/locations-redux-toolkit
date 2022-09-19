import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";


import {
  getLocatiosnWithDitails
} from "../../redux/features/Locations/locationsSlice";

function Locations() {
  const { locations } = useSelector((state) => state.locations);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLocatiosnWithDitails());
  }, []);

  return (
    <div className="locations">
      <div>

        <ul>
          {locations &&
            locations.map((item, index) => {
              return (
                <li
                  key={index}
                  className="card-location"
                  onClick={() => navigate("/locations/" + item.id)}
                >
                  <div>Name {item.name}</div>
                  {item.ditails?.ditails && (
                    <div>Ditails {item.ditails.ditails}</div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default Locations;
