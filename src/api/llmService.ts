export interface HardwareModule {
  id: string;
  type: string;
  name: string;
  color: string;
}

export interface HardwareScheme {
  thought_process: string;
  modules: HardwareModule[];
  code: string;
}

export async function fetchHardwareScheme(prompt: string): Promise<HardwareScheme> {
  console.log("Mock fetching scheme for: ", prompt);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        thought_process: "分析需求...\n检测到“宿舍”、“报警器”关键字，推荐使用主控模块搭配人体红外传感器和蜂鸣器...",
        modules: [
          { id: "m1", type: "sensor", name: "HC-SR501 人体红外", color: "#3b82f6" }, // blue-500
          { id: "m2", type: "actuator", name: "有源蜂鸣器", color: "#ef4444" } // red-500
        ],
        code: `void setup() {
  pinMode(2, INPUT); // 人体红外传感器
  pinMode(3, OUTPUT); // 蜂鸣器
  Serial.begin(9600);
}

void loop() {
  int val = digitalRead(2);
  if (val == HIGH) {
    digitalWrite(3, HIGH);
    Serial.println("Alarm!");
  } else {
    digitalWrite(3, LOW);
  }
  delay(100);
}`
      });
    }, 2000); // 模拟2秒网络延迟
  });
}
