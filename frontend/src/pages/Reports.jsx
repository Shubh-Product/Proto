import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Eye, Download } from 'lucide-react';

const Reports = () => {
  const [reportType, setReportType] = useState('newsales');

  // Mock reports data
  const allReports = {
    newsales: [
      { id: 1, name: 'Overall Summary', status: 'active' },
      { id: 2, name: 'Follow Up Timeliness', status: 'active' },
      { id: 3, name: 'Leads In Funnel (WIP)', status: 'wip' },
      { id: 4, name: 'Attempt Report', status: 'active' },
      { id: 5, name: 'MSTR Report', status: 'active' }
    ],
    renewals: [
      { id: 6, name: 'Enquiry Tracking', status: 'active' },
      { id: 7, name: 'Cluster Wise Leads', status: 'active' },
      { id: 8, name: 'BCRM Lead Report', status: 'active' },
      { id: 9, name: 'Partner Wise Lead Call Disposition/Stage Report', status: 'active' }
    ],
    upgrade: [
      { id: 10, name: 'Scalex Performance Report', status: 'active' },
      { id: 11, name: 'Upgrade Funnel Analysis', status: 'active' },
      { id: 12, name: 'Upsell Conversion Report', status: 'active' }
    ]
  };

  const reports = allReports[reportType];

  const handleViewReport = (reportId) => {
    console.log('View report:', reportId);
    // Add view report logic here
  };

  const handleDownloadReport = (reportId) => {
    console.log('Download report:', reportId);
    // Add download report logic here
  };

  return (
    <div className="space-y-4">
      {/* Radio Buttons Section */}
      <div className="flex flex-wrap items-center justify-end gap-6 bg-white px-6 py-3 -mx-6 -mt-6 border-b shadow-sm" style={{borderColor: '#E2E8F0'}}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="newsales"
            checked={reportType === 'newsales'}
            onChange={(e) => setReportType(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">New Sales</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="renewals"
            checked={reportType === 'renewals'}
            onChange={(e) => setReportType(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Renewals</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="upgrade"
            checked={reportType === 'upgrade'}
            onChange={(e) => setReportType(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">Upsell</span>
        </label>
      </div>

      {/* Reports Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-semibold">Report Name</th>
                  <th className="py-2 px-4 text-right text-xs font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr
                      key={report.id}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <td className="py-1.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {report.name}
                          </span>
                          {report.status === 'wip' && (
                            <span className="text-xs text-gray-500 italic">(WIP)</span>
                          )}
                        </div>
                      </td>
                      <td className="py-1.5 px-4">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleViewReport(report.id)}
                            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                            title="View Report"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDownloadReport(report.id)}
                            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                            title="Download Report"
                          >
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-8 px-4 text-center text-gray-500 text-sm">
                      No reports available for this category
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
