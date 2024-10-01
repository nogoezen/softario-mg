'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/lib/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Rss, Moon, Sun, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export function SettingsComponent() {
  const [cmsName, setCmsName] = useState('Mon CMS');
  const [logoUrl, setLogoUrl] = useState('/default-logo.png');
  const [rssUrl, setRssUrl] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const savedCmsName = localStorage.getItem('cmsName');
    const savedLogoUrl = localStorage.getItem('logoUrl');
    const savedRssUrl = localStorage.getItem('rssUrl');
    if (savedCmsName) setCmsName(savedCmsName);
    if (savedLogoUrl) setLogoUrl(savedLogoUrl);
    if (savedRssUrl) setRssUrl(savedRssUrl);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('cmsName', cmsName);
    localStorage.setItem('logoUrl', logoUrl);
    localStorage.setItem('rssUrl', rssUrl);
    toast.success('Paramètres sauvegardés avec succès');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Pencil size={24} />
          Paramètres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cmsName" className="text-sm font-medium flex items-center gap-2">
            <Pencil size={16} />
            Nom du CMS
          </Label>
          <Input
            id="cmsName"
            type="text"
            value={cmsName}
            onChange={(e) => setCmsName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoUrl" className="text-sm font-medium flex items-center gap-2">
            <Image size={16} />
            URL du logo
          </Label>
          <Input
            id="logoUrl"
            type="url"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rssUrl" className="text-sm font-medium flex items-center gap-2">
            <Rss size={16} />
            URL du flux RSS
          </Label>
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
          <Label htmlFor="theme-mode" className="text-sm font-medium flex items-center gap-2">
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            Mode {theme === 'dark' ? 'sombre' : 'clair'}
          </Label>
          <Switch
            id="theme-mode"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>

        <Button 
          type="button" 
          className="w-full mt-6" 
          onClick={handleSaveSettings}
        >
          <Save size={18} className="mr-2" />
          Sauvegarder les paramètres
        </Button>
      </CardContent>
    </Card>
  );
}