import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Cloud, Save } from "lucide-react";

export default function Sync() {
  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("30");
  const [lastSynced, setLastSynced] = useState("2 hours ago");
  const [syncStatus, setSyncStatus] = useState("idle");

  const handleManualSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("success");
      setLastSynced("just now");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sync Settings</h1>
          <p className="mt-1">Configure how your notes sync across devices</p>
        </div>
        <Badge
          variant={syncStatus === "syncing" ? "secondary" : "outline"}
          className="px-3 py-1"
        >
          {syncStatus === "syncing" ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Cloud className="w-4 h-4 mr-2" />
          )}
          {syncStatus === "syncing"
            ? "Syncing..."
            : `Last synced: ${lastSynced}`}
        </Badge>
      </div>

      <Tabs defaultValue="general" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Sync Configuration</CardTitle>
              <CardDescription>
                Manage your synchronization preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auto-sync" className="text-base">
                    Auto Sync
                  </Label>
                  <p className="text-sm">
                    Automatically sync notes across devices
                  </p>
                </div>
                <Switch
                  id="auto-sync"
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
              </div>

              {autoSync && (
                <div className="space-y-3">
                  <Label htmlFor="sync-frequency">
                    Sync Frequency (minutes)
                  </Label>
                  <Select
                    value={syncFrequency}
                    onValueChange={setSyncFrequency}
                  >
                    <SelectTrigger id="sync-frequency" className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="pt-2">
                <Button
                  onClick={handleManualSync}
                  disabled={syncStatus === "syncing"}
                  className="w-full sm:w-auto"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Sync Status</CardTitle>
              <CardDescription>
                View your current sync status and history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm font-medium">Total Notes</div>
                    <div className="mt-1 text-2xl font-semibold">127</div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm font-medium">Storage Used</div>
                    <div className="mt-1 text-2xl font-semibold">24.3 MB</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced sync options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="server-url">Sync Server URL</Label>
                <Input
                  id="server-url"
                  placeholder="https://sync.example.com"
                  defaultValue="https://api.notes-sync.com/v1"
                />
                <p className="text-xs">
                  Only change if you're using a custom sync server
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="offline-mode" className="text-base">
                    Offline Mode
                  </Label>
                  <p className="text-sm">
                    Temporarily disable syncing while preserving settings
                  </p>
                </div>
                <Switch id="offline-mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="background-sync" className="text-base">
                    Background Sync
                  </Label>
                  <p className="text-sm">
                    Continue syncing when the app is closed
                  </p>
                </div>
                <Switch id="background-sync" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
