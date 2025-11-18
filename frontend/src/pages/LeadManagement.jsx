import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import {
  Search,
  Filter,
  Mail,
  MessageCircle,
  History,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockRenewalLeads } from '../mock';
import LeadDetailsModal from '../components/LeadDetailsModal';
import HistoryModal from '../components/HistoryModal';
import BulkAssignModal from '../components/BulkAssignModal';
import AdvancedFilterModal from '../components/AdvancedFilterModal';
import { useHeader } from '../contexts/HeaderContext';

const LeadManagement = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickFilter, setQuickFilter] = useState('all');
  const [dueFilter, setDueFilter] = useState('all');
  const { setHeaderContent } = useHeader();

  // Determine leadType based on URL path
  const leadType = location.pathname.includes('upsell') ? 'upsell' : 'renewal';

  // Set header content on mount
  useEffect(() => {
    setHeaderContent(
      <div className="relative flex-1 max-w-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by Mobile, GSTIN, Email, Lead ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-9"
        />
        <button
          onClick={() => setShowAdvancedFilter(true)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 p-1 rounded transition-colors"
          title="Advanced Filters"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    );

    // Cleanup header content on unmount
    return () => setHeaderContent(null);
  }, [searchQuery, setHeaderContent, setShowAdvancedFilter]);

  const leadsPerPage = 10;
  const totalPages = Math.ceil(mockRenewalLeads.length / leadsPerPage);

  const handleSelectLead = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === mockRenewalLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(mockRenewalLeads.map((lead) => lead.id));
    }
  };

  const handleOpenLeadDetails = (lead) => {
    setSelectedLead(lead);
    setShowLeadDetails(true);
  };

  const handleOpenHistory = (lead) => {
    setSelectedLead(lead);
    setShowHistory(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'hot':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'warm':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cold':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStageColor = (stage) => {
    switch (stage.toLowerCase()) {
      case 'interested':
        return 'bg-green-100 text-green-700';
      case 'payment':
        return 'bg-purple-100 text-purple-700';
      case 'matured':
        return 'bg-blue-100 text-blue-700';
      case 'dropped':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white px-6 py-3 -mx-6 -mt-6 border-b shadow-sm" style={{borderColor: '#E2E8F0'}}>

        <Button
          size="sm"
          variant={quickFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('all')}
          className="h-8"
        >
          All Leads
        </Button>
        
        <Button
          size="sm"
          variant={quickFilter === 'fresh' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('fresh')}
          className="h-8"
        >
          Fresh Leads
        </Button>

        <Button
          size="sm"
          variant={quickFilter === 'owner' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('owner')}
          className="h-8"
        >
          Refer to Owner Partner
        </Button>

        <Button
          size="sm"
          variant={quickFilter === 'm0' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('m0')}
          className="h-8"
        >
          M0
        </Button>

        <Button
          size="sm"
          variant={quickFilter === 'm-1' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('m-1')}
          className="h-8"
        >
          M-1
        </Button>

        <Button
          size="sm"
          variant={quickFilter === 'interested' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('interested')}
          className="h-8"
        >
          Interested
        </Button>
        <Button
          size="sm"
          variant={quickFilter === 'pendingfu' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('pendingfu')}
          className="h-8"
        >
          Pending Follow Up
        </Button>
        <Button
          size="sm"
          variant={quickFilter === 'upcomingfu' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('upcomingfu')}
          className="h-8"
        >
          Upcoming Follow Up
        </Button>
        <Button
          size="sm"
          variant={quickFilter === 'withoffers' ? 'default' : 'outline'}
          onClick={() => setQuickFilter('withoffers')}
          className="h-8"
        >
          With Offers
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedLeads.length} lead(s) selected
              </span>
              <Button
                size="sm"
                onClick={() => setShowBulkAssign(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Bulk Assign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leads Table */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedLeads.length === mockRenewalLeads.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-white"
                    />
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      Company Name <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      Subscription ID <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      {leadType === 'upsell' ? 'Upsell To' : 'Product'} <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      {leadType === 'upsell' ? 'Offer Validity' : 'Valid Till'} <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      Owner Partner <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      Next Follow Up <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">
                    <div className="flex items-center gap-1">
                      Stage <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">Contact Details</th>
                  <th className="py-2 px-4 text-left text-xs font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockRenewalLeads.map((lead, index) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                    onClick={() => handleOpenLeadDetails(lead)}
                  >
                    <td
                      className="py-1.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleSelectLead(lead.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm font-medium text-blue-600">{lead.company}</div>
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm text-gray-900">{lead.subscriptionId}</div>
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm text-gray-900">
                        {leadType === 'upsell' ? (lead.upsellTo || lead.product) : lead.product}
                      </div>
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm text-gray-900">
                        {leadType === 'upsell' ? (lead.offerValidity || '-') : lead.validTill}
                      </div>
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm text-gray-900">{lead.ownerPartner}</div>
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm text-gray-900">{lead.nextFollowUp}</div>
                    </td>
                    <td className="py-1.5 px-4">
                      <Badge className={`${getStageColor(lead.stage)} text-xs`}>
                        {lead.stage}
                      </Badge>
                    </td>
                    <td className="py-1.5 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{lead.assignedTo}</div>
                        <div className="text-xs text-gray-600">{lead.mobile}</div>
                      </div>
                    </td>
                    <td
                      className="py-1.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                          title="Email"
                        >
                          <Mail className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                          onClick={() => handleOpenHistory(lead)}
                          title="History"
                        >
                          <History className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * leadsPerPage + 1} to{' '}
              {Math.min(currentPage * leadsPerPage, mockRenewalLeads.length)} of{' '}
              {mockRenewalLeads.length} leads
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showLeadDetails && selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          leadType={leadType}
          onClose={() => setShowLeadDetails(false)}
        />
      )}

      {showHistory && selectedLead && (
        <HistoryModal
          lead={selectedLead}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showBulkAssign && (
        <BulkAssignModal
          selectedLeads={selectedLeads}
          onClose={() => setShowBulkAssign(false)}
          onSuccess={() => {
            setSelectedLeads([]);
            setShowBulkAssign(false);
          }}
        />
      )}

      {showAdvancedFilter && (
        <AdvancedFilterModal
          onClose={() => setShowAdvancedFilter(false)}
          onApply={(filters) => {
            console.log('Applied filters:', filters);
            setShowAdvancedFilter(false);
          }}
        />
      )}
    </div>
  );
};

export default LeadManagement;
