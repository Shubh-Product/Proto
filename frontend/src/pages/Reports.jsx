import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Eye, Download } from 'lucide-react';

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');

  // Mock reports data
  const reports = [
    { id: 1, name: 'Overall Summary', status: 'active' },
    { id: 2, name: 'Follow Up Timeliness', status: 'active' },
    { id: 3, name: 'Leads In Funnel (WIP)', status: 'wip' },
    { id: 4, name: 'Attempt Report', status: 'active' },
    { id: 5, name: 'MSTR Report', status: 'active' },
    { id: 6, name: 'Enquiry Tracking', status: 'active' },
    { id: 7, name: 'Cluster Wise Leads', status: 'active' },
    { id: 8, name: 'BCRM Lead Report', status: 'active' },
    { id: 9, name: 'Partner Wise Lead Call Disposition/Stage Report', status: 'active' },
    { id: 10, name: 'Scalex Performance Report', status: 'active' }
  ];

  // Filter reports based on search query
  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewReport = (reportId) => {
    console.log('View report:', reportId);
    // Add view report logic here
  };

  const handleDownloadReport = (reportId) => {
    console.log('Download report:', reportId);
    // Add download report logic here
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by Report..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Switch to User Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Switch to User:</span>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="amit">Amit Kumar</SelectItem>
              <SelectItem value="priya">Priya Sharma</SelectItem>
              <SelectItem value="rajesh">Rajesh Verma</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports Table */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold">Report Name</th>
                  <th className="py-3 px-6 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, index) => (
                    <tr
                      key={report.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {report.name}
                          </span>
                          {report.status === 'wip' && (
                            <span className="text-xs text-gray-500 italic">(WIP)</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleViewReport(report.id)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            title="View Report"
                          >
                            <Eye className="w-5 h-5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDownloadReport(report.id)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            title="Download Report"
                          >
                            <Download className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-8 px-6 text-center text-gray-500">
                      No reports found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
