export interface HardwareModule {
  id: string;
  type: 'mcu' | 'sensor' | 'actuator' | 'display';
  name: string;
  color: string;
  description: string;
}
