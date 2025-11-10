// Comprehensive Mock Data for Renewal CRM

// Mock Renewal Leads
export const mockRenewalLeads = [
  {
    id: 'R001',
    company: 'TechVision Solutions Pvt Ltd',
    subscriptionId: 'SUB-2024-001',
    ownerPartner: 'Rahul Enterprises',
    product: 'Busy Desktop',
    validTill: '2024-08-15',
    nextFollowUp: '2024-08-10 10:00',
    stage: 'Interested',
    priority: 'Hot',
    mobile: '9876543210',
    alternateNo: '9876543211',
    contactPerson: 'Rajesh Kumar',
    email: 'contact@techvision.com',
    gstin: '27AABCT1234A1Z5',
    city: 'Mumbai',
    serialNo: 'BDT-2024-001',
    callCount: 5,
    lastDisposition: 'Interested in renewal',
    lastFUBy: 'Amit Kumar',
    lastRemark: 'Client interested, waiting for budget approval',
    activationDate: '2023-08-15',
    lastActive: '2024-07-28',
    services: ['GST', 'Inventory', 'Accounts'],
    assignedTo: 'Amit Kumar',
    activeness: 'High',
    vintage: '12 months',
    licenseType: 'Professional',
    offers: ['720 Days Offer', 'Upgrade Discount'],
    gstUsage: 'Active',
    upsellTo: '720 Days',
    offerValidity: '2024-09-30'
  },
  {
    id: 'R002',
    company: 'Global Traders Corporation',
    subscriptionId: 'SUB-2024-002',
    ownerPartner: 'Inside Sales (Delhi Office)',
    product: 'Busy Online',
    validTill: '2024-08-12',
    nextFollowUp: '2024-08-09 15:30',
    stage: 'Due',
    priority: 'Warm',
    mobile: '9123456789',
    alternateNo: '9123456790',
    contactPerson: 'Suresh Mehta',
    email: 'info@globaltraders.com',
    gstin: '09AABCG1234B1Z6',
    city: 'Delhi',
    serialNo: 'BON-2024-002',
    callCount: 3,
    lastDisposition: 'Callback requested',
    lastFUBy: 'Priya Sharma',
    lastRemark: 'Requested callback after board meeting',
    activationDate: '2023-08-12',
    lastActive: '2024-07-25',
    services: ['GST', 'Inventory'],
    assignedTo: 'Priya Sharma',
    activeness: 'Medium',
    vintage: '12 months',
    licenseType: 'Standard',
    offers: [],
    gstUsage: 'Active',
    upsellTo: 'Model Upgrade',
    offerValidity: '-'
  },
  {
    id: 'R003',
    company: 'Sunrise Pharmaceuticals',
    subscriptionId: 'SUB-2023-156',
    ownerPartner: 'Nityam Software',
    product: 'Busy Mandi',
    validTill: '2024-08-20',
    nextFollowUp: '2024-08-11 11:00',
    stage: 'Payment',
    priority: 'Hot',
    mobile: '9988776655',
    alternateNo: '9988776656',
    contactPerson: 'Anil Deshmukh',
    email: 'accounts@sunrise.com',
    gstin: '27AABCS5678C1Z7',
    city: 'Pune',
    serialNo: 'BMD-2023-156',
    callCount: 8,
    lastDisposition: 'Payment pending',
    lastFUBy: 'Rajesh Verma',
    lastRemark: 'Payment processing, expecting confirmation today',
    activationDate: '2022-08-20',
    lastActive: '2024-08-05',
    services: ['GST', 'Inventory', 'Accounts', 'Mandi'],
    assignedTo: 'Rajesh Verma',
    activeness: 'High',
    vintage: '24 months',
    licenseType: 'Enterprise',
    offers: ['720 Days Offer'],
    gstUsage: 'Active',
    upsellTo: 'Mobile',
    offerValidity: '-'
  },
  {
    id: 'R004',
    company: 'Metro Electronics Hub',
    subscriptionId: 'SUB-2024-045',
    ownerPartner: 'Inside Sales (Renewal)',
    product: 'Busy Mobile',
    validTill: '2024-07-30',
    nextFollowUp: '2024-08-08 14:00',
    stage: 'Dropped',
    upsellTo: 'Mobile Bundle',
    offerValidity: '2024-10-15',
    priority: 'Cold',
    mobile: '9876012345',
    alternateNo: '9876012346',
    contactPerson: 'Vikram Singh',
    email: 'metro@electronics.com',
    gstin: '29AABCM9876D1Z8',
    city: 'Bangalore',
    serialNo: 'BMB-2024-045',
    callCount: 2,
    lastDisposition: 'Not interested',
    lastFUBy: 'Sneha Patel',
    lastRemark: 'Client switched to competitor',
    activationDate: '2023-07-30',
    lastActive: '2024-06-15',
    services: ['Basic'],
    assignedTo: 'Sneha Patel',
    activeness: 'Low',
    vintage: '12 months',
    licenseType: 'Basic',
    offers: [],
    gstUsage: 'Inactive'
  },
  {
    id: 'R005',
    company: 'Sharma Retail Solutions',
    subscriptionId: 'SUB-2024-078',
    ownerPartner: 'Rahul Enterprises',
    product: 'Busy Desktop',
    validTill: '2024-08-25',
    nextFollowUp: '2024-08-12 10:30',
    stage: 'Due',
    priority: 'Warm',
    mobile: '9123456780',
    alternateNo: '9123456781',
    contactPerson: 'Neha Sharma',
    email: 'sharma@retail.com',
    gstin: '06AABCS1234E1Z9',
    city: 'Chandigarh',
    serialNo: 'BDT-2024-078',
    callCount: 4,
    lastDisposition: 'Follow-up scheduled',
    lastFUBy: 'Amit Kumar',
    lastRemark: 'Interested in upsell to online version',
    activationDate: '2023-08-25',
    lastActive: '2024-08-01',
    services: ['GST', 'Inventory'],
    assignedTo: 'Amit Kumar',
    activeness: 'Medium',
    vintage: '12 months',
    licenseType: 'Professional',
    offers: ['Upgrade Discount'],
    gstUsage: 'Active'
  },
  {
    id: 'R006',
    company: 'Apex Distributors Ltd',
    subscriptionId: 'SUB-2024-089',
    ownerPartner: 'Inside Sales (Renewal)',
    product: 'Busy Online',
    validTill: '2024-08-18',
    nextFollowUp: '2024-08-13 09:00',
    stage: 'Interested',
    priority: 'Hot',
    mobile: '9876543211',
    alternateNo: '9876543212',
    contactPerson: 'Karan Patel',
    email: 'apex@distributors.com',
    gstin: '27AABCA1234F1Z1',
    city: 'Mumbai',
    serialNo: 'BON-2024-089',
    callCount: 6,
    lastDisposition: 'Pricing discussion',
    lastFUBy: 'Priya Sharma',
    lastRemark: 'Negotiating renewal terms',
    activationDate: '2023-08-18',
    lastActive: '2024-08-06',
    services: ['GST', 'Inventory', 'Accounts'],
    assignedTo: 'Priya Sharma',
    activeness: 'High',
    vintage: '12 months',
    licenseType: 'Enterprise',
    offers: ['720 Days Offer'],
    gstUsage: 'Active'
  },
  {
    id: 'R007',
    company: 'Divine Foods & Beverages',
    subscriptionId: 'SUB-2023-234',
    ownerPartner: 'Bhoopalam Electronics',
    product: 'Busy Desktop',
    validTill: '2024-08-08',
    nextFollowUp: '2024-08-09 16:00',
    stage: 'Due',
    priority: 'Warm',
    mobile: '9988123456',
    alternateNo: '9988123457',
    contactPerson: 'Deepak Joshi',
    email: 'divine@foods.com',
    gstin: '09AABCD1234G1Z2',
    city: 'Delhi',
    serialNo: 'BDT-2023-234',
    callCount: 3,
    lastDisposition: 'Callback requested',
    lastFUBy: 'Rajesh Verma',
    lastRemark: 'Customer requested demo of new features',
    activationDate: '2022-08-08',
    lastActive: '2024-07-30',
    services: ['GST', 'Inventory'],
    assignedTo: 'Rajesh Verma',
    activeness: 'Medium',
    vintage: '24 months',
    licenseType: 'Standard',
    offers: [],
    gstUsage: 'Active'
  },
  {
    id: 'R008',
    company: 'Zenith Textiles Pvt Ltd',
    subscriptionId: 'SUB-2024-112',
    ownerPartner: 'Nityam Software',
    product: 'Busy Mandi',
    validTill: '2024-08-22',
    nextFollowUp: '2024-08-14 11:30',
    stage: 'Payment',
    priority: 'Hot',
    mobile: '9123789456',
    alternateNo: '9123789457',
    contactPerson: 'Priya Gupta',
    email: 'zenith@textiles.com',
    gstin: '29AABCZ1234H1Z3',
    city: 'Bangalore',
    serialNo: 'BMD-2024-112',
    callCount: 7,
    lastDisposition: 'Payment link sent',
    lastFUBy: 'Sneha Patel',
    lastRemark: 'Payment confirmation pending',
    activationDate: '2023-08-22',
    lastActive: '2024-08-07',
    services: ['GST', 'Inventory', 'Accounts', 'Mandi'],
    assignedTo: 'Sneha Patel',
    activeness: 'High',
    vintage: '12 months',
    licenseType: 'Enterprise',
    offers: ['720 Days Offer', 'Upgrade Discount'],
    gstUsage: 'Active'
  },
  {
    id: 'R009',
    company: 'Prime Hardware Solutions',
    subscriptionId: 'SUB-2024-145',
    ownerPartner: 'Rahul Enterprises',
    product: 'Busy Desktop',
    validTill: '2024-08-16',
    nextFollowUp: '2024-08-11 14:30',
    stage: 'Interested',
    priority: 'Warm',
    mobile: '9876012346',
    alternateNo: '9876012347',
    contactPerson: 'Rahul Kapoor',
    email: 'prime@hardware.com',
    gstin: '06AABCP1234I1Z4',
    city: 'Chandigarh',
    serialNo: 'BDT-2024-145',
    callCount: 4,
    lastDisposition: 'Feature inquiry',
    lastFUBy: 'Amit Kumar',
    lastRemark: 'Interested in inventory module upgrade',
    activationDate: '2023-08-16',
    lastActive: '2024-08-02',
    services: ['GST', 'Inventory'],
    assignedTo: 'Amit Kumar',
    activeness: 'Medium',
    vintage: '12 months',
    licenseType: 'Professional',
    offers: ['Upgrade Discount'],
    gstUsage: 'Active'
  },
  {
    id: 'R010',
    company: 'Oceanic Imports & Exports',
    subscriptionId: 'SUB-2023-189',
    ownerPartner: 'Inside Sales (Delhi Office)',
    product: 'Busy Online',
    validTill: '2024-08-05',
    nextFollowUp: '2024-08-10 10:00',
    stage: 'Due',
    priority: 'Cold',
    mobile: '9123456781',
    alternateNo: '9123456782',
    contactPerson: 'Anjali Nair',
    email: 'oceanic@imports.com',
    gstin: '27AABCO1234J1Z5',
    city: 'Mumbai',
    serialNo: 'BON-2023-189',
    callCount: 2,
    lastDisposition: 'Not reachable',
    lastFUBy: 'Priya Sharma',
    lastRemark: 'Multiple attempts, no response',
    activationDate: '2022-08-05',
    lastActive: '2024-06-20',
    services: ['GST'],
    assignedTo: 'Priya Sharma',
    activeness: 'Low',
    vintage: '24 months',
    licenseType: 'Basic',
    offers: [],
    gstUsage: 'Inactive'
  },
  {
    id: 'R011',
    company: 'Royal Garments Corporation',
    subscriptionId: 'SUB-2024-167',
    ownerPartner: 'Inside Sales (Renewal)',
    product: 'Busy Mobile',
    validTill: '2024-08-28',
    nextFollowUp: '2024-08-15 12:00',
    stage: 'Due',
    priority: 'Warm',
    mobile: '9988776656',
    alternateNo: '9988776657',
    contactPerson: 'Manoj Reddy',
    email: 'royal@garments.com',
    gstin: '09AABCR1234K1Z6',
    city: 'Delhi',
    serialNo: 'BMB-2024-167',
    callCount: 3,
    lastDisposition: 'Demo scheduled',
    lastFUBy: 'Rajesh Verma',
    lastRemark: 'Customer wants to see mobile app features',
    activationDate: '2023-08-28',
    lastActive: '2024-08-04',
    services: ['Basic', 'Mobile'],
    assignedTo: 'Rajesh Verma',
    activeness: 'Medium',
    vintage: '12 months',
    licenseType: 'Standard',
    offers: [],
    gstUsage: 'Active'
  },
  {
    id: 'R012',
    company: 'Evergreen Agro Industries',
    subscriptionId: 'SUB-2023-278',
    ownerPartner: 'Nityam Software',
    product: 'Busy Mandi',
    validTill: '2024-08-19',
    nextFollowUp: '2024-08-12 15:00',
    stage: 'Interested',
    priority: 'Hot',
    mobile: '9876543212',
    alternateNo: '9876543213',
    contactPerson: 'Kavita Iyer',
    email: 'evergreen@agro.com',
    gstin: '29AABCE1234L1Z7',
    city: 'Bangalore',
    serialNo: 'BMD-2023-278',
    callCount: 9,
    lastDisposition: 'Quote sent',
    lastFUBy: 'Sneha Patel',
    lastRemark: 'Very interested, comparing with competitor',
    activationDate: '2022-08-19',
    lastActive: '2024-08-07',
    services: ['GST', 'Inventory', 'Accounts', 'Mandi'],
    assignedTo: 'Sneha Patel',
    activeness: 'High',
    vintage: '24 months',
    licenseType: 'Enterprise',
    offers: ['720 Days Offer'],
    gstUsage: 'Active'
  },
  {
    id: 'R013',
    company: 'Global Tech Distributors',
    subscriptionId: 'SUB-2024-201',
    ownerPartner: 'Rahul Enterprises',
    product: 'Busy Desktop',
    validTill: '2024-08-24',
    nextFollowUp: '2024-08-13 11:00',
    stage: 'Payment',
    priority: 'Hot',
    mobile: '9123456782',
    alternateNo: '9123456783',
    contactPerson: 'Sanjay Malhotra',
    email: 'global@tech.com',
    gstin: '27AABCG1234M1Z8',
    city: 'Mumbai',
    serialNo: 'BDT-2024-201',
    callCount: 5,
    lastDisposition: 'Payment processing',
    lastFUBy: 'Amit Kumar',
    lastRemark: 'Finance team processing payment',
    activationDate: '2023-08-24',
    lastActive: '2024-08-06',
    services: ['GST', 'Inventory', 'Accounts'],
    assignedTo: 'Amit Kumar',
    activeness: 'High',
    vintage: '12 months',
    licenseType: 'Professional',
    offers: ['720 Days Offer', 'Upgrade Discount'],
    gstUsage: 'Active'
  },
  {
    id: 'R014',
    company: 'Sterling Pharmaceuticals',
    subscriptionId: 'SUB-2024-089',
    ownerPartner: 'Inside Sales (Delhi Office)',
    product: 'Busy Online',
    validTill: '2024-08-14',
    nextFollowUp: '2024-08-11 09:30',
    stage: 'Due',
    priority: 'Warm',
    mobile: '9988123457',
    alternateNo: '9988123458',
    contactPerson: 'Pooja Agarwal',
    email: 'sterling@pharma.com',
    gstin: '09AABCS1234N1Z9',
    city: 'Delhi',
    serialNo: 'BON-2024-089',
    callCount: 4,
    lastDisposition: 'Callback requested',
    lastFUBy: 'Priya Sharma',
    lastRemark: 'Requested callback after board meeting',
    activationDate: '2023-08-14',
    lastActive: '2024-08-03',
    services: ['GST', 'Inventory', 'Accounts'],
    assignedTo: 'Priya Sharma',
    activeness: 'Medium',
    vintage: '12 months',
    licenseType: 'Professional',
    offers: [],
    gstUsage: 'Active'
  },
  {
    id: 'R015',
    company: 'Velocity Logistics Services',
    subscriptionId: 'SUB-2023-312',
    ownerPartner: 'Bhoopalam Electronics',
    product: 'Busy Desktop',
    validTill: '2024-07-28',
    nextFollowUp: '2024-08-09 13:00',
    stage: 'Dropped',
    priority: 'Cold',
    mobile: '9876012347',
    alternateNo: '9876012348',
    contactPerson: 'Rohit Desai',
    email: 'velocity@logistics.com',
    gstin: '06AABCV1234O1Z0',
    city: 'Chandigarh',
    serialNo: 'BDT-2023-312',
    callCount: 2,
    lastDisposition: 'Not interested',
    lastFUBy: 'Rajesh Verma',
    lastRemark: 'Budget constraints, postponing renewal',
    activationDate: '2022-07-28',
    lastActive: '2024-05-15',
    services: ['GST', 'Inventory'],
    assignedTo: 'Rajesh Verma',
    activeness: 'Low',
    vintage: '24 months',
    licenseType: 'Standard',
    offers: [],
    gstUsage: 'Inactive'
  }
];

