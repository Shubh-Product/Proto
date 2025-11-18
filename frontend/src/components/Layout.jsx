import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, MessageSquare, UserCog, ShieldCheck, Menu, User, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockRoles } from '../mock';
import { useHeader } from '../contexts/HeaderContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState('asm');
  const { headerContent } = useHeader();

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: LayoutDashboard,
      subMenu: [
        { name: 'New Sales', href: '/dashboard/new-sales' },
        { name: 'Renewals', href: '/' },
        { name: 'Upsell', href: '/dashboard/upsell' }
      ]
    },
    { 
      name: 'Lead', 
      href: '/leads', 
      icon: Users,
      subMenu: [
        { name: 'New Sales', href: '/leads/new-sales' },
        { name: 'Renewals', href: '/leads' },
        { name: 'Upsell', href: '/leads/upsell' }
      ]
    },
    { 
      name: 'Report', 
      href: '#', 
      icon: BarChart3
    },
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
    <div className="min-h-screen flex" style={{background: 'linear-gradient(90deg, rgba(233, 245, 255, 0.1) 56%, #F8FCFF 96%)'}}>
      {/* Left Sidebar */}
      <aside className="w-20 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 z-40 flex flex-col">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200">
          <img 
            src="https://customer-assets.emergentagent.com/job_busy-renewal/artifacts/nq5ldyk9_image.png" 
            alt="Busy Logo" 
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <div key={item.name} className="relative group">
                <Link
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
                
                {/* Sub-menu */}
                {item.subMenu && (
                  <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                    <div className="bg-white shadow-xl rounded-lg border border-gray-200 py-2 min-w-[180px]">
                      {item.subMenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors whitespace-nowrap"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-20">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          {/* Main Header Row */}
          <div className="h-14 px-6 flex items-center justify-between gap-4">
            {/* Page Title */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-blue-900">{getPageTitle()}</h1>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              {/* Dynamic header content from pages */}
              {headerContent && (
                <div className="flex items-center gap-3 flex-1 max-w-2xl">
                  {headerContent}
                </div>
              )}

              {/* Switch to User Dropdown */}
              <Select value={currentRole} onValueChange={setCurrentRole}>
                <SelectTrigger className="w-[180px] h-9 border-gray-300">
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
              <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                <ShieldCheck className="w-4 h-4 text-gray-600" />
              </button>
              
              <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-4 h-4 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Avatar */}
              <button className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-white font-semibold text-xs">S</span>
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
