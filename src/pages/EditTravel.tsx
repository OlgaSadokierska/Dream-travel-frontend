import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the interface for the travel data
interface Travel {
    id: number;
    city: string;
    country: string;
    description: string;
    rate: number;
    startDate: string;
    endDate: string;
}

interface LocationState {
    travelDetails: Travel;
}

export default function EditTravel() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

    const [travel, setTravel] = useState<Travel>(state ? state.travelDetails : null);
    const [error, setError] = useState<string | null>(null);

    if (!travel) {
        return <div>Travel details not found.</div>;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTravel({ ...travel, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/api/v1/travels/${id}`, travel, { withCredentials: true })
            .then(response => {
                navigate(`/details/${id}`, { state: { travelDetails: response.data } });
            })
            .catch(err => {
                setError('Failed to update travel details');
                console.error('Error updating travel details:', err);
            });
    };

    const styles = {
        container: {
            margin: '20px auto',
            maxWidth: '600px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#333',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#044d6a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
            display: 'block',
            width: '100%',
            fontSize: '16px',
        },
        error: {
            color: 'red',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Edytuj szczegóły podróży</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="city">Miasto</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="city"
                        name="city"
                        value={travel.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="country">Kraj</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="country"
                        name="country"
                        value={travel.country}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="description">Opis</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="description"
                        name="description"
                        value={travel.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="rate">Ocena (1-5)</label>
                    <input
                        style={styles.input}
                        type="number"
                        id="rate"
                        name="rate"
                        value={travel.rate}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="startDate">Data rozpoczęcia</label>
                    <input
                        style={styles.input}
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={travel.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="endDate">Data zakończenia</label>
                    <input
                        style={styles.input}
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={travel.endDate}
                        onChange={handleInputChange}
                    />
                </div>
                <button style={styles.button} type="submit">Zaktualizuj podróż</button>
                {error && <div style={styles.error}>{error}</div>}
            </form>
        </div>
    );
}
