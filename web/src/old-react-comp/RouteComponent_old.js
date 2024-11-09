// src/components/RouteComponent.js
import React from 'react';
import SubrouteComponent from './SubrouteComponent';
import IncidentComponent from './IncidentComponent';

function RouteComponent({ route }) {
  const { name, globalIncidents = [], alerts = {}, subroutes = {} } = route;

  return (
    <div>
      <h2>{name}</h2>
      {(globalIncidents.length > 0 || Object.keys(alerts).length > 0) && (
        <div>
          <h3>Both Directions</h3>
          {Object.keys(alerts).map((alertKey) => (
            <h4 key={alertKey}>{alerts[alertKey]}</h4>
          ))}
          {globalIncidents.map((incident, index) => (
            <IncidentComponent key={index} incident={incident} />
          ))}
        </div>
      )}
      {Object.keys(subroutes).map((subrouteKey) => (
        <SubrouteComponent key={subrouteKey} subroute={subroutes[subrouteKey]} />
      ))}
      <hr />
    </div>
  );
}

export default RouteComponent;
