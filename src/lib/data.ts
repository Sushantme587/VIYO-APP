import type { Tourist, PatrolUnit, Alert, Zone } from './types';

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
  {
    id: 'TID-1123',
    name: 'Aditya Kumar',
    photoUrl: 'https://picsum.photos/seed/105/100/100',
    photoHint: 'man travel',
    kyc: 'Aadhaar: **** **** 2233',
    itinerary: ['Kohima', 'Dimapur'],
    emergencyContacts: [{ name: 'Neha Kumar', phone: '+91 9988776655' }],
    locationHistory: [
      { latitude: 25.6751, longitude: 94.1022, timestamp: new Date(Date.now() - 4000000).toISOString() },
      { latitude: 25.678, longitude: 94.105, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-4567',
    name: 'Ishaan Reddy',
    photoUrl: 'https://picsum.photos/seed/106/100/100',
    photoHint: 'man hiking',
    kyc: 'Aadhaar: **** **** 8899',
    itinerary: ['Imphal', 'Loktak Lake'],
    emergencyContacts: [{ name: 'Sneha Reddy', phone: '+91 9123456789' }],
    locationHistory: [
      { latitude: 24.8170, longitude: 93.9368, timestamp: new Date(Date.now() - 2000000).toISOString() },
      { latitude: 24.820, longitude: 93.940, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-8901',
    name: 'Ananya Rao',
    photoUrl: 'https://picsum.photos/seed/107/100/100',
    photoHint: 'woman nature',
    kyc: 'Passport: M******78',
    itinerary: ['Aizawl', 'Lunglei'],
    emergencyContacts: [{ name: 'Vikram Rao', phone: '+91 8234567890' }],
    locationHistory: [
      { latitude: 23.7271, longitude: 92.7176, timestamp: new Date(Date.now() - 6000000).toISOString() },
      { latitude: 23.730, longitude: 92.720, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-2345',
    name: 'Rohan Joshi',
    photoUrl: 'https://picsum.photos/seed/108/100/100',
    photoHint: 'man glasses',
    kyc: 'Aadhaar: **** **** 1122',
    itinerary: ['Agartala', 'Udaipur (Tripura)'],
    emergencyContacts: [{ name: 'Pooja Joshi', phone: '+91 7345678901' }],
    locationHistory: [
      { latitude: 23.8315, longitude: 91.2868, timestamp: new Date(Date.now() - 3200000).toISOString() },
      { latitude: 23.835, longitude: 91.290, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-6780',
    name: 'Kiara Desai',
    photoUrl: 'https://picsum.photos/seed/109/100/100',
    photoHint: 'woman outdoors',
    kyc: 'Passport: P******34',
    itinerary: ['Gangtok', 'Pelling'],
    emergencyContacts: [{ name: 'Rahul Desai', phone: '+91 6456789012' }],
    locationHistory: [
      { latitude: 27.3389, longitude: 88.6065, timestamp: new Date(Date.now() - 8000000).toISOString() },
      { latitude: 27.341, longitude: 88.610, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-1230',
    name: 'Arnav Mehra',
    photoUrl: 'https://picsum.photos/seed/110/100/100',
    photoHint: 'man smiling',
    kyc: 'Aadhaar: **** **** 5566',
    itinerary: ['Darjeeling', 'Kalimpong'],
    emergencyContacts: [{ name: 'Sunita Mehra', phone: '+91 9567890123' }],
    locationHistory: [
      { latitude: 27.0410, longitude: 88.2663, timestamp: new Date(Date.now() - 1000000).toISOString() },
      { latitude: 27.043, longitude: 88.269, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-4598',
    name: 'Myra Iyer',
    photoUrl: 'https://picsum.photos/seed/111/100/100',
    photoHint: 'woman glasses',
    kyc: 'Aadhaar: **** **** 7788',
    itinerary: ['Shillong', 'Mawlynnong'],
    emergencyContacts: [{ name: 'Gopal Iyer', phone: '+91 8678901234' }],
    locationHistory: [
      { latitude: 25.5788, longitude: 91.8933, timestamp: new Date(Date.now() - 2500000).toISOString() },
      { latitude: 25.5795, longitude: 91.8955, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-7801',
    name: 'Kabir Menon',
    photoUrl: 'https://picsum.photos/seed/112/100/100',
    photoHint: 'man serious',
    kyc: 'Passport: Z******90',
    itinerary: ['Kaziranga', 'Jorhat'],
    emergencyContacts: [{ name: 'Divya Menon', phone: '+91 7789012345' }],
    locationHistory: [
      { latitude: 26.6375, longitude: 93.3553, timestamp: new Date(Date.now() - 4800000).toISOString() },
      { latitude: 26.640, longitude: 93.358, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-0123',
    name: 'Zara Begum',
    photoUrl: 'https://picsum.photos/seed/113/100/100',
    photoHint: 'woman traditional',
    kyc: 'Aadhaar: **** **** 3344',
    itinerary: ['Guwahati', 'Hajo'],
    emergencyContacts: [{ name: 'Imran Begum', phone: '+91 6890123456' }],
    locationHistory: [
      { latitude: 26.1445, longitude: 91.7362, timestamp: new Date(Date.now() - 9000000).toISOString() },
      { latitude: 26.148, longitude: 91.739, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'TID-5678',
    name: 'Reyansh Thakur',
    photoUrl: 'https://picsum.photos/seed/114/100/100',
    photoHint: 'man backpack',
    kyc: 'Aadhaar: **** **** 9900',
    itinerary: ['Tawang', 'Sela Pass'],
    emergencyContacts: [{ name: 'Riya Thakur', phone: '+91 9112233445' }],
    locationHistory: [
      { latitude: 27.5851, longitude: 91.8643, timestamp: new Date(Date.now() - 500000).toISOString() },
      { latitude: 27.588, longitude: 91.867, timestamp: new Date().toISOString() },
    ],
  }
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

export const zones: Zone[] = [
  {
    id: 'zone-01',
    name: 'Shillong Military Cantonment',
    type: 'Restricted',
    description: 'A high-security military zone. Civilian entry is prohibited without authorization.',
    path: [
      { lat: 25.585, lng: 91.900 },
      { lat: 25.590, lng: 91.910 },
      { lat: 25.580, lng: 91.915 },
      { lat: 25.575, lng: 91.905 },
    ]
  },
  {
    id: 'zone-02',
    name: 'Police Bazaar',
    type: 'High-Traffic',
    description: 'The main commercial hub of Shillong, experiences heavy footfall and traffic.',
    path: [
      { lat: 25.577, lng: 91.891 },
      { lat: 25.579, lng: 91.894 },
      { lat: 25.576, lng: 91.896 },
      { lat: 25.574, lng: 91.893 },
    ]
  },
    {
    id: 'zone-03',
    name: 'Umiam Lake Viewpoint',
    type: 'Scenic',
    description: 'A popular tourist spot offering panoramic views of Umiam Lake.',
    path: [
      { lat: 25.660, lng: 91.890 },
      { lat: 25.665, lng: 91.892 },
      { lat: 25.662, lng: 91.898 },
      { lat: 25.658, lng: 91.893 },
    ]
  }
];
