'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/lib/ThemeContext';

export function SettingsComponent() {
  const [cmsName, setCmsName] = useState('Mon CMS');
  const [rssUrl, setRssUrl] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Charger les paramètres sauvegardés
    const savedCmsName = localStorage.getItem('cmsName');
    const savedRssUrl = localStorage.getItem('rssUrl');
    if (savedCmsName) setCmsName(savedCmsName);
    if (savedRssUrl) setRssUrl(savedRssUrl);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('cmsName', cmsName);
    localStorage.setItem('rssUrl', rssUrl);
    // Ici, vous pouvez ajouter une logique supplémentaire pour sauvegarder les paramètres
    alert('Paramètres sauvegardés');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h2>
      
      <div className="space-y-2">
        <Label htmlFor="cmsName" className="text-sm font-medium text-gray-700 dark:text-gray-200">Nom du CMS</Label>
        <Input
          id="cmsName"
          type="text"
          value={cmsName}
          onChange={(e) => setCmsName(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rssUrl" className="text-sm font-medium text-gray-700 dark:text-gray-200">URL du flux RSS</Label>
        <Input
          id="rssUrl"
          type="url"
          value={rssUrl}
          onChange={(e) => setRssUrl(e.target.value)}
          className="w-full"
          placeholder="https://example.com/rss"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="theme-mode" className="text-sm font-medium text-gray-700 dark:text-gray-200">Mode sombre</Label>
        <Switch
          id="theme-mode"
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
        />
      </div>

      <Button type="button" className="w-full" onClick={handleSaveSettings}>Sauvegarder les paramètres</Button>
    </div>
  );
}