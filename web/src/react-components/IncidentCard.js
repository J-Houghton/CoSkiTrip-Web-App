// src/components/IncidentCard.js
import React from 'react';
import './IncidentCard.css'; // Import the CSS file for styling

function IncidentCard({ incident }) {
  const { properties } = incident;

  if (!properties) {
    return null;
  }

  const severityIcon = {
    minor: 'warning',
    major: 'error',
    severe: 'report_problem',
  }[properties.severity] || 'info';

  return (
    <div className={`incident-card ${properties.severity}`}>
      <h4>
        <span className="material-icons severity-icon">{severityIcon}</span>
        {properties.type} / {properties.category}
      </h4>
      <p className="incident-message">{properties.travelerInformationMessage}</p>
      <p>
        <strong>Severity:</strong> {properties.severity}
      </p>
      <p>
        <strong>Start Time:</strong>{' '}
        {new Date(properties.startTime).toLocaleString('en-US', {
          timeZone: 'America/Denver',
        })}
      </p>
      <p>
        <strong>Direction:</strong> {properties.direction}
      </p>
      {properties.fatalities > 0 && (
        <p>
          <strong>Fatalities:</strong> {properties.fatalities}
        </p>
      )}
      <p>
        <strong>Region:</strong> {properties.region}
      </p>
      {properties.detours && properties.detours.length > 0 && (
        <div>
          <p>
            <strong>Detours:</strong>
          </p>
          <ul>
            {properties.detours.map((detour, index) => (
              <li key={index}>{detour.description}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="last-updated">
        <em>
          Last Updated:{' '}
          {new Date(properties.lastUpdated).toLocaleString('en-US', {
            timeZone: 'America/Denver',
          })}
        </em>
      </p>
    </div>
  );
}

export default IncidentCard;
