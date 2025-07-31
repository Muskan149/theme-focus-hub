import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Theme {
  id: string;
  name: string;
  visible: boolean;
  count: number;
}

interface ThemeSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  themes: Theme[];
  onThemeVisibilityChange: (themes: Theme[]) => void;
}

const defaultThemes: Theme[] = [
  { id: "1", name: "Robotics & Automation", visible: true, count: 12 },
  { id: "2", name: "Healthcare Customer Experience", visible: true, count: 8 },
  { id: "3", name: "Others", visible: true, count: 5 },
];

export const ThemeSidebar = ({ isCollapsed, onToggleCollapse, themes, onThemeVisibilityChange }: ThemeSidebarProps) => {
  const [newThemeName, setNewThemeName] = useState("");
  const [isAddingTheme, setIsAddingTheme] = useState(false);

  const toggleThemeVisibility = (id: string) => {
    const updatedThemes = themes.map(theme => 
      theme.id === id ? { ...theme, visible: !theme.visible } : theme
    );
    onThemeVisibilityChange(updatedThemes);
  };

  const addNewTheme = () => {
    if (newThemeName.trim()) {
      const newTheme: Theme = {
        id: Date.now().toString(),
        name: newThemeName.trim(),
        visible: true,
        count: 0
      };
      const updatedThemes = [...themes, newTheme];
      onThemeVisibilityChange(updatedThemes);
      setNewThemeName("");
      setIsAddingTheme(false);
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-14 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <ChevronRight size={20} />
        </Button>
        
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center text-xs font-bold ${
              theme.visible 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {theme.name.charAt(0)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-gray-800">Themes</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
        >
          <ChevronLeft size={20} />
        </Button>
      </div>

      {/* Theme List */}
      <div className="space-y-3 mb-6">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Switch
                  checked={theme.visible}
                  onCheckedChange={() => toggleThemeVisibility(theme.id)}
                />
                <div>
                  <p className="font-medium text-sm text-gray-900">{theme.name}</p>
                  <p className="text-xs text-gray-500">{theme.count} articles</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Theme */}
      <div className="border-t border-gray-200 pt-4">
        {isAddingTheme ? (
          <div className="space-y-2">
            <Input
              placeholder="Theme name..."
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addNewTheme();
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={addNewTheme}
                disabled={!newThemeName.trim()}
              >
                Add
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setIsAddingTheme(false);
                  setNewThemeName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setIsAddingTheme(true)}
          >
            <Plus size={16} />
            Add Theme
          </Button>
        )}
      </div>

      {/* Future Features
      <div className="mt-8 space-y-3">
        <div className="p-3 bg-white rounded-lg border border-gray-200 opacity-60">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Trend Detection</span>
          </div>
          <span className="text-xs text-gray-500">Coming Soon</span>
        </div>
        
        <div className="p-3 bg-white rounded-lg border border-gray-200 opacity-60">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Sentiment Analysis</span>
          </div>
          <span className="text-xs text-gray-500">Coming Soon</span>
        </div>
        
        <div className="p-3 bg-white rounded-lg border border-gray-200 opacity-60">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Slack Integration</span>
          </div>
          <span className="text-xs text-gray-500">Coming Soon</span>
        </div>
      </div> */}
    </div>
  );
};