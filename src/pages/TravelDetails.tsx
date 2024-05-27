import React from 'react';
import { useParams, useLocation } from 'react-router-dom';


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

function TravelDetails() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const state = location.state as LocationState;

    const travel = state ? state.travelDetails : null;

    if (!travel) {
        return <div>Travel details not found.</div>;
    }

    // Format date
    const formatDate = (dateString: string): string => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL');
    };

    const styles = {
        container: {
            margin: '20px',
            fontFamily: 'Arial, sans-serif',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            borderColor: '#044d6a',
        },
        th: {
            border: '1px solid #044d6a',
            padding: '8px',
            textAlign: 'left',
            backgroundColor: '#044d6a',
            color: 'white',
        },
        td: {
            border: '1px solid #044d6a',
            padding: '8px',
            textAlign: 'left',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Szczegóły podróży</h2>
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <th style={styles.th}>Miasto</th>
                        <td style={styles.td}>{travel.city}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Kraj</th>
                        <td style={styles.td}>{travel.country}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Opis</th>
                        <td style={styles.td}>{travel.description}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Ocena</th>
                        <td style={styles.td}>{travel.rate}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Data rozpoczęcia</th>
                        <td style={styles.td}>{formatDate(travel.startDate)}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Data zakończenia</th>
                        <td style={styles.td}>{formatDate(travel.endDate)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TravelDetails;
