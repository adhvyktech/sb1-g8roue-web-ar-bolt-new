"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OutputUpload() {
  const [outputType, setOutputType] = useState<string>('image')
  const [outputFile, setOutputFile] = useState<File | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState<string>('')

  const handleOutputUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setOutputFile(event.target.files[0])
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Upload Output File</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="outputType">Output Type</Label>
          <Select onValueChange={(value) => setOutputType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select output type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="youtube">YouTube URL</SelectItem>
              <SelectItem value="3d">3D Model</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {outputType === 'youtube' ? (
          <div>
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input
              id="youtubeUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <Label htmlFor="outputUpload">Output File</Label>
            <Input
              id="outputUpload"
              type="file"
              accept={outputType === 'image' ? 'image/*' : outputType === 'video' ? 'video/*' : '.glb,.gltf'}
              onChange={handleOutputUpload}
            />
          </div>
        )}
        {outputFile && (
          <div>
            <p>Selected file: {outputFile.name}</p>
            {outputType === 'image' && (
              <img src={URL.createObjectURL(outputFile)} alt="Output preview" className="mt-2 max-w-full h-auto" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}