// src/components/SubrouteComponent.js
import React from 'react';
import IncidentComponent from './IncidentComponent';

function SubrouteComponent({ subroute }) {
  const { direction, destinations = [], incidents = [] } = subroute;

  return (
    <div>
      <h3>{direction}</h3>
      {destinations.length > 0 && (
        <table>
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
        incidents.map((incident, index) => (
          <IncidentComponent key={index} incident={incident} />
        ))
      ) : (
        <h4>No Incidents Reported</h4>
      )}
    </div>
  );
}

export default SubrouteComponent;
