
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
  },
  {
    id: 'TID-1111',
    name: 'John Smith',
    photoUrl: 'https://picsum.photos/seed/115/100/100',
    photoHint: 'man tourist',
    kyc: 'Passport: G******11',
    itinerary: ['Shillong', 'Mawsynram'],
    emergencyContacts: [{ name: 'Jane Smith', phone: '+1 1234567890' }],
    locationHistory: [
      { latitude: 25.5788, longitude: 91.8933, timestamp: '2023-10-27T10:00:00Z' },
      { latitude: 25.2991, longitude: 91.5833, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-2222',
    name: 'Emily Johnson',
    photoUrl: 'https://picsum.photos/seed/116/100/100',
    photoHint: 'woman tourist',
    kyc: 'Passport: H******22',
    itinerary: ['Guwahati', 'Tezpur'],
    emergencyContacts: [{ name: 'Michael Johnson', phone: '+44 2079460958' }],
    locationHistory: [
      { latitude: 26.1445, longitude: 91.7362, timestamp: '2023-10-27T11:00:00Z' },
      { latitude: 26.6369, longitude: 92.7923, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-3333',
    name: 'Kenji Tanaka',
    photoUrl: 'https://picsum.photos/seed/117/100/100',
    photoHint: 'asian man',
    kyc: 'Passport: J******33',
    itinerary: ['Imphal', 'Moreh'],
    emergencyContacts: [{ name: 'Yuki Tanaka', phone: '+81 3-1234-5678' }],
    locationHistory: [
      { latitude: 24.8170, longitude: 93.9368, timestamp: '2023-10-27T09:30:00Z' },
      { latitude: 24.2407, longitude: 94.3093, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-4444',
    name: 'Fatima Al-Fassi',
    photoUrl: 'https://picsum.photos/seed/118/100/100',
    photoHint: 'arab woman',
    kyc: 'Passport: L******44',
    itinerary: ['Aizawl', 'Champhai'],
    emergencyContacts: [{ name: 'Youssef Al-Fassi', phone: '+971 501234567' }],
    locationHistory: [
      { latitude: 23.7271, longitude: 92.7176, timestamp: '2023-10-27T12:00:00Z' },
      { latitude: 23.4667, longitude: 93.3333, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-5555',
    name: 'Chloe Dubois',
    photoUrl: 'https://picsum.photos/seed/119/100/100',
    photoHint: 'french woman',
    kyc: 'Passport: N******55',
    itinerary: ['Gangtok', 'Nathu La Pass'],
    emergencyContacts: [{ name: 'Lucas Dubois', phone: '+33 123456789' }],
    locationHistory: [
      { latitude: 27.3389, longitude: 88.6065, timestamp: '2023-10-27T08:00:00Z' },
      { latitude: 27.3868, longitude: 88.8315, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-6666',
    name: 'David Miller',
    photoUrl: 'https://picsum.photos/seed/120/100/100',
    photoHint: 'caucasian man',
    kyc: 'Passport: P******66',
    itinerary: ['Agartala', 'Jampui Hills'],
    emergencyContacts: [{ name: 'Sarah Miller', phone: '+1 9876543210' }],
    locationHistory: [
      { latitude: 23.8315, longitude: 91.2868, timestamp: '2023-10-27T14:00:00Z' },
      { latitude: 24.0333, longitude: 92.2667, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-7777',
    name: 'Ibrahim Cissé',
    photoUrl: 'https://picsum.photos/seed/121/100/100',
    photoHint: 'african man',
    kyc: 'Passport: R******77',
    itinerary: ['Kohima', 'Dzukou Valley'],
    emergencyContacts: [{ name: 'Awa Cissé', phone: '+221 771234567' }],
    locationHistory: [
      { latitude: 25.6751, longitude: 94.1022, timestamp: '2023-10-27T13:00:00Z' },
      { latitude: 25.565, longitude: 94.015, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-8888',
    name: 'Sofia Rossi',
    photoUrl: 'https://picsum.photos/seed/122/100/100',
    photoHint: 'italian woman',
    kyc: 'Passport: T******88',
    itinerary: ['Darjeeling', 'Sandakphu'],
    emergencyContacts: [{ name: 'Marco Rossi', phone: '+39 0123456789' }],
    locationHistory: [
      { latitude: 27.0410, longitude: 88.2663, timestamp: '2023-10-27T07:00:00Z' },
      { latitude: 27.106, longitude: 88.002, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-9999',
    name: 'Liam Murphy',
    photoUrl: 'https://picsum.photos/seed/123/100/100',
    photoHint: 'irish man',
    kyc: 'Passport: V******99',
    itinerary: ['Shillong', 'Laitlum Canyons'],
    emergencyContacts: [{ name: 'Fiona Murphy', phone: '+353 1234567' }],
    locationHistory: [
      { latitude: 25.5788, longitude: 91.8933, timestamp: '2023-10-27T15:00:00Z' },
      { latitude: 25.539, longitude: 91.956, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-1010',
    name: 'Isabella Costa',
    photoUrl: 'https://picsum.photos/seed/124/100/100',
    photoHint: 'brazilian woman',
    kyc: 'Passport: X******10',
    itinerary: ['Guwahati', 'Pobitora Wildlife Sanctuary'],
    emergencyContacts: [{ name: 'Lucas Costa', phone: '+55 11987654321' }],
    locationHistory: [
      { latitude: 26.1445, longitude: 91.7362, timestamp: '2023-10-27T16:00:00Z' },
      { latitude: 26.2167, longitude: 92.0667, timestamp: new Date().toISOString() }
    ]
  },
  {
    id: 'TID-1357',
    name: 'Wei Chen',
    photoUrl: 'https://picsum.photos/seed/125/100/100',
    photoHint: 'chinese man',
    kyc: 'Passport: Y******11',
    itinerary: ['Kolkata', 'Darjeeling'],
    emergencyContacts: [{ name: 'Lin Chen', phone: '+86 13800138000' }],
    locationHistory: [
        { latitude: 22.5726, longitude: 88.3639, timestamp: new Date(Date.now() - 4800000).toISOString() },
        { latitude: 22.5750, longitude: 88.3650, timestamp: new Date().toISOString() },
    ]
  },
  {
      id: 'TID-2468',
      name: 'Olga Petrova',
      photoUrl: 'https://picsum.photos/seed/126/100/100',
      photoHint: 'russian woman',
      kyc: 'Passport: Z******22',
      itinerary: ['Delhi', 'Agra', 'Jaipur'],
      emergencyContacts: [{ name: 'Dmitri Petrov', phone: '+7 9161234567' }],
      locationHistory: [
          { latitude: 28.6139, longitude: 77.2090, timestamp: new Date(Date.now() - 7200000).toISOString() },
          { latitude: 28.6150, longitude: 77.2100, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-9753',
      name: 'Javier García',
      photoUrl: 'https://picsum.photos/seed/127/100/100',
      photoHint: 'spanish man',
      kyc: 'Passport: A******33',
      itinerary: ['Mumbai', 'Goa'],
      emergencyContacts: [{ name: 'Sofia García', phone: '+34 600123456' }],
      locationHistory: [
          { latitude: 19.0760, longitude: 72.8777, timestamp: new Date(Date.now() - 2400000).toISOString() },
          { latitude: 19.0780, longitude: 72.8790, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-8642',
      name: 'Aisha Mohammed',
      photoUrl: 'https://picsum.photos/seed/128/100/100',
      photoHint: 'nigerian woman',
      kyc: 'Passport: B******44',
      itinerary: ['Lagos', 'Abuja'],
      emergencyContacts: [{ name: 'Musa Mohammed', phone: '+234 8021234567' }],
      locationHistory: [
          { latitude: 6.5244, longitude: 3.3792, timestamp: new Date(Date.now() - 9600000).toISOString() },
          { latitude: 6.5260, longitude: 3.3800, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-1928',
      name: 'Hans Müller',
      photoUrl: 'https://picsum.photos/seed/129/100/100',
      photoHint: 'german man',
      kyc: 'Passport: C******55',
      itinerary: ['Berlin', 'Munich', 'Hamburg'],
      emergencyContacts: [{ name: 'Greta Müller', phone: '+49 17612345678' }],
      locationHistory: [
          { latitude: 52.5200, longitude: 13.4050, timestamp: new Date(Date.now() - 1200000).toISOString() },
          { latitude: 52.5220, longitude: 13.4070, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-3746',
      name: 'Ji-Hoon Kim',
      photoUrl: 'https://picsum.photos/seed/130/100/100',
      photoHint: 'korean man',
      kyc: 'Passport: D******66',
      itinerary: ['Seoul', 'Busan'],
      emergencyContacts: [{ name: 'Soo-Jin Kim', phone: '+82 1012345678' }],
      locationHistory: [
          { latitude: 37.5665, longitude: 126.9780, timestamp: new Date(Date.now() - 6000000).toISOString() },
          { latitude: 37.5680, longitude: 126.9800, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-5867',
      name: 'Fatima Khan',
      photoUrl: 'https://picsum.photos/seed/131/100/100',
      photoHint: 'pakistani woman',
      kyc: 'Passport: E******77',
      itinerary: ['Karachi', 'Lahore'],
      emergencyContacts: [{ name: 'Ali Khan', phone: '+92 3001234567' }],
      locationHistory: [
          { latitude: 24.8607, longitude: 67.0011, timestamp: new Date(Date.now() - 8400000).toISOString() },
          { latitude: 24.8620, longitude: 67.0030, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-4958',
      name: 'Mohammed Al-Mansoori',
      photoUrl: 'https://picsum.photos/seed/132/100/100',
      photoHint: 'emirati man',
      kyc: 'Passport: F******88',
      itinerary: ['Dubai', 'Abu Dhabi'],
      emergencyContacts: [{ name: 'Aisha Al-Mansoori', phone: '+971 501234567' }],
      locationHistory: [
          { latitude: 25.2048, longitude: 55.2708, timestamp: new Date(Date.now() - 3600000).toISOString() },
          { latitude: 25.2060, longitude: 55.2720, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-6079',
      name: 'Olivia Williams',
      photoUrl: 'https://picsum.photos/seed/133/100/100',
      photoHint: 'australian woman',
      kyc: 'Passport: G******99',
      itinerary: ['Sydney', 'Melbourne'],
      emergencyContacts: [{ name: 'Jack Williams', phone: '+61 412345678' }],
      locationHistory: [
          { latitude: -33.8688, longitude: 151.2093, timestamp: new Date(Date.now() - 10800000).toISOString() },
          { latitude: -33.8670, longitude: 151.2100, timestamp: new Date().toISOString() },
      ]
  },
  {
      id: 'TID-8190',
      name: 'Takeshi Yamamoto',
      photoUrl: 'https://picsum.photos/seed/134/100/100',
      photoHint: 'japanese man',
      kyc: 'Passport: H******00',
      itinerary: ['Tokyo', 'Kyoto', 'Osaka'],
      emergencyContacts: [{ name: 'Yumi Yamamoto', phone: '+81 9012345678' }],
      locationHistory: [
          { latitude: 35.6895, longitude: 139.6917, timestamp: new Date(Date.now() - 12000000).toISOString() },
          { latitude: 35.6900, longitude: 139.6930, timestamp: new Date().toISOString() },
      ]
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
      {lat: 25.5925, lng: 91.9056},
      {lat: 25.5913, lng: 91.9092},
      {lat: 25.5901, lng: 91.9123},
      {lat: 25.5885, lng: 91.9150},
      {lat: 25.5860, lng: 91.9168},
      {lat: 25.5833, lng: 91.9167},
      {lat: 25.5811, lng: 91.9152},
      {lat: 25.5794, lng: 91.9125},
      {lat: 25.5786, lng: 91.9095},
      {lat: 25.5791, lng: 91.9061},
      {lat: 25.5808, lng: 91.9034},
      {lat: 25.5839, lng: 91.9015},
      {lat: 25.5872, lng: 91.9018},
      {lat: 25.5905, lng: 91.9033}
    ]
  },
  {
    id: 'zone-02',
    name: 'Police Bazaar',
    type: 'High-Traffic',
    description: 'The main commercial hub of Shillong, experiences heavy footfall and traffic.',
    path: [
      {lat: 25.5782, lng: 91.8914},
      {lat: 25.5794, lng: 91.8923},
      {lat: 25.5788, lng: 91.8935},
      {lat: 25.5797, lng: 91.8948},
      {lat: 25.5785, lng: 91.8960},
      {lat: 25.5771, lng: 91.8951},
      {lat: 25.5778, lng: 91.8938},
      {lat: 25.5769, lng: 91.8926},
    ]
  },
  {
    id: 'zone-03',
    name: 'Umiam Lake Viewpoint',
    type: 'Scenic',
    description: 'A popular tourist spot offering panoramic views of Umiam Lake.',
    path: [
        {lat: 25.6784, lng: 91.8943},
        {lat: 25.6775, lng: 91.8961},
        {lat: 25.6760, lng: 91.8979},
        {lat: 25.6742, lng: 91.8986},
        {lat: 25.6725, lng: 91.8980},
        {lat: 25.6711, lng: 91.8965},
        {lat: 25.6704, lng: 91.8944},
        {lat: 25.6713, lng: 91.8926},
        {lat: 25.6730, lng: 91.8912},
        {lat: 25.6752, lng: 91.8909},
        {lat: 25.6773, lng: 91.8919}
    ]
  }
];

