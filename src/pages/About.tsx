import React from 'react';

function About() {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>O Nas</h1>
            <p style={styles.text}>
                Witamy na naszej stronie Dream Travel! Jest to miejsce, gdzie możesz dzielić się swoimi wspomnieniami z podróży,
                inspirować innych i planować kolejne wyprawy. Podróżowanie to nie tylko odkrywanie nowych miejsc, ale również
                poznawanie różnych kultur, smaków i ludzi. Każda podróż to nowa przygoda i niezwykłe doświadczenie, które
                wzbogaca nasze życie.
            </p>
            <p style={styles.text}>
                Na naszej stronie znajdziesz wiele ciekawych opowieści i zdjęć z różnych zakątków świata. Mamy nadzieję, że
                nasze historie zachęcą Cię do odkrywania nieznanego i że znajdziesz tu inspirację do własnych podróży.
                Dołącz do naszej społeczności podróżników i dziel się swoimi przygodami!
            </p>
        </div>
    );
}

const styles = {
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '50px auto 0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    heading: {
        textAlign: 'center',
        color: '#2c3e50',
    },
    text: {
        fontSize: '18px',
        lineHeight: '1.6',
        marginTop: '20px',
    }
};

export default About;
