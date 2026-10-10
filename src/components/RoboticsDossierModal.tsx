import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Layers, 
  Navigation, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Boxes, 
  ExternalLink, 
  Code, 
  Shield, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';

interface RoboticsDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  githubUrl?: string;
}

export const RoboticsDossierModal: React.FC<RoboticsDossierModalProps> = ({
  isOpen,
  onClose,
  githubUrl = 'https://github.com/anandjadhav42004/r2_proto_ros2_sim'
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'implementation' | 'challenges' | 'roadmap'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Dialog Container */}
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-void-2 border border-emerald-500/30 text-off-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(52,211,153,0.15)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-void/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Robotics Engineering Dossier // R2_PROTO
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: PROJECT HERO */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                ROS 2 Jazzy
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan/10 border border-cyan/30 text-cyan">
                Gazebo Sim Harmonic
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300">
                URDF Kinematics
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300">
                RViz2 Visualizer
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 border border-blue-500/30 text-blue-300">
                Ubuntu 24.04 LTS
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                R2_PROTO — ROS 2 Based Mobile Robot Simulation & Navigation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                An ongoing robotics engineering project developing a differential drive Autonomous Mobile Robot (AMR). 
                The system couples a verified URDF kinematics model with Gazebo physics, launching into a custom obstacle arena 
                with calibrated coordinate frame offsets and an end-to-end architecture preparing for 2D LiDAR SLAM and Nav2.
              </p>
            </div>

            {/* Gazebo Simulation Screenshot Showcase */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-950 group">
              <img 
                src="/r2_proto_sim.jpg" 
                alt="R2_PROTO Mobile Robot spawned in Gazebo Arena with TF base_link axes"
                className="w-full h-64 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
              
              {/* Overlay HUD Telemetry */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-void/90 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>SIM STATUS: <strong className="text-emerald-300">Active Physics Run</strong></span>
                </div>
                <div className="flex items-center gap-4">
                  <span>TF Root: <strong className="text-cyan">base_link (RGB)</strong></span>
                  <span>Arena: <strong className="text-white">Custom Gym Arena</strong></span>
                  <span>Pose: <strong className="text-amber-300">(0.0, 0.0, 0.05)</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <Code className="w-4 h-4 text-cyan" />
                  <span>View URDF & Launch Files</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
              <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Development Milestone: Kinematics & Gazebo Spawning Verified</span>
              </span>
            </div>
          </div>

          {/* SECTION TABS */}
          <div className="flex border-b border-white/10 gap-2 sm:gap-4 overflow-x-auto pb-1 text-xs sm:text-sm font-mono">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === 'architecture' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-400 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              01 // System Architecture
            </button>
            <button
              onClick={() => setActiveTab('implementation')}
              className={`px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === 'implementation' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-400 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              02 // Technical Implementation
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === 'challenges' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-400 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              03 // Challenges & Solutions
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2 rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === 'roadmap' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-b-2 border-emerald-400 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              04 // Status & Future Nav2
            </button>
          </div>

          {/* TAB 1: SYSTEM ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-void-3 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-white block mb-1">Architecture Overview:</strong>
                The robotics pipeline decouples mathematical robot modeling (URDF/Xacro) from the real-time physics engine (Gazebo Sim) using the ROS 2 Jazzy inter-process communication graph. The visualization below maps data flow from kinematics definition to planned autonomous navigation.
              </div>

              {/* Visual Pipeline Diagram */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Data Pipeline & Subsystem Status:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  
                  {/* Step 1 */}
                  <div className="p-4 rounded-xl bg-void/90 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-emerald-400 font-bold">01 // MODELING</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        IMPLEMENTED
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">URDF Description</h5>
                      <p className="text-slate-400 text-xs mt-1">
                        Joint definitions, link inertial matrices, collision boxes, and caster wheel constraints.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400/90 pt-2 border-t border-white/5">
                      ✓ base_link & wheels verified
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 rounded-xl bg-void/90 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-emerald-400 font-bold">02 // ORCHESTRATION</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        IMPLEMENTED
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">ROS 2 Jazzy Core</h5>
                      <p className="text-slate-400 text-xs mt-1">
                        `robot_state_publisher` broadcasting `/tf` and `/tf_static` frame trees with Python launch orchestration.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400/90 pt-2 border-t border-white/5">
                      ✓ Launch files & TF tree synced
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-xl bg-void/90 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-emerald-400 font-bold">03 // SIMULATION</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        IMPLEMENTED
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Gazebo Sim Arena</h5>
                      <p className="text-slate-400 text-xs mt-1">
                        Custom obstacle gym world, ODE physics engine, entity spawner with initial (x,y,z,yaw) pose.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400/90 pt-2 border-t border-white/5">
                      ✓ Spawned in custom arena
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 rounded-xl bg-void/90 border border-amber-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-amber-400 font-bold">04 // TELEMETRY</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        IN PROGRESS
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Sensor Integration</h5>
                      <p className="text-slate-400 text-xs mt-1">
                        Configuring 2D LiDAR ray plugin (`/scan`), IMU sensor (`/imu`), and wheel encoder odometry topics.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-amber-400/90 pt-2 border-t border-white/5">
                      ↻ Bridge plugin parameterization
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="p-4 rounded-xl bg-void/90 border border-indigo-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-indigo-400 font-bold">05 // ESTIMATION</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        PLANNED
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Robot Localization (EKF)</h5>
                      <p className="text-slate-400 text-xs mt-1">
                        `robot_localization` package to fuse wheel odometry with IMU angular velocity for drift-free pose.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-400/90 pt-2 border-t border-white/5">
                      ⋯ Next Milestone (Post-Sensors)
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="p-4 rounded-xl bg-void/90 border border-purple-500/30 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-purple-400 font-bold">06 // AUTONOMY</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        PLANNED
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">Nav2 & SLAM</h5>
                      <p className="text-slate-400 text-xs mt-1">
                        `slam_toolbox` 2D occupancy grid mapping, costmaps generation, and Nav2 waypoint navigation.
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-purple-400/90 pt-2 border-t border-white/5">
                      ⋯ Final Architecture Phase
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL IMPLEMENTATION */}
          {activeTab === 'implementation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 1: URDF Kinematics */}
                <div className="p-5 rounded-2xl bg-void-3 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold">
                    <Boxes className="w-4 h-4" />
                    <span>01 // URDF ROBOT MODELING</span>
                  </div>
                  <h4 className="text-white font-bold text-base">Kinematic Tree & Coordinate Frames</h4>
                  <ul className="text-slate-300 text-xs sm:text-sm space-y-2 list-disc list-inside">
                    <li>Defined tree: <code className="text-emerald-300 bg-void px-1.5 py-0.5 rounded font-mono">base_footprint</code> → <code className="text-emerald-300 bg-void px-1.5 py-0.5 rounded font-mono">base_link</code> → drive wheels & caster.</li>
                    <li>Continuous joints for left and right drive wheels with rotational velocity limits.</li>
                    <li>Frictionless spherical caster link providing tripod stability without overconstraining kinematics.</li>
                    <li>Explicit visual and collision bounding boxes to guarantee physics simulation stability in Gazebo.</li>
                  </ul>
                </div>

                {/* Card 2: Gazebo Spawning Setup */}
                <div className="p-5 rounded-2xl bg-void-3 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <Compass className="w-4 h-4" />
                    <span>02 // SIMULATION & POSITIONING</span>
                  </div>
                  <h4 className="text-white font-bold text-base">Gazebo Arena World & Pose Configuration</h4>
                  <ul className="text-slate-300 text-xs sm:text-sm space-y-2 list-disc list-inside">
                    <li>Custom indoor arena world featuring perimeter barrier walls and obstacle corridors.</li>
                    <li>Robot entity spawned dynamically via <code className="text-cyan bg-void px-1.5 py-0.5 rounded font-mono">ros_gz_sim create</code> command node.</li>
                    <li>Calibrated origin pose parameters: <code className="text-amber-300 bg-void px-1.5 py-0.5 rounded font-mono">[x: 0.0, y: 0.0, z: 0.05, yaw: 0.0]</code> preventing ground collision shock.</li>
                    <li>Physics engine: ODE with real-time update rate configured at 1000 Hz for numerical stability.</li>
                  </ul>
                </div>

                {/* Card 3: ROS 2 Jazzy Tooling */}
                <div className="p-5 rounded-2xl bg-void-3 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold">
                    <Cpu className="w-4 h-4" />
                    <span>03 // ROS 2 JAZZY ECOSYSTEM</span>
                  </div>
                  <h4 className="text-white font-bold text-base">State Publishing & Inspection Tools</h4>
                  <ul className="text-slate-300 text-xs sm:text-sm space-y-2 list-disc list-inside">
                    <li><strong className="text-white">robot_state_publisher:</strong> Parses URDF XML and continuously computes joint transforms.</li>
                    <li><strong className="text-white">tf2_tools:</strong> Verified transform graph with <code className="text-slate-300 font-mono">tf2_echo</code> to ensure no disconnected frame roots.</li>
                    <li><strong className="text-white">Python Launch Architecture:</strong> Parameterized launch file handling world loading and URDF expansion concurrently.</li>
                  </ul>
                </div>

                {/* Card 4: RViz2 Visualization */}
                <div className="p-5 rounded-2xl bg-void-3 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
                    <Layers className="w-4 h-4" />
                    <span>04 // VISUALIZATION PIPELINE</span>
                  </div>
                  <h4 className="text-white font-bold text-base">RViz2 Setup & Frame Verification</h4>
                  <ul className="text-slate-300 text-xs sm:text-sm space-y-2 list-disc list-inside">
                    <li>Visualized 3D RobotModel display driven by <code className="text-cyan font-mono">/robot_description</code> topic.</li>
                    <li>Configured TF display to visually inspect axis orientation (X: Red, Y: Green, Z: Blue).</li>
                    <li>Established saved RViz configuration preset for rapid testing during sensor integration cycles.</li>
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CHALLENGES & SOLUTIONS */}
          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-void-3 border border-white/10 text-xs sm:text-sm text-slate-300">
                <strong className="text-white block mb-1">Authentic Engineering Problem Solving:</strong>
                Real-world simulation requires overcoming model physics artifacts, coordinate frame discrepancies, and ROS 2 transport bridging.
              </div>

              <div className="space-y-3">
                {/* Challenge 1 */}
                <div className="p-4 rounded-xl bg-void/90 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Challenge 1: Model Ground Penetration & Spawn Instability</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Issue:</strong> When initially spawned into the Gazebo arena, the robot model would penetrate the ground plane or experience sudden physics impulse spasms due to zero-clearance coordinates and unresolved collision bounding box overlaps.
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                    <strong>Solution Implemented:</strong> Calibrated link origin vertical offsets, decoupled wheel collision cylinder radiuses from chassis boxes, and established an explicit spawn height argument (<code className="font-mono">z: 0.05m</code>) in the ROS 2 launch entity spawner.
                  </p>
                </div>

                {/* Challenge 2 */}
                <div className="p-4 rounded-xl bg-void/90 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Challenge 2: Coordinate Frame (TF) Hierarchy & Kinematic Drift</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Issue:</strong> Initial URDF lacked a distinct <code className="font-mono text-slate-200">base_footprint</code> projection on the 2D ground plane, leading to coordinate transformation ambiguities when preparing for planar SLAM.
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                    <strong>Solution Implemented:</strong> Structured the standard ROS REP 120 kinematic tree: defined an unweighted zero-inertia <code className="font-mono">base_footprint</code> joint at ground level rigidly connected to <code className="font-mono">base_link</code>, allowing seamless 2D planar projection for odometry.
                  </p>
                </div>

                {/* Challenge 3 */}
                <div className="p-4 rounded-xl bg-void/90 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Challenge 3: ROS 2 Jazzy & Gazebo Sim Topic Transport</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-white">Issue:</strong> In ROS 2 Jazzy, Gazebo Harmonic utilizes <code className="font-mono text-slate-200">ros_gz_bridge</code> instead of legacy Gazebo plugins, requiring explicit message serialization configuration for simulation clock and transform publishing.
                  </p>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                    <strong>Solution Implemented:</strong> Configured declarative bridge parameter mappings for <code className="font-mono">/clock@rosgraph_msgs/msg/Clock[gz.msgs.Clock</code> to keep ROS 2 nodes synchronized with Gazebo simulation step time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STATUS & ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              {/* Matrix of Current Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Column 1 */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>VERIFIED & TESTED</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 font-normal">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>URDF mobile robot chassis & differential drive geometry</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>ROS 2 Jazzy launch orchestration & package structure</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Gazebo Sim custom arena world creation</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>Dynamic model spawning with predefined coordinate pose</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>robot_state_publisher TF frame validation</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                    <Clock className="w-4 h-4" />
                    <span>IN ACTIVE DEVELOPMENT</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 font-normal">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400">↻</span>
                      <span>RViz2 display config optimization for sensor telemetry</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400">↻</span>
                      <span>Gazebo diff_drive plugin tuning for cmd_vel actuation</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400">↻</span>
                      <span>2D LiDAR ray plugin sensor calibration</span>
                    </li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold">
                    <Navigation className="w-4 h-4" />
                    <span>FUTURE OBJECTIVES</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 font-normal">
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">⋯</span>
                      <span>Wheel encoder & 9-DOF IMU sensor fusion (robot_localization EKF)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">⋯</span>
                      <span>2D SLAM Occupancy Grid mapping via slam_toolbox</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">⋯</span>
                      <span>Nav2 stack integration: Global & Local Costmaps</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">⋯</span>
                      <span>Autonomous waypoint following & dynamic obstacle avoidance</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Engineering Skills Highlight */}
              <div className="p-5 rounded-2xl bg-void-3 border border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Demonstrated Robotics & Engineering Competencies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'ROS 2 Jazzy',
                    'URDF / Xacro Modeling',
                    'Gazebo Simulation Physics',
                    'Robot Kinematics & Coordinate Frames (TF2)',
                    'RViz2 Visualization',
                    'Linux / Ubuntu Environment',
                    'Python ROS 2 Launch Systems',
                    'Autonomous Mobile Robots (AMR)',
                    'Nav2 Architecture (Planning)',
                    'LiDAR Sensor Integration (Planning)'
                  ].map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-4 bg-void/95 backdrop-blur-md border-t border-white/10">
          <span className="text-xs text-slate-400 font-mono">
            R2_PROTO Simulation Case Study
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoboticsDossierModal;
