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
    gstUsage: 'Active'
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
    gstUsage: 'Active'
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
    gstUsage: 'Active'
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
    priority: 'Cold',
    mobile: '9876012345',
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
  }
];

// Dashboard Metrics Mock Data
export const mockDashboardMetrics = {
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
