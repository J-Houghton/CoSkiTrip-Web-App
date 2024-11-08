 
const express = require('express');
const path = require('path');
const { COTripUtil } = require('../functions/utils/COTripUtil.js');
const { DataProcessor } = require('../functions/utils/DataProcessor.js');
const { Incident } = require('../functions/components/Incident.js');  
const { Destination } = require('../functions/components/Destination.js');  

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const coTrip = new COTripUtil();
    const dataProcessor = new DataProcessor();

    // Fetch incidents and destinations using existing modules
    let incidents = await coTrip.getIncidents();

    // **Add test incidents to the incidents array with additional information**
    const testIncidentData = {
      type: 'Feature',
      properties: {
        id: 'test-incident-1',
        type: 'Accident',
        category: 'Crash',
        severity: 'major',
        startTime: new Date().toISOString(),
        direction: 'east',
        status: 'confirmed report',
        responseLevel: 'Major',
        vehiclesInvolved: 2,
        fatalities: 0,
        region: 'Region 1',
        jurisdictions: ['Denver County'],
        travelerInformationMessage: 'There is a test accident on I-70 Eastbound near Exit 261.',
        lastUpdated: new Date().toISOString(),
        laneImpacts: [
          {
            direction: 'east',
            laneCount: 3,
            laneClosures: '0x0003', // Binary 0000 0000 0000 0011
            closedLaneTypes: ['left lane', 'center lane'],
          },
        ],
        detours: [
          {
            description: 'Use exit 261 and follow Colfax Ave as a detour.',
            active: true,
            feature: 'LINESTRING(...)',
          },
        ],
        schedule: {
          startTime: new Date().toISOString(),
          endTime: new Date(new Date().getTime() + 3600000).toISOString(), // 1 hour later
          daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          type: 'Scheduled',
        },
        patrolRoute: 'Patrol Route 1',
        additionalImpacts: ['Impacts both directions'],
        routeName: 'I-70',
        city: 'Denver',
        injuries: 1,
        startMarker: 261,
        endMarker: 262,
        isOversizedLoadsProhibited: false,
        lastUpdatedBy: 'CDOT',
        hasRampRestriction: false,
        detectionSource: 'Camera',
        owningGroup: 'CDOT',
      },
    };

    // Append the test incident to the incidents array
    incidents.push(testIncidentData);

    // Now pass the combined incidents to the DataProcessor
    dataProcessor.importIncidents(incidents);

    let destinations = await coTrip.getDestinations();

    // Optionally, add test destinations
    const testDestinationData = {
      type: 'Feature',
      properties: {
        id: 'test-destination-1',
        travelTime: 900, // 15 minutes in seconds
        routeName: 'I-70E',
        startLocation: 'Denver',
        endLocation: 'Aurora',
      },
    };
    destinations.push(testDestinationData);

    dataProcessor.importDestinations(destinations);

    // Build the data structure to pass to the template
    const routes = dataProcessor.routes;

    // Render the template with the routes data
    res.render('index', { routes });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
