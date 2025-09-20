"use client";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ShieldCheck } from "lucide-react"
import { useAssignedZone } from "@/contexts/assigned-zone-context";
import { zones } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const { setZoneId } = useAssignedZone();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="flex justify-center mb-4">
             <div
              className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-10 md:w-10 md:text-base"
            >
              <ShieldCheck className="h-6 w-6 transition-all group-hover:scale-110" />
              <span className="sr-only">Suraksha Drishti</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Officer Login</CardTitle>
          <CardDescription>
            Enter your credentials and select your assigned zone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="officer@example.com"
                  required
                  defaultValue="officer@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required defaultValue="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assigned-zone">Assigned Zone (Optional)</Label>
                 <Select onValueChange={setZoneId}>
                  <SelectTrigger id="assigned-zone">
                    <SelectValue placeholder="Select a zone to focus on..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Global View)</SelectItem>
                    {zones.map(zone => (
                      <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
