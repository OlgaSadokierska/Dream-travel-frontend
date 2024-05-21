import React from "react";
import backgroundImage from '../assets/img.jpg';

export function HomePage() {

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Now, it is yours</h1>
                <p style={styles.subtitle}>DREAM TRAVEL</p>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
        backgroundColor: 'white',
        padding: '20px',
    },
    container: {
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        maxWidth: '95%',
        height: '70vh',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
    },
    heading: {
        fontSize: '2.5em',
        margin: 0,
        color: 'white',
    },
    subtitle: {
        fontSize: '1.2em',
        margin: 0,
    }
};

export default HomePage;
