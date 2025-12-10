import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

const AdvancedFilterModal = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    partner: [],
    product: [],
    licenseType: [],
    validTillFrom: '',
    validTillTo: '',
    renewalVintage: [],
    gstFeatureUsage: [],
    activeness: [],
    licenseCategory: [],
    assignedTo: [],
    stage: ['Due'], // Default selection as specified
    lastDisposition: [],
    updatedBy: [],
    followUpScheduledFrom: '',
    followUpScheduledTo: '',
    followUpDoneFrom: '',
    followUpDoneTo: ''
  });

  // Multi-select options
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

  // Handle multi-select change
  const handleMultiSelectChange = (field, value, isChecked) => {
    setFilters(prev => ({
      ...prev,
      [field]: isChecked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  // Multi-select component
  const MultiSelectField = ({ label, field, options }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border rounded-md p-2 max-h-32 overflow-y-auto bg-white">
        <div className="space-y-1">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${field}-${option}`}
                checked={filters[field].includes(option)}
                onCheckedChange={(checked) => handleMultiSelectChange(field, option, checked)}
              />
              <label 
                htmlFor={`${field}-${option}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      {filters[field].length > 0 && (
        <div className="text-xs text-gray-600">
          {filters[field].length} selected
        </div>
      )}
    </div>
  );

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    setFilters({
      partner: [],
      product: [],
      licenseType: [],
      validTillFrom: '',
      validTillTo: '',
      renewalVintage: [],
      gstFeatureUsage: [],
      activeness: [],
      licenseCategory: [],
      assignedTo: [],
      stage: ['Due'],
      lastDisposition: [],
      updatedBy: [],
      followUpScheduledFrom: '',
      followUpScheduledTo: '',
      followUpDoneFrom: '',
      followUpDoneTo: ''
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {/* Row 1 */}
          <MultiSelectField 
            label="Partner" 
            field="partner" 
            options={partnerOptions} 
          />
          
          <MultiSelectField 
            label="Product" 
            field="product" 
            options={productOptions} 
          />
          
          <MultiSelectField 
            label="License Type" 
            field="licenseType" 
            options={licenseTypeOptions} 
          />
          
          <div className="space-y-2">
            <Label>Valid Till Date</Label>
            <div className="space-y-1">
              <Input
                type="date"
                placeholder="From"
                value={filters.validTillFrom}
                onChange={(e) => setFilters({ ...filters, validTillFrom: e.target.value })}
              />
              <Input
                type="date"
                placeholder="To"
                value={filters.validTillTo}
                onChange={(e) => setFilters({ ...filters, validTillTo: e.target.value })}
              />
            </div>
          </div>

          {/* Row 2 */}
          <MultiSelectField 
            label="Renewal Vintage" 
            field="renewalVintage" 
            options={renewalVintageOptions} 
          />
          
          <MultiSelectField 
            label="GST Feature Usage" 
            field="gstFeatureUsage" 
            options={gstFeatureUsageOptions} 
          />
          
          <MultiSelectField 
            label="Activeness" 
            field="activeness" 
            options={activenessOptions} 
          />
          
          <MultiSelectField 
            label="License Category" 
            field="licenseCategory" 
            options={licenseCategoryOptions} 
          />

          {/* Row 3 */}
          <MultiSelectField 
            label="Assigned To" 
            field="assignedTo" 
            options={assignedToOptions} 
          />
          
          <MultiSelectField 
            label="Stage" 
            field="stage" 
            options={stageOptions} 
          />
          
          <MultiSelectField 
            label="Last Disposition" 
            field="lastDisposition" 
            options={lastDispositionOptions} 
          />
          
          <MultiSelectField 
            label="Updated By" 
            field="updatedBy" 
            options={updatedByOptions} 
          />

          {/* Row 4 */}
          <div className="space-y-2">
            <Label>Follow Up Scheduled For</Label>
            <div className="space-y-1">
              <Input
                type="date"
                placeholder="From"
                value={filters.followUpScheduledFrom}
                onChange={(e) => setFilters({ ...filters, followUpScheduledFrom: e.target.value })}
              />
              <Input
                type="date"
                placeholder="To"
                value={filters.followUpScheduledTo}
                onChange={(e) => setFilters({ ...filters, followUpScheduledTo: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Follow Up Done On</Label>
            <div className="space-y-1">
              <Input
                type="date"
                placeholder="From"
                value={filters.followUpDoneFrom}
                onChange={(e) => setFilters({ ...filters, followUpDoneFrom: e.target.value })}
              />
              <Input
                type="date"
                placeholder="To"
                value={filters.followUpDoneTo}
                onChange={(e) => setFilters({ ...filters, followUpDoneTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
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
