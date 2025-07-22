import { useState } from "react";
import { Search, Filter, Mail, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onThemeFilter: (theme: string | null) => void;
  onDateFilter: (range: string) => void;
  onEmailDigestClick: () => void;
}

const themes = [
  "All Themes",
  "Robotics & Automation", 
  "Healthcare Customer Experience",
  "Others"
];

const dateRanges = [
  "All Time",
  "Today",
  "This Week", 
  "This Month"
];

export const FilterBar = ({ 
  onSearchChange, 
  onThemeFilter, 
  onDateFilter,
  onEmailDigestClick 
}: FilterBarProps) => {
  const [selectedTheme, setSelectedTheme] = useState("All Themes");
  const [selectedDateRange, setSelectedDateRange] = useState("This Week");

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    onThemeFilter(theme === "All Themes" ? null : theme);
  };

  const handleDateChange = (range: string) => {
    setSelectedDateRange(range);
    onDateFilter(range);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Filter Row */}
        <div className="flex items-center gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search articles, sources, tags..."
              className="pl-10"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Theme Filter */}
          <Select value={selectedTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <Select value={selectedDateRange} onValueChange={handleDateChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onEmailDigestClick}
              className="gap-2"
            >
              <Mail size={16} />
              Email Digest
            </Button>
            
            <Button variant="outline" size="icon">
              <Settings size={16} />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {selectedTheme !== "All Themes" && (
            <Badge variant="secondary" className="gap-1">
              {selectedTheme}
              <button
                onClick={() => handleThemeChange("All Themes")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedDateRange !== "All Time" && (
            <Badge variant="secondary" className="gap-1">
              {selectedDateRange}
              <button
                onClick={() => handleDateChange("All Time")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};