// Dashboard Metrics Mock Data - Per User
// Operational Dashboard Metrics
export const mockOperationalMetrics = [
  {
    name: 'Sudhanshu Kumar',
    call: { pending: 12, done: 38 },
    meeting: { pending: 5, done: 7 },
    matured: 42,
    interested: 15,
    paymentReceived: 38,
    dropped: 5
  },
  {
    name: 'Amit Sharma',
    call: { pending: 15, done: 42 },
    meeting: { pending: 3, done: 10 },
    matured: 38,
    interested: 12,
    paymentReceived: 35,
    dropped: 3
  },
  {
    name: 'Shubham Verma',
    call: { pending: 10, done: 32 },
    meeting: { pending: 2, done: 6 },
    matured: 28,
    interested: 8,
    paymentReceived: 25,
    dropped: 7
  },
  {
    name: 'Nitesh Gupta',
    call: { pending: 8, done: 35 },
    meeting: { pending: 4, done: 7 },
    matured: 26,
    interested: 7,
    paymentReceived: 22,
    dropped: 6
  },
  {
    name: 'Priya Singh',
    call: { pending: 11, done: 40 },
    meeting: { pending: 3, done: 8 },
    matured: 31,
    interested: 9,
    paymentReceived: 28,
    dropped: 4
  },
  {
    name: 'Rahul Patel',
    call: { pending: 9, done: 28 },
    meeting: { pending: 2, done: 5 },
    matured: 23,
    interested: 6,
    paymentReceived: 20,
    dropped: 5
  }
];

