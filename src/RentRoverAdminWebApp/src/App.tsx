import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home/Home";
import { PageNotFound } from "./Components/Shared/PageNotFound";
import Login from "./Components/Users/Login";
import VehicleList from "./Components/Vehicles/VehicleList";
import Header from "./Components/Shared/Header";
import { AddVehicle } from "./Components/Vehicles/AddVehicle";
import ViewVehicleDetails from "./Components/Vehicles/ViewVehicleDetails";

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/vehicles"} element={<VehicleList />} />
          <Route path={"/vehicles/:id"} element={<ViewVehicleDetails />} />
          <Route path={"/vehicles/new"} element={<AddVehicle />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
