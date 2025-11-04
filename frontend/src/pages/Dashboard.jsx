import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Calendar, TrendingUp, Phone, Users as UsersIcon, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
  mockDashboardMetrics,
  mockWorkDone,
  mockActionables,
  mockTrendData,
  mockProducts
} from '../mock';

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('today');
  const [productFilter, setProductFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('renewal');
  const [trendPeriod, setTrendPeriod] = useState('3M');

  const { mMinus1, m0, mPlus1 } = mockDashboardMetrics;

  return (
    <div className="space-y-6">

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Date:</span>
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

      {/* Metrics Table */}
      <Card>
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
        <Card>
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
        <Card>
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

      {/* Trend Graph */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
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
              >
                3M
              </Button>
              <Button
                variant={trendPeriod === '6M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendPeriod('6M')}
              >
                6M
              </Button>
              <Button
                variant={trendPeriod === '12M' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTrendPeriod('12M')}
              >
                12M
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData[trendPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
