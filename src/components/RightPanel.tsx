import { useStore } from '../store/useStore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';

const generateCode = (ids: string[]) => {
  if (ids.length === 0) return '// Please select modules in the left panel...';
  
  let includes = [];
  let setups = [];
  let loops = [];
  
  if (ids.includes('esp32')) {
    includes.push('#include <WiFi.h>');
    setups.push('  Serial.begin(115200);\n  WiFi.begin("SSID", "PASSWORD");');
  }
  if (ids.includes('oled')) {
    includes.push('#include <Wire.h>\n#include <Adafruit_GFX.h>\n#include <Adafruit_SSD1306.h>');
    setups.push('  Wire.begin();');
  }
  if (ids.includes('dht11')) {
    includes.push('#include "DHT.h"');
    setups.push('  dht.begin();');
    loops.push('  float t = dht.readTemperature();');
  }
  
  const top = includes.join('\n');
  const setupBody = setups.join('\n');
  const loopBody = loops.join('\n');
  
  return top + '\n\nvoid setup() {\n' + setupBody + '\n}\n\nvoid loop() {\n' + loopBody + '\n  delay(100);\n}';
};

export const RightPanel = () => {
  const { selectedModuleIds } = useStore();
  const code = generateCode(selectedModuleIds);

  return (
    <div className="h-full w-full flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Xcode like Header */}
      <div className="flex items-center px-4 py-3 bg-black/40 border-b border-white/5">
         <div className="flex gap-1.5">
           <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
           <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
           <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
         </div>
         <div className="flex-1 text-center pr-8">
           <span className="text-[12px] font-medium text-gray-400 font-mono">main.cpp</span>
         </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="popLayout">
          <motion.div
            key="code-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full text-sm"
          >
            <SyntaxHighlighter
              language="cpp"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '13px',
                lineHeight: '1.6'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Export Button */}
      <div className="p-6 pt-2 bg-gradient-to-t from-black/60 to-transparent">
        <div className="relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-[24px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <button
             className="relative w-full py-4 rounded-[20px] bg-[#1a1a1a] border border-white/10 text-white font-semibold text-[15px] shadow-2xl flex items-center justify-center gap-2 transition-all group-hover:bg-[#202020]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Compile & Export Project
          </button>
        </div>
      </div>
    </div>
  );
};