// Operational Upsell Offers Metrics
export const mockOperationalUpsellOffersMetrics = [
  {
    name: '720 Days',
    call: { pending: 20, done: 72 },
    meeting: { pending: 8, done: 13 },
    matured: 78,
    interested: 32,
    paymentReceived: 72,
    dropped: 8
  },
  {
    name: 'Model Upgrade',
    call: { pending: 14, done: 48 },
    meeting: { pending: 5, done: 10 },
    matured: 35,
    interested: 18,
    paymentReceived: 32,
    dropped: 6
  },
  {
    name: 'Mobile',
    call: { pending: 12, done: 40 },
    meeting: { pending: 3, done: 8 },
    matured: 32,
    interested: 15,
    paymentReceived: 29,
    dropped: 4
  },
  {
    name: 'Mobile Bundle',
    call: { pending: 10, done: 32 },
    meeting: { pending: 2, done: 6 },
    matured: 28,
    interested: 12,
    paymentReceived: 25,
    dropped: 3
  },
  {
    name: 'Busy Online',
    call: { pending: 16, done: 58 },
    meeting: { pending: 6, done: 10 },
    matured: 45,
    interested: 22,
    paymentReceived: 41,
    dropped: 7
  }
];

// 4-Month Renewal Trend Metrics
export const mockRenewal4MonthMetrics = [
  {
    name: 'Sudhanshu Kumar',
    mMinus2: { due: 38, renewed: 28, percentage: 73.7 },
    mMinus1: { due: 45, renewed: 32, percentage: 71.1 },
    m0: { due: 67, renewed: 42, percentage: 62.7 },
    mPlus1: { due: 52, renewed: 0, percentage: 0 }
  },
  {
    name: 'Amit Sharma',
    mMinus2: { due: 32, renewed: 25, percentage: 78.1 },
    mMinus1: { due: 38, renewed: 28, percentage: 73.7 },
    m0: { due: 58, renewed: 38, percentage: 65.5 },
    mPlus1: { due: 48, renewed: 0, percentage: 0 }
  },
  {
    name: 'Shubham Verma',
    mMinus2: { due: 28, renewed: 18, percentage: 64.3 },
    mMinus1: { due: 32, renewed: 19, percentage: 59.4 },
    m0: { due: 48, renewed: 28, percentage: 58.3 },
    mPlus1: { due: 42, renewed: 0, percentage: 0 }
  },
  {
    name: 'Nitesh Gupta',
    mMinus2: { due: 25, renewed: 17, percentage: 68.0 },
    mMinus1: { due: 30, renewed: 19, percentage: 63.3 },
    m0: { due: 50, renewed: 26, percentage: 52.0 },
    mPlus1: { due: 47, renewed: 0, percentage: 0 }
  },
  {
    name: 'Priya Singh',
    mMinus2: { due: 22, renewed: 19, percentage: 86.4 },
    mMinus1: { due: 28, renewed: 22, percentage: 78.6 },
    m0: { due: 42, renewed: 31, percentage: 73.8 },
    mPlus1: { due: 35, renewed: 0, percentage: 0 }
  },
  {
    name: 'Rahul Patel',
    mMinus2: { due: 20, renewed: 14, percentage: 70.0 },
    mMinus1: { due: 25, renewed: 16, percentage: 64.0 },
    m0: { due: 38, renewed: 23, percentage: 60.5 },
    mPlus1: { due: 30, renewed: 0, percentage: 0 }
  }
];

