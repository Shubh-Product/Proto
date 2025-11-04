import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockTeamMembers } from '../mock';
import { toast } from '../hooks/use-toast';

const BulkAssignModal = ({ selectedLeads, onClose, onSuccess }) => {
  const [assignTo, setAssignTo] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleAssign = () => {
    if (!assignTo || !remarks) {
      toast({
        title: 'Validation Error',
        description: 'Please select assignee and provide remarks',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Leads Assigned',
      description: `${selectedLeads.length} lead(s) assigned successfully`
    });

    onSuccess();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Assign Leads</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Assigning {selectedLeads.length} lead(s)
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Assign To *</Label>
            <Select value={assignTo} onValueChange={setAssignTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {mockTeamMembers.map((member) => (
                  <SelectItem key={member.value} value={member.value}>
                    {member.label} ({member.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Remarks *</Label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter reason for assignment..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAssign} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Assign Leads
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAssignModal;
