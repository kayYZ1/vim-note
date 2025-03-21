import { useState } from "react";
import { RefreshCw, Cloud } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { db } from "@/lib/db";
import { totalStorageUsed } from "@/lib/utils";

export default function Sync() {
  const [lastSynced, setLastSynced] = useState("2 hours ago");
  const [syncStatus, setSyncStatus] = useState("idle");

  const handleManualSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("success");
      setLastSynced("just now");
    }, 2000);
  };

  const totalNotes = useLiveQuery(() => db.notes.count());
  const totalStorage = useLiveQuery(async () => await totalStorageUsed());

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
          <TabsTrigger value="advanced" disabled>
            Advanced
          </TabsTrigger>
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
                <Switch id="auto-sync" disabled />
              </div>

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
              <CardTitle>Data Usage</CardTitle>
              <CardDescription>
                View your current data and storage usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm font-medium">Total Notes</div>
                    <div className="mt-1 text-2xl font-semibold">
                      {totalNotes}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm font-medium">Storage Used</div>
                    <div className="mt-1 text-2xl font-semibold">
                      {totalStorage} MB
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
