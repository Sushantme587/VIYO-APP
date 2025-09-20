"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Officer Profile</CardTitle>
              <CardDescription>
                Manage your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" defaultValue="Inspector John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="officer@example.com" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="officer-id">Officer ID</Label>
                <Input id="officer-id" defaultValue="OID-12345" readOnly />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose how you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="desktop-notifications" className="text-base">Desktop Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive notifications directly on your desktop.
                        </p>
                    </div>
                    <Switch id="desktop-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive email summaries for critical incidents.
                        </p>
                    </div>
                    <Switch id="email-notifications" />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="sound-notifications" className="text-base">Sound Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                            Play a sound for new critical alerts.
                        </p>
                    </div>
                    <Switch id="sound-notifications" defaultChecked />
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="theme" className="text-base">Theme</Label>
                        <p className="text-sm text-muted-foreground">
                            Select between light and dark themes.
                        </p>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Label htmlFor="theme-switch">Light</Label>
                        <Switch
                          id="theme-switch"
                          checked={theme === "dark"}
                          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                        />
                        <Label htmlFor="theme-switch">Dark</Label>
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Map Settings</CardTitle>
              <CardDescription>
                Configure the default map behavior.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                <Label htmlFor="default-zoom">Default Zoom Level</Label>
                <Input id="default-zoom" type="number" defaultValue="12" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="traffic-layer" className="text-base">Show Traffic Layer</Label>
                        <p className="text-sm text-muted-foreground">
                            Overlay real-time traffic information on the map.
                        </p>
                    </div>
                    <Switch id="traffic-layer" />
                </div>
                <Button className="w-full sm:w-auto mt-2">Save Map Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}