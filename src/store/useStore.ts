import { create } from 'zustand';

export type ModuleType = "mcu" | "sensor" | "actuator" | "display" | "module";

export interface HardwareModule {
  id: string;
  name: string;
  type: ModuleType;
  description: string;
  icon?: string;
  pins: string[];
}

interface AppState {
  selectedModuleIds: string[];
  toggleModule: (id: string) => void;
}

export const HARDWARE_CATALOG: Record<string, HardwareModule> = {
  "esp32": {
    id: "esp32",
    name: "ESP32-WROOM",
    type: "mcu",
    description: "Wi-Fi/BLE",
    icon: "🧠",
    pins: ["3V3", "GND", "D15", "D2", "D4", "RX2", "TX2", "D5", "D18", "D19", "D21", "RX0", "TX0", "D22", "D23"]
  },
  "dht11": {
    id: "dht11",
    name: "DHT11",
    type: "sensor",
    description: "Temp/Humidity",
    icon: "🔍",
    pins: ["VCC", "DATA", "GND"]
  },
  "hc-sr04": {
    id: "hc-sr04",
    name: "HC-SR04",
    type: "sensor",
    description: "Ultrasonic",
    icon: "🔍",
    pins: ["VCC", "TRIG", "ECHO", "GND"]
  },
  "sg90": {
    id: "sg90",
    name: "SG90",
    type: "actuator",
    description: "Micro Servo",
    icon: "⚙️",
    pins: ["PWM", "VCC", "GND"]
  },
  "oled": {
    id: "oled",
    name: "0.96 OLED",
    type: "display",
    description: "I2C Display",
    icon: "📺",
    pins: ["GND", "VCC", "SCL", "SDA"]
  },
  "relay": {
    id: "relay",
    name: "Relay Module",
    type: "module",
    description: "1-Channel",
    icon: "⚡",
    pins: ["VCC", "GND", "IN"]
  }
};

export const useStore = create<AppState>((set) => ({
  selectedModuleIds: [],
  toggleModule: (id) =>
    set((state) => ({
      selectedModuleIds: state.selectedModuleIds.includes(id)
        ? state.selectedModuleIds.filter((m) => m !== id)
        : [...state.selectedModuleIds, id],
    })),
}));

