"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ARjs } from 'ar.js'

export default function ARViewer() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sceneRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    sceneRef.current.appendChild(renderer.domElement)

    const arToolkitSource = new ARjs.Source({ sourceType: 'webcam' })
    const arToolkitContext = new ARjs.Context({
      cameraParametersUrl: 'data/camera_para.dat',
      detectionMode: 'mono',
    })

    const markerControls = new ARjs.MarkerControls(arToolkitContext, camera, {
      type: 'pattern',
      patternUrl: 'data/patt.hiro',
      changeMatrixMode: 'cameraTransformMatrix'
    })

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshNormalMaterial()
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const animate = () => {
      requestAnimationFrame(animate)

      if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={sceneRef} className="w-full h-screen"></div>
  )
}