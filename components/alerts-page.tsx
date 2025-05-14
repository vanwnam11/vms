"use client"

import { useState } from "react"
import { Bell, Check, Eye, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Mock alert data
const alerts = [
  {
    id: 1,
    cameraId: "A02-Test",
    type: "Motion Detected",
    timestamp: "2025-05-13 08:15:22",
    status: "new",
    description: "Motion detected in entrance area",
  },
  {
    id: 2,
    cameraId: "A04-OFCS-Parking",
    type: "Camera Offline",
    timestamp: "2025-05-13 07:30:10",
    status: "acknowledged",
    description: "Camera went offline unexpectedly",
  },
  {
    id: 3,
    cameraId: "A06-Datacenter",
    type: "Unauthorized Access",
    timestamp: "2025-05-13 06:45:33",
    status: "new",
    description: "Unauthorized access attempt detected",
  },
  {
    id: 4,
    cameraId: "A09-Datacenter",
    type: "Motion Detected",
    timestamp: "2025-05-12 23:12:45",
    status: "resolved",
    description: "Motion detected in server room",
  },
  {
    id: 5,
    cameraId: "A03-Test",
    type: "Storage Warning",
    timestamp: "2025-05-12 22:05:18",
    status: "acknowledged",
    description: "Storage capacity reaching critical level (85%)",
  },
  {
    id: 6,
    cameraId: "A05-TA",
    type: "Motion Detected",
    timestamp: "2025-05-12 21:30:56",
    status: "resolved",
    description: "Motion detected in office area after hours",
  },
  {
    id: 7,
    cameraId: "A02-Test",
    type: "System Update",
    timestamp: "2025-05-12 16:20:33",
    status: "acknowledged",
    description: "System update available: v2.5.3",
  },
]

export function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["new", "acknowledged", "resolved"])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Motion Detected",
    "Camera Offline",
    "Unauthorized Access",
    "Storage Warning",
    "System Update",
  ])
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filter alerts based on search, status, type, and active tab
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.cameraId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus.includes(alert.status)
    const matchesType = selectedTypes.includes(alert.type)
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "new" && alert.status === "new") ||
      (activeTab === "acknowledged" && alert.status === "acknowledged") ||
      (activeTab === "resolved" && alert.status === "resolved")

    return matchesSearch && matchesStatus && matchesType && matchesTab
  })

  // Count alerts by status
  const newCount = alerts.filter((alert) => alert.status === "new").length
  const acknowledgedCount = alerts.filter((alert) => alert.status === "acknowledged").length
  const resolvedCount = alerts.filter((alert) => alert.status === "resolved").length

  const handleStatusToggle = (status: string) => {
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">New</Badge>
      case "acknowledged":
        return <Badge variant="outline">Acknowledged</Badge>
      case "resolved":
        return <Badge variant="secondary">Resolved</Badge>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Motion Detected":
        return <Badge className="bg-blue-500">Motion</Badge>
      case "Camera Offline":
        return <Badge className="bg-red-500">Offline</Badge>
      case "Unauthorized Access":
        return <Badge className="bg-yellow-500">Access</Badge>
      case "Storage Warning":
        return <Badge className="bg-orange-500">Storage</Badge>
      case "System Update":
        return <Badge className="bg-green-500">Update</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes("new")}
                onCheckedChange={() => handleStatusToggle("new")}
              >
                New
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes("acknowledged")}
                onCheckedChange={() => handleStatusToggle("acknowledged")}
              >
                Acknowledged
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatus.includes("resolved")}
                onCheckedChange={() => handleStatusToggle("resolved")}
              >
                Resolved
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Motion Detected")}
                onCheckedChange={() => handleTypeToggle("Motion Detected")}
              >
                Motion Detected
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Camera Offline")}
                onCheckedChange={() => handleTypeToggle("Camera Offline")}
              >
                Camera Offline
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Unauthorized Access")}
                onCheckedChange={() => handleTypeToggle("Unauthorized Access")}
              >
                Unauthorized Access
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Storage Warning")}
                onCheckedChange={() => handleTypeToggle("Storage Warning")}
              >
                Storage Warning
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("System Update")}
                onCheckedChange={() => handleTypeToggle("System Update")}
              >
                System Update
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Alert Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new" className="relative">
                  New
                  {newCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                      {newCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="acknowledged">Ack</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-3 border rounded-md cursor-pointer hover:bg-accent",
                      selectedAlert === alert.id ? "bg-accent" : "",
                      alert.status === "new" ? "border-destructive" : "border-border",
                    )}
                    onClick={() => setSelectedAlert(alert.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{alert.cameraId}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getTypeBadge(alert.type)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Alert Details</DialogTitle>
                            <DialogDescription>View and manage alert information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Camera</p>
                                <p>{alert.cameraId}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Type</p>
                                <p>{alert.type}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <p>{alert.status}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                                <p>{alert.timestamp}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Description</p>
                              <p>{alert.description}</p>
                            </div>
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                              <img
                                src={`/placeholder.svg?height=180&width=320&text=Alert ${alert.id} Snapshot`}
                                alt={`Alert ${alert.id} Snapshot`}
                                className="max-h-full max-w-full"
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">
                                <Check className="h-4 w-4 mr-2" />
                                Acknowledge
                              </Button>
                              <Button>
                                <Check className="h-4 w-4 mr-2" />
                                Resolve
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                    <p className="text-sm mt-1 line-clamp-2">{alert.description}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">No alerts found</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Alert Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAlert ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{alerts.find((a) => a.id === selectedAlert)?.type}</h3>
                    <p className="text-muted-foreground">
                      {alerts.find((a) => a.id === selectedAlert)?.cameraId} -
                      {alerts.find((a) => a.id === selectedAlert)?.timestamp}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {getStatusBadge(alerts.find((a) => a.id === selectedAlert)?.status || "")}
                      {getTypeBadge(alerts.find((a) => a.id === selectedAlert)?.type || "")}
                    </div>
                    <p className="mt-4">{alerts.find((a) => a.id === selectedAlert)?.description}</p>

                    <div className="mt-6 space-y-2">
                      <h4 className="font-medium">Actions</h4>
                      <div className="flex space-x-2">
                        <Button variant="outline">
                          <Check className="h-4 w-4 mr-2" />
                          Acknowledge
                        </Button>
                        <Button>
                          <Check className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <img
                        src={`/placeholder.svg?height=270&width=480&text=Alert ${selectedAlert} Snapshot`}
                        alt={`Alert ${selectedAlert} Snapshot`}
                        className="max-h-full max-w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full">
                        View Live Feed
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Recording
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Alert History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">Alert created</span>
                        <span className="text-muted-foreground"> - System</span>
                      </div>
                      <span className="text-muted-foreground">
                        {alerts.find((a) => a.id === selectedAlert)?.timestamp}
                      </span>
                    </div>
                    {alerts.find((a) => a.id === selectedAlert)?.status === "acknowledged" && (
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium">Alert acknowledged</span>
                          <span className="text-muted-foreground"> - Admin</span>
                        </div>
                        <span className="text-muted-foreground">
                          {/* Mock timestamp 5 minutes after creation */}
                          {alerts
                            .find((a) => a.id === selectedAlert)
                            ?.timestamp.replace(
                              /(\d+):(\d+):(\d+)/,
                              (_, h, m, s) => `${h}:${(Number.parseInt(m) + 5) % 60}:${s}`,
                            )}
                        </span>
                      </div>
                    )}
                    {alerts.find((a) => a.id === selectedAlert)?.status === "resolved" && (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Alert acknowledged</span>
                            <span className="text-muted-foreground"> - Admin</span>
                          </div>
                          <span className="text-muted-foreground">
                            {/* Mock timestamp 5 minutes after creation */}
                            {alerts
                              .find((a) => a.id === selectedAlert)
                              ?.timestamp.replace(
                                /(\d+):(\d+):(\d+)/,
                                (_, h, m, s) => `${h}:${(Number.parseInt(m) + 5) % 60}:${s}`,
                              )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium">Alert resolved</span>
                            <span className="text-muted-foreground"> - Admin</span>
                          </div>
                          <span className="text-muted-foreground">
                            {/* Mock timestamp 15 minutes after creation */}
                            {alerts
                              .find((a) => a.id === selectedAlert)
                              ?.timestamp.replace(
                                /(\d+):(\d+):(\d+)/,
                                (_, h, m, s) => `${h}:${(Number.parseInt(m) + 15) % 60}:${s}`,
                              )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Alert Selected</h3>
                <p className="text-muted-foreground">Select an alert from the list to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
