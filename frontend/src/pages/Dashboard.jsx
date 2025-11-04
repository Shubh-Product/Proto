import React, { useState, useEffect } from 'react';
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
  mockUserMetrics,
  mockTasksSummary,
  mockWeeklyMaturityData
} from '../mock';

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('today');
  const [productFilter, setProductFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('renewal');
  const [trendPeriod, setTrendPeriod] = useState('3M');
  const { setHeaderContent } = useHeader();

  // Set header content with filters when component mounts
  useEffect(() => {
    setHeaderContent(
      <div className="flex items-center gap-3">
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="thismonth">This Month</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Product:</span>
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.map((product) => (
                <SelectItem key={product.value} value={product.value}>
                  {product.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Type:</span>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="renewal">Renewal</SelectItem>
              <SelectItem value="upsell">Upsell</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );

    // Cleanup: remove header content when component unmounts
    return () => setHeaderContent(null);
  }, [dateFilter, productFilter, typeFilter, setHeaderContent]);

  return (
    <div className="space-y-6">

      {/* Monthly Overview Table - Exact structure from screenshot with scrollable 5 rows */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="relative">
            {/* Fixed Header */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th rowSpan="2" className="py-3 px-4 text-left text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                      <div className="flex items-center gap-1">
                        Name <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th colSpan="3" className="py-2 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900">
                      Previous Month (M-1)
                    </th>
                    <th colSpan="3" className="py-2 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900">
                      Previous Month (M0)
                    </th>
                    <th colSpan="3" className="py-2 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900">
                      Following Month (M+1)
                    </th>
                    <th rowSpan="2" className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                      <div className="flex items-center justify-center gap-1">
                        Potential% <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th rowSpan="2" className="py-3 px-4 text-center text-sm font-semibold border-r border-blue-800 sticky top-0 bg-blue-900 z-10">
                      <div className="flex items-center justify-center gap-1">
                        Interested <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th rowSpan="2" className="py-3 px-4 text-center text-sm font-semibold sticky top-0 bg-blue-900 z-10">
                      <div className="flex items-center justify-center gap-1">
                        Matured <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">Due</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">Renewed</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">%</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">Due</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">Renewed</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">%</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">Due</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">Renewed</th>
                    <th className="py-2 px-3 text-center text-xs font-semibold border-r border-blue-800 sticky top-[52px] bg-blue-900">%</th>
                  </tr>
                </thead>
              </table>
            </div>
            {/* Scrollable Body - Fixed height for 5 rows */}
            <div className="overflow-x-auto overflow-y-auto max-h-[280px]">
              <table className="w-full">
                <tbody>
                  {mockDashboardMetrics.map((user, index) => (
                    <tr 
                      key={user.name} 
                      className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 w-[200px]">{user.name}</td>
                      {/* M-1 Data */}
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[80px]">{user.mMinus1.due}</td>
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[80px]">{user.mMinus1.renewed}</td>
                      <td className="py-3 px-3 text-sm text-center w-[80px]">
                        <span className={`font-semibold ${user.mMinus1.percentage > 70 ? 'text-green-600' : user.mMinus1.percentage > 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {user.mMinus1.percentage}%
                        </span>
                      </td>
                      {/* M0 Data */}
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[80px]">{user.m0.due}</td>
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[80px]">{user.m0.renewed}</td>
                      <td className="py-3 px-3 text-sm text-center w-[80px]">
                        <span className={`font-semibold ${user.m0.percentage > 70 ? 'text-green-600' : user.m0.percentage > 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {user.m0.percentage}%
                        </span>
                      </td>
                      {/* M+1 Data */}
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[80px]">{user.mPlus1.due}</td>
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[80px]">{user.mPlus1.renewed}</td>
                      <td className="py-3 px-3 text-sm text-center w-[80px]">
                        <span className="text-gray-400 font-semibold">{user.mPlus1.percentage}%</span>
                      </td>
                      {/* Other Metrics */}
                      <td className="py-3 px-3 text-sm text-center text-orange-600 w-[100px]">{user.potentialPercentage}%</td>
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[100px]">{user.interested}</td>
                      <td className="py-3 px-3 text-sm text-center text-gray-900 w-[100px]">{user.matured}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks for Today & Actionables - Table style like screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks for Today Table */}
        <Card className="shadow-md">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Tasks for Today
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold"></th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">To Do</th>
                    <th className="py-3 px-4 text-center text-sm font-semibold">Done</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-white">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Calls</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.calls.hot + mockWorkDone.calls.warm + mockWorkDone.calls.cold + mockWorkDone.calls.other}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">158</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">Meetings</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.meetings.hot + mockWorkDone.meetings.warm + mockWorkDone.meetings.cold + mockWorkDone.meetings.other}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">38</td>
                  </tr>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">
                      {mockWorkDone.calls.hot + mockWorkDone.calls.warm + mockWorkDone.calls.cold + mockWorkDone.calls.other + 
                       mockWorkDone.meetings.hot + mockWorkDone.meetings.warm + mockWorkDone.meetings.cold + mockWorkDone.meetings.other}
                    </td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">196</td>
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

      {/* Renewal Trend - Bar Chart styled like screenshot */}
      <Card className="shadow-md">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Renewal Trend
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Mature till date ÷ total leads) × 100
              </span>
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={trendPeriod === '3M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendPeriod('3M')}
                className="font-semibold"
              >
                3M
              </Button>
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
