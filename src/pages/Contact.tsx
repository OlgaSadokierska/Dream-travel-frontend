import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ email?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { email?: string } = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Proszę wprowadzić poprawny email.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setSubmitted(true);
        }
    };

    return (
        <div style={styles.contactPage}>
            <h2 style={styles.heading}>Kontakt</h2>
            {submitted ? (
                <p style={styles.thankYouMessage}>Dziękujemy za wiadomość, postaramy się odpowiedzieć jak najszybciej.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="name">Imię:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        {errors.email && <p style={styles.error}>{errors.email}</p>}
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="message">Wiadomość:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            style={styles.textarea}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Wyślij</button>
                </form>
            )}
        </div>
    );
}

const styles = {
    contactPage: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    formGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxSizing: 'border-box',
        minHeight: '100px'
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px',
        backgroundColor: '#044d6a',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    thankYouMessage: {
        textAlign: 'center',
        color: '#044d6a',
        fontSize: '18px'
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginTop: '5px'
    }
};
