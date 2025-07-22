import { useState } from "react";
import { X, Mail, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EmailDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themes = [
  "Robotics & Automation",
  "Healthcare Customer Experience", 
  "Others"
];

export const EmailDigestModal = ({ isOpen, onClose }: EmailDigestModalProps) => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [selectedThemes, setSelectedThemes] = useState<string[]>(themes);
  const [digestEnabled, setDigestEnabled] = useState(true);

  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const handleSave = () => {
    // Handle saving preferences
    console.log({
      email,
      frequency,
      selectedThemes,
      digestEnabled
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="text-primary" size={24} />
            Email Digest Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Enable/Disable Digest */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Enable Email Digest</Label>
              <p className="text-sm text-gray-500">Receive curated healthcare VC insights</p>
            </div>
            <Switch
              checked={digestEnabled}
              onCheckedChange={setDigestEnabled}
            />
          </div>

          {digestEnabled && (
            <>
              {/* Frequency */}
              <div className="space-y-3">
                <Label className="text-base">Frequency</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily">Daily Digest</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly">Weekly Digest (Recommended)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Theme Selection */}
              <div className="space-y-3">
                <Label className="text-base">Themes to Include</Label>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <div key={theme} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                      <span className="text-sm">{theme}</span>
                      <Switch
                        checked={selectedThemes.includes(theme)}
                        onCheckedChange={() => toggleTheme(theme)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
              disabled={digestEnabled && (!email || selectedThemes.length === 0)}
            >
              <Check size={16} className="mr-2" />
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};