import { useAppStore } from '../../store/useStore'
import { Battery, Signal, ShieldCheck, Activity, Pause, ArrowRight } from 'lucide-react'

// Helper for the small status text items
const TelemetryItem = ({ icon: Icon, label, value, color = "text-green-500", showSeparator = true }) => (
  <div className="flex items-center gap-2 text-sm">
    {Icon && <Icon className={`w-4 h-4 ${color}`} />}
    <span className="text-gray-400 font-medium text-xs lg:text-sm">{label}</span>
    <span className={`font-bold text-xs lg:text-sm ${color}`}>
      {value}
    </span>
    {/* Small separator dot (render only when requested) */}
    {showSeparator && <div className="w-1 h-1 rounded-full bg-gray-700 mx-2" />}
  </div>
)

export default function TopBar() {
  const { robotMode, setRobotMode } = useAppStore()

  return (
    <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-20 pointer-events-none">
      
      {/* LEFT ISLAND: Mission Status */}
      <div className="pointer-events-auto flex items-center gap-2">
        <div className="bg-[#0F1218] border border-white/10 rounded-lg px-4 py-3 flex items-center gap-4 shadow-xl">
          <div className="flex flex-col leading-none">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Status</span>
            <span className="text-sm font-bold text-white">On Mission 1234</span>
          </div>
          {/* Pause Button Circle */}
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            <Pause className="w-4 h-4 text-white fill-current" />
          </button>
        </div>
        
        {/* Quick Goal Button (Moved here to match screenshot layout) */}
         <button className="bg-white text-black px-4 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-xl">
            QUICK GOAL
            <ArrowRight className="w-4 h-4" />
          </button>
      </div>

      {/* CENTER ISLAND: Telemetry */}
      <div className="pointer-events-auto bg-[#0F1218] border border-white/10 rounded-lg px-6 py-3 flex items-center gap-3 shadow-xl">
        <TelemetryItem label="100%" value="" icon={Battery} color="text-green-500" showSeparator={true} />
        <TelemetryItem label="" value="Strong" icon={Signal} color="text-yellow-500" showSeparator={true} />
        <TelemetryItem label="Failsafe" value="Okay" color="text-green-500" showSeparator={true} />
        <TelemetryItem label="System" value="Okay" color="text-green-500" showSeparator={false} />
      </div>

      {/* RIGHT ISLAND: Mode & Action */}
      <div className="pointer-events-auto flex gap-3">
        {/* Mode Toggle */}
        <div className="bg-[#0F1218] border border-white/10 rounded-lg p-1 flex shadow-xl">
           <button className="px-4 py-2 rounded-md text-xs font-bold bg-white text-black">
             MODE
           </button>
           <div className="flex">
             <button 
               onClick={() => setRobotMode('AUTO')}
               className={`px-4 py-2 text-xs font-bold transition-colors ${robotMode === 'AUTO' ? 'text-white' : 'text-gray-500'}`}
             >
               AUTO
             </button>
             <button 
               onClick={() => setRobotMode('MANUAL')}
               className={`px-4 py-2 text-xs font-bold transition-colors ${robotMode === 'MANUAL' ? 'text-white' : 'text-gray-500'}`}
             >
               MANUAL
             </button>
           </div>
        </div>

        {/* Initiate Button */}
        <button className="bg-white text-black px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors shadow-xl">
            INITIATE
            <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}