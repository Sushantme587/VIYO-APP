import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your application preferences here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings content will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
