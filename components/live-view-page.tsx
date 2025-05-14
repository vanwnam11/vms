"use client"

import { useState } from "react"
import {
  Maximize,
  Minimize,
  Grid2X2,
  Grid3X3,
  Grid,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Mock camera data
const cameras = [
  { id: "A02-Test", name: "A02-Test", location: "Entrance" },
  { id: "A03-Test", name: "A03-Test", location: "Parking" },
  { id: "A04-OFCS-Parking", name: "A04-OFCS-Parking", location: "Parking" },
  { id: "A05-TA", name: "A05-TA", location: "Office" },
  { id: "A06-Datacenter", name: "A06-Datacenter", location: "Datacenter" },
  { id: "A09-Datacenter", name: "A09-Datacenter", location: "Datacenter" },
  { id: "A10-OFCS", name: "A10-OFCS", location: "Office" },
  { id: "A11-Cafeteria", name: "A11-Cafeteria", location: "Cafeteria" },
  { id: "A12-OFCS", name: "A12-OFCS", location: "Office" },
  { id: "A13-OFCS", name: "A13-OFCS", location: "Office" },
  { id: "A14-OFCS", name: "A14-OFCS", location: "Office" },
  { id: "A15-OFCS", name: "A15-OFCS", location: "Office" },
  { id: "A17-OFCS", name: "A17-OFCS", location: "Office" },
  { id: "A18-OFCS", name: "A18-OFCS", location: "Office" },
  { id: "A19-OFCS", name: "A19-OFCS", location: "Office" },
  { id: "A20-OFCS", name: "A20-OFCS", location: "Office" },
  { id: "A21-OFCS", name: "A21-OFCS", location: "Office" },
  { id: "A22-OFCS", name: "A22-OFCS", location: "Office" },
  { id: "A23-OFCS", name: "A23-OFCS", location: "Office" },
  { id: "A24-OFCS", name: "A24-OFCS", location: "Office" },
]

// Camera groups
const cameraGroups = [
  { id: "all", name: "All Cameras" },
  { id: "parking", name: "Parking" },
  { id: "office", name: "Office" },
  { id: "datacenter", name: "Datacenter" },
  { id: "entrance", name: "Entrance" },
  { id: "cafeteria", name: "Cafeteria" },
]

export function LiveViewPage() {
  const [layout, setLayout] = useState<"2x2" | "3x3" | "4x4">("3x3")
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState("all")

  // Filter cameras based on selected group
  const filteredCameras =
    selectedGroup === "all"
      ? cameras
      : cameras.filter((camera) => camera.location.toLowerCase() === selectedGroup.toLowerCase())

  const handleCameraClick = (cameraId: string) => {
    setSelectedCamera(cameraId)
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  // Calculate grid columns based on layout
  const gridCols = layout === "2x2" ? "grid-cols-2" : layout === "3x3" ? "grid-cols-3" : "grid-cols-4"

  return (
    <div className="h-[calc(100vh-5rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Live View</h1>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              {cameraGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setLayout("2x2")}>
                  <Grid2X2 className={cn("h-4 w-4", layout === "2x2" ? "text-primary" : "")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>2x2 Grid</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setLayout("3x3")}>
                  <Grid3X3 className={cn("h-4 w-4", layout === "3x3" ? "text-primary" : "")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>3x3 Grid</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setLayout("4x4")}>
                  <Grid className={cn("h-4 w-4", layout === "4x4" ? "text-primary" : "")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>4x4 Grid</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex h-[calc(100%-2rem)]">
        {/* Camera list sidebar */}
        <div className="w-64 border-r pr-4 overflow-y-auto hidden md:block">
          <div className="mb-4">
            <h3 className="font-medium mb-2">Camera List</h3>
            <ul className="space-y-1">
              {cameras.map((camera) => (
                <li
                  key={camera.id}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-accent",
                    selectedCamera === camera.id ? "bg-accent" : "",
                  )}
                  onClick={() => handleCameraClick(camera.id)}
                >
                  {camera.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {fullscreen && selectedCamera ? (
            <div className="relative h-full">
              <div className="absolute top-2 right-2 z-10">
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  <Minimize className="h-4 w-4" />
                </Button>
              </div>
              <CameraView camera={cameras.find((c) => c.id === selectedCamera)!} fullscreen={true} />
            </div>
          ) : (
            <div className={cn("grid gap-2", gridCols, "h-full overflow-auto")}>
              {filteredCameras.slice(0, layout === "2x2" ? 4 : layout === "3x3" ? 9 : 16).map((camera) => (
                <div key={camera.id} className="relative" onClick={() => handleCameraClick(camera.id)}>
                  <CameraView
                    camera={camera}
                    isSelected={selectedCamera === camera.id}
                    onFullscreen={toggleFullscreen}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PTZ Controls - Only show when a camera is selected */}
        {selectedCamera && (
          <div className="w-64 border-l pl-4 overflow-y-auto hidden lg:block">
            <h3 className="font-medium mb-2">PTZ Controls</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <Button variant="outline" size="icon">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <div></div>
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div></div>
                <Button variant="outline" size="icon">
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <div></div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Zoom</h4>
                <div className="flex justify-between">
                  <Button variant="outline" size="icon">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Presets</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Preset 1
                  </Button>
                  <Button variant="outline" size="sm">
                    Preset 2
                  </Button>
                  <Button variant="outline" size="sm">
                    Preset 3
                  </Button>
                  <Button variant="outline" size="sm">
                    Preset 4
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile PTZ Controls Sheet */}
      {selectedCamera && (
        <div className="fixed bottom-4 right-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button>PTZ Controls</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>PTZ Controls</SheetTitle>
                <SheetDescription>Control camera {cameras.find((c) => c.id === selectedCamera)?.name}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  <div></div>
                  <Button variant="outline" size="icon">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <div></div>
                  <Button variant="outline" size="icon">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <div></div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Zoom</h4>
                  <div className="flex justify-between">
                    <Button variant="outline" size="icon">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Preset 1
                    </Button>
                    <Button variant="outline" size="sm">
                      Preset 2
                    </Button>
                    <Button variant="outline" size="sm">
                      Preset 3
                    </Button>
                    <Button variant="outline" size="sm">
                      Preset 4
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  )
}

interface CameraViewProps {
  camera: { id: string; name: string; location: string }
  isSelected?: boolean
  fullscreen?: boolean
  onFullscreen?: () => void
}

function CameraView({ camera, isSelected, fullscreen, onFullscreen }: CameraViewProps) {
  // In a real application, this would be a video stream
  // For this demo, we'll use a placeholder
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border bg-muted",
        isSelected ? "ring-2 ring-primary" : "",
        fullscreen ? "h-full" : "aspect-video",
      )}
    >
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-2 text-white z-10">
        <p className="text-xs font-medium">{camera.name}</p>
      </div>

      {!fullscreen && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 bg-black/20 border-0 hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation()
              onFullscreen?.()
            }}
          >
            <Maximize className="h-3 w-3 text-white" />
          </Button>
        </div>
      )}

      <div className="h-full flex items-center justify-center">
        <img
          src={`/placeholder.svg?height=180&width=320&text=${camera.name}`}
          alt={camera.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
