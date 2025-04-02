
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown,
  ChevronUp, 
  ChevronRight, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { AssociationRule } from '@/utils/aprioriUtils';

type AssociationRulesTableProps = {
  rules: AssociationRule[];
};

const AssociationRulesTable = ({ rules }: AssociationRulesTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'lift' | 'confidence' | 'support'>('lift');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [minSupport, setMinSupport] = useState(0);
  const [minConfidence, setMinConfidence] = useState(0);
  const [minLift, setMinLift] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    antecedent: true,
    consequent: true,
    support: true,
    confidence: true,
    lift: true,
  });

  // Filter rules based on search term and thresholds
  const filteredRules = rules.filter(rule => {
    // Check for search term
    const searchMatch = 
      rule.antecedent.some(item => item.toLowerCase().includes(searchTerm.toLowerCase())) || 
      rule.consequent.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Check against thresholds
    const meetsThresholds = 
      rule.support >= minSupport &&
      rule.confidence >= minConfidence &&
      rule.lift >= minLift;
    
    return searchMatch && meetsThresholds;
  });

  // Sort rules
  const sortedRules = [...filteredRules].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return multiplier * (a[sortField] - b[sortField]);
  });

  // Toggle sort
  const handleSort = (field: 'lift' | 'confidence' | 'support') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle column visibility toggle
  const handleColumnToggle = (columnName: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Association Rules</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.antecedent}
                  onCheckedChange={() => handleColumnToggle('antecedent')}
                >
                  Antecedent (If)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.consequent}
                  onCheckedChange={() => handleColumnToggle('consequent')}
                >
                  Consequent (Then)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.support}
                  onCheckedChange={() => handleColumnToggle('support')}
                >
                  Support
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.confidence}
                  onCheckedChange={() => handleColumnToggle('confidence')}
                >
                  Confidence
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.lift}
                  onCheckedChange={() => handleColumnToggle('lift')}
                >
                  Lift
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <CardDescription>
          Discovered association rules using the Apriori algorithm
        </CardDescription>
        <div className="mt-2 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products in rules..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 bg-muted/50 p-4 rounded-md">
            <div>
              <label className="text-sm font-medium block mb-1">Min Support</label>
              <div className="flex items-center gap-2">
                <Input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={minSupport}
                  onChange={(e) => setMinSupport(parseFloat(e.target.value))}
                />
                <span className="w-12 text-sm">{minSupport.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Min Confidence</label>
              <div className="flex items-center gap-2">
                <Input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={minConfidence}
                  onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
                />
                <span className="w-12 text-sm">{minConfidence.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Min Lift</label>
              <div className="flex items-center gap-2">
                <Input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={minLift}
                  onChange={(e) => setMinLift(parseFloat(e.target.value))}
                />
                <span className="w-12 text-sm">{minLift.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="data-grid rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {visibleColumns.antecedent && <th className="text-left">If (Antecedent)</th>}
                {visibleColumns.consequent && <th className="text-left">Then (Consequent)</th>}
                {visibleColumns.support && (
                  <th className="cursor-pointer" onClick={() => handleSort('support')}>
                    <div className="flex items-center gap-1">
                      Support
                      {sortField === 'support' ? (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-50" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.confidence && (
                  <th className="cursor-pointer" onClick={() => handleSort('confidence')}>
                    <div className="flex items-center gap-1">
                      Confidence
                      {sortField === 'confidence' ? (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-50" />
                      )}
                    </div>
                  </th>
                )}
                {visibleColumns.lift && (
                  <th className="cursor-pointer" onClick={() => handleSort('lift')}>
                    <div className="flex items-center gap-1">
                      Lift
                      {sortField === 'lift' ? (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-50" />
                      )}
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {sortedRules.length > 0 ? (
                sortedRules.map((rule, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    {visibleColumns.antecedent && (
                      <td className="max-w-[200px] truncate">
                        {rule.antecedent.join(", ")}
                      </td>
                    )}
                    {visibleColumns.consequent && (
                      <td className="max-w-[200px] truncate">
                        {rule.consequent.join(", ")}
                      </td>
                    )}
                    {visibleColumns.support && (
                      <td>{(rule.support * 100).toFixed(2)}%</td>
                    )}
                    {visibleColumns.confidence && (
                      <td>{(rule.confidence * 100).toFixed(2)}%</td>
                    )}
                    {visibleColumns.lift && (
                      <td>{rule.lift.toFixed(2)}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    No matching association rules found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssociationRulesTable;
