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
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-base flex items-center gap-2">
            <span className="font-bold text-gray-900">Edit Lead</span>
            <span className="text-gray-500 font-normal">
              | {lead.subscriptionId} | Activation: {lead.activationDate} | Valid Till: {lead.validTill} | Last Active: {lead.lastActive} | Related Services: {lead.services.length}
            </span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4 flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 flex-shrink-0">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          {/* Details Tab - Contains both Lead Details and Follow Up Update */}
          <TabsContent value="details" className="space-y-6 mt-4 overflow-y-auto flex-1">
            {/* Lead Details Section - All fields in one section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Lead Details</h3>
              <div className="grid grid-cols-4 gap-4">
                {/* Row 1 */}
                <div className="space-y-2">
                  <Label className="text-sm">Subscription ID</Label>
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{lead.subscriptionId}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Activation Date</Label>
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{lead.activationDate}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Valid Till</Label>
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50 text-red-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{lead.validTill}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Last Active</Label>
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-gray-50">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{lead.lastActive}</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="space-y-2">
                  <Label className="text-sm">Services</Label>
                  <Input value={lead.services.join(', ')} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Offers</Label>
                  <Input value={lead.offers.length > 0 ? lead.offers.join(', ') : 'No offers'} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Mobile</Label>
                  <Input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Product</Label>
                  <Input value={lead.product} readOnly className="bg-gray-50" />
                </div>

                {/* Row 3 */}
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

                {/* Row 4 */}
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

                {/* Row 5 */}
                <div className="space-y-2">
                  <Label className="text-sm">License Type</Label>
                  <Input value={lead.licenseType} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">GST Usage</Label>
                  <Input value={lead.gstUsage} readOnly className="bg-gray-50" />
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
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-700">Relation</th>
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
                        <Badge variant="outline" className="text-xs">{sub.relation}</Badge>
                      </td>
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
                      <Badge variant="outline" className="text-xs">Cross-sell</Badge>
                    </td>
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
                      <Badge variant="outline" className="text-xs">Upsell</Badge>
                    </td>
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
                      <Badge variant="outline" className="text-xs">Cross-sell</Badge>
                    </td>
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
                      <Badge variant="outline" className="text-xs">Upsell</Badge>
                    </td>
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
                      <Badge variant="outline" className="text-xs">Related</Badge>
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
