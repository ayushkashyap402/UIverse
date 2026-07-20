// CameraCapture.jsx

// Props:
// width (string) - Camera width
// height (string | number) - Camera height
// facingMode (string) - "user" | "environment"
// disabled (boolean) - Disable camera
// countdown (number) - Countdown before capture
// showFaceGuide (boolean) - Show capture guide
// allowCameraSwitch (boolean) - Enable front/back camera switch
// allowDownload (boolean) - Show download button
// onCapture (function) - Returns captured image
// onError (function) - Camera error callback

import React, { useEffect, useRef, useState } from 'react'
import './CameraCapture.css'

function CameraCapture({
  width = '100%',
  height = 420,
  facingMode = 'user',
  disabled = false,
  countdown = 0,
  showFaceGuide = true,
  allowCameraSwitch = true,
  allowDownload = true,
  onCapture,
  onError,
}) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const [cameraReady, setCameraReady] = useState(false)
  const [loading, setLoading] = useState(false)

  const [capturedImage, setCapturedImage] = useState(null)

  const [cameraMode, setCameraMode] = useState(facingMode)

  const [permission, setPermission] = useState('idle')

  const [error, setError] = useState('')

  const [count, setCount] = useState(null)

  useEffect(() => {
    return () => stopCamera()
  }, [])

  useEffect(() => {
    if (permission === 'granted') {
      startCamera()
    }
  }, [cameraMode])

  const stopCamera = () => {
    if (!streamRef.current) return

    streamRef.current.getTracks().forEach((track) => track.stop())

    streamRef.current = null

    setCameraReady(false)
  }

  const startCamera = async () => {
    if (disabled) return

    try {
      setLoading(true)

      setError('')

      stopCamera()

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraMode,
        },
        audio: false,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        await videoRef.current.play()
      }

      setPermission('granted')

      setCameraReady(true)
    } catch (err) {
      setPermission('denied')

      setError('Unable to access camera.')

      onError?.(err)
    } finally {
      setLoading(false)
    }
  }
  const takeSnapshot = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    canvas.width = video.videoWidth

    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const image = canvas.toDataURL('image/png')

    setCapturedImage(image)

    stopCamera()

    onCapture?.(image)
  }

  const capture = () => {
    if (countdown <= 0) {
      takeSnapshot()
      return
    }

    let value = countdown

    setCount(value)

    const timer = setInterval(() => {
      value--

      if (value <= 0) {
        clearInterval(timer)

        setCount(null)

        takeSnapshot()
      } else {
        setCount(value)
      }
    }, 1000)
  }

  const retake = () => {
    setCapturedImage(null)

    startCamera()
  }

  const remove = () => {
    setCapturedImage(null)
  }

  const download = () => {
    if (!capturedImage) return

    const link = document.createElement('a')

    link.href = capturedImage

    link.download = 'capture.png'

    link.click()
  }

  const switchCamera = () => {
    setCameraMode((prev) => (prev === 'user' ? 'environment' : 'user'))
  }
  return (
    <div className="camera-capture">
      <canvas ref={canvasRef} hidden />

      <div className="camera-toolbar">
        <h3>Camera Capture</h3>

        {allowCameraSwitch && !capturedImage && permission === 'granted' && (
          <button className="camera-switch" onClick={switchCamera}>
            {cameraMode === 'user' ? 'Rear Camera' : 'Front Camera'}
          </button>
        )}
      </div>

      {!capturedImage ? (
        <div
          className="camera-preview"
          style={{
            width,
            height,
          }}
        >
          <video ref={videoRef} autoPlay muted playsInline />

          {!cameraReady && (
            <div className="camera-overlay">
              <div className="camera-icon">📷</div>

              <h2>Camera Access Required</h2>

              <p>Allow access to use your webcam.</p>

              <button className="camera-btn primary" disabled={loading} onClick={startCamera}>
                {loading ? 'Opening...' : 'Allow Camera'}
              </button>
            </div>
          )}

          {showFaceGuide && permission === 'granted' && (
            <div className="camera-guide">
              <div className="camera-face"></div>
            </div>
          )}

          {count && <div className="camera-count">{count}</div>}
        </div>
      ) : (
        <div className="camera-result">
          <img src={capturedImage} alt="Captured" />
        </div>
      )}

      <div className="camera-actions">
        {!capturedImage && permission === 'granted' && (
          <button className="camera-btn capture" onClick={capture}>
            📸 Capture
          </button>
        )}

        {capturedImage && (
          <>
            <button className="camera-btn" onClick={retake}>
              🔄 Retake
            </button>

            <button className="camera-btn danger" onClick={remove}>
              ❌ Remove
            </button>

            {allowDownload && (
              <button className="camera-btn success" onClick={download}>
                ⬇ Download
              </button>
            )}
          </>
        )}
      </div>

      {error && <div className="camera-error">{error}</div>}
    </div>
  )
}

export default CameraCapture
