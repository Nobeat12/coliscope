
export interface Package {
  trackingNumber: string;
  recipientName: string;
  phoneNumber: string;
  receiptLocation: string;
  receiptDate: string;
  deliveryLocation: string;
  status: string;
  customerInfo: string;
}

export interface TranslationType {
  dashboard: string;
  packageManagement: string;
  newPackage: string;
  cancel: string;
  add: string;
  logout: string;
  edit: string;
  update: string;
  search: string;
  searchButton: string;
  trackingNumber: string;
  recipient: string;
  phone: string;
  origin: string;
  date: string;
  destination: string;
  status: string;
  actions: string;
  noPackagesFound: string;
  addNewPackage: string;
  additionalInfo: string;
  inProcess: string;
  shipped: string;
  inDelivery: string;
  delivered: string;
  problem: string;
  packageAdded: string;
  packageUpdated: string;
  packageDeleted: string;
  error: string;
  trackingExists: string;
  selectStatus: string;
  loginTitle: string;
  email: string;
  password: string;
  loginButton: string;
  loginSuccess: string;
  welcomeAdmin: string;
  loginError: string;
  invalidCredentials: string;
  logoutSuccess: string;
  loggedOut: string;
  languageSelection: string;
  german: string;
  french: string;
  english: string;
}
