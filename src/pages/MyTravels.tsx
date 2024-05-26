import React, { useEffect, useState } from "react";
import axios from "axios";

export function MyTravels() {
    const [travels, setTravels] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {

        //to do zmiany
        axios.get('http://localhost:8080/api/v1/travels', { withCredentials: true })
            .then(response => setTravels(response.data))
            .catch(error => console.log(error));
    }, []);

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('pl-PL');
    }
     //trzeba zaimplementować
    function handleDetails(travelId) {
        console.log('Szczegóły dla podróży ID:', travelId);
    }

    const sortedTravels = React.useMemo(() => {
        let sortableItems = [...travels];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [travels, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        } else {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    };

    const getSortDirectionIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↓' : '↑';
        }
        return '';
    };

    const headers = [
        { name: 'Kraj', key: 'country' },
        { name: 'Miasto', key: 'city' },
        { name: 'Data rozpoczęcia', key: 'startDate' },
        { name: 'Data zakończenia', key: 'endDate' },
        { name: 'Opis', key: 'description' },
        { name: 'Ocena', key: 'rate' },
        { name: 'Szczegóły', key: 'details'}
    ];

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
            cursor: 'pointer',
        },
        td: {
            border: '1px solid #044d6a',
            padding: '8px',
            textAlign: 'left',
        },
        button: {
            padding: '5px 10px',
            backgroundColor: '#044d6a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        evenRow: {
            backgroundColor: '#f9f9f9'
        }
    };

    return (
        <div style={styles.container}>
            <h2>Lista moich podróży</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} style={styles.th} onClick={() => requestSort(header.key)}>
                                {header.name} {getSortDirectionIcon(header.key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedTravels.map((travel, index) => (
                        <tr key={travel.id} style={index % 2 === 0 ? styles.evenRow : null}>
                            <td style={styles.td}>{travel.country}</td>
                            <td style={styles.td}>{travel.city}</td>
                            <td style={styles.td}>{formatDate(travel.startDate)}</td>
                            <td style={styles.td}>{formatDate(travel.endDate)}</td>
                            <td style={styles.td}>{travel.description}</td>
                            <td style={styles.td}>{travel.rate}</td>
                            <td style={styles.td}>
                                <button style={styles.button} onClick={() => handleDetails(travel.id)}>Wyświetl</button>
                                <button style={styles.button} onClick={() => handleDetails(travel.id)}>Edytuj</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}