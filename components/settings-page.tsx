"use client"

import { useState } from "react"
import { Camera, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock user data
const users = [
  { id: 1, name: "Super Administrator", email: "admin@example.com", role: "admin", status: "active" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "operator", status: "active" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "viewer", status: "active" },
  { id: 4, name: "Bob Johnson", email: "bob@example.com", role: "operator", status: "inactive" },
  { id: 5, name: "Alice Williams", email: "alice@example.com", role: "viewer", status: "active" },
]

// Mock camera data
const cameras = [
  {
    id: "A02-Test",
    name: "A02-Test",
    location: "Entrance",
    ip: "192.168.1.101",
    model: "Hikvision DS-2CD2385G1",
    status: "online",
  },
  {
    id: "A03-Test",
    name: "A03-Test",
    location: "Parking",
    ip: "192.168.1.102",
    model: "Hikvision DS-2CD2385G1",
    status: "online",
  },
  {
    id: "A04-OFCS-Parking",
    name: "A04-OFCS-Parking",
    location: "Parking",
    ip: "192.168.1.103",
    model: "Hikvision DS-2CD2385G1",
    status: "online",
  },
  {
    id: "A05-TA",
    name: "A05-TA",
    location: "Office",
    ip: "192.168.1.104",
    model: "Hikvision DS-2CD2385G1",
    status: "online",
  },
  {
    id: "A06-Datacenter",
    name: "A06-Datacenter",
    location: "Datacenter",
    ip: "192.168.1.105",
    model: "Hikvision DS-2CD2385G1",
    status: "online",
  },
  {
    id: "A09-Datacenter",
    name: "A09-Datacenter",
    location: "Datacenter",
    ip: "192.168.1.106",
    model: "Hikvision DS-2CD2385G1",
    status: "online",
  },
  {
    id: "A10-OFCS",
    name: "A10-OFCS",
    location: "Office",
    ip: "192.168.1.107",
    model: "Hikvision DS-2CD2385G1",
    status: "offline",
  },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isAddCameraDialogOpen, setIsAddCameraDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="cameras">Cameras</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="Security Camera Management System" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="UTC+7">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                    <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                    <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                    <SelectItem value="UTC+1">UTC+1 (Central European Time)</SelectItem>
                    <SelectItem value="UTC+7">UTC+7 (Indochina Time)</SelectItem>
                    <SelectItem value="UTC+8">UTC+8 (China Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="YYYY-MM-DD">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-format">Time Format</Label>
                <Select defaultValue="24h">
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email alerts for critical events</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-update">Automatic Updates</Label>
                  <p className="text-sm text-muted-foreground">Automatically update system software</p>
                </div>
                <Switch id="auto-update" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cameras" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Camera Management</h2>
            <Dialog open={isAddCameraDialogOpen} onOpenChange={setIsAddCameraDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Camera className="h-4 w-4 mr-2" />
                  Add Camera
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Camera</DialogTitle>
                  <DialogDescription>Enter the details for the new camera</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="camera-id">Camera ID</Label>
                    <Input id="camera-id" placeholder="e.g., A25-OFCS" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="camera-name">Camera Name</Label>
                    <Input id="camera-name" placeholder="e.g., Office Front" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="camera-location">Location</Label>
                    <Input id="camera-location" placeholder="e.g., Office" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="camera-ip">IP Address</Label>
                    <Input id="camera-ip" placeholder="e.g., 192.168.1.108" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="camera-model">Model</Label>
                    <Select>
                      <SelectTrigger id="camera-model">
                        <SelectValue placeholder="Select camera model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hikvision-ds-2cd2385g1">Hikvision DS-2CD2385G1</SelectItem>
                        <SelectItem value="hikvision-ds-2cd2145fwd">Hikvision DS-2CD2145FWD</SelectItem>
                        <SelectItem value="dahua-ipc-hdw5231r-ze">Dahua IPC-HDW5231R-ZE</SelectItem>
                        <SelectItem value="axis-p3245-lve">Axis P3245-LVE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCameraDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddCameraDialogOpen(false)}>Add Camera</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cameras.map((camera) => (
                    <TableRow key={camera.id}>
                      <TableCell className="font-medium">{camera.id}</TableCell>
                      <TableCell>{camera.name}</TableCell>
                      <TableCell>{camera.location}</TableCell>
                      <TableCell>{camera.ip}</TableCell>
                      <TableCell>{camera.model}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            camera.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {camera.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Camera Settings</CardTitle>
              <CardDescription>Configure global camera settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-resolution">Default Resolution</Label>
                <Select defaultValue="1080p">
                  <SelectTrigger id="default-resolution">
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="4k">4K</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-fps">Default Frame Rate</Label>
                <Select defaultValue="25">
                  <SelectTrigger id="default-fps">
                    <SelectValue placeholder="Select frame rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 FPS</SelectItem>
                    <SelectItem value="25">25 FPS</SelectItem>
                    <SelectItem value="30">30 FPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="motion-detection">Motion Detection</Label>
                  <p className="text-sm text-muted-foreground">Enable motion detection by default</p>
                </div>
                <Switch id="motion-detection" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ptz-control">PTZ Control</Label>
                  <p className="text-sm text-muted-foreground">Enable PTZ controls for compatible cameras</p>
                </div>
                <Switch id="ptz-control" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
              <CardDescription>Configure recording and storage settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage-path">Storage Path</Label>
                <Input id="storage-path" defaultValue="/var/lib/vms/recordings" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention-period">Retention Period</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="retention-period">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recording-schedule">Recording Schedule</Label>
                <Select defaultValue="continuous">
                  <SelectTrigger id="recording-schedule">
                    <SelectValue placeholder="Select recording schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="continuous">Continuous</SelectItem>
                    <SelectItem value="motion">Motion Only</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="overwrite">Overwrite Oldest Recordings</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically overwrite oldest recordings when storage is full
                  </p>
                </div>
                <Switch id="overwrite" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="storage-alerts">Storage Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when storage capacity is low</p>
                </div>
                <Switch id="storage-alerts" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Storage Usage</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Main Storage (8TB)</span>
                      <span>65% used</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Backup Storage (4TB)</span>
                      <span>42% used</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">User Management</h2>
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <User className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Enter the details for the new user</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Full Name</Label>
                    <Input id="user-name" placeholder="e.g., John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input id="user-email" type="email" placeholder="e.g., john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input id="user-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role</Label>
                    <Select>
                      <SelectTrigger id="user-role">
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddUserDialogOpen(false)}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "operator"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure user security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                    <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Select session timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="login-attempts">Limit Login Attempts</Label>
                  <p className="text-sm text-muted-foreground">Lock account after 5 failed login attempts</p>
                </div>
                <Switch id="login-attempts" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Settings</CardTitle>
              <CardDescription>Configure network and connectivity settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ip-address">Server IP Address</Label>
                <Input id="ip-address" defaultValue="192.168.1.10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subnet-mask">Subnet Mask</Label>
                <Input id="subnet-mask" defaultValue="255.255.255.0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gateway">Default Gateway</Label>
                <Input id="gateway" defaultValue="192.168.1.1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dns">DNS Servers</Label>
                <Input id="dns" defaultValue="8.8.8.8, 8.8.4.4" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="http-port">HTTP Port</Label>
                <Input id="http-port" defaultValue="80" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rtsp-port">RTSP Port</Label>
                <Input id="rtsp-port" defaultValue="554" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="https">HTTPS</Label>
                  <p className="text-sm text-muted-foreground">Use secure HTTPS connections</p>
                </div>
                <Switch id="https" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="upnp">UPnP</Label>
                  <p className="text-sm text-muted-foreground">Enable Universal Plug and Play</p>
                </div>
                <Switch id="upnp" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remote Access</CardTitle>
              <CardDescription>Configure remote access settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="remote-access">Remote Access</Label>
                  <p className="text-sm text-muted-foreground">Allow remote access to the system</p>
                </div>
                <Switch id="remote-access" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="external-ip">External IP/Domain</Label>
                <Input id="external-ip" defaultValue="vms.example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="external-port">External Port</Label>
                <Input id="external-port" defaultValue="8080" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-filtering">IP Filtering</Label>
                  <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
                </div>
                <Switch id="ip-filtering" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
