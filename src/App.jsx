import { useAppStore } from './store/useStore'
import { motion } from 'framer-motion'
import MapView from './components/Map/MapView'
import CameraFeed from './components/Camera/CameraFeed'
import Sidebar from './components/Layout/Sidebar'
import TopBar from './components/Layout/TopBar'
import RobotControls from './components/Controls/RobotControls'

function App() {
  const { isMapMain, toggleView } = useAppStore()

  return (
    <div className="h-screen w-screen bg-black text-white flex overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* 1. SIDEBAR (Static Left) */}
      <Sidebar />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 relative bg-[#111]">
        
        {/* TOP BAR (Floating Overlay) */}
        <TopBar />

        {/* BACKGROUND VIEWPORT */}
        <div className="absolute inset-0 z-0">
          {isMapMain ? <MapView className="h-full w-full" /> : <CameraFeed className="h-full w-full" />}
        </div>

        {/* PICTURE-IN-PICTURE (Bottom Left Overlay) */}
        <motion.div 
            layout
            className="absolute bottom-6 left-6 z-30 w-80 h-48 bg-black rounded-xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer group"
            onClick={toggleView}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            {/* Header of PIP */}
            <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-start">
               <span className="text-[10px] font-bold tracking-wider bg-white/10 backdrop-blur px-2 py-1 rounded text-white border border-white/10">
                 {!isMapMain ? "LIVE MAP" : "CAM FEED"}
               </span>
            </div>

            {/* The Content */}
            {!isMapMain ? <MapView className="h-full w-full" /> : <CameraFeed className="h-full w-full" />}
        </motion.div>

        {/* CONTROLS (Bottom Right Overlay) */}
        <RobotControls />
        
      </div>
    </div>
  )
}

export default App