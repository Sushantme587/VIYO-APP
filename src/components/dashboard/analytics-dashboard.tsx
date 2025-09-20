
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Users, AlertTriangle, Siren, Clock, Shield, TrafficCone, Trees } from "lucide-react"

const chartData = [
  { month: "January", tourists: 186, alerts: 80 },
  { month: "February", tourists: 305, alerts: 200 },
  { month: "March", tourists: 237, alerts: 120 },
  { month: "April", tourists: 73, alerts: 190 },
  { month: "May", tourists: 209, alerts: 130 },
  { month: "June", tourists: 214, alerts: 140 },
]

const pieChartData = [
    { name: 'Geo-fence Breach', value: 400, fill: 'var(--color-breach)' },
    { name: 'AI Anomaly', value: 300, fill: 'var(--color-anomaly)' },
    { name: 'Panic Button', value: 150, fill: 'var(--color-panic)' },
    { name: 'Prolonged Inactivity', value: 200, fill: 'var(--color-inactivity)' },
]

// Mock data for tourist distribution
const touristDistributionData = {
    restricted: 5,
    highTraffic: 42,
    scenic: 28,
};

const chartConfig = {
  tourists: {
    label: "Tourists",
    color: "hsl(var(--chart-1))",
  },
  alerts: {
    label: "Alerts",
    color: "hsl(var(--chart-2))",
  },
  breach: { label: 'Geo-fence', color: 'hsl(var(--chart-2))' },
  anomaly: { label: 'AI Anomaly', color: 'hsl(var(--chart-3))' },
  panic: { label: 'Panic Button', color: 'hsl(var(--chart-5))' },
  inactivity: { label: 'Inactivity', color: 'hsl(var(--chart-4))' },
}

export default function AnalyticsDashboard() {
  return (
    <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tourists (YTD)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">15,231</div>
                <p className="text-xs text-muted-foreground">+20.1% from last year</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Alerts (YTD)</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,257</div>
                <p className="text-xs text-muted-foreground">+180.1% from last year</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Incidents</CardTitle>
                <Siren className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">152</div>
                <p className="text-xs text-muted-foreground">+32% from last month</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">8m 32s</div>
                <p className="text-xs text-muted-foreground">-12% from last month</p>
            </CardContent>
            </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Tourist Footfall vs. Alerts</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="tourists" fill="var(--color-tourists)" radius={4} />
                        <Bar dataKey="alerts" fill="var(--color-alerts)" radius={4} />
                    </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Alert Type Distribution</CardTitle>
                    <CardDescription>Breakdown of all incidents by category.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie data={pieChartData} dataKey="value" nameKey="name" />
                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
         <Card>
            <CardHeader>
                <CardTitle>Tourist Distribution by Zone</CardTitle>
                <CardDescription>Live count of tourists in each designated zone type.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
                <Card className="bg-destructive/10 border-destructive/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-destructive">Restricted Zones</CardTitle>
                        <Shield className="h-5 w-5 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-destructive">{touristDistributionData.restricted}</div>
                        <p className="text-xs text-destructive/80">tourists currently inside</p>
                    </CardContent>
                </Card>
                <Card className="bg-accent/10 border-accent/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-accent-foreground/80">High-Traffic Zones</CardTitle>
                        <TrafficCone className="h-5 w-5 text-accent-foreground/80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{touristDistributionData.highTraffic}</div>
                        <p className="text-xs text-muted-foreground">tourists currently inside</p>
                    </CardContent>
                </Card>
                <Card className="bg-green-500/10 border-green-500/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-600">Scenic Zones</CardTitle>
                        <Trees className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-700">{touristDistributionData.scenic}</div>
                        <p className="text-xs text-green-600/80">tourists currently inside</p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    </div>
  )
}
