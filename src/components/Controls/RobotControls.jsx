import { useState, useEffect } from 'react'
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Circle,
  Pause,
  RotateCw,
  Zap
} from 'lucide-react'
import { useAppStore } from '../../store/useStore'

export default function RobotControls() {
  const { robotMode, setRobotMode } = useAppStore()
  const [eStopActive, setEStopActive] = useState(false)
  const [pressedKey, setPressedKey] = useState(null)

  const handleDirectionPress = (direction) => {
    setPressedKey(direction)
    console.log(`Moving: ${direction}`)
  }

  const handleDirectionRelease = () => {
    setPressedKey(null)
  }

  const handleEmergencyStop = () => {
    setEStopActive(!eStopActive)
    console.log('Emergency Stop:', !eStopActive)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (robotMode === 'AUTO' || eStopActive) return
      
      switch(e.key) {
        case 'ArrowUp':
          handleDirectionPress('forward')
          break
        case 'ArrowDown':
          handleDirectionPress('backward')
          break
        case 'ArrowLeft':
          handleDirectionPress('left')
          break
        case 'ArrowRight':
          handleDirectionPress('right')
          break
      }
    }

    const handleKeyUp = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        handleDirectionRelease()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [robotMode, eStopActive])

  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-6 pointer-events-auto z-50">
      {/* Emergency Stop - Circular Design */}
      <div className="relative w-32 h-32 mx-auto">
        <button
          onClick={handleEmergencyStop}
          className={`
            w-full h-full rounded-full font-bold text-white
            flex flex-col items-center justify-center gap-1
            transition-all duration-150
            border-4
            ${eStopActive
              ? 'bg-red-600 border-red-800 shadow-inner'
              : 'bg-gradient-to-br from-yellow-400 to-red-500 border-yellow-300 shadow-xl hover:scale-105 active:scale-95'
            }
          `}
        >
          <Circle className="w-12 h-12 fill-white" />
          <span className="text-xs font-black tracking-wide">EMERGENCY</span>
          <span className="text-[10px] font-bold">STOP</span>
        </button>
      </div>

      {/* D-Pad Controls - Circular Design */}
      <div className="relative w-40 h-40 mx-auto">
        {/* Center circle background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 shadow-xl" />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600" />
        
        {/* Up Arrow */}
        <button
          onMouseDown={() => handleDirectionPress('forward')}
          onMouseUp={handleDirectionRelease}
          onMouseLeave={handleDirectionRelease}
          disabled={robotMode === 'AUTO' || eStopActive}
          className={`
            absolute top-2 left-1/2 -translate-x-1/2
            w-10 h-14 rounded-t-full
            flex items-start justify-center pt-2
            transition-all
            disabled:opacity-30
            ${pressedKey === 'forward' 
              ? 'bg-blue-500 shadow-lg' 
              : 'bg-gray-700/50 hover:bg-gray-600 active:bg-blue-500'
            }
          `}
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
        
        {/* Down Arrow */}
        <button
          onMouseDown={() => handleDirectionPress('backward')}
          onMouseUp={handleDirectionRelease}
          onMouseLeave={handleDirectionRelease}
          disabled={robotMode === 'AUTO' || eStopActive}
          className={`
            absolute bottom-2 left-1/2 -translate-x-1/2
            w-10 h-14 rounded-b-full
            flex items-end justify-center pb-2
            transition-all
            disabled:opacity-30
            ${pressedKey === 'backward' 
              ? 'bg-blue-500 shadow-lg' 
              : 'bg-gray-700/50 hover:bg-gray-600 active:bg-blue-500'
            }
          `}
        >
          <ArrowDown className="w-5 h-5 text-white" />
        </button>
        
        {/* Left Arrow */}
        <button
          onMouseDown={() => handleDirectionPress('left')}
          onMouseUp={handleDirectionRelease}
          onMouseLeave={handleDirectionRelease}
          disabled={robotMode === 'AUTO' || eStopActive}
          className={`
            absolute left-2 top-1/2 -translate-y-1/2
            w-14 h-10 rounded-l-full
            flex items-center justify-start pl-2
            transition-all
            disabled:opacity-30
            ${pressedKey === 'left' 
              ? 'bg-blue-500 shadow-lg' 
              : 'bg-gray-700/50 hover:bg-gray-600 active:bg-blue-500'
            }
          `}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        {/* Right Arrow */}
        <button
          onMouseDown={() => handleDirectionPress('right')}
          onMouseUp={handleDirectionRelease}
          onMouseLeave={handleDirectionRelease}
          disabled={robotMode === 'AUTO' || eStopActive}
          className={`
            absolute right-2 top-1/2 -translate-y-1/2
            w-14 h-10 rounded-r-full
            flex items-center justify-end pr-2
            transition-all
            disabled:opacity-30
            ${pressedKey === 'right' 
              ? 'bg-blue-500 shadow-lg' 
              : 'bg-gray-700/50 hover:bg-gray-600 active:bg-blue-500'
            }
          `}
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {robotMode === 'AUTO' && !eStopActive && (
        <button 
          onClick={() => setRobotMode('MANUAL')}
          className="bg-blue-500/20 backdrop-blur-md border border-blue-500 rounded-lg p-2 w-full hover:bg-blue-500/30 transition-colors cursor-pointer"
        >
          <p className="text-xs text-blue-400 text-center font-semibold">
            Auto Mode Active (Click to Take Control)
          </p>
        </button>
      )}

      {eStopActive && (
        <div className="bg-red-500/20 backdrop-blur-md border border-red-500 rounded-lg p-2 animate-pulse">
          <p className="text-xs text-red-400 text-center font-semibold">
            System Halted
          </p>
        </div>
      )}
    </div>
  )
}
