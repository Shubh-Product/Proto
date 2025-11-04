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
  const [productFilter, setProductFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('renewal');
  const [trendPeriod, setTrendPeriod] = useState('3M');

  const { mMinus1, m0, mPlus1 } = mockDashboardMetrics;

  return (
    <div className="space-y-6">
      {/* Header with Title and Filters */}
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

      {/* Filters */}
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Product:</span>
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="w-[160px]">
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

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="renewal">Renewal</SelectItem>
                  <SelectItem value="upsell">Upsell</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Overview Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Period</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Due</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Renewed</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">%</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Potential %</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Interested</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Matured</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">M-1</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mMinus1.due}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mMinus1.renewed}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="text-green-600 font-semibold">{mMinus1.renewalPercentage}%</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-orange-600">{mMinus1.potentialPercentage}%</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mMinus1.interested}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mMinus1.matured}</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">M0 (Current)</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{m0.due}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{m0.renewed}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="text-green-600 font-semibold">{m0.renewalPercentage}%</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-orange-600">{m0.potentialPercentage}%</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{m0.interested}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{m0.matured}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">M+1</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mPlus1.due}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mPlus1.renewed}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <span className="text-gray-400 font-semibold">{mPlus1.renewalPercentage}%</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-orange-600">{mPlus1.potentialPercentage}%</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mPlus1.interested}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-900">{mPlus1.matured}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Work Done & Actionables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Done */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Work Done by Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Calls</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="text-xs text-red-700 font-medium">Hot</div>
                    <div className="text-2xl font-bold text-red-600 mt-1">{mockWorkDone.calls.hot}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <div className="text-xs text-orange-700 font-medium">Warm</div>
                    <div className="text-2xl font-bold text-orange-600 mt-1">{mockWorkDone.calls.warm}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xs text-blue-700 font-medium">Cold</div>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{mockWorkDone.calls.cold}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-700 font-medium">Other</div>
                    <div className="text-2xl font-bold text-gray-600 mt-1">{mockWorkDone.calls.other}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Meetings</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="text-xs text-red-700 font-medium">Hot</div>
                    <div className="text-2xl font-bold text-red-600 mt-1">{mockWorkDone.meetings.hot}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                    <div className="text-xs text-orange-700 font-medium">Warm</div>
                    <div className="text-2xl font-bold text-orange-600 mt-1">{mockWorkDone.meetings.warm}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="text-xs text-blue-700 font-medium">Cold</div>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{mockWorkDone.meetings.cold}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-700 font-medium">Other</div>
                    <div className="text-2xl font-bold text-gray-600 mt-1">{mockWorkDone.meetings.other}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actionables */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Actionables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-red-900">Expiring Today</div>
                    <div className="text-xs text-red-700 mt-1">Immediate action required</div>
                  </div>
                  <div className="text-3xl font-bold text-red-600">{mockActionables.expiringToday}</div>
                </div>
                <Button className="w-full mt-3 bg-red-600 hover:bg-red-700">View Leads</Button>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-orange-900">Expiring Tomorrow</div>
                    <div className="text-xs text-orange-700 mt-1">Plan follow-up activities</div>
                  </div>
                  <div className="text-3xl font-bold text-orange-600">{mockActionables.expiringTomorrow}</div>
                </div>
                <Button className="w-full mt-3 bg-orange-600 hover:bg-orange-700">View Leads</Button>
              </div>
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
