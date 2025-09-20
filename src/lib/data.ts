import type { Tourist, PatrolUnit, Alert } from './types';

export const tourists: Tourist[] = [
  {
    id: 'TID-8421',
    name: 'Aarav Sharma',
    photoUrl: 'https://picsum.photos/seed/101/100/100',
    photoHint: 'man portrait',
    kyc: 'Aadhaar: **** **** 1234',
    itinerary: ['Shillong', 'Cherrapunji', 'Dawki'],
    emergencyContacts: [{ name: 'Priya Sharma', phone: '+91 9876543210' }],
    locationHistory: [
      { latitude: 25.5788, longitude: 91.8933, timestamp: new Date(Date.now() - 3600000).toISOString() },
      { latitude: 25.5760, longitude: 91.8990, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-9567',
    name: 'Saanvi Gupta',
    photoUrl: 'https://picsum.photos/seed/102/100/100',
    photoHint: 'woman portrait',
    kyc: 'Passport: U******56',
    itinerary: ['Guwahati', 'Kaziranga National Park'],
    emergencyContacts: [{ name: 'Rohan Gupta', phone: '+91 8765432109' }],
    locationHistory: [
      { latitude: 26.1445, longitude: 91.7362, timestamp: new Date(Date.now() - 7200000).toISOString() },
      { latitude: 26.1510, longitude: 91.7405, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-3345',
    name: 'Vivaan Singh',
    photoUrl: 'https://picsum.photos/seed/103/100/100',
    photoHint: 'young man',
    kyc: 'Aadhaar: **** **** 5678',
    itinerary: ['Tawang', 'Bomdila'],
    emergencyContacts: [{ name: 'Anika Singh', phone: '+91 7654321098' }],
    locationHistory: [
      { latitude: 27.5851, longitude: 91.8643, timestamp: new Date(Date.now() - 1800000).toISOString() },
      { latitude: 27.5890, longitude: 91.8680, timestamp: new Date().toISOString() },
    ],
  },
   {
    id: 'TID-6789',
    name: 'Diya Patel',
    photoUrl: 'https://picsum.photos/seed/104/100/100',
    photoHint: 'woman smiling',
    kyc: 'Passport: K******21',
    itinerary: ['Majuli', 'Sivasagar'],
    emergencyContacts: [{ name: 'Arjun Patel', phone: '+91 6543210987' }],
    locationHistory: [
      { latitude: 26.9155, longitude: 94.1315, timestamp: new Date(Date.now() - 5400000).toISOString() },
      { latitude: 26.9201, longitude: 94.1398, timestamp: new Date().toISOString() },
    ],
  },
];

export const patrolUnits: PatrolUnit[] = [
  { id: 'PU-01', name: 'Alpha-1', location: { latitude: 25.579, longitude: 91.894 }, status: 'Available' },
  { id: 'PU-02', name: 'Bravo-5', location: { latitude: 25.575, longitude: 91.898 }, status: 'Available' },
  { id: 'PU-03', name: 'Charlie-9', location: { latitude: 26.140, longitude: 91.730 }, status: 'On-duty' },
];

export const initialAlerts: Alert[] = [
  {
    id: 'alert-1',
    tourist: tourists[1],
    type: 'Geo-fence Breach',
    severity: 'Medium',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    location: tourists[1].locationHistory[1],
    details: 'Entered a restricted area near the military base.',
    status: 'New',
  },
  {
    id: 'alert-2',
    tourist: tourists[2],
    type: 'Panic Button',
    severity: 'Critical',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    location: tourists[2].locationHistory[1],
    details: 'SOS signal activated by the tourist.',
    status: 'Acknowledged',
  },
];
