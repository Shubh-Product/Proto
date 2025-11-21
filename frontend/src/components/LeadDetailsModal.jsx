import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Clock, Package, User, Building2 } from 'lucide-react';
import { mockDispositions, mockStages, mockPriorities, mockRelatedSubscriptions, mockTeamMembers } from '../mock';
import { toast } from '../hooks/use-toast';

const LeadDetailsModal = ({ lead, onClose, leadType = 'renewal' }) => {
  const [mobile, setMobile] = useState(lead.mobile);
  const [alternateNo, setAlternateNo] = useState(lead.alternateNo || '');
  const [contactPerson, setContactPerson] = useState(lead.contactPerson || '');
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] flex flex-col">
        {/* Header Info Section - Compact Layout */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b px-6 py-3 -mt-6 -mx-6 shadow-sm">
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
              {/* Compact Inline Header - Line 1 with Cell Style */}
              <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                {/* Subscription ID - Outside cell, larger and bold */}
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-gray-900">1127588751</span>
                </div>
                <span className="text-gray-300">|</span>
                {/* Product - Replace "Busy Desktop" with "Desktop" */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">{lead.product.replace('Busy Desktop', 'Desktop')}</span>
                </div>
                {/* Vintage */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">1st Year</span>
                </div>
                {/* Activeness */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-blue-700">Weekly</span>
                </div>
                {/* License Type */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">Regular</span>
                </div>
                {/* G-Download - Title only */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">G-Download</span>
                </div>
                {/* G-Upload - Title only */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">G-Upload</span>
                </div>
                {/* EWB - Title only */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">EWB</span>
                </div>
                {/* EINV - Title only */}
                <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded">
                  <span className="font-semibold text-gray-900">EINV</span>
                </div>
              </div>
              
              {/* Compact Inline Header - Line 2 */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Activation:</span>
                  <span className="font-semibold text-gray-900">{new Date(lead.activationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Valid Till:</span>
                  <span className="font-bold text-red-600">{new Date(lead.validTill).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-medium">Last Active:</span>
                  <span className="font-semibold text-gray-900">{new Date(lead.lastActive).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
                </div>
                <span className="text-gray-300">|</span>
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
            {/* Lead Details Section */}
            <div>
              {/* First Row - Always Visible */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Contact Person</Label>
                  <Input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Company Name</Label>
                  <Input value={lead.company} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Mobile</Label>
                  <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Alternate No.</Label>
                  <Input value={alternateNo} onChange={(e) => setAlternateNo(e.target.value)} />
                </div>
              </div>

              {/* View More/Less Link */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {showMoreDetails ? 'View Less' : 'View More'}
                </button>
              </div>

              {/* Additional Fields - Show/Hide based on state */}
              {showMoreDetails && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {/* Row 1 */}
                  <div className="space-y-2">
                    <Label className="text-sm">Owner Partner</Label>
                    <Input value={lead.ownerPartner} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Email ID</Label>
                    <Input value={lead.email} onChange={(e) => {}} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Pincode</Label>
                    <Input value={lead.pincode || 'N/A'} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">City</Label>
                    <Input value={lead.city} readOnly className="bg-gray-50" />
                  </div>

                  {/* Row 2 */}
                  <div className="space-y-2">
                    <Label className="text-sm">State</Label>
                    <Input value={lead.state || 'N/A'} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Status</Label>
                    <Input value={lead.status || 'Active'} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Subscription Status</Label>
                    <Input value={lead.subscriptionStatus || 'Active'} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Model</Label>
                    <Input value={lead.model || 'N/A'} readOnly className="bg-gray-50" />
                  </div>

                  {/* Row 3 */}
                  <div className="space-y-2">
                    <Label className="text-sm">Release</Label>
                    <Input value={lead.release || 'N/A'} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Version</Label>
                    <Input value={lead.version || 'N/A'} readOnly className="bg-gray-50" />
                  </div>
                </div>
              )}
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
              <Button variant="outline" onClick={onClose}>
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
  );
};

export default LeadDetailsModal;
