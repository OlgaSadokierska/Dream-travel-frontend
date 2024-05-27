import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewTravel() {
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        startDate: '',
        endDate: '',
        description: '',
        rate: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/v1/travels/addTravel', formData);
            alert('Podróż została dodana pomyślnie!');
        } catch (error) {
            console.error('Błąd podczas dodawania podróży:', error);
            alert('Wystąpił błąd podczas dodawania podróży. Spróbuj ponownie.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
            padding: '20px',
            border: '1px solid #044d6a',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
        },
        label: {
            marginBottom: '10px',
            fontWeight: 'bold',
        },
        input: {
            padding: '8px',
            marginBottom: '20px',
            border: '1px solid #044d6a',
            borderRadius: '5px',
            width: '100%',
        },
        textarea: {
            padding: '8px',
            marginBottom: '20px',
            border: '1px solid #044d6a',
            borderRadius: '5px',
            width: '100%',
        },
        button: {
            padding: '10px',
            backgroundColor: '#044d6a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#033b53',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Dodaj nową podróż</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Kraj:
                    <input type="text" name="country" value={formData.country} onChange={handleChange} style={styles.input} />
                </label>
                <label style={styles.label}>
                    Miasto:
                    <input type="text" name="city" value={formData.city} onChange={handleChange} style={styles.input} />
                </label>
                <label style={styles.label}>
                    Data rozpoczęcia:
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} style={styles.input} />
                </label>
                <label style={styles.label}>
                    Data zakończenia:
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={styles.input} />
                </label>
                <label style={styles.label}>
                    Opis:
                    <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} />
                </label>
                <label style={styles.label}>
                    Ocena:
                    <input type="number" name="rate" value={formData.rate} onChange={handleChange} style={styles.input} />
                </label>
                <button type="submit" style={styles.button}>Dodaj podróż</button>
            </form>
        </div>
    );
}
