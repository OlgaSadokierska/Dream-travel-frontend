import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travel" element={<Travel />} />
            </Routes>
        </BrowserRouter>
    );
}

function Home() {
    function login() {
        window.location.href = 'http://localhost:8080';
    }

    return (
        <div>
            <h2>Dream Travel app</h2>
            <button onClick={login}>Zaloguj się</button>
        </div>
    );
}

function Travel() {
    const [travels, setTravels] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/travels', { withCredentials: true })
            .then(response => setTravels(response.data))
            .catch(error => console.log(error));
    }, []);

    function logout() {
        axios.post('http://localhost:8080/logout', {}, { withCredentials: true })
            .then(() => window.location.href = 'http://localhost:3000')
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h2>Travel List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {travels.map(travel => (
                    <tr key={travel.id}>
                        <td>{travel.id}</td>
                        <td>{travel.country}</td>
                        <td>{travel.city}</td>
                        <td>{travel.startDate}</td>
                        <td>{travel.endDate}</td>
                        <td>{travel.description}</td>
                        <td>{travel.rate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={logout}>Wyloguj się</button>
        </div>
    );
}
