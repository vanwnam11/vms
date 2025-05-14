"use client"
import { Activity, Bell, Camera, Clock, HardDrive, Server, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Mock system stats
const systemStats = {
  cameras: {
    total: 24,
    online: 22,
    offline: 2,
  },
  storage: {
    total: 8000, // GB
    used: 5200, // GB
    available: 2800, // GB
  },
  alerts: {
    total: 18,
    new: 3,
    acknowledged: 7,
    resolved: 8,
  },
  users: {
    total: 12,
    active: 3,
  },
}

// Mock recent alerts
const recentAlerts = [
  {
    id: 1,
    cameraId: "A02-Test",
    type: "Motion Detected",
    timestamp: "2025-05-13 08:15:22",
    status: "new",
  },
  {
    id: 3,
    cameraId: "A06-Datacenter",
    type: "Unauthorized Access",
    timestamp: "2025-05-13 06:45:33",
    status: "new",
  },
  {
    id: 2,
    cameraId: "A04-OFCS-Parking",
    type: "Camera Offline",
    timestamp: "2025-05-13 07:30:10",
    status: "acknowledged",
  },
  {
    id: 5,
    cameraId: "A03-Test",
    type: "Storage Warning",
    timestamp: "2025-05-12 22:05:18",
    status: "acknowledged",
  },
]

// Mock camera status
const cameraStatus = [
  { id: "A02-Test", status: "online", lastActivity: "2025-05-13 08:15:22" },
  { id: "A03-Test", status: "online", lastActivity: "2025-05-13 08:14:15" },
  { id: "A04-OFCS-Parking", status: "offline", lastActivity: "2025-05-13 07:30:10" },
  { id: "A05-TA", status: "online", lastActivity: "2025-05-13 08:13:45" },
  { id: "A06-Datacenter", status: "online", lastActivity: "2025-05-13 08:12:33" },
  { id: "A09-Datacenter", status: "online", lastActivity: "2025-05-13 08:11:22" },
  { id: "A10-OFCS", status: "offline", lastActivity: "2025-05-13 06:20:18" },
]

export function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cameras</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.cameras.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {systemStats.cameras.online} online, {systemStats.cameras.offline} offline
            </div>
            <div className="mt-2">
              <Progress value={(systemStats.cameras.online / systemStats.cameras.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((systemStats.storage.used / systemStats.storage.total) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {systemStats.storage.used} GB used of {systemStats.storage.total} GB
            </div>
            <div className="mt-2">
              <Progress value={(systemStats.storage.used / systemStats.storage.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.alerts.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {systemStats.alerts.new} new, {systemStats.alerts.acknowledged} acknowledged
            </div>
            <div className="mt-2">
              <Progress
                value={((systemStats.alerts.new + systemStats.alerts.acknowledged) / systemStats.alerts.total) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.users.total}</div>
            <div className="text-xs text-muted-foreground mt-1">{systemStats.users.active} currently active</div>
            <div className="mt-2">
              <Progress value={(systemStats.users.active / systemStats.users.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Camera Status</CardTitle>
            <CardDescription>Overview of all camera systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-3 p-3 text-sm font-medium border-b">
                <div>Camera ID</div>
                <div>Status</div>
                <div>Last Activity</div>
              </div>
              <div className="divide-y">
                {cameraStatus.map((camera) => (
                  <div key={camera.id} className="grid grid-cols-3 p-3 text-sm">
                    <div>{camera.id}</div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          camera.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {camera.status}
                      </span>
                    </div>
                    <div className="text-muted-foreground">{camera.lastActivity}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Link href="/live-view">
                <Button variant="outline">View All Cameras</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div className={`mt-0.5 rounded-full p-1 ${alert.status === "new" ? "bg-red-100" : "bg-amber-100"}`}>
                    <Bell className={`h-3 w-3 ${alert.status === "new" ? "text-red-600" : "text-amber-600"}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">{alert.cameraId}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Link href="/alerts">
                <Button variant="outline">View All Alerts</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Server and network status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>CPU Usage</span>
                  </div>
                  <span>32%</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Memory Usage</span>
                  </div>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>System Uptime</span>
                  </div>
                  <span>15d 7h 23m</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common system operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/live-view">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Live View
                </Button>
              </Link>
              <Link href="/recordings">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Recordings
                </Button>
              </Link>
              <Link href="/alerts">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
