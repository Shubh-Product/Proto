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
        {/* Header Info Section - Enhanced Layout */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b px-8 py-5 -mt-6 -mx-6 shadow-sm">
          {/* Row 1 - Primary Details */}
          <div className="grid grid-cols-7 gap-x-6 gap-y-1 mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Lead ID</span>
              <span className="text-sm font-semibold text-gray-900">{lead.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Subscription ID</span>
              <span className="text-sm font-semibold text-gray-900">{lead.subscriptionId}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Product</span>
              <span className="text-sm font-semibold text-gray-900">{lead.product}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Activation</span>
              <span className="text-sm font-semibold text-gray-900">{new Date(lead.activationDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Valid Till</span>
              <span className="text-sm font-bold text-red-600">{new Date(lead.validTill).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Last Active</span>
              <span className="text-sm font-semibold text-gray-900">{new Date(lead.lastActive).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Vintage</span>
              <span className="text-sm font-semibold text-gray-900">{lead.vintage}</span>
            </div>
          </div>

          {/* Divider Line */}
          <div className="border-t border-gray-300 mb-4"></div>
          
          {/* Row 2 - Secondary Details */}
          <div className="grid grid-cols-7 gap-x-6 gap-y-1">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Activeness</span>
              <span className="text-sm font-semibold text-blue-700">{lead.activeness}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">License Type</span>
              <span className="text-sm font-semibold text-gray-900">{lead.licenseType}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Return Download</span>
              <span className={`text-sm font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Return Upload</span>
              <span className={`text-sm font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">E-Way Bill</span>
              <span className={`text-sm font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">E-Invoice</span>
              <span className={`text-sm font-semibold ${lead.gstUsage === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {lead.gstUsage === 'Active' ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Offers</span>
              <span className="text-sm font-semibold text-purple-700 truncate" title={lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'}>
                {lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'}
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-4 flex-1 flex flex-col overflow-hidden">
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
              
              {/* Update Type */}
              <div className="mb-4">
                <Label className="text-sm mb-2 block">Update Type</Label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="call"
                      checked={followUpType === 'call'}
                      onChange={(e) => setFollowUpType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Call (Phone/VC)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="meeting"
                      checked={followUpType === 'meeting'}
                      onChange={(e) => setFollowUpType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Meeting (In-Person)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="general"
                      checked={followUpType === 'general'}
                      onChange={(e) => setFollowUpType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">General</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Stage</Label>
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
                <div className="space-y-2">
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
                <div className="space-y-2">
                  <Label className="text-sm">Call Disposition</Label>
                  <Select value={disposition} onValueChange={setDisposition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
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
                <div className="space-y-2">
                  <Label className="text-sm">Next FU Type</Label>
                  <Select value={nextFUType} onValueChange={setNextFUType} disabled={stage === 'matured' || stage === 'dropped'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call (Phone/VC)</SelectItem>
                      <SelectItem value="meeting">Meeting (In-Person)</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-sm">Next Follow Up Date Time</Label>
                  <Input
                    type="datetime-local"
                    value={nextFUDateTime}
                    onChange={(e) => setNextFUDateTime(e.target.value)}
                    disabled={stage === 'matured' || stage === 'dropped'}
                    placeholder="Auto +30min"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label className="text-sm">Remarks</Label>
                  <Textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter remarks..."
                    rows={3}
                  />
                </div>
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
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Mobile</th>
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
                      <td className="py-3 px-4 text-sm">{sub.mobile}</td>
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
                    <td className="py-3 px-4 text-sm">9876543299</td>
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
                    <td className="py-3 px-4 text-sm">9876543288</td>
                    <td className="py-3 px-4 text-sm">Busy Mandi</td>
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
