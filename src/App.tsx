import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./layout/Navbar";
import { AllTravels } from "./pages/AllTravels";
import { HomePage } from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {MyTravels} from "./pages/MyTravels";
import {UserPanel} from "./pages/UserPanel";
import {AddNewTravel} from "./pages/AddNewTravel";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/all-travels" element={<AllTravels/>}/>
                <Route path="/my-travels" element={<MyTravels/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/userpanel" element={<UserPanel/>}/>
                <Route exact path="/" component={AllTravels} />
                <Route path="/add-new-travel" element={<AddNewTravel/>} />
            </Routes>
        </BrowserRouter>
    );
}