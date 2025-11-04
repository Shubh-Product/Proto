import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, MessageSquare, UserCog, ShieldCheck, Menu, User, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockRoles } from '../mock';

const Layout = ({ children }) => {
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState('asm');

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Lead', href: '/leads', icon: Users },
    { name: 'Report', href: '#', icon: BarChart3 },
    { name: 'Enquiry', href: '#', icon: MessageSquare },
    { name: 'User', href: '#', icon: UserCog },
    { name: 'ACL', href: '#', icon: ShieldCheck }
  ];

  const getPageTitle = () => {
    const currentPath = location.pathname;
    if (currentPath === '/leads') return 'Lead Management';
    if (currentPath === '/') return 'Dashboard';
    return 'Busy CRM';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-20 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 z-40 flex flex-col">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200">
          <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center py-4 px-2 transition-colors relative ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                )}
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium text-center">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-20">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-20 sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between">
            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-semibold text-blue-900">{getPageTitle()}</h1>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Switch to User Dropdown */}
              <Select value={currentRole} onValueChange={setCurrentRole}>
                <SelectTrigger className="w-[200px] h-10 border-gray-300">
                  <div className="flex items-center gap-2">
                    <Menu className="w-4 h-4 text-gray-600" />
                    <SelectValue placeholder="Switch to User" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {mockRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Icons */}
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                <ShieldCheck className="w-5 h-5 text-gray-600" />
              </button>
              
              <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Avatar */}
              <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white font-semibold text-sm">S</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
