// src/components/IncidentComponent.js
import React from 'react';

function IncidentComponent({ incident }) {
  const { properties } = incident;

  if (!properties) {
    return null; // or display a message indicating missing data
  }

  // const laneImpactDetails = incident.getLaneImpactDetails
  //   ? incident.getLaneImpactDetails()
  //   : [];
  // const formattedSchedule = incident.getFormattedSchedule
  //   ? incident.getFormattedSchedule()
  //   : null;

  return (
    <div className={`incident ${properties.severity}`}>
      <h4>
        {properties.type} / {properties.category}
      </h4>
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
      <p>
        <strong>Status:</strong> {properties.status}
      </p>
      <p>
        <strong>Response Level:</strong> {properties.responseLevel}
      </p>
      <p>
        <strong>Vehicles Involved:</strong> {properties.vehiclesInvolved}
      </p>
      {properties.fatalities > 0 && (
        <p>
          <strong>Fatalities:</strong> {properties.fatalities}
        </p>
      )}
      <p>
        <strong>Region:</strong> {properties.region}
      </p>
      {properties.jurisdictions && properties.jurisdictions.length > 0 && (
        <p>
          <strong>Jurisdictions:</strong> {properties.jurisdictions.join(', ')}
        </p>
      )}
      {/* {laneImpactDetails && (
        <div>
          <p>
            <strong>Lane Impacts:</strong>
          </p>
          <ul>
            {laneImpactDetails.getLaneImpactDetails.map((impact, index) => (
              <li key={index}>
                Direction: {impact.direction}, Lane Count: {impact.laneCount}, Closed Lanes:{' '}
                {impact.closedLanes}
              </li>
            ))}
          </ul>
        </div>
      )} */}
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
      {/* {formattedSchedule && (
        <div>
          <p>
            <strong>Schedule:</strong>
          </p>
          <p>
            Start Time: {formattedSchedule.startTime}
            <br />
            End Time: {formattedSchedule.endTime}
            <br />
            Days of Week: {formattedSchedule.daysOfWeek}
            <br />
            Type: {formattedSchedule.type}
          </p>
        </div>
      )} */}
      <p>
        <strong>Message:</strong> {properties.travelerInformationMessage}
      </p>
      <p>
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

export default IncidentComponent;
