import { LayoutGrid, Map, MapPin, Target, Settings, User } from 'lucide-react'

const navItems = [
  { icon: LayoutGrid, active: true }, // Dashboard icon
  { icon: Map, active: false },
  { icon: MapPin, active: false },
  { icon: Target, active: false }, // Using Target for the calibrate icon
  { icon: Settings, active: false }, // Settings is usually at bottom, but shown higher in design
]

export default function Sidebar() {
  return (
    <div className="w-20 h-full bg-[#0B0E14] border-r border-white/5 flex flex-col items-center py-6 z-20 pointer-events-auto">
      {/* Brand Logo - Matches "ERIC" text */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-2xl font-black tracking-tighter text-white leading-none">ERIC</h1>
        <span className="text-[0.5rem] tracking-widest text-gray-500 uppercase">Robotics</span>
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-8 w-full items-center">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              className={`
                p-3 rounded-xl transition-all duration-200 group relative
                ${item.active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
              `}
            >
              <Icon strokeWidth={1.5} className="w-6 h-6" />
              
              {/* Active Indicator Dot */}
              {item.active && (
                <div className="absolute -right-[18px] top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* User Profile at Bottom */}
      <div className="mt-auto pb-4">
        <button className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:border-gray-500 transition-colors">
          <User className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}