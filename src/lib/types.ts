
export type Location = {
  latitude: number;
  longitude: number;
};

export type LocationHistory = Location & {
  timestamp: string;
};

export type Tourist = {
  id: string;
  name: string;
  photoUrl: string;
  photoHint: string;
  kyc: string;
  itinerary: string[];
  emergencyContacts: { name: string; phone: string }[];
  locationHistory: LocationHistory[];
};

export type Alert = {
  id: string;
  tourist: Tourist;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  timestamp: string;
  location: Location;
  details: string;
  status: 'New' | 'Acknowledged' | 'Dispatched' | 'Resolved';
};

export type PatrolUnit = {
  id: string;
  name: string;
  location: Location;
  status: 'Available' | 'On-duty' | 'Unavailable';
};

export type FIR = {
  id: string;
  alertId: string;
  touristName: string;
  incidentType: string;
  timestamp: string;
  firText: string;
}
