import { useStore, HARDWARE_CATALOG } from '../store/useStore';

export const LeftPanel = () => {
  const { selectedModuleIds, toggleModule } = useStore();

  return (
    <div className="h-full w-full flex flex-col bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Search Header - Xcode style */}
      <div className="p-5 border-b border-white/5">
        <h2 className="text-white text-xl font-semibold mb-4 tracking-wide">Hardware Library</h2>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full bg-black/40 text-white rounded-lg px-4 py-3 outline-none border border-white/10 focus:border-white/30 relative placeholder-gray-500 transition-all font-light"
          />
          <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* Catalog List */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(HARDWARE_CATALOG).map(([id, module]) => {
            const isSelected = selectedModuleIds.includes(id);
            return (
              <div 
                key={id}
                onClick={() => toggleModule(id)}
                className={`relative group cursor-pointer transition-all duration-500 select-none ${isSelected ? "scale-[0.98]" : "hover:scale-[1.02]"}`}
              >
                {isSelected && (
                  <div className="absolute -inset-[2px] rounded-2xl transition-all duration-700 bg-gradient-to-r from-[#8a2be2] via-[#00f0ff] to-[#8a2be2] blur-sm opacity-50" />
                )}
                <div className={`relative h-full p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-500
                  ${isSelected ? "bg-black/80 border-white/20 shadow-inner" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}
                `}>
                  <div className="text-3xl mb-3 mt-2">{module.icon || "🧩"}</div>
                  <h3 className="text-white font-medium text-sm mb-1">{module.name}</h3>
                  <p className="text-gray-400 text-[11px] leading-tight">{module.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

