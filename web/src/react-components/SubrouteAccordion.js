// src/components/SubrouteAccordion.js
import React from 'react';
import IncidentCard from './IncidentCard'; 
import './SubrouteAccordion.css';

function SubrouteAccordion({ subroute }) {
  const { direction, destinations = [], incidents = [] } = subroute;

  return (
    <details className="subroute-accordion" open>
      <summary>{direction}</summary>
      {destinations.length > 0 && (
        <table className="destinations-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Travel Time</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((destination, index) => (
              <tr key={index}>
                <td>{destination.displayName}</td>
                <td>{destination.travelTime} mins</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {incidents.length > 0 ? (
        <div className="incident-cards">
          {incidents.map((incident, index) => (
            <IncidentCard key={index} incident={incident} />
          ))}
        </div>
      ) : (
        <p className="no-incidents-reported">No incidents reported.</p>
      )}
    </details>
  );
}

export default SubrouteAccordion;
