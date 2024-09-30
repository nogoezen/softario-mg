'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/lib/ThemeContext';

export function SettingsComponent() {
  const [cmsName, setCmsName] = useState('Mon CMS');
  const { theme, toggleTheme } = useTheme();

  const handleCmsNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCmsName(e.target.value);
    // Ici, vous pouvez ajouter la logique pour sauvegarder le nom du CMS
    // Par exemple, en l'envoyant à une API ou en le stockant dans localStorage
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Paramètres</h2>
      
      <div>
        <Label htmlFor="cmsName">Nom du CMS</Label>
        <Input
          id="cmsName"
          type="text"
          value={cmsName}
          onChange={handleCmsNameChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="theme-mode"
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
        />
        <Label htmlFor="theme-mode">Mode sombre</Label>
      </div>

      <Button type="button">Sauvegarder les paramètres</Button>
    </div>
  );
}