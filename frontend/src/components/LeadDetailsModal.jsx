import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Clock, Package, User, Building2, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { mockDispositions, mockStages, mockPriorities, mockRelatedSubscriptions, mockTeamMembers } from '../mock';
import { toast } from '../hooks/use-toast';

const LeadDetailsModal = ({ lead, onClose, leadType = 'renewal' }) => {
  const [mobile, setMobile] = useState(lead.mobile);
  const [alternateNo, setAlternateNo] = useState(lead.alternateNo || '');
  const [contactPerson, setContactPerson] = useState(lead.contactPerson || '');
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showViewHistory, setShowViewHistory] = useState(false);
  
  const [followUpType, setFollowUpType] = useState('call');
  const [stage, setStage] = useState(lead.stage.toLowerCase());
  const [priority, setPriority] = useState(lead.priority.toLowerCase());
  const [disposition, setDisposition] = useState('');
  const [nextFUType, setNextFUType] = useState('call');
  const [nextFUDateTime, setNextFUDateTime] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSaveFollowUp = () => {
    if (!disposition || !remarks) {
      toast({
        title: 'Validation Error',
        description: 'Disposition and Remarks are required',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Follow-up Saved',
      description: 'Follow-up has been recorded successfully'
    });

    // Reset form
    setDisposition('');
    setRemarks('');
  };

  return (
    <>
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[85vh] flex flex-col bg-white">
        {/* Header Info Section - Compact Layout */}
        <div className="bg-white border-b px-6 py-3 -mt-6 -mx-6 shadow-sm">
          {leadType === 'upsell' ? (
            <>
              {/* Row 1 - Upsell Primary Details */}
              <div className="grid grid-cols-6 gap-x-4 gap-y-0 mb-2">
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Lead ID</span>
                  <span className="text-xs font-semibold text-gray-900">{lead.id}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Subscription ID</span>
                  <span className="text-xs font-semibold text-gray-900">{lead.subscriptionId}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Upsell To</span>
                  <span className="text-xs font-semibold text-blue-700">{lead.upsellTo || 'SS 21'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Offer Validity</span>
                  <span className="text-xs font-semibold text-gray-900">{lead.offerValidity ? new Date(lead.offerValidity).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-') : '15-Aug-23'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Last Active</span>
                  <span className="text-xs font-semibold text-gray-900">{new Date(lead.lastActive).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Vintage</span>
                  <span className="text-xs font-semibold text-gray-900">{lead.vintage}</span>
                </div>
              </div>
              
              {/* Row 2 - Upsell Secondary Details */}
              <div className="grid grid-cols-6 gap-x-4 gap-y-0 mb-2">
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Activeness</span>
                  <span className="text-xs font-semibold text-blue-700">Monthly</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Return Download</span>
                  <span className={`text-xs font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Return Upload</span>
                  <span className={`text-xs font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">E-Way Bill</span>
                  <span className={`text-xs font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                    {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">E-Invoice Bill</span>
                  <span className="text-xs font-semibold text-red-600">No</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Offers</span>
                  <span className="text-xs font-semibold text-purple-700 truncate" title={lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'}>
                    {lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'}
                  </span>
                </div>
              </div>

              {/* Row 3 - Upsell Reason */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-0">
                <div className="flex flex-col">
                  <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Upsell Reason</span>
                  <span className="text-xs font-semibold text-gray-900">{lead.upsellReason || 'Not specified'}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Compact Inline Header - Line 1 with Cell Style - Rearranged */}
              <div className="flex items-center gap-2 text-xs mb-2 overflow-x-auto">
                {/* 1127588751 - Subscription ID - Outside cell, larger and bold */}
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-gray-900">1127588751</span>
                </div>
                {/* Desktop - Product */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">Desktop</span>
                </div>
                {/* PERP EM */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">PERP EM</span>
                </div>
                {/* VER 21 (13.3) */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">VER 21 (13.3)</span>
                </div>
                {/* Regular - License Type */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">Regular</span>
                </div>
                {/* Active - Green color */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-green-600">Active</span>
                </div>
                {/* 1st Year - Vintage */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">1st Year</span>
                </div>
                {/* Weekly - Activeness */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-blue-700">Weekly</span>
                </div>
                {/* G-Download */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">G-Download</span>
                </div>
                {/* G-Upload */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">G-Upload</span>
                </div>
                {/* E-WB */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">E-WB</span>
                </div>
                {/* E-INV */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">E-INV</span>
                </div>
              </div>
              
              {/* Compact Inline Header - Line 2 - Date fields and Offers */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                {/* Activation */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Activation:</span>
                  <span className="font-semibold text-gray-900">{new Date(lead.activationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <span className="text-gray-300">|</span>
                {/* Valid Till */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Valid Till:</span>
                  <span className="font-bold text-red-600">{new Date(lead.validTill).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <span className="text-gray-300">|</span>
                {/* Last Active */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Last Active:</span>
                  <span className="font-semibold text-gray-900">{new Date(lead.lastActive).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <span className="text-gray-300">|</span>
                {/* Last Renewal */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Last Renewal:</span>
                  <span className="font-semibold text-gray-900">15-Jan-24</span>
                </div>
                <span className="text-gray-300">|</span>
                {/* Offers */}
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Offers:</span>
                  <span className="font-semibold text-purple-700 truncate max-w-[200px]" title={lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'}>
                    {lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <Tabs defaultValue="details" className="mt-0 flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="addons">Direct Linked</TabsTrigger>
            <TabsTrigger value="related">Indirect Linked</TabsTrigger>
          </TabsList>

          {/* Details Tab - Contains both Lead Details and Follow Up Update */}
          <TabsContent value="details" className="space-y-6 mt-4 overflow-y-auto flex-1">
            {/* Lead Details Section - Plain Text Display with Better Alignment */}
            <div>
              {/* Row 1 - 3 fields */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-3 mb-3">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Contact Person:</span>
                  <span className="text-sm text-gray-900">Dheeraj Kumar</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Company Name:</span>
                  <span className="text-sm text-gray-900">Shree Mahavir Steel</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Owner Partner:</span>
                  <span className="text-sm text-gray-900">Sudhanshu Kumar</span>
                </div>
              </div>

              {/* Row 2 - 3 fields */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-3 mb-3">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Mobile:</span>
                  <span className="text-sm text-gray-900">9999888877</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Alternate No.:</span>
                  <span className="text-sm text-gray-900">9876543210</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Email ID:</span>
                  <span className="text-sm text-gray-900">dheeraj@mahavirsteel.com</span>
                </div>
              </div>

              {/* Row 3 - 3 fields */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-3 mb-3">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">Pincode:</span>
                  <span className="text-sm text-gray-900">110001</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">City:</span>
                  <span className="text-sm text-gray-900">New Delhi</span>
                </div>
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-sm font-bold text-gray-600">State:</span>
                  <span className="text-sm text-gray-900">Delhi</span>
                </div>
              </div>
            </div>

            {/* Follow Up Update Section - Part of Details Tab */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Follow Up Update</h3>
              
              {/* First Row: Update Type, Stage, Priority, Call Disposition */}
              <div className="grid grid-cols-12 gap-4 mb-4">
                {/* Update Type - Takes 4 columns */}
                <div className="col-span-4 space-y-2">
                  <Label className="text-sm">Update Type</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          value="call"
                          checked={followUpType === 'call'}
                          onChange={(e) => setFollowUpType(e.target.value)}
                          className="w-4 h-4 accent-blue-600 flex-shrink-0"
                        />
                        <span className="text-sm whitespace-nowrap">Call (Phone/VC)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          value="meeting"
                          checked={followUpType === 'meeting'}
                          onChange={(e) => setFollowUpType(e.target.value)}
                          className="w-4 h-4 accent-blue-600 flex-shrink-0"
                        />
                        <span className="text-sm whitespace-nowrap">Meeting (In-Person)</span>
                      </label>
                    </div>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        value="general"
                        checked={followUpType === 'general'}
                        onChange={(e) => setFollowUpType(e.target.value)}
                        className="w-4 h-4 accent-blue-600 flex-shrink-0"
                      />
                      <span className="text-sm">General</span>
                    </label>
                  </div>
                </div>
                
                {/* Stage - Takes 2 columns */}
                <div className="col-span-2 space-y-2">
                  <Label className="text-sm">
                    Stage <span className="text-red-500">*</span>
                  </Label>
                  <Select value={stage} onValueChange={setStage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStages.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Priority - Takes 3 columns */}
                <div className="col-span-3 space-y-2">
                  <Label className="text-sm">Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPriorities.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Call Disposition - Takes 3 columns */}
                <div className="col-span-3 space-y-2">
                  <Label className="text-sm">
                    Call Disposition <span className="text-red-500">*</span>
                  </Label>
                  <Select value={disposition} onValueChange={setDisposition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Call Disposition" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDispositions.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row: Next Follow Up Type, Next Follow Up */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-sm">
                    Next Follow Up Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={nextFUType} onValueChange={setNextFUType} disabled={stage === 'matured' || stage === 'dropped'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">
                    Next Follow Up <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="datetime-local"
                    value={nextFUDateTime}
                    onChange={(e) => setNextFUDateTime(e.target.value)}
                    disabled={stage === 'matured' || stage === 'dropped'}
                    placeholder="Select Next Follow Up"
                  />
                </div>
              </div>

              {/* Third Row: Follow Up Remarks */}
              <div className="space-y-2">
                <Label className="text-sm">Follow Up Remarks</Label>
                <Textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter Remarks"
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowViewHistory(true)}>
                View History
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveFollowUp}>
                Save Details
              </Button>
            </div>
          </TabsContent>

          {/* Add-ons Tab */}
          <TabsContent value="addons" className="mt-4 overflow-y-auto flex-1">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Subscription</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Mobile</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Activation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Valid Till</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Relation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">{lead.subscriptionId}-ADD1</td>
                    <td className="py-3 px-4 text-sm">{lead.mobile}</td>
                    <td className="py-3 px-4 text-sm">GST Add-on</td>
                    <td className="py-3 px-4 text-sm">{lead.activationDate}</td>
                    <td className="py-3 px-4 text-sm">{lead.validTill}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="text-xs">Add On</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">{lead.subscriptionId}-ADD2</td>
                    <td className="py-3 px-4 text-sm">{lead.mobile}</td>
                    <td className="py-3 px-4 text-sm">Inventory Module</td>
                    <td className="py-3 px-4 text-sm">{lead.activationDate}</td>
                    <td className="py-3 px-4 text-sm">{lead.validTill}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="text-xs">Add On</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">{lead.subscriptionId}-ADD3</td>
                    <td className="py-3 px-4 text-sm">{lead.mobile}</td>
                    <td className="py-3 px-4 text-sm">E-Way Bill Module</td>
                    <td className="py-3 px-4 text-sm">2024-03-15</td>
                    <td className="py-3 px-4 text-sm">2025-03-15</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="text-xs">Add On</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">{lead.subscriptionId}-ADD4</td>
                    <td className="py-3 px-4 text-sm">{lead.mobile}</td>
                    <td className="py-3 px-4 text-sm">E-Invoice Module</td>
                    <td className="py-3 px-4 text-sm">2024-02-10</td>
                    <td className="py-3 px-4 text-sm">2025-02-10</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="text-xs">Add On</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">{lead.subscriptionId}-ADD5</td>
                    <td className="py-3 px-4 text-sm">{lead.mobile}</td>
                    <td className="py-3 px-4 text-sm">Multi-User License</td>
                    <td className="py-3 px-4 text-sm">2024-01-20</td>
                    <td className="py-3 px-4 text-sm">2025-01-20</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="text-xs">Add On</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">{lead.subscriptionId}-ADD6</td>
                    <td className="py-3 px-4 text-sm">{lead.mobile}</td>
                    <td className="py-3 px-4 text-sm">Payroll Module</td>
                    <td className="py-3 px-4 text-sm">2024-04-05</td>
                    <td className="py-3 px-4 text-sm">2025-04-05</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline" className="text-xs">Add On</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Related Tab */}
          <TabsContent value="related" className="mt-4 overflow-y-auto flex-1">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Subscription</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Lead ID</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Activation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Valid Till</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRelatedSubscriptions.map((sub) => (
                    <tr key={sub.subscription} className="border-t border-gray-100">
                      <td className="py-3 px-4 text-sm">{sub.subscription}</td>
                      <td className="py-3 px-4 text-sm">{sub.leadId}</td>
                      <td className="py-3 px-4 text-sm">{sub.product}</td>
                      <td className="py-3 px-4 text-sm">{sub.activation}</td>
                      <td className="py-3 px-4 text-sm">{sub.validTill}</td>
                      <td className="py-3 px-4 text-sm">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">SUB-2023-789</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4 text-sm">Busy Desktop</td>
                    <td className="py-3 px-4 text-sm">2023-05-10</td>
                    <td className="py-3 px-4 text-sm">2024-05-10</td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">SUB-2024-456</td>
                    <td className="py-3 px-4 text-sm">L456</td>
                    <td className="py-3 px-4 text-sm">Busy Mobile</td>
                    <td className="py-3 px-4 text-sm">2024-02-20</td>
                    <td className="py-3 px-4 text-sm">2025-02-20</td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">SUB-2024-123</td>
                    <td className="py-3 px-4 text-sm">9876543277</td>
                    <td className="py-3 px-4 text-sm">Busy Mobile</td>
                    <td className="py-3 px-4 text-sm">2024-03-10</td>
                    <td className="py-3 px-4 text-sm">2025-03-10</td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">SUB-2024-567</td>
                    <td className="py-3 px-4 text-sm">9876543266</td>
                    <td className="py-3 px-4 text-sm">Busy Recom</td>
                    <td className="py-3 px-4 text-sm">2024-04-15</td>
                    <td className="py-3 px-4 text-sm">2025-04-15</td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-3 px-4 text-sm">SUB-2023-890</td>
                    <td className="py-3 px-4 text-sm">9876543255</td>
                    <td className="py-3 px-4 text-sm">Busy Online</td>
                    <td className="py-3 px-4 text-sm">2023-06-25</td>
                    <td className="py-3 px-4 text-sm">2024-06-25</td>
                    <td className="py-3 px-4 text-sm">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Follow Up">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>

    {/* View History Modal */}
    {showViewHistory && <ViewHistoryModal onClose={() => setShowViewHistory(false)} lead={lead} />}
  </>
  );
};

// View History Modal Component
const ViewHistoryModal = ({ onClose, lead }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Mock data for History Table
  const historyTableData = [
    {
      id: 1,
      updatedAt: '2024-11-15 10:30 AM',
      updatedBy: 'Sudhanshu Kumar',
      stage: 'New Lead',
      priority: 'Hot',
      callDisposition: 'Not Connected',
      assignedTo: 'Sudhanshu Kumar',
      remarks: 'Lead created in the system'
    },
    {
      id: 2,
      updatedAt: '2024-11-16 02:45 PM',
      updatedBy: 'Amit Sharma',
      stage: 'Contacted',
      priority: 'Warm',
      callDisposition: 'Connected',
      assignedTo: 'Amit Sharma',
      remarks: 'Customer showed interest in renewal. Will follow up next week.'
    },
    {
      id: 3,
      updatedAt: '2024-11-18 11:20 AM',
      updatedBy: 'Amit Sharma',
      stage: 'Interested',
      priority: 'Cold',
      callDisposition: 'Connected',
      assignedTo: 'Amit Sharma',
      remarks: 'Customer requested detailed pricing. Sent quotation via email.'
    }
  ];

  // Mock data for Follow Up History
  const followUpHistoryData = [
    {
      id: 1,
      dateTime: '2024-11-18 11:20 AM',
      updatedBy: 'Amit Sharma',
      updateType: 'Call (Phone/VC)',
      stageOld: 'Contacted',
      stageNew: 'Interested',
      assignedTo: 'Amit Sharma',
      callDisposition: 'Connected',
      nextFollowUpType: 'Call',
      nextFollowUpDateTime: '2024-11-22 10:00 AM',
      remarks: 'Customer requested detailed pricing. Sent quotation via email.'
    },
    {
      id: 2,
      dateTime: '2024-11-16 02:45 PM',
      updatedBy: 'Amit Sharma',
      updateType: 'Call (Phone/VC)',
      stageOld: 'New Lead',
      stageNew: 'Contacted',
      assignedTo: 'Amit Sharma',
      callDisposition: 'Connected',
      nextFollowUpType: 'Call',
      nextFollowUpDateTime: '2024-11-18 11:00 AM',
      remarks: 'Customer showed interest in renewal. Will follow up next week.'
    }
  ];

  // Mock data for Support History
  const supportHistoryData = [
    {
      id: 1,
      dateTime: '2024-11-17 09:15 AM',
      callerType: 'Customer',
      source: 'Welcome Dialer',
      serialNumber: 'SN12345678',
      agentName: 'Priya Singh',
      mobileNo: '9999888877',
      disposition: 'Query Resolved',
      subDisposition: 'Product Information',
      remark: 'Customer inquired about renewal process and pricing'
    },
    {
      id: 2,
      dateTime: '2024-11-14 03:30 PM',
      callerType: 'Customer',
      source: 'CLM Dialer',
      serialNumber: 'SN12345678',
      agentName: 'Rahul Patel',
      mobileNo: '9999888877',
      disposition: 'Callback Required',
      subDisposition: 'Technical Issue',
      remark: 'Customer reported login issue. Ticket created.'
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>View History - {lead.company}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="historyTable" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="historyTable">History Table</TabsTrigger>
            <TabsTrigger value="followUpHistory">Follow Up History</TabsTrigger>
            <TabsTrigger value="supportHistory">Support History</TabsTrigger>
          </TabsList>

          {/* History Table Tab */}
          <TabsContent value="historyTable" className="flex-1 overflow-y-auto">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort('updatedAt')}>
                      <div className="flex items-center gap-2">
                        Updated At
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort('updatedBy')}>
                      <div className="flex items-center gap-2">
                        Updated By
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort('stage')}>
                      <div className="flex items-center gap-2">
                        Stage
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort('priority')}>
                      <div className="flex items-center gap-2">
                        Priority
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort('callDisposition')}>
                      <div className="flex items-center gap-2">
                        Call Disposition
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold cursor-pointer" onClick={() => handleSort('assignedTo')}>
                      <div className="flex items-center gap-2">
                        Assigned To
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center text-sm font-semibold w-16">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedData(historyTableData).map((row, index) => (
                    <React.Fragment key={row.id}>
                      <tr className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 cursor-pointer`}>
                        <td className="py-3 px-4 text-sm" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{row.updatedAt}</td>
                        <td className="py-3 px-4 text-sm" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{row.updatedBy}</td>
                        <td className="py-3 px-4 text-sm" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{row.stage}</td>
                        <td className="py-3 px-4 text-sm" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{row.priority}</td>
                        <td className="py-3 px-4 text-sm" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{row.callDisposition}</td>
                        <td className="py-3 px-4 text-sm" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>{row.assignedTo}</td>
                        <td className="py-3 px-4 text-center">
                          <button onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>
                            {expandedRow === row.id ? <ChevronUp className="w-4 h-4 mx-auto" /> : <ChevronDown className="w-4 h-4 mx-auto" />}
                          </button>
                        </td>
                      </tr>
                      {expandedRow === row.id && (
                        <tr className="bg-blue-50">
                          <td colSpan="7" className="py-3 px-4">
                            <div className="text-sm">
                              <span className="font-semibold">Remarks:</span> {row.remarks}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Follow Up History Tab */}
          <TabsContent value="followUpHistory" className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {followUpHistoryData.map((item, index) => (
                <div key={item.id} className={`border rounded-lg p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-bold text-gray-600">Update/Create Date Time:</span>
                      <p className="text-sm text-gray-900">{item.dateTime}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Updated By:</span>
                      <p className="text-sm text-gray-900">{item.updatedBy}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Update Type:</span>
                      <p className="text-sm text-gray-900">{item.updateType}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Stage:</span>
                      <p className="text-sm text-gray-900">{item.stageOld} → {item.stageNew}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Assigned To:</span>
                      <p className="text-sm text-gray-900">{item.assignedTo}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Call Disposition:</span>
                      <p className="text-sm text-gray-900">{item.callDisposition}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Next Follow Up Type:</span>
                      <p className="text-sm text-gray-900">{item.nextFollowUpType}</p>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-600">Next Follow Up Date & Time:</span>
                      <p className="text-sm text-gray-900">{item.nextFollowUpDateTime}</p>
                    </div>
                    <div className="col-span-3">
                      <span className="text-sm font-bold text-gray-600">Follow Up Remarks:</span>
                      <p className="text-sm text-gray-900">{item.remarks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Support History Tab */}
          <TabsContent value="supportHistory" className="flex-1 overflow-y-auto">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Date & Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Caller Type</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Source</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Serial Number</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Agent Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Mobile No</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Disposition</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Sub Disposition</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {supportHistoryData.map((row, index) => (
                    <tr key={row.id} className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                      <td className="py-3 px-4 text-sm">{row.dateTime}</td>
                      <td className="py-3 px-4 text-sm">{row.callerType}</td>
                      <td className="py-3 px-4 text-sm">{row.source}</td>
                      <td className="py-3 px-4 text-sm">{row.serialNumber}</td>
                      <td className="py-3 px-4 text-sm">{row.agentName}</td>
                      <td className="py-3 px-4 text-sm">{row.mobileNo}</td>
                      <td className="py-3 px-4 text-sm">{row.disposition}</td>
                      <td className="py-3 px-4 text-sm">{row.subDisposition}</td>
                      <td className="py-3 px-4 text-sm">{row.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
