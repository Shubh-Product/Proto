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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="followup">Follow-up</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="text-sm">Subscription ID</Label>
                <Input value={lead.subscriptionId} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Activation Date</Label>
                <Input value={lead.activationDate} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Valid Till</Label>
                <Input value={lead.validTill} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Last Active</Label>
                <Input value={lead.lastActive} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Services</Label>
                <Input value={lead.services.join(', ')} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Offer(s)</Label>
                <Input value={lead.offers.length > 0 ? lead.offers.join(', ') : 'N/A'} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Mobile</Label>
                <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Contact Person</Label>
                <Input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Product</Label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((p) => (
                      <SelectItem key={p.value} value={p.label}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Assigned To</Label>
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
                <Label className="text-sm">Owner Partner</Label>
                <Input value={lead.ownerPartner} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Company Name</Label>
                <Input value={lead.company} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Email</Label>
                <Input value={lead.email} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">GSTIN</Label>
                <Input value={lead.gstin} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">City</Label>
                <Input value={lead.city} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Activeness</Label>
                <Input value={lead.activeness} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Vintage</Label>
                <Input value={lead.vintage} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">License Category</Label>
                <Input value={lead.licenseType} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">GST Usage</Label>
                <Input value={lead.gstUsage} readOnly className="bg-gray-50" />
              </div>
            </div>
          </div>

          {/* Follow Up Update Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Follow Up Update</h3>
            
            {/* Update Type Radio Buttons */}
            <div className="mb-4">
              <Label className="text-sm mb-2 block">Update Type</Label>
              <RadioGroup value={updateType} onValueChange={setUpdateType} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="call" id="call" />
                  <Label htmlFor="call" className="text-sm font-normal cursor-pointer">Call</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meeting" id="meeting" />
                  <Label htmlFor="meeting" className="text-sm font-normal cursor-pointer">Meeting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="general" />
                  <Label htmlFor="general" className="text-sm font-normal cursor-pointer">General</Label>
                </div>
              </RadioGroup>
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
                <Select value={nextFUType} onValueChange={setNextFUType}>
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
                <div className="relative">
                  <Input
                    type="datetime-local"
                    value={nextFUDateTime}
                    onChange={(e) => setNextFUDateTime(e.target.value)}
                    disabled={stage === 'matured' || stage === 'dropped'}
                  />
                </div>
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
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveDetails}>
              Save Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
