import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.manuel.app',
  appName: 'Ionic Capacitor',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
  "allowMixedContent": true
  },
  server: {
  "cleartext": true,
  "hostname": "localhost"
  }
};

export default config;

