import { useState, useMemo } from "react";
import { FilterBar } from "@/components/FilterBar";
import { KanbanColumn } from "@/components/KanbanColumn";
import { ThemeSidebar } from "@/components/ThemeSidebar";
import { EmailDigestModal } from "@/components/EmailDigestModal";
import { Theme, Article } from "@/types";
import { themes } from "../../scripts/prompts.js";
import { useNewsData } from "@/hooks/useNewsData";
import { isoNDaysAgo } from "@/helper/nDaysAgo.js";

const defaultThemes: Theme[] = themes.map((theme, index) => ({
  id: index.toString(),
  name: theme,
  visible: true
}));

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState("This Week");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emailDigestOpen, setEmailDigestOpen] = useState(false);
  const [themes, setThemes] = useState<Theme[]>(defaultThemes);

  const { allArticles, loading, error } = useNewsData();
  console.log("allArticles: ", allArticles);

  // Filter articles by theme
  const filteredArticles = useMemo(() => {
    let filteredArticles = allArticles.filter((article) => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    if (selectedTheme) {
      filteredArticles = filteredArticles.filter((article) => article.theme === selectedTheme);
    }

    return filteredArticles;
  }, [searchTerm, allArticles, selectedTheme]);

  // filter articles by date range
  const filteredArticlesByDateRange = useMemo(() => {
    if (selectedDateRange.toLowerCase().includes("this week")) {
      return filteredArticles.filter((article) => article.uploadedDate >= isoNDaysAgo(8));
    } else if (selectedDateRange.toLowerCase().includes("this month")) {
      return filteredArticles.filter((article) => article.uploadedDate >= isoNDaysAgo(30));
    } else {
      return filteredArticles;
    }
  }, [selectedDateRange, filteredArticles]);


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

  const handleThemeVisibilityChange = (updatedThemes: Theme[]) => {
    setThemes(updatedThemes);
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
          themes={themes}
          onThemeVisibilityChange={handleThemeVisibilityChange}
        />

        {/* Kanban Board */}
        <div className="flex-1 p-6">
          <div className="kanban-board">
            {themes
              .filter(theme => theme.visible)
              .map(theme => {
                // Find the articles for this theme from filteredArticles array
                const articlesForTheme = filteredArticles.filter((article) => article.theme === theme.name);
                return (
                  <KanbanColumn
                    key={theme.id}
                    title={theme.name}
                    articles={articlesForTheme}
                    count={articlesForTheme.length}
                  />
                );
              })}
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
