import React, { useEffect, useState } from "react";
import axios from "axios";

export function UserPanel() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user', { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(error => {
                console.log(error);
                setError("Failed to fetch user data");
            });
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL');
    };

    const styles = {
        container: {
            margin: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        data: {
            margin: '5px 0',
            padding: '10px',
            backgroundColor: '#044d6a',
            color: 'white',
            borderRadius: '5px',
        }
    };

/*    if (!user) {
        return <div style={styles.container}>Loading...</div>;
    }

    if (error) {
        return <div style={styles.container}>Error: {error}</div>;
    }
*/
    return (
        <div style={styles.container}>
            <h2>Informacje o mnie:</h2>
            <div style={styles.data}>Imię: {}</div>
            <div style={styles.data}>Nazwisko: {}</div>
            <div style={styles.data}>Email: {}</div>
        </div>
    );
}
