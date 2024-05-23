import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./layout/Navbar";
import { AllTravels } from "./pages/AllTravels";
import { HomePage } from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/travel" element={<AllTravels/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </BrowserRouter>
    );
}
