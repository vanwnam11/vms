"use client"

import { useState } from "react"
import { CalendarIcon, Play, Pause, SkipBack, SkipForward, Download, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock camera data
const cameras = [
  { id: "A02-Test", name: "A02-Test", location: "Entrance" },
  { id: "A03-Test", name: "A03-Test", location: "Parking" },
  { id: "A04-OFCS-Parking", name: "A04-OFCS-Parking", location: "Parking" },
  { id: "A05-TA", name: "A05-TA", location: "Office" },
  { id: "A06-Datacenter", name: "A06-Datacenter", location: "Datacenter" },
  { id: "A09-Datacenter", name: "A09-Datacenter", location: "Datacenter" },
]

// Mock recording data
const recordings = [
  {
    id: 1,
    cameraId: "A02-Test",
    date: "2025-05-13",
    startTime: "08:00:00",
    endTime: "09:00:00",
    duration: "01:00:00",
    size: "120 MB",
  },
  {
    id: 2,
    cameraId: "A02-Test",
    date: "2025-05-13",
    startTime: "09:00:00",
    endTime: "10:00:00",
    duration: "01:00:00",
    size: "118 MB",
  },
  {
    id: 3,
    cameraId: "A03-Test",
    date: "2025-05-13",
    startTime: "08:00:00",
    endTime: "09:00:00",
    duration: "01:00:00",
    size: "122 MB",
  },
  {
    id: 4,
    cameraId: "A04-OFCS-Parking",
    date: "2025-05-13",
    startTime: "08:00:00",
    endTime: "09:00:00",
    duration: "01:00:00",
    size: "119 MB",
  },
  {
    id: 5,
    cameraId: "A05-TA",
    date: "2025-05-13",
    startTime: "08:00:00",
    endTime: "09:00:00",
    duration: "01:00:00",
    size: "121 MB",
  },
  {
    id: 6,
    cameraId: "A06-Datacenter",
    date: "2025-05-13",
    startTime: "08:00:00",
    endTime: "09:00:00",
    duration: "01:00:00",
    size: "117 MB",
  },
  {
    id: 7,
    cameraId: "A09-Datacenter",
    date: "2025-05-13",
    startTime: "08:00:00",
    endTime: "09:00:00",
    duration: "01:00:00",
    size: "123 MB",
  },
]

export function RecordingsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedCamera, setSelectedCamera] = useState<string>("all")
  const [selectedRecording, setSelectedRecording] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter recordings based on selected camera and date
  const filteredRecordings = recordings.filter((recording) => {
    const matchesCamera = selectedCamera === "all" || recording.cameraId === selectedCamera
    const matchesDate = date ? recording.date === format(date, "yyyy-MM-dd") : true
    const matchesSearch = recording.cameraId.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCamera && matchesDate && matchesSearch
  })

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recordings</h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Select value={selectedCamera} onValueChange={setSelectedCamera}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select camera" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cameras</SelectItem>
              {cameras.map((camera) => (
                <SelectItem key={camera.id} value={camera.id}>
                  {camera.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recording list */}
        <div className="md:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recordings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted px-4 py-2 font-medium text-sm">Recordings</div>
            <div className="divide-y max-h-[500px] overflow-y-auto">
              {filteredRecordings.length > 0 ? (
                filteredRecordings.map((recording) => (
                  <div
                    key={recording.id}
                    className={cn(
                      "px-4 py-3 cursor-pointer hover:bg-accent",
                      selectedRecording === recording.id ? "bg-accent" : "",
                    )}
                    onClick={() => setSelectedRecording(recording.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{recording.cameraId}</p>
                        <p className="text-sm text-muted-foreground">
                          {recording.date} {recording.startTime} - {recording.endTime}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">{recording.duration}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-muted-foreground">No recordings found</div>
              )}
            </div>
          </div>
        </div>

        {/* Video player */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-black relative">
                {selectedRecording ? (
                  <div className="h-full flex items-center justify-center">
                    <img
                      src={`/placeholder.svg?height=360&width=640&text=Recording ${selectedRecording}`}
                      alt={`Recording ${selectedRecording}`}
                      className="max-h-full max-w-full"
                    />
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-white">Select a recording to play</div>
                )}
              </div>

              {selectedRecording && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{recordings.find((r) => r.id === selectedRecording)?.cameraId}</p>
                      <p className="text-sm text-muted-foreground">
                        {recordings.find((r) => r.id === selectedRecording)?.date}{" "}
                        {recordings.find((r) => r.id === selectedRecording)?.startTime} -{" "}
                        {recordings.find((r) => r.id === selectedRecording)?.endTime}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Slider defaultValue={[33]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{recordings.find((r) => r.id === selectedRecording)?.startTime}</span>
                      <span>{recordings.find((r) => r.id === selectedRecording)?.endTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="icon">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button onClick={handlePlayPause}>
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
