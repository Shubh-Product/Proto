import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Clock, User, ChevronDown, MessageSquare, ChevronUp } from 'lucide-react';
import { mockFollowUpHistory, mockWhatsAppHistory } from '../mock';
import { useState } from 'react';

const HistoryModal = ({ lead, onClose }) => {
  const [expandedRemarks, setExpandedRemarks] = useState({});

  const toggleRemark = (id) => {
    setExpandedRemarks((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-3">
              <span>History</span>
              <span className="text-base font-normal text-gray-600">{lead.subscriptionId}</span>
              <span className="text-base font-normal text-gray-600">{lead.mobile}</span>
              <span className="text-base font-normal text-gray-600">Existing Services: N/A</span>
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="table" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="table">History Table</TabsTrigger>
            <TabsTrigger value="timeline">Follow Up History</TabsTrigger>
            <TabsTrigger value="whatsapp">Whatsapp History</TabsTrigger>
            <TabsTrigger value="pastleads">Past Leads</TabsTrigger>
          </TabsList>

          {/* History Table */}
          <TabsContent value="table" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead style={{backgroundColor: '#0f4c81'}}>
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span>Updated At</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span>Updated By</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span>Stage</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span>Priority</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span>Call Disposition</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span>Assigned To</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockFollowUpHistory.map((history) => (
                    <tr key={history.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{history.updatedAt}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{history.by}</td>
                      <td className="py-3 px-4 text-sm">{history.stage}</td>
                      <td className="py-3 px-4 text-sm">{history.priority || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{history.disposition}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{history.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline" className="mt-4">
            <div className="space-y-4">
              {mockFollowUpHistory.map((history, index) => (
                <div key={history.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    {index !== mockFollowUpHistory.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-gray-900">{history.by}</span>
                          <Badge variant="outline" className="text-xs">{history.stage}</Badge>
                        </div>
                        <span className="text-xs text-gray-600">{history.updatedAt}</span>
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Disposition:</span> {history.disposition}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Remarks:</span> {history.remarks}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* WhatsApp History */}
          <TabsContent value="whatsapp" className="mt-4">
            {mockWhatsAppHistory.length > 0 ? (
              <div className="space-y-3">
                {mockWhatsAppHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === 'sent' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.type === 'sent'
                          ? 'bg-green-100 text-gray-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-3 h-3" />
                        <span className="text-xs text-gray-600">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No WhatsApp history available
              </div>
            )}
          </TabsContent>

          {/* Past Leads */}
          <TabsContent value="pastleads" className="mt-4">
            <div className="text-center py-8 text-gray-500">
              Past leads data will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
