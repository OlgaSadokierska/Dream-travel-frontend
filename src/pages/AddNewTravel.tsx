import React, { useState } from 'react';
import { PostRequests } from '../communication/network/PostRequest';
import { useNavigate } from 'react-router-dom';

export default function AddNewTravel() {
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        startDate: '',
        endDate: '',
        description: '',
        rate: 0
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { startDate, endDate, rate } = formData;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const minDate = new Date('1950-01-01');

        if (rate < 1 || rate > 5) {
            setError("Ocena musi być w przedziale 1-5.");
            return false;
        }

        if (start < minDate) {
            setError("Data rozpoczęcia nie może być wcześniejsza niż 1 stycznia 1950.");
            return false;
        }

        if (end < start) {
            setError("Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.");
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await PostRequests.addTravel(formData);
                alert('Podróż została dodana pomyślnie!');
                navigate('/all-travels');
            } catch (error) {
                console.error('Błąd podczas dodawania podróży:', error);
                alert('Wystąpił błąd podczas dodawania podróży. Spróbuj ponownie.');
            }
        }
    };

    const [isHovered, setIsHovered] = useState(false);

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
            backgroundColor: isHovered ? '#033b53' : '#044d6a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
            marginBottom: '10px',
        }
    };

    return (
        <div style={styles.container}>
            <h2>Dodaj nową podróż</h2>
            {error && <div style={styles.error}>{error}</div>}
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
                    <input type="number" name="rate" value={formData.rate} onChange={handleChange} style={styles.input} min="1" max="5" />
                </label>
                <button 
                    type="submit" 
                    style={styles.button}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Dodaj podróż
                </button>
            </form>
        </div>
    );
}