export const mockDashboardMetrics = [
  {
    name: 'Sudhanshu Kumar',
    mMinus1: { due: 45, renewed: 32, percentage: 71.1 },
    m0: { due: 67, renewed: 42, percentage: 62.7 },
    mPlus1: { due: 52, renewed: 0, percentage: 0 },
    potentialPercentage: 35.2,
    interested: 15,
    matured: 42
  },
  {
    name: 'Amit Sharma',
    mMinus1: { due: 38, renewed: 28, percentage: 73.7 },
    m0: { due: 58, renewed: 38, percentage: 65.5 },
    mPlus1: { due: 48, renewed: 0, percentage: 0 },
    potentialPercentage: 28.5,
    interested: 12,
    matured: 38
  },
  {
    name: 'Shubham Verma',
    mMinus1: { due: 32, renewed: 19, percentage: 59.4 },
    m0: { due: 48, renewed: 28, percentage: 58.3 },
    mPlus1: { due: 42, renewed: 0, percentage: 0 },
    potentialPercentage: 42.8,
    interested: 8,
    matured: 28
  },
  {
    name: 'Nitesh Gupta',
    mMinus1: { due: 30, renewed: 19, percentage: 63.3 },
    m0: { due: 50, renewed: 26, percentage: 52.0 },
    mPlus1: { due: 47, renewed: 0, percentage: 0 },
    potentialPercentage: 48.6,
    interested: 7,
    matured: 26
  },
  {
    name: 'Priya Singh',
    mMinus1: { due: 28, renewed: 22, percentage: 78.6 },
    m0: { due: 42, renewed: 31, percentage: 73.8 },
    mPlus1: { due: 35, renewed: 0, percentage: 0 },
    potentialPercentage: 22.4,
    interested: 9,
    matured: 31
  },
  {
    name: 'Rahul Patel',
    mMinus1: { due: 25, renewed: 16, percentage: 64.0 },
    m0: { due: 38, renewed: 23, percentage: 60.5 },
    mPlus1: { due: 30, renewed: 0, percentage: 0 },
    potentialPercentage: 38.2,
    interested: 6,
    matured: 23
  },
  {
    name: 'Anjali Reddy',
    mMinus1: { due: 22, renewed: 18, percentage: 81.8 },
    m0: { due: 35, renewed: 28, percentage: 80.0 },
    mPlus1: { due: 28, renewed: 0, percentage: 0 },
    potentialPercentage: 18.5,
    interested: 5,
    matured: 28
  }
];

