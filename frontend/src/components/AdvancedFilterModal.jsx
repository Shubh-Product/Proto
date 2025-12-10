import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from 'lucide-react';

const AdvancedFilterModal = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    partner: '',
    product: '',
    licenseType: '',
    validTillFrom: '',
    validTillTo: '',
    renewalVintage: '',
    gstFeatureUsage: '',
    activeness: '',
    licenseCategory: '',
    assignedTo: '',
    stage: 'Due', // Default selection as specified
    lastDisposition: '',
    updatedBy: '',
    followUpScheduledFrom: '',
    followUpScheduledTo: '',
    followUpDoneFrom: '',
    followUpDoneTo: ''
  });

  const [datePickerOpen, setDatePickerOpen] = useState({
    validTill: false,
    followUpScheduled: false,
    followUpDone: false
  });

  // Dropdown options
  const partnerOptions = [
    'Inside Sales',
    'KGSS', 
    'CSS',
    'Arihant Softwares'
  ];

  const productOptions = [
    'Basic Multi-user',
    'Basic Single-User',
    'Standard Single-User', 
    'Standard Multi-user'
  ];

  const licenseTypeOptions = [
    'All',
    'Perpetual',
    'Subscription'
  ];

  const renewalVintageOptions = [
    'First Year',
    'Second Year',
    'Third Year +'
  ];

  const gstFeatureUsageOptions = [
    'All',
    'Return Download',
    'Return Upload',
    'E-Way Bill',
    'E-Invoice'
  ];

  const activenessOptions = [
    'Daily',
    'Weekly',
    'Monthly',
    'Never Active'
  ];

  const licenseCategoryOptions = [
    'Regular',
    'CA',
    'Accountant',
    'GSTP'
  ];

  const assignedToOptions = [
    'Shubham',
    'Deepak Bhatt',
    'Avinash Pandey',
    'Shubham Goel'
  ];

  const stageOptions = [
    'Due',
    'Dropped',
    'Interested',
    'Payment Received',
    'Matured',
    'Cancelled'
  ];

  const lastDispositionOptions = [
    'NATC',
    'Follow Up - Customer',
    'Follow Up - Refer to Owner',
    'Dropped - Not Interested',
    'Dropped - Pricing Issue',
    'Dropped - Business Closed',
    'Dropped - Switched Software',
    'Dropped - Using Another Serial No',
    'Dropped - BLS Features Not Required',
    'Dropped - Moved to Busy on RDP',
    'Dropped - Wrong Number',
    'Matured - Other Partner',
    'Matured - Self'
  ];

  const updatedByOptions = [
    'Shubham',
    'Deepak Bhatt',
    'Avinash Pandey',
    'Shubham Goel'
  ];

  // Dropdown component
  const DropdownField = ({ label, field, options, placeholder }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select
        value={filters[field]}
        onValueChange={(value) => setFilters({ ...filters, [field]: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  // Date Range Picker Component
  const DateRangePicker = ({ label, fromField, toField, pickerKey }) => {
    const fromValue = filters[fromField];
    const toValue = filters[toField];
    const isOpen = datePickerOpen[pickerKey];

    const getDisplayText = () => {
      if (fromValue && toValue) {
        return `${fromValue} to ${toValue}`;
      } else if (fromValue) {
        return `From ${fromValue}`;
      } else if (toValue) {
        return `To ${toValue}`;
      } else {
        return `Select ${label.toLowerCase()}`;
      }
    };

    const handleToggle = () => {
      setDatePickerOpen(prev => ({
        ...prev,
        [pickerKey]: !prev[pickerKey]
      }));
    };

    const handleFromDateChange = (e) => {
      setFilters({ ...filters, [fromField]: e.target.value });
    };

    const handleToDateChange = (e) => {
      setFilters({ ...filters, [toField]: e.target.value });
    };

    return (
      <div className="space-y-2 relative">
        <Label>{label}</Label>
        <div 
          className="flex items-center justify-between p-2 border rounded-md cursor-pointer hover:border-gray-400 bg-white"
          onClick={handleToggle}
        >
          <span className={`text-sm ${(!fromValue && !toValue) ? 'text-gray-500' : 'text-gray-900'}`}>
            {getDisplayText()}
          </span>
          <Calendar className="w-4 h-4 text-gray-500" />
        </div>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 p-3 bg-white border rounded-md shadow-lg">
            <div className="space-y-2">
              <div>
                <Label className="text-xs">From Date</Label>
                <Input
                  type="date"
                  value={fromValue}
                  onChange={handleFromDateChange}
                  className="text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">To Date</Label>
                <Input
                  type="date"
                  value={toValue}
                  onChange={handleToDateChange}
                  className="text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setFilters({ ...filters, [fromField]: '', [toField]: '' });
                  }}
                >
                  Clear
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleToggle}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleApply = () => {
    // Close any open date pickers
    setDatePickerOpen({
      validTill: false,
      followUpScheduled: false,
      followUpDone: false
    });
    onApply(filters);
  };

  const handleReset = () => {
    setFilters({
      partner: '',
      product: '',
      licenseType: '',
      validTillFrom: '',
      validTillTo: '',
      renewalVintage: '',
      gstFeatureUsage: '',
      activeness: '',
      licenseCategory: '',
      assignedTo: '',
      stage: 'Due',
      lastDisposition: '',
      updatedBy: '',
      followUpScheduledFrom: '',
      followUpScheduledTo: '',
      followUpDoneFrom: '',
      followUpDoneTo: ''
    });
    // Close any open date pickers
    setDatePickerOpen({
      validTill: false,
      followUpScheduled: false,
      followUpDone: false
    });
  };

  const handleClose = () => {
    // Close any open date pickers before closing modal
    setDatePickerOpen({
      validTill: false,
      followUpScheduled: false,
      followUpDone: false
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* Row 1 */}
          <DropdownField 
            label="Partner" 
            field="partner" 
            options={partnerOptions}
            placeholder="Select partner"
          />
          
          <DropdownField 
            label="Product" 
            field="product" 
            options={productOptions}
            placeholder="Select product"
          />
          
          <DropdownField 
            label="License Type" 
            field="licenseType" 
            options={licenseTypeOptions}
            placeholder="Select license type"
          />
          
          <DateRangePicker
            label="Valid Till Date"
            fromField="validTillFrom"
            toField="validTillTo"
            pickerKey="validTill"
          />

          {/* Row 2 */}
          <DropdownField 
            label="Renewal Vintage" 
            field="renewalVintage" 
            options={renewalVintageOptions}
            placeholder="Select vintage"
          />
          
          <DropdownField 
            label="GST Feature Usage" 
            field="gstFeatureUsage" 
            options={gstFeatureUsageOptions}
            placeholder="Select GST usage"
          />
          
          <DropdownField 
            label="Activeness" 
            field="activeness" 
            options={activenessOptions}
            placeholder="Select activeness"
          />
          
          <DropdownField 
            label="License Category" 
            field="licenseCategory" 
            options={licenseCategoryOptions}
            placeholder="Select category"
          />

          {/* Row 3 */}
          <DropdownField 
            label="Assigned To" 
            field="assignedTo" 
            options={assignedToOptions}
            placeholder="Select assignee"
          />
          
          <DropdownField 
            label="Stage" 
            field="stage" 
            options={stageOptions}
            placeholder="Select stage"
          />
          
          <DropdownField 
            label="Last Disposition" 
            field="lastDisposition" 
            options={lastDispositionOptions}
            placeholder="Select disposition"
          />
          
          <DropdownField 
            label="Updated By" 
            field="updatedBy" 
            options={updatedByOptions}
            placeholder="Select user"
          />

          {/* Row 4 */}
          <DateRangePicker
            label="Follow Up Scheduled For"
            fromField="followUpScheduledFrom"
            toField="followUpScheduledTo"
            pickerKey="followUpScheduled"
          />

          <DateRangePicker
            label="Follow Up Done On"
            fromField="followUpDoneFrom"
            toField="followUpDoneTo"
            pickerKey="followUpDone"
          />
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilterModal;
