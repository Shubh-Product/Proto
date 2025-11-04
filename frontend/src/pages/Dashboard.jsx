import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Calendar, TrendingUp, Phone, Users as UsersIcon, AlertCircle, ArrowUpDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
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
  const [chartPeriod, setChartPeriod] = useState('weekly');

  // Calculate totals for user metrics
  const totalMetrics = mockUserMetrics.reduce((acc, user) => ({
    leadAssigned: acc.leadAssigned + user.leadAssigned,
    lost: acc.lost + user.lost,
    followUpDone: acc.followUpDone + user.followUpDone,
    followUpPending: acc.followUpPending + user.followUpPending,
    demoDone: acc.demoDone + user.demoDone,
    demoPending: acc.demoPending + user.demoPending,
    matured: acc.matured + user.matured
  }), {
    leadAssigned: 0,
    lost: 0,
    followUpDone: 0,
    followUpPending: 0,
    demoDone: 0,
    demoPending: 0,
    matured: 0
  });

  const totalTasks = {
    toDo: mockTasksSummary.calls.toDo + mockTasksSummary.meetings.toDo,
    done: mockTasksSummary.calls.done + mockTasksSummary.meetings.done
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Date Filter */}
      <div className="bg-white border-b-2 border-blue-600 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
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
        </div>
      </div>

      {/* User Performance Table */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Name <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Lead Assigned <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Lost <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Follow Up Done <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Follow Up Pending <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Demo Done <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Demo Pending <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    <div className="flex items-center justify-center gap-1">
                      Matured <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUserMetrics.map((user, index) => (
                  <tr 
                    key={user.name} 
                    className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.leadAssigned}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.lost}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.followUpDone}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.followUpPending}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.demoDone}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.demoPending}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900">{user.matured}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="py-3 px-4 text-sm text-gray-900">Total</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.leadAssigned}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.lost}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.followUpDone}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.followUpPending}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.demoDone}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.demoPending}</td>
                  <td className="py-3 px-4 text-sm text-center text-gray-900">{totalMetrics.matured}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tasks and Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks for Today */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Tasks for Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200">
                  <tr>
                    <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700"></th>
                    <th className="text-center py-2 px-3 text-sm font-semibold text-gray-700">To Do</th>
                    <th className="text-center py-2 px-3 text-sm font-semibold text-gray-700">Done</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 text-sm font-medium text-gray-900">Calls</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-900">{mockTasksSummary.calls.toDo}</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-900">{mockTasksSummary.calls.done}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-3 text-sm font-medium text-gray-900">Meetings</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-900">{mockTasksSummary.meetings.toDo}</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-900">{mockTasksSummary.meetings.done}</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-3 px-3 text-sm text-gray-900">Total</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-900">{totalTasks.toDo}</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-900">{totalTasks.done}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Assigned to Matured % Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Assigned to Matured %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyMaturityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#6b7280" 
                    style={{ fontSize: '11px' }}
                    interval={0}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {mockWeeklyMaturityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3b82f6" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="chartPeriod"
                  value="daily"
                  checked={chartPeriod === 'daily'}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Daily</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="chartPeriod"
                  value="weekly"
                  checked={chartPeriod === 'weekly'}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Weekly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="chartPeriod"
                  value="monthly"
                  checked={chartPeriod === 'monthly'}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Monthly</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demo Done To Matured % */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Demo Done To Matured %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyMaturityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#6b7280" 
                    style={{ fontSize: '11px' }}
                    interval={0}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Bar dataKey="percentage" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="demoPeriod"
                  value="daily"
                  defaultChecked={false}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Daily</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="demoPeriod"
                  value="weekly"
                  defaultChecked={true}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Weekly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="demoPeriod"
                  value="monthly"
                  defaultChecked={false}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Monthly</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Assigned To Demo Scheduled % */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Assigned To Demo Scheduled %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyMaturityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#6b7280" 
                    style={{ fontSize: '11px' }}
                    interval={0}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Bar dataKey="percentage" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="scheduledPeriod"
                  value="daily"
                  defaultChecked={false}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Daily</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="scheduledPeriod"
                  value="weekly"
                  defaultChecked={true}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Weekly</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="scheduledPeriod"
                  value="monthly"
                  defaultChecked={false}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Monthly</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
