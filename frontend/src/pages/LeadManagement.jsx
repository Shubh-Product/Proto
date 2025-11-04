import React, { useState, useEffect } from 'react';
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
import ReactDOM from 'react-dom';

const LeadManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickFilter, setQuickFilter] = useState('all');

  // Inject search bar and advanced filters into header
  useEffect(() => {
    const headerActions = document.getElementById('header-actions');
    if (headerActions) {
      const searchContainer = document.createElement('div');
      searchContainer.id = 'lead-search-container';
      searchContainer.className = 'flex items-center gap-3 flex-1 max-w-2xl';
      
      headerActions.insertBefore(searchContainer, headerActions.firstChild);
      
      return () => {
        const container = document.getElementById('lead-search-container');
        if (container) {
          container.remove();
        }
      };
    }
  }, []);

  const HeaderSearchBar = () => {
    const container = document.getElementById('lead-search-container');
    if (!container) return null;

    return ReactDOM.createPortal(
      <>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by Mobile, GSTIN, Email, Lead ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilter(true)}
          className="flex items-center gap-2 h-10"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
        </Button>
      </>,
      container
    );
  };

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
    <div className="space-y-6">

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by Mobile, GSTIN, Email, Lead ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilter(true)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={quickFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('all')}
              >
                All Leads
              </Button>
              <Button
                size="sm"
                variant={quickFilter === 'due' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('due')}
              >
                Due (M-2 to M+1)
              </Button>
              <Button
                size="sm"
                variant={quickFilter === 'expired' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('expired')}
              >
                Expired
              </Button>
              <Button
                size="sm"
                variant={quickFilter === '720days' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('720days')}
              >
                720 Days Offer
              </Button>
              <Button
                size="sm"
                variant={quickFilter === 'interested' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('interested')}
              >
                Interested
              </Button>
              <Button
                size="sm"
                variant={quickFilter === 'pendingfu' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('pendingfu')}
              >
                Pending FU
              </Button>
              <Button
                size="sm"
                variant={quickFilter === 'upcomingfu' ? 'default' : 'outline'}
                onClick={() => setQuickFilter('upcomingfu')}
              >
                Upcoming FU
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
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
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedLeads.length === mockRenewalLeads.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-white"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Lead Name <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Partner Name <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Next Follow Up <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Type <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Priority <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    <div className="flex items-center gap-1">
                      Stage <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">TAT</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Mobile</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
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
                      className="py-3 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => handleSelectLead(lead.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-blue-600">N/A</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">{lead.ownerPartner}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">{lead.nextFollowUp}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">Call</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getPriorityColor(lead.priority)} text-xs border`}>
                        {lead.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStageColor(lead.stage)} text-xs`}>
                        {lead.stage}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-green-600 font-medium">In TAT</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">{lead.mobile}</div>
                    </td>
                    <td
                      className="py-3 px-4"
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
