import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Calendar, TrendingUp, Phone, Users as UsersIcon, AlertCircle, ArrowUpDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useHeader } from '../contexts/HeaderContext';
import {
  mockDashboardMetrics,
  mockWorkDone,
  mockActionables,
  mockTrendData,
  mockProducts,
  mockUpsellOffers,
  mockUserMetrics,
  mockTasksSummary,
  mockWeeklyMaturityData,
  mockUpsellOffersMetrics,
  mockOperationalMetrics,
  mockOperationalUpsellOffersMetrics,
  mockRenewal4MonthMetrics,
  mockUpsellOffers4MonthMetrics
} from '../mock';

const Dashboard = () => {
  const location = useLocation();
  const [dateFilter, setDateFilter] = useState('today');
  const [productFilter, setProductFilter] = useState('all');
  const [viewType, setViewType] = useState('userwise'); // userwise or offerswise
  const [dashboardView, setDashboardView] = useState('operational'); // operational or renewal
  const [trendPeriod, setTrendPeriod] = useState('6M');
  const { setHeaderContent } = useHeader();

  // Determine leadType based on URL path
  const leadType = location.pathname.includes('upsell') ? 'upsell' : 'renewal';

  // Cleanup header content when component mounts/unmounts
  useEffect(() => {
    // Remove any header content for dashboard
    setHeaderContent(null);
    
    // Cleanup: ensure header content is removed when component unmounts
    return () => setHeaderContent(null);
  }, [setHeaderContent]);

  return (
    <div className="space-y-6">
      {/* Filters Section - Above the table */}
      <Card className="shadow-md">
        <CardContent className="py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Date Filter */}
              <div className="flex items-center gap-2 pl-4">
                <span className="text-sm font-medium text-gray-700">Date:</span>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="3d">Last 3 Days</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="15d">Last 15 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="thisweek">This Week</SelectItem>
                    <SelectItem value="lastweek">Last Week</SelectItem>
                    <SelectItem value="thismonth">This Month</SelectItem>
                    <SelectItem value="lastmonth">Last Month</SelectItem>
                    <SelectItem value="lastmonthonwards">Last Month Onwards</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Picker - Show when Custom is selected */}
              {dateFilter === 'custom' && (
                <div className="flex items-center gap-2 border-l pl-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">From:</label>
                    <input
                      type="date"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">To:</label>
                    <input
                      type="date"
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Product/Upsell Offer Filter */}
              <div className="flex items-center gap-2 border-l pl-4">
                <span className="text-sm font-medium text-gray-700">
                  {leadType === 'upsell' ? 'Upsell Offer:' : 'Product:'}
                </span>
                <Select value={productFilter} onValueChange={setProductFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(leadType === 'upsell' ? mockUpsellOffers : mockProducts).map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dashboard View Type Radio Buttons - Operational/Renewal or Upsell */}
            <div className="flex items-center gap-3 border-l pl-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dashboardView"
                  value="operational"
                  checked={dashboardView === 'operational'}
                  onChange={(e) => setDashboardView(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Operational</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dashboardView"
                  value="renewal"
                  checked={dashboardView === 'renewal'}
                  onChange={(e) => setDashboardView(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">{leadType === 'upsell' ? 'Upsell' : 'Renewal'}</span>
              </label>
            </div>

            {/* View Type Radio Buttons - Only show when Upsell is selected */}
            {leadType === 'upsell' && (
              <div className="flex items-center gap-3 border-l pl-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="viewType"
                    value="userwise"
                    checked={viewType === 'userwise'}
                    onChange={(e) => setViewType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">User Wise</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="viewType"
                    value="offerswise"
                    checked={viewType === 'offerswise'}
                    onChange={(e) => setViewType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Upsell Offers Wise</span>
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Table - Operational or Renewal */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            {dashboardView === 'operational' ? (
              /* Operational View Table */
              <>
                {/* Fixed Header */}
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col style={{ width: '200px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '150px' }} />
                      <col style={{ width: '120px' }} />
                    </colgroup>
                    <thead className="bg-blue-900 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center gap-1">
                            {leadType === 'upsell' && viewType === 'offerswise' ? 'Upsell Offers' : 'Name'} <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center justify-center gap-1">
                            Call <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center justify-center gap-1">
                            Meeting <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center justify-center gap-1">
                            Matured <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center justify-center gap-1">
                            Interested <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center justify-center gap-1">
                            Payment Received <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-3 px-4 text-center text-sm font-semibold sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center justify-center gap-1">
                            Dropped <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                {/* Scrollable Body */}
                <div className="overflow-x-auto overflow-y-auto max-h-[280px]">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col style={{ width: '200px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '120px' }} />
                      <col style={{ width: '150px' }} />
                      <col style={{ width: '120px' }} />
                    </colgroup>
                    <tbody>
                      {(leadType === 'upsell' && viewType === 'offerswise' ? mockOperationalUpsellOffersMetrics : mockOperationalMetrics).map((item, index) => (
                        <tr 
                          key={item.name} 
                          className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                        >
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.name}</td>
                          <td className="py-3 px-4 text-sm text-center text-gray-900">{item.call.done}</td>
                          <td className="py-3 px-4 text-sm text-center text-gray-900">{item.meeting.done}</td>
                          <td className="py-3 px-4 text-sm text-center text-gray-900">{item.matured}</td>
                          <td className="py-3 px-4 text-sm text-center text-gray-900">{item.interested}</td>
                          <td className="py-3 px-4 text-sm text-center text-gray-900">{item.paymentReceived}</td>
                          <td className="py-3 px-4 text-sm text-center text-gray-900">{item.dropped}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              /* Renewal View Table - 4 Month Trend */
              <>
                {/* Fixed Header */}
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col style={{ width: '180px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                    </colgroup>
                    <thead className="bg-blue-900 text-white">
                      <tr>
                        <th rowSpan="2" className="py-3 px-4 text-left text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                          <div className="flex items-center gap-1">
                            {leadType === 'upsell' && viewType === 'offerswise' ? 'Upsell Offers' : 'Name'} <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th colSpan="2" className="py-2 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900">
                          Past Month (M-2)
                        </th>
                        <th colSpan="2" className="py-2 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900">
                          Previous Month (M-1)
                        </th>
                        <th colSpan="2" className="py-2 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900">
                          Current Month (M0)
                        </th>
                        <th colSpan="2" className="py-2 px-4 text-center text-sm font-semibold sticky top-0 bg-blue-900">
                          Upcoming Month (M+1)
                        </th>
                      </tr>
                      <tr>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">{leadType === 'upsell' ? 'Leads Assigned' : 'Due'}</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">%</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">{leadType === 'upsell' ? 'Leads Assigned' : 'Due'}</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">%</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">{leadType === 'upsell' ? 'Leads Assigned' : 'Due'}</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">%</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">{leadType === 'upsell' ? 'Leads Assigned' : 'Due'}</th>
                        <th className="py-2 px-3 text-center text-xs font-semibold sticky top-[52px] bg-blue-900">%</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                {/* Scrollable Body */}
                <div className="overflow-x-auto overflow-y-auto max-h-[280px]">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col style={{ width: '180px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                      <col style={{ width: '100px' }} />
                    </colgroup>
                    <tbody>
                      {(leadType === 'upsell' && viewType === 'offerswise' ? mockUpsellOffers4MonthMetrics : mockRenewal4MonthMetrics).map((item, index) => (
                        <tr 
                          key={item.name} 
                          className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                        >
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.name}</td>
                          {/* M-2 Data */}
                          <td className="py-3 px-3 text-sm text-center text-gray-900">{item.mMinus2.due}</td>
                          <td className="py-3 px-3 text-sm text-center">
                            <span className={`font-semibold ${item.mMinus2.percentage > 70 ? 'text-green-600' : item.mMinus2.percentage > 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {item.mMinus2.percentage}%
                            </span>
                          </td>
                          {/* M-1 Data */}
                          <td className="py-3 px-3 text-sm text-center text-gray-900">{item.mMinus1.due}</td>
                          <td className="py-3 px-3 text-sm text-center">
                            <span className={`font-semibold ${item.mMinus1.percentage > 70 ? 'text-green-600' : item.mMinus1.percentage > 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {item.mMinus1.percentage}%
                            </span>
                          </td>
                          {/* M0 Data */}
                          <td className="py-3 px-3 text-sm text-center text-gray-900">{item.m0.due}</td>
                          <td className="py-3 px-3 text-sm text-center">
                            <span className={`font-semibold ${item.m0.percentage > 70 ? 'text-green-600' : item.m0.percentage > 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {item.m0.percentage}%
                            </span>
                          </td>
                          {/* M+1 Data */}
                          <td className="py-3 px-3 text-sm text-center text-gray-900">{item.mPlus1.due}</td>
                          <td className="py-3 px-3 text-sm text-center">
                            <span className="text-gray-400 font-semibold">{item.mPlus1.percentage}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* To Do, Work Done & Actionables Tables - All in same row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* To Do Table */}
        <Card className="shadow-md">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              To Do
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold"></th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Hot</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Warm</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Cold</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Other</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Call</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">18</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">32</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">15</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">8</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Meeting</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">5</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">8</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">3</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">2</td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">23</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">40</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">18</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Work Done Table */}
        <Card className="shadow-md">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Work Done
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold"></th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Hot</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Warm</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Cold</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Other</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Call</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.calls.hot}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.calls.warm}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.calls.cold}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.calls.other}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Meeting</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.meetings.hot}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.meetings.warm}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.meetings.cold}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockWorkDone.meetings.other}</td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.calls.hot + mockWorkDone.meetings.hot}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.calls.warm + mockWorkDone.meetings.warm}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.calls.cold + mockWorkDone.meetings.cold}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.calls.other + mockWorkDone.meetings.other}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Actionables Table */}
        <Card className="shadow-md">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Actionables
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Expiring</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Today</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockActionables.expiringToday}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Tomorrow</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{mockActionables.expiringTomorrow}</td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockActionables.expiringToday + mockActionables.expiringTomorrow}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Renewal/Upsell Trend - Bar Chart styled like screenshot */}
      <Card className="shadow-md">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {leadType === 'upsell' ? 'Upsell Trend' : 'Renewal Trend'}
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Mature till date ÷ total leads) × 100
              </span>
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={trendPeriod === '6M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendPeriod('6M')}
                className="font-semibold"
              >
                6M
              </Button>
              <Button
                variant={trendPeriod === '12M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendPeriod('12M')}
                className="font-semibold"
              >
                12M
              </Button>
              <Button
                variant={trendPeriod === '18M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendPeriod('18M')}
                className="font-semibold"
              >
                18M
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTrendData[trendPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  style={{ fontSize: '12px' }}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#3b82f6" 
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
