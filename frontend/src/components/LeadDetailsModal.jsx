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

const LeadDetailsModal = ({ lead, onClose }) => {
  const [mobile, setMobile] = useState(lead.mobile);
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo);
  
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{lead.company}</DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="text-xs">{lead.subscriptionId}</Badge>
            <Badge variant="outline" className="text-xs">{lead.product}</Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          {/* Details Tab - Contains both Lead Details and Follow Up Update */}
          <TabsContent value="details" className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Subscription ID</Label>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Package className="w-4 h-4 text-blue-600" />
                  {lead.subscriptionId}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Activation</Label>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  {lead.activationDate}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Valid Till</Label>
                <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                  <Calendar className="w-4 h-4" />
                  {lead.validTill}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-600">Last Active</Label>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-600" />
                  {lead.lastActive}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3">Services</h4>
              <div className="flex flex-wrap gap-2">
                {lead.services.map((service) => (
                  <Badge key={service} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3">Offers</h4>
              <div className="flex gap-2">
                {lead.offers.length > 0 ? (
                  <Button variant="outline" size="sm" className="text-xs">
                    View Offers ({lead.offers.length})
                  </Button>
                ) : (
                  <span className="text-sm text-gray-500">No offers available</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label>Mobile (Editable)</Label>
                <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Product (Read-only)</Label>
                <Input value={lead.product} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label>Assigned To</Label>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTeamMembers.map((member) => (
                      <SelectItem key={member.value} value={member.label}>
                        {member.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Owner Partner</Label>
                <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{lead.ownerPartner}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3">Company Info</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-gray-600">Company Name</Label>
                  <div className="mt-1 font-medium">{lead.company}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Email</Label>
                  <div className="mt-1">{lead.email}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">GSTIN</Label>
                  <div className="mt-1">{lead.gstin}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">City</Label>
                  <div className="mt-1">{lead.city}</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-3">Additional Information</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-gray-600">Activeness</Label>
                  <div className="mt-1 font-medium">{lead.activeness}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Vintage</Label>
                  <div className="mt-1 font-medium">{lead.vintage}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">License Type</Label>
                  <div className="mt-1 font-medium">{lead.licenseType}</div>
                </div>
              </div>
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
                    <span className="text-sm">Call</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="meeting"
                      checked={followUpType === 'meeting'}
                      onChange={(e) => setFollowUpType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Meeting</span>
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
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
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
          <TabsContent value="addons" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Subscription</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Mobile</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Activation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Valid Till</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Relation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-sm text-gray-500">
                      No add-ons available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Related Tab */}
          <TabsContent value="related" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Subscription</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Mobile</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Product</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Activation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Valid Till</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Relation</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Follow-up</th>
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
                        <Badge variant="outline" className="text-xs">{sub.relation}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{sub.lastFollowUp}</td>
                    </tr>
                  ))}
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
