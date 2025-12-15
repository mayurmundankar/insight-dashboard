import { Video } from 'lucide-react'

export default function CameraFeed({ className }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-900 to-black ${className}`}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover"
        src="/motion-detection-outside-entry-1280x720.mp4"
      />
    </div>
  )
}
