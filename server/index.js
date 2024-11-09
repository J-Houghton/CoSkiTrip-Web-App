// server/index.js
import express from 'express';
import cors from 'cors';
import { COTripUtil } from './COTripUtil.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const coTrip = new COTripUtil();

    const incidents = await coTrip.getIncidents();
    const destinations = await coTrip.getDestinations();

    // Send both incidents and destinations together
    res.json({ incidents, destinations });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
