import React, { useEffect, useState } from "react";
import axios from "axios";

export function UserPanel() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/users/me', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
            })
            .catch(error => {
                console.log(error);
                setError("Failed to fetch user data");
            });
    }, []);

    const handleSave = () => {
        // Validation for digits in first name and last name
        if (/\d/.test(firstname) || /\d/.test(lastname)) {
            setError("Imię i nazwisko nie mogą zawierać cyfr.");
            return;
        }

        axios.put(`http://localhost:8080/api/v1/users/${user.email}`, {
            firstname: firstname,
            lastname: lastname
        }, { withCredentials: true })
        .then(response => {
            setUser(response.data);
            setEditMode(false);
            setSuccess("Dane zostały pomyślnie zaktualizowane");
            setError("");
        })
        .catch(error => {
            console.log(error);
            setError("Błąd podczas zapisywania danych. Spróbuj ponownie.");
        });
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
        },
        input: {
            width: '100%',
            padding: '8px',
            margin: '5px 0',
            borderRadius: '5px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#044d6a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
        },
        error: {
            color: 'red',
            marginTop: '10px',
        },
        success: {
            color: 'green',
            marginTop: '10px',
        }
    };

    if (!user) {
        return <div style={styles.container}>Ładowanie...</div>;
    }

    return (
        <div style={styles.container}>
            <h2>Informacje o mnie:</h2>
            {editMode ? (
                <>
                    <div style={styles.data}>
                        Imię: <input style={styles.input} type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div style={styles.data}>
                        Nazwisko: <input style={styles.input} type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div style={styles.data}>
                        Email: {user.email}
                    </div>
                    <button style={styles.button} onClick={handleSave}>Zapisz</button>
                    <p></p>
                    <button style={styles.button} onClick={() => setEditMode(false)}>Anuluj</button>
                    {success && <div style={styles.success}>{success}</div>}
                    {error && <div style={styles.error}>{error}</div>}
                </>
            ) : (
                <>
                    <div style={styles.data}>Imię: {user.firstname}</div>
                    <div style={styles.data}>Nazwisko: {user.lastname}</div>
                    <div style={styles.data}>Email: {user.email}</div>
                    <button style={styles.button} onClick={() => setEditMode(true)}>Edytuj dane</button>
                </>
            )}
        </div>
    );
}