// Legacy format for backward compatibility
export const mockDashboardMetricsLegacy = {
  mMinus1: {
    due: 145,
    renewed: 98,
    renewalPercentage: 67.6,
    potentialPercentage: 32.4,
    interested: 25,
    matured: 98
  },
  m0: {
    due: 223,
    renewed: 134,
    renewalPercentage: 60.1,
    potentialPercentage: 39.9,
    interested: 42,
    matured: 134
  },
  mPlus1: {
    due: 189,
    renewed: 0,
    renewalPercentage: 0,
    potentialPercentage: 100,
    interested: 56,
    matured: 0
  }
};

// Work Done Metrics
export const mockWorkDone = {
  calls: {
    hot: 45,
    warm: 78,
    cold: 23,
    other: 12
  },
  meetings: {
    hot: 12,
    warm: 18,
    cold: 5,
    other: 3
  }
};

// Actionables
export const mockActionables = {
  expiringToday: 15,
  expiringTomorrow: 22
};

// Trend Data (3M, 6M, 12M)
export const mockTrendData = {
  '3M': [
    { month: 'May', percentage: 58.5 },
    { month: 'Jun', percentage: 62.3 },
    { month: 'Jul', percentage: 65.8 }
  ],
  '6M': [
    { month: 'Feb', percentage: 54.2 },
    { month: 'Mar', percentage: 56.8 },
    { month: 'Apr', percentage: 57.9 },
    { month: 'May', percentage: 58.5 },
    { month: 'Jun', percentage: 62.3 },
    { month: 'Jul', percentage: 65.8 }
  ],
  '12M': [
    { month: 'Aug 23', percentage: 51.2 },
    { month: 'Sep 23', percentage: 52.8 },
    { month: 'Oct 23', percentage: 53.5 },
    { month: 'Nov 23', percentage: 54.1 },
    { month: 'Dec 23', percentage: 55.3 },
    { month: 'Jan 24', percentage: 53.9 },
    { month: 'Feb 24', percentage: 54.2 },
    { month: 'Mar 24', percentage: 56.8 },
    { month: 'Apr 24', percentage: 57.9 },
    { month: 'May 24', percentage: 58.5 },
    { month: 'Jun 24', percentage: 62.3 },
    { month: 'Jul 24', percentage: 65.8 }
  ]
};

