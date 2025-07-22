import { useState, useMemo } from "react";
import { FilterBar } from "@/components/FilterBar";
import { KanbanColumn } from "@/components/KanbanColumn";
import { ThemeSidebar } from "@/components/ThemeSidebar";
import { EmailDigestModal } from "@/components/EmailDigestModal";
import { sampleArticles, type Article } from "@/data/sampleData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState("This Week");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emailDigestOpen, setEmailDigestOpen] = useState(false);

  // Filter articles based on search and filters
  const filteredArticles = useMemo(() => {
    return sampleArticles.filter(article => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTheme = !selectedTheme || article.theme === selectedTheme;

      return matchesSearch && matchesTheme;
    });
  }, [searchTerm, selectedTheme]);

  // Group filtered articles by theme
  const articlesByTheme = useMemo(() => {
    const themes = {
      "Robotics & Automation": filteredArticles.filter(article => article.theme === "Robotics & Automation"),
      "Healthcare Customer Experience": filteredArticles.filter(article => article.theme === "Healthcare Customer Experience"),
      "Others": filteredArticles.filter(article => article.theme === "Others")
    };
    return themes;
  }, [filteredArticles]);

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleThemeFilter = (theme: string | null) => {
    setSelectedTheme(theme);
  };

  const handleDateFilter = (range: string) => {
    setSelectedDateRange(range);
  };

  const handleEmailDigestClick = () => {
    setEmailDigestOpen(true);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Weekly Theme Tracker</h1>
              <p className="text-sm text-gray-600">Healthcare VC Intelligence Platform</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary-light px-3 py-1 rounded-full">
                <span className="text-primary font-medium text-sm">
                  {filteredArticles.length} Articles This Week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        onSearchChange={handleSearchChange}
        onThemeFilter={handleThemeFilter}
        onDateFilter={handleDateFilter}
        onEmailDigestClick={handleEmailDigestClick}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <ThemeSidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />

        {/* Kanban Board */}
        <div className="flex-1 p-6">
          <div className="kanban-board">
            <KanbanColumn
              title="Robotics & Automation"
              articles={articlesByTheme["Robotics & Automation"]}
              count={articlesByTheme["Robotics & Automation"].length}
            />
            <KanbanColumn
              title="Healthcare Customer Experience"
              articles={articlesByTheme["Healthcare Customer Experience"]}
              count={articlesByTheme["Healthcare Customer Experience"].length}
            />
            <KanbanColumn
              title="Others"
              articles={articlesByTheme["Others"]}
              count={articlesByTheme["Others"].length}
            />
          </div>
        </div>
      </div>

      {/* Email Digest Modal */}
      <EmailDigestModal
        isOpen={emailDigestOpen}
        onClose={() => setEmailDigestOpen(false)}
      />
    </div>
  );
};

export default Index;
