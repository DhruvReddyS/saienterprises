export type PresenceType =
  | 'headquarters'
  | 'salesOffice'
  | 'serviceCentre'
  | 'salesPartner';

export type PresenceFilter = PresenceType | 'all';

export interface PresenceContact {
  name: string;
  phone?: string;
  email?: string;
}

export interface PresenceEntry {
  id: string;
  type: PresenceType;
  company: string;
  description: string;
  territory?: string;
  companyEmails?: string[];
  contacts: PresenceContact[];
}

export interface PresenceCity {
  id: string;
  city: string;
  state: string;
  stateId: string;
  lat: number;
  lng: number;
  mapPosition?: {
    x: number;
    y: number;
  };
  mapOffset?: {
    x?: number;
    y?: number;
  };
  entries: PresenceEntry[];
}

// Centralized source for the India presence experience.
// Future CMS/API integrations can replace this static export without changing the map UI.
export const indiaPresenceCities: PresenceCity[] = [
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    stateId: 'tg',
    lat: 17.385,
    lng: 78.4867,
    mapPosition: { x: 33.3, y: 63.9 },
    entries: [
      {
        id: 'hyderabad-hq',
        type: 'headquarters',
        company: 'Sai Enterprises',
        description:
          'Corporate headquarters handling leadership, commercial coordination, principal customer relationships, and machine sourcing.',
        contacts: [
          {
            name: 'S. Dayaker Reddy',
            phone: '+91-7021220085',
            email: 'reddydayaker@gmail.com',
          },
          {
            name: 'S. Venkat',
            phone: '+91-9397678950',
            email: 'venkat@saienterprises.info',
          },
        ],
      },
      {
        id: 'hyderabad-service',
        type: 'serviceCentre',
        company: 'Sai Enterprises Service Team',
        description:
          'Field service and technical support point for installation, maintenance, and troubleshooting across Telangana and nearby print hubs.',
        contacts: [],
      },
    ],
  },
  {
    id: 'delhi',
    city: 'Delhi',
    state: 'Delhi',
    stateId: 'dl',
    lat: 28.6139,
    lng: 77.209,
    mapPosition: { x: 30.8, y: 29.5 },
    mapOffset: { x: 7, y: -1 },
    entries: [
      {
        id: 'delhi-sales-office',
        type: 'salesOffice',
        company: 'Sai Enterprises',
        description:
          'North India sales office supporting commercial enquiries, proposal coordination, and machine planning for regional customers.',
        contacts: [
          {
            name: 'M.S. Rao',
            phone: '+91-9312175513',
            email: 'msrao@saienterprises.info',
          },
        ],
      },
      {
        id: 'delhi-service',
        type: 'serviceCentre',
        company: 'Sai Enterprises Service Team',
        description:
          'Service support location for installation follow-up, technical coordination, and field response in the Delhi market.',
        contacts: [],
      },
    ],
  },
  {
    id: 'vijayawada',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    stateId: 'ap',
    lat: 16.5062,
    lng: 80.648,
    mapPosition: { x: 41.7, y: 66.8 },
    mapOffset: { x: 7, y: 5 },
    entries: [
      {
        id: 'vijayawada-service',
        type: 'serviceCentre',
        company: 'Sai Enterprises Service Team',
        description:
          'Regional service centre supporting printers and converters across Andhra Pradesh with machine assistance and field coordination.',
        contacts: [],
      },
    ],
  },
  {
    id: 'kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    stateId: 'wb',
    lat: 22.5726,
    lng: 88.3639,
    mapPosition: { x: 68.3, y: 46.3 },
    mapOffset: { x: 6, y: -1 },
    entries: [
      {
        id: 'kolkata-service',
        type: 'serviceCentre',
        company: 'Sai Enterprises Service Team',
        description:
          'Service support point for Eastern India to help with post-installation requirements, troubleshooting, and technical follow-up.',
        contacts: [],
      },
      {
        id: 'kolkata-partner',
        type: 'salesPartner',
        company: 'Printers Supply Co.',
        territory: 'West Bengal / North East',
        description:
          'Regional sales partner supporting customer coverage across Kolkata, West Bengal, and North East markets.',
        contacts: [
          {
            name: 'Amitabh Luthra',
            email: 'amitabh@printersuppliers.com',
          },
        ],
      },
    ],
  },
  {
    id: 'pune',
    city: 'Pune',
    state: 'Maharashtra',
    stateId: 'mh',
    lat: 18.5204,
    lng: 73.8567,
    mapPosition: { x: 19.6, y: 57.2 },
    mapOffset: { x: 7, y: 6 },
    entries: [
      {
        id: 'pune-service',
        type: 'serviceCentre',
        company: 'Sai Enterprises Service Team',
        description:
          'Dedicated western-region service centre for machine support, technical follow-up, and response coordination.',
        contacts: [],
      },
      {
        id: 'pune-maks',
        type: 'salesPartner',
        company: 'Maks Enterprises',
        description:
          'Sales partner supporting machinery enquiries and customer coordination in the Pune market.',
        contacts: [
          {
            name: 'Anirudha Kulkarni',
            phone: '+91-9422086181',
            email: 'maks0123@gmail.com',
          },
        ],
      },
      {
        id: 'pune-shradha',
        type: 'salesPartner',
        company: 'Shradha Enterprises',
        description:
          'Regional sales partner extending local commercial support and customer coordination for Pune-based requirements.',
        contacts: [
          {
            name: 'Miland Pradhan',
            phone: '+91-9422085611',
            email: 'info.shraddhaenterprises@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    stateId: 'mh',
    lat: 19.076,
    lng: 72.8777,
    mapPosition: { x: 16.3, y: 55.3 },
    mapOffset: { x: -50, y: 4 },
    entries: [
      {
        id: 'mumbai-service',
        type: 'serviceCentre',
        company: 'Sai Enterprises Service Team',
        description:
          'Service centre for western India handling site response, maintenance coordination, and machine support activity.',
        contacts: [],
      },
      {
        id: 'mumbai-partner',
        type: 'salesPartner',
        company: 'Raka Enterprises',
        description:
          'Sales partner supporting commercial outreach and customer servicing for the Mumbai market.',
        contacts: [
          {
            name: 'Dilip Raka',
            phone: '+91-9769719659',
            email: 'dilipraka@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 'ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    stateId: 'gj',
    lat: 23.0225,
    lng: 72.5714,
    mapPosition: { x: 11.1, y: 47.4 },
    mapOffset: { x: -60, y: 4 },
    entries: [
      {
        id: 'ahmedabad-partner',
        type: 'salesPartner',
        company: 'Pankaj Trading Company',
        description:
          'Sales partner supporting machine enquiries and customer relationships across Ahmedabad and the Gujarat market.',
        companyEmails: ['info@pankajtrading.com'],
        contacts: [
          {
            name: 'Pankaj Bhavsar',
            phone: '+91-9825047083',
          },
          {
            name: 'Raj Bhavsar',
            phone: '+91-9825129385',
          },
        ],
      },
    ],
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    stateId: 'rj',
    lat: 26.9124,
    lng: 75.7873,
    mapPosition: { x: 23.5, y: 30.2 },
    mapOffset: { x: -38, y: 4 },
    entries: [
      {
        id: 'jaipur-partner',
        type: 'salesPartner',
        company: 'SKL Associates',
        description:
          'Sales partner serving customers across Jaipur and Rajasthan with local commercial support.',
        companyEmails: ['kphworld@gmail.com'],
        contacts: [
          {
            name: 'Lalith Raghani',
            phone: '+91-9414068007',
            email: 'lalit.kphworld@gmail.com',
          },
          {
            name: 'Kamal Raghani',
            phone: '+91-9414068008',
            email: 'kamalkraghani@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 'goa',
    city: 'Goa',
    state: 'Goa',
    stateId: 'ga',
    lat: 15.2993,
    lng: 74.124,
    mapPosition: { x: 18.8, y: 71.8 },
    mapOffset: { x: -20, y: 6 },
    entries: [
      {
        id: 'goa-partner',
        type: 'salesPartner',
        company: 'JJ Enterprises',
        description:
          'Sales partner supporting customer relationships and machine enquiries in Goa.',
        contacts: [
          {
            name: 'Jeevan Jadhav',
            phone: '+91-9730014575',
            email: 'jeevjadhav@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 'patna',
    city: 'Patna',
    state: 'Bihar',
    stateId: 'br',
    lat: 25.5941,
    lng: 85.1376,
    mapPosition: { x: 61.3, y: 37.4 },
    mapOffset: { x: 7, y: -1 },
    entries: [
      {
        id: 'patna-partner',
        type: 'salesPartner',
        company: 'Rama Enterprises',
        description:
          'Sales partner for Bihar supporting machine enquiries and regional customer coordination.',
        companyEmails: ['ramaenterprisespatna@gmail.com'],
        contacts: [
          {
            name: 'Gopal Krishna',
            phone: '+91-9709700741',
          },
        ],
      },
    ],
  },
  {
    id: 'coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    stateId: 'tn',
    lat: 11.0168,
    lng: 76.9558,
    mapPosition: { x: 29.4, y: 83.3 },
    mapOffset: { x: 7, y: 5 },
    entries: [
      {
        id: 'coimbatore-partner',
        type: 'salesPartner',
        company: 'PR Packs',
        description:
          'Sales partner supporting customer enquiries and regional coordination in Tamil Nadu.',
        contacts: [
          {
            name: 'T. Prabakar',
            phone: '+91-9894028111',
            email: 'Prpacks2025@gmail.com',
          },
        ],
      },
    ],
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    stateId: 'ka',
    lat: 12.9716,
    lng: 77.5946,
    mapPosition: { x: 24.5, y: 74.7 },
    mapOffset: { x: -55, y: 4 },
    entries: [
      {
        id: 'bangalore-partner',
        type: 'salesPartner',
        company: 'Ambica Machinery',
        description:
          'Sales partner supporting customer coverage and local commercial coordination in Karnataka.',
        contacts: [
          {
            name: 'Suresh Gupta',
            phone: '+91-9845212577',
            email: 'amb.machineries@gmail.com',
          },
        ],
      },
    ],
  },
];

export const presenceFilterOptions: Array<{
  value: PresenceFilter;
  label: string;
}> = [
  { value: 'all', label: 'All' },
  { value: 'headquarters', label: 'Headquarters' },
  { value: 'salesOffice', label: 'Sales Offices' },
  { value: 'serviceCentre', label: 'Service Centres' },
  { value: 'salesPartner', label: 'Sales Partners' },
];

export const presenceTypeLabels: Record<PresenceType, string> = {
  headquarters: 'Headquarters',
  salesOffice: 'Sales Office',
  serviceCentre: 'Service Centre',
  salesPartner: 'Sales Partner',
};

export const presenceTypePriority: PresenceType[] = [
  'headquarters',
  'salesOffice',
  'serviceCentre',
  'salesPartner',
];
