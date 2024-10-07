"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MarkerUpload() {
  const [markerImage, setMarkerImage] = useState<File | null>(null)

  const handleMarkerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setMarkerImage(event.target.files[0])
    }
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Upload Marker Image</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="markerUpload">Marker Image</Label>
          <Input id="markerUpload" type="file" accept="image/*" onChange={handleMarkerUpload} />
        </div>
        {markerImage && (
          <div>
            <p>Selected file: {markerImage.name}</p>
            <img src={URL.createObjectURL(markerImage)} alt="Marker preview" className="mt-2 max-w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  )
}