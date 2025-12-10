import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockProducts, mockStages, mockPartners, mockTeamMembers } from '../mock';

const AdvancedFilterModal = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    partner: '',
    product: '',
    validFrom: '',
    validTo: '',
    vintage: '',
    gstUsage: '',
    activeness: '',
    licenseCategory: '',
    assignedTo: '',
    stage: '',
    due: ''
  });

  const handleApply = () => {
    onApply(filters);
  };

  const handleReset = () => {
    setFilters({
      partner: '',
      product: '',
      validFrom: '',
      validTo: '',
      vintage: '',
      gstUsage: '',
      activeness: '',
      licenseCategory: '',
      assignedTo: '',
      stage: '',
      due: ''
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Partner</Label>
            <Select
              value={filters.partner}
              onValueChange={(value) => setFilters({ ...filters, partner: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select partner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partners</SelectItem>
                {mockPartners.map((partner) => (
                  <SelectItem key={partner} value={partner}>
                    {partner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Product</Label>
            <Select
              value={filters.product}
              onValueChange={(value) => setFilters({ ...filters, product: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.value} value={product.value}>
                    {product.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Valid From</Label>
            <Input
              type="date"
              value={filters.validFrom}
              onChange={(e) => setFilters({ ...filters, validFrom: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Valid To</Label>
            <Input
              type="date"
              value={filters.validTo}
              onChange={(e) => setFilters({ ...filters, validTo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Vintage</Label>
            <Select
              value={filters.vintage}
              onValueChange={(value) => setFilters({ ...filters, vintage: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vintage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="12months">12 months</SelectItem>
                <SelectItem value="24months">24 months</SelectItem>
                <SelectItem value="36months">36+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>GST Usage</Label>
            <Select
              value={filters.gstUsage}
              onValueChange={(value) => setFilters({ ...filters, gstUsage: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select GST usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Activeness</Label>
            <Select
              value={filters.activeness}
              onValueChange={(value) => setFilters({ ...filters, activeness: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activeness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>License Category</Label>
            <Select
              value={filters.licenseCategory}
              onValueChange={(value) => setFilters({ ...filters, licenseCategory: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assigned To</Label>
            <Select
              value={filters.assignedTo}
              onValueChange={(value) => setFilters({ ...filters, assignedTo: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {mockTeamMembers.map((member) => (
                  <SelectItem key={member.value} value={member.value}>
                    {member.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Stage</Label>
            <Select
              value={filters.stage}
              onValueChange={(value) => setFilters({ ...filters, stage: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {mockStages.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Due</Label>
            <Select
              value={filters.due}
              onValueChange={(value) => setFilters({ ...filters, due: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select due period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="m-4">M-4</SelectItem>
                <SelectItem value="m-3">M-3</SelectItem>
                <SelectItem value="m-2">M-2</SelectItem>
                <SelectItem value="m-1">M-1</SelectItem>
                <SelectItem value="m0">M0</SelectItem>
                <SelectItem value="m+1">M+1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilterModal;
