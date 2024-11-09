// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import RouteComponent from './react-components/RouteComponent';
import { DataProcessor } from './utils/DataProcessor.js';

function App() {
  const [routes, setRoutes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { incidents, destinations } = await response.json();

        const dataProcessor = new DataProcessor();
        dataProcessor.importIncidents(incidents);
        dataProcessor.importDestinations(destinations);
        console.log('Processed Routes:', dataProcessor.routes); 

        setRoutes(dataProcessor.routes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="App">Loading data...</div>;
  }

  if (error) {
    return <div className="App">{error}</div>;
  }

  return (
    <div className="App">
      <h1>COTrip Incidents and Destinations</h1>
      {Object.keys(routes).length === 0 ? (
        <p>No data available.</p>
      ) : (
        Object.keys(routes).map((routeKey) => (
          <RouteComponent key={routeKey} route={routes[routeKey]} />
        ))
      )}
    </div>
  );

}

export default App;
