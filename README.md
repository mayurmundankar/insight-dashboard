# FS Insight Dashboard

A responsive, interactive robot monitoring dashboard built with React, Three.js, and Tailwind CSS. This project implements a professional UI/UX design featuring real-time camera feeds, 3D point cloud visualization, and intuitive robot controls.


## 🚀 Features

- **Real-time Camera Feed** - Video playback with clean, minimal overlay
- **3D Point Cloud Map** - Interactive 3D visualization using Three.js and @react-three/fiber
- **View Swapping** - Smooth animated transitions between camera and map views (Picture-in-Picture)
- **Circular Robot Controls** - Intuitive circular D-Pad and emergency stop button
- **Keyboard Controls** - Control the robot using Arrow keys (Up, Down, Left, Right) in Manual mode
- **Auto/Manual Modes** - Toggle between autonomous and manual control modes with clean white/black styling
- **Status Monitoring** - Battery level, signal strength, failsafe, and system status with pill-shaped indicators
- **Mission Status** - "On Mission 1234" indicator and Quick Goal button
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern Dark Theme** - Clean, professional UI with glassmorphism effects
- **Self-hosted** - Runs entirely locally without external dependencies

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4 (with @theme directive)
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fs-insight-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Sample assets included**
   
   The project includes sample assets in the `public/` folder:
   - `office1.pcd` - Point cloud data file for 3D visualization
   - `motion-detection-outside-entry-1280x720.mp4` - Demo video file for the camera feed
   
   *You can replace these with your own files to customize the experience.*

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
fs-insight-dashboard/
├── public/                 # Static assets
│   ├── office1.pcd         # Point cloud file for 3D map
│   └── motion-detection-outside-entry-1280x720.mp4  # Demo video for camera feed
├── src/
│   ├── components/
│   │   ├── Camera/
│   │   │   └── CameraFeed.jsx      # Camera view component
│   │   ├── Map/
│   │   │   └── MapView.jsx         # 3D point cloud viewer
│   │   ├── Layout/
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── TopBar.jsx          # Status bar & mode selector
│   │   └── Controls/
│   │       └── RobotControls.jsx   # Circular D-Pad & emergency stop
│   ├── store/
│   │   └── useStore.js             # Zustand state management
│   ├── App.jsx                      # Main application layout
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles with Tailwind v4
├── vite.config.js                  # Vite configuration
└── package.json
```

## 🎮 Usage

### View Swapping
- Click on the Picture-in-Picture (PiP) window in the bottom-left corner to swap between camera and map views
- The main view and PiP view will smoothly animate and exchange positions
- Hover over the PiP window to see the expand icon

### Control Modes
- **AUTO Mode**: Robot operates autonomously (controls disabled)
- **MANUAL Mode**: Enable manual control using the circular D-Pad
- Toggle modes using the white/black styled MODE selector in the top-right

### Robot Controls
- **Circular D-Pad**: Control robot movement (up, down, left, right) with intuitive circular design
- **Keyboard Controls**: Use Arrow keys on your keyboard to move the robot (only in MANUAL mode)
- **Emergency Stop**: Large circular button with gradient styling - click to halt all operations
- Controls are disabled in AUTO mode and when E-Stop is active

### Status Monitoring
- **Mission Status**: "On Mission 1234" indicator in the top-left
- **Battery Level**: Real-time battery percentage with color-coded indicators (green/yellow/red)
- **Signal Strength**: Network connectivity status
- **Failsafe & System**: Status indicators showing operational health

### Quick Actions
- **QUICK GOAL**: Button in the left sidebar for rapid mission setup
- **INITIATE**: Button in the top-right for starting operations

## 🎨 Customization

### Colors (Tailwind CSS v4)
Edit `src/index.css` and modify the `@theme` directive to customize colors:
```css
@theme {
  --color-er-dark: #0B0E14;       /* Background */
  --color-er-panel: rgba(20, 25, 35, 0.8);  /* Panels */
  --color-er-blue: #3B82F6;       /* Active states */
  --color-er-red: #EF4444;        /* Emergency button */
  --color-status-good: #22C55E;   /* Good status */
  --color-status-warn: #EAB308;   /* Warning status */
}
```

Then use them in your components with the `text-er-blue` or `bg-er-dark` pattern.

### 3D Map Settings
Modify camera position, lighting, and grid in `src/components/Map/MapView.jsx`:
```javascript
<Canvas camera={{ position: [0, 8, 15], fov: 50 }}>
```

### Camera Feed
Replace the video file in `public/motion-detection-outside-entry-1280x720.mp4` or update the source in `src/components/Camera/CameraFeed.jsx`:
```javascript
src="/your-video-file.mp4"
```

### Point Cloud Data
Replace `public/office1.pcd` with your own point cloud file, or update the path in `src/components/Map/MapView.jsx`

## 🔌 ROS Integration (Advanced)

To integrate with ROS (Robot Operating System):

1. Install `roslibjs`:
   ```bash
   npm install roslib
   ```

2. Connect to ROS bridge:
   ```javascript
   import ROSLIB from 'roslib';
   
   const ros = new ROSLIB.Ros({
     url: 'ws://localhost:9090'
   });
   ```

3. Subscribe to topics and update components accordingly

## 📱 Responsive Design

The dashboard adapts to different screen sizes:
- **Desktop**: Full sidebar, large PiP window, all controls visible
- **Tablet**: Medium-sized components, optimized layout
- **Mobile**: Compact sidebar (or bottom nav), smaller PiP, touch-optimized controls

## 🐛 Troubleshooting

### Issue: Styles not loading / Plain HTML appearance
- **This project uses Tailwind CSS v4** which requires a different setup than v3
- Ensure you have `@import "tailwindcss";` at the top of `src/index.css`
- No `tailwind.config.js` needed for v4
- Restart the dev server after any CSS changes

### Issue: 3D map not loading
- Ensure `office1.pcd` file is in the `public/` folder
- Check browser console for Three.js errors
- Try a different PCD file format (ASCII or binary)
- Verify the file path in `MapView.jsx` matches your file name

### Issue: Camera feed not showing
- Verify `motion-detection-outside-entry-1280x720.mp4` exists in `public/` folder
- Check video format compatibility (MP4 with H.264 recommended)
- For live streams, integrate WebRTC or HLS player

### Issue: Slow performance
- Reduce point cloud density in the PCD file
- Use lower resolution video (320x180 is already optimized)
- Disable animations by removing `whileHover` props from motion components
- Close other browser tabs running 3D content

### Issue: Port already in use
- Vite will automatically try another port (e.g., 5174)
- Or manually specify: `npm run dev -- --port 3000`

## 📝 Design Approach

This implementation follows a clean, modern design with these key principles:

1. **Layered Overlay System**: Background view + UI HUD overlays for seamless interaction
2. **View Manager**: State-driven view swapping without remounting components (no context loss)
3. **Component Modularity**: Separated concerns for easy maintenance and extensibility
4. **Smooth Animations**: Framer Motion's layout animations for professional transitions
5. **Glassmorphism**: Subtle backdrop blur effects with pill-shaped status indicators
6. **Clean Industrial Theme**: Dark palette with white/black contrast for optimal readability
7. **Circular Controls**: Intuitive circular D-Pad and emergency stop matching reference design
8. **Minimal Clutter**: Removed unnecessary panels and borders for a spacious, breathable layout


## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built as part of the FS Insight Dashboard assignment - demonstrating modern web development practices and UI/UX implementation skills.

## 🙏 Acknowledgments

- UI/UX Design: Original Insight.IO dashboard design
- Three.js Community: 3D visualization resources
- React Team: Excellent documentation and tools

