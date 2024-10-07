"use client"

import { useState, useEffect, useRef } from 'react'
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import * as THREE from 'three'

export default function PreviewSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState<number[]>([1])
  const [rotationX, setRotationX] = useState<number[]>([0])
  const [rotationY, setRotationY] = useState<number[]>([0])
  const [rotationZ, setRotationZ] = useState<number[]>([0])
  const [tilt, setTilt] = useState<number[]>([0])

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.width / canvasRef.current.height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current })

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      
      cube.scale.set(scale[0], scale[0], scale[0])
      cube.rotation.x = THREE.MathUtils.degToRad(rotationX[0])
      cube.rotation.y = THREE.MathUtils.degToRad(rotationY[0])
      cube.rotation.z = THREE.MathUtils.degToRad(rotationZ[0])
      cube.position.y = Math.sin(THREE.MathUtils.degToRad(tilt[0])) * 2

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      renderer.dispose()
    }
  }, [scale, rotationX, rotationY, rotationZ, tilt])

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Preview</h2>
      <canvas ref={canvasRef} className="w-full h-64 bg-gray-100 mb-4"></canvas>
      <div className="space-y-4">
        <div>
          <Label htmlFor="scale">Scale</Label>
          <Slider id="scale" min={0.1} max={2} step={0.1} value={scale} onValueChange={setScale} />
        </div>
        <div>
          <Label htmlFor="rotationX">Rotation X</Label>
          <Slider id="rotationX" min={0} max={360} step={1} value={rotationX} onValueChange={setRotationX} />
        </div>
        <div>
          <Label htmlFor="rotationY">Rotation Y</Label>
          <Slider id="rotationY" min={0} max={360} step={1} value={rotationY} onValueChange={setRotationY} />
        </div>
        <div>
          <Label htmlFor="rotationZ">Rotation Z</Label>
          <Slider id="rotationZ" min={0} max={360} step={1} value={rotationZ} onValueChange={setRotationZ} />
        </div>
        <div>
          <Label htmlFor="tilt">Tilt</Label>
          <Slider id="tilt" min={-90} max={90} step={1} value={tilt} onValueChange={setTilt} />
        </div>
      </div>
    </div>
  )
}