// src/components/RouteComponent.js
import React from 'react';
import SubrouteAccordion from './SubrouteAccordion';
import IncidentCard from './IncidentCard';
import './RouteComponent.css';

function RouteComponent({ route }) {
  const { name, globalIncidents = [], alerts = {}, subroutes = {} } = route;

  return (
    <div className="route-container">
      <div className="route-header">
        <h2>{name}</h2>
      </div>
      <div className="route-content">
        {globalIncidents.length > 0 || Object.keys(alerts).length > 0 ? (
          <div className="global-incidents">
            <h3>Both Directions</h3>
            {Object.keys(alerts).map((alertKey) => (
              <h4 key={alertKey} className="alert-message">
                {alerts[alertKey]}
              </h4>
            ))}
            <div className="incident-cards">
              {globalIncidents.map((incident, index) => (
                <IncidentCard key={index} incident={incident} />
              ))}
            </div>
          </div>
        ) : (
          <p className="no-incidents">No global incidents reported.</p>
        )}
        <div className="subroutes">
          {Object.keys(subroutes).map((subrouteKey) => (
            <SubrouteAccordion key={subrouteKey} subroute={subroutes[subrouteKey]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
