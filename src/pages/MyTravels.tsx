import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function MyTravels() {
  const [travels, setTravels] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/me/travels", { withCredentials: true })
      .then((response) => {
        console.log("Travels data:", response.data); // Log the response data
        setTravels(response.data);
      })
      .catch((error) => {
        console.log("Error fetching travels:", error);
      });
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("pl-PL");
  }

  function handleDetails(travelId) {
    const travelDetails = travels.find(travel => travel.id === travelId);
    if (travelDetails) {
      navigate(`/details/${travelId}`, { state: { travelDetails } });
    }
  }

  function handleEdit(travelId) {
    const travelDetails = travels.find(travel => travel.id === travelId);
    if (travelDetails) {
      navigate(`/edit/${travelId}`, { state: { travelDetails } });
    }
  }

  function handleDelete(travelId) {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę podróż?");
    if (confirmDelete) {
      axios.delete(`http://localhost:8080/api/v1/travels/${travelId}`, { withCredentials: true })
        .then(response => {
          setTravels(travels.filter(travel => travel.id !== travelId));
          setSuccessMessage("Podróż została pomyślnie usunięta.");
          setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch(error => {
          console.error("Error deleting travel:", error);
        });
    }
  }

  const sortedTravels = React.useMemo(() => {
    let sortableItems = [...travels];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [travels, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const getSortDirectionIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↓" : "↑";
    }
    return "";
  };

  const headers = [
    { name: "Kraj", key: "country" },
    { name: "Miasto", key: "city" },
    { name: "Data rozpoczęcia", key: "startDate" },
    { name: "Data zakończenia", key: "endDate" },
    { name: "Akcje", key: "details" },
  ];

  const styles = {
    container: {
      margin: "20px",
      fontFamily: "Arial, sans-serif",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      borderColor: "#044d6a",
    },
    th: {
      border: "1px solid #044d6a",
      padding: "8px",
      textAlign: "left",
      backgroundColor: "#044d6a",
      color: "white",
      cursor: "pointer",
    },
    td: {
      border: "1px solid #044d6a",
      padding: "8px",
      textAlign: "left",
    },
    button: {
      padding: "5px 10px",
      margin: "2px",
      backgroundColor: "#044d6a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    evenRow: {
      backgroundColor: "#f9f9f9",
    },
    successMessage: {
      color: "green",
      marginTop: "20px",
      textAlign: "center",
    }
  };

  return (
    <div style={styles.container}>
      <h2>Lista moich podróży</h2>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={styles.th}
                onClick={() => requestSort(header.key)}
              >
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
              <td style={styles.td}>
                <button
                  style={styles.button}
                  onClick={() => handleDetails(travel.id)}
                >
                  Wyświetl
                </button>
                <button
                  style={styles.button}
                  onClick={() => handleEdit(travel.id)}
                >
                  Edytuj
                </button>
                <button
                  style={styles.button}
                  onClick={() => handleDelete(travel.id)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
