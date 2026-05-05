import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { Scene3D } from './components/Scene3D';

function App() {
  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden font-sans text-white relative selection:bg-[#00f0ff] selection:text-white">
      {/* Background Ambient Lights */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#8a2be2] rounded-full filter blur-[150px] opacity-20 pointer-events-none transition-all duration-1000" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#00f0ff] rounded-full filter blur-[150px] opacity-10 pointer-events-none transition-all duration-1000" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Floating Layout panels */}
      <div className="absolute inset-0 z-10 flex w-full h-full pointer-events-none p-8 gap-8">
        {/* Left Col */}
        <div className="w-[340px] lg:w-[400px] h-full pointer-events-auto flex flex-col">
          <LeftPanel />
        </div>

        {/* Center space for 3D view */}
        <div className="flex-1 pointer-events-none"></div>

        {/* Right Col */}
        <div className="w-[340px] lg:w-[400px] h-full pointer-events-auto flex flex-col">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default App;

