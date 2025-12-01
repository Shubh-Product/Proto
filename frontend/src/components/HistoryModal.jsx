import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, User, ChevronDown, MessageSquare, ChevronUp, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

const HistoryModal = ({ lead, onClose }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Mock data for History Table - same as ViewHistoryModal
  const historyTableData = [
    {
      id: 1,
      updatedAt: '2024-11-15 10:30 AM',
      updatedBy: 'Sudhanshu Kumar',
      stage: 'New Lead',
      callDisposition: 'Not Connected',
      assignedTo: 'Sudhanshu Kumar',
      remarks: 'Lead created in the system'
    },
    {
      id: 2,
      updatedAt: '2024-11-16 02:45 PM',
      updatedBy: 'Amit Sharma',
      stage: 'Contacted',
      callDisposition: 'Connected',
      assignedTo: 'Amit Sharma',
      remarks: 'Customer showed interest in renewal. Will follow up next week.'
    },
    {
      id: 3,
      updatedAt: '2024-11-18 11:20 AM',
      updatedBy: 'Amit Sharma',
      stage: 'Interested',
      callDisposition: 'Connected',
      assignedTo: 'Amit Sharma',
      remarks: 'Customer requested detailed pricing. Sent quotation via email.'
    }
  ];

  // Mock data for Follow Up History - same as ViewHistoryModal
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

  // Mock data for Support History - same as ViewHistoryModal
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
                          <td colSpan="6" className="py-3 px-4">
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

export default HistoryModal;
};

export default HistoryModal;
