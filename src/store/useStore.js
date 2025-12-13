import { create } from 'zustand'

export const useAppStore = create((set) => ({
  isMapMain: true, // Defaults to Map is big, Camera is small
  toggleView: () => set((state) => ({ isMapMain: !state.isMapMain })),
  robotMode: 'AUTO', // AUTO or MANUAL
  setRobotMode: (mode) => set({ robotMode: mode }),
  batteryLevel: 87, // Battery percentage
  signalStrength: 'good', // good, warn, poor
  isRecording: false,
  toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
}))
