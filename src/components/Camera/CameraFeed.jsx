import { Video } from 'lucide-react'

export default function CameraFeed({ className }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-900 to-black ${className}`}>
      {/* Use the actual video file */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-full object-cover"
        src="/BigBuckBunny_320x180.mp4"
      />
    </div>
  )
}