// User Performance Metrics
export const mockUserMetrics = [
  {
    name: 'Shubham (Me)',
    leadAssigned: 0,
    lost: 0,
    followUpDone: 0,
    followUpPending: 1,
    demoDone: 0,
    demoPending: 0,
    matured: 0
  },
  {
    name: 'Brijesh Agrawal',
    leadAssigned: 1144,
    lost: 218,
    followUpDone: 6874,
    followUpPending: 338423,
    demoDone: 130,
    demoPending: 431,
    matured: 24
  }
];

// Tasks Summary
export const mockTasksSummary = {
  calls: { toDo: 3799, done: 10412 },
  meetings: { toDo: 19, done: 4 }
};

// Weekly Maturity Data for Bar Chart
export const mockWeeklyMaturityData = [
  { week: '14 Sep -\n20 Sep', percentage: 2.54 },
  { week: '21 Sep -\n27 Sep', percentage: 1.36 },
  { week: '28 Sep -\n4 Oct', percentage: 2.02 },
  { week: '5 Oct -\n11 Oct', percentage: 2.05 },
  { week: '12 Oct -\n18 Oct', percentage: 1.49 },
  { week: '19 Oct -\n25 Oct', percentage: 1.51 },
  { week: '26 Oct -\n31 Oct', percentage: 1.13 }
];

