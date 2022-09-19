import React from "react";

import { Routes, Route, Navigate, NavLink } from "react-router-dom";

import "./App.css";

import Todos from "./pages/Todos";
import Locations from "./pages/Locations";
import LocationItem from "./pages/LocationItem";
import Shop from "./pages/Shop";

const routes = [
  {
    path: "/locations",
    name: "locations",
  },
  {
    path: "/todos",
    name: "todos",
  },
  {
    path: "/",
    name: "home",
  },
  {
    path: "/shop",
    name: "Shop",
  },
];

// $ npx json-server --watch src/server/db.json --port 3001

function App() {
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        {routes.map((item, index) => {
          return (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <Routes>
        {/* <Route path="/" element={<Navigate to="/locations" />} /> */}
        {/* <Route path="/todos" element={<Todos />} /> */}

        <Route index element={<Todos />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/locations" element={<Locations />}>
          <Route path=":locationId" element={<LocationItem />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