// Upsell Offers Performance Metrics
export const mockUpsellOffersMetrics = [
  {
    name: '720 Days',
    mMinus1: { due: 85, renewed: 62, percentage: 72.9 },
    m0: { due: 120, renewed: 78, percentage: 65.0 },
    mPlus1: { due: 95, renewed: 0, percentage: 0 },
    potentialPercentage: 28.5,
    interested: 32,
    matured: 78
  },
  {
    name: 'Model Upgrade',
    mMinus1: { due: 42, renewed: 28, percentage: 66.7 },
    m0: { due: 58, renewed: 35, percentage: 60.3 },
    mPlus1: { due: 48, renewed: 0, percentage: 0 },
    potentialPercentage: 38.2,
    interested: 18,
    matured: 35
  },
  {
    name: 'Mobile',
    mMinus1: { due: 35, renewed: 25, percentage: 71.4 },
    m0: { due: 48, renewed: 32, percentage: 66.7 },
    mPlus1: { due: 42, renewed: 0, percentage: 0 },
    potentialPercentage: 32.8,
    interested: 15,
    matured: 32
  },
  {
    name: 'Mobile Bundle',
    mMinus1: { due: 28, renewed: 22, percentage: 78.6 },
    m0: { due: 38, renewed: 28, percentage: 73.7 },
    mPlus1: { due: 32, renewed: 0, percentage: 0 },
    potentialPercentage: 24.5,
    interested: 12,
    matured: 28
  },
  {
    name: 'Busy Online',
    mMinus1: { due: 52, renewed: 38, percentage: 73.1 },
    m0: { due: 68, renewed: 45, percentage: 66.2 },
    mPlus1: { due: 58, renewed: 0, percentage: 0 },
    potentialPercentage: 31.2,
    interested: 22,
    matured: 45
  }
];

// 4-Month Upsell Offers Performance Metrics
export const mockUpsellOffers4MonthMetrics = [
  {
    name: '720 Days',
    mMinus2: { due: 72, renewed: 58, percentage: 80.6 },
    mMinus1: { due: 85, renewed: 62, percentage: 72.9 },
    m0: { due: 120, renewed: 78, percentage: 65.0 },
    mPlus1: { due: 95, renewed: 0, percentage: 0 }
  },
  {
    name: 'Model Upgrade',
    mMinus2: { due: 38, renewed: 32, percentage: 84.2 },
    mMinus1: { due: 42, renewed: 28, percentage: 66.7 },
    m0: { due: 58, renewed: 35, percentage: 60.3 },
    mPlus1: { due: 48, renewed: 0, percentage: 0 }
  },
  {
    name: 'Mobile',
    mMinus2: { due: 32, renewed: 28, percentage: 87.5 },
    mMinus1: { due: 35, renewed: 25, percentage: 71.4 },
    m0: { due: 48, renewed: 32, percentage: 66.7 },
    mPlus1: { due: 42, renewed: 0, percentage: 0 }
  },
  {
    name: 'Mobile Bundle',
    mMinus2: { due: 25, renewed: 22, percentage: 88.0 },
    mMinus1: { due: 28, renewed: 22, percentage: 78.6 },
    m0: { due: 38, renewed: 28, percentage: 73.7 },
    mPlus1: { due: 32, renewed: 0, percentage: 0 }
  },
  {
    name: 'Busy Online',
    mMinus2: { due: 48, renewed: 42, percentage: 87.5 },
    mMinus1: { due: 52, renewed: 38, percentage: 73.1 },
    m0: { due: 68, renewed: 45, percentage: 66.2 },
    mPlus1: { due: 58, renewed: 0, percentage: 0 }
  }
];

// Follow-up History
export const mockFollowUpHistory = [
  {
    id: 'FU001',
    updatedAt: '2024-08-05 14:30',
    by: 'Amit Kumar',
    stage: 'Interested',
    disposition: 'Budget approval pending',
    assignedTo: 'Amit Kumar',
    remarks: 'Client showed interest, waiting for management approval. Follow-up scheduled for next week.'
  },
  {
    id: 'FU002',
    updatedAt: '2024-07-28 10:15',
    by: 'Amit Kumar',
    stage: 'Due',
    disposition: 'Initial contact made',
    assignedTo: 'Amit Kumar',
    remarks: 'Contacted client, discussed renewal benefits.'
  },
  {
    id: 'FU003',
    updatedAt: '2024-07-20 16:45',
    by: 'System',
    stage: 'Due',
    disposition: 'Lead assigned',
    assignedTo: 'Amit Kumar',
    remarks: 'Lead automatically assigned based on territory.'
  }
];

// WhatsApp History Mock
export const mockWhatsAppHistory = [
  {
    id: 'WA001',
    timestamp: '2024-08-04 11:20',
    message: 'Hi, this is regarding your Busy subscription renewal. Can we schedule a call?',
    type: 'sent'
  },
  {
    id: 'WA002',
    timestamp: '2024-08-04 15:30',
    message: 'Sure, please call me tomorrow at 10 AM.',
    type: 'received'
  }
];

// Related Subscriptions
export const mockRelatedSubscriptions = [
  {
    subscription: 'SUB-2024-001-A',
    mobile: '9876543211',
    product: 'Busy Online',
    activation: '2024-01-15',
    validTill: '2025-01-15',
    relation: 'Upsell',
    lastFollowUp: '2024-07-30'
  },
  {
    subscription: 'SUB-2024-002-B',
    mobile: '9876543222',
    product: 'Busy Desktop',
    activation: '2024-02-20',
    validTill: '2025-02-20',
    relation: 'Cross-sell',
    lastFollowUp: '2024-07-28'
  },
  {
    subscription: 'SUB-2024-003-C',
    mobile: '9876543233',
    product: 'Busy Mandi',
    activation: '2024-03-10',
    validTill: '2025-03-10',
    relation: 'Related',
    lastFollowUp: '2024-07-25'
  }
];

// Products
export const mockProducts = [
  { value: 'all', label: 'All Products' },
  { value: 'desktop', label: 'Busy Desktop' },
  { value: 'online', label: 'Busy Online' },
  { value: 'mandi', label: 'Busy Mandi' },
  { value: 'mobile', label: 'Busy Mobile' },
  { value: 'recom', label: 'Busy Recom' }
];

// Upsell Offers
export const mockUpsellOffers = [
  { value: 'all', label: 'All Offers' },
  { value: '720days', label: '720 Days' },
  { value: 'modelupgrade', label: 'Model Upgrade' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'mobilebundle', label: 'Mobile Bundle' },
  { value: 'online', label: 'Busy Online' },
  { value: 'recom', label: 'Busy Recom' }
];

// Dispositions
export const mockDispositions = [
  'Interested',
  'Not interested',
  'Budget approval pending',
  'Callback requested',
  'Wrong number',
  'Not reachable',
  'Already renewed',
  'Payment pending',
  'Switched to competitor',
  'Demo requested'
];

// Stages
export const mockStages = [
  { value: 'due', label: 'Due' },
  { value: 'interested', label: 'Interested' },
  { value: 'payment', label: 'Payment' },
  { value: 'matured', label: 'Matured' },
  { value: 'dropped', label: 'Dropped' }
];

// Priorities
export const mockPriorities = [
  { value: 'hot', label: 'Hot' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' }
];

// Partners
export const mockPartners = [
  'Rahul Enterprises',
  'Inside Sales (Delhi Office)',
  'Nityam Software',
  'Inside Sales (Renewal)',
  'Bhoopalam Electronics'
];

// Team Members
export const mockTeamMembers = [
  { value: 'amit', label: 'Amit Kumar', role: 'ASM' },
  { value: 'priya', label: 'Priya Sharma', role: 'ASM' },
  { value: 'rajesh', label: 'Rajesh Verma', role: 'RSM' },
  { value: 'sneha', label: 'Sneha Patel', role: 'Partner' }
];

// Roles
export const mockRoles = [
  { value: 'zonalhead', label: 'Zonal Head' },
  { value: 'rsm', label: 'RSM' },
  { value: 'asm', label: 'ASM' },
  { value: 'partner', label: 'Partner' }
];
