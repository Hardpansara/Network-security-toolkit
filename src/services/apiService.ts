
/**
 * API Service for Network Guardian Toolkit
 * Handles all API requests to the backend server
 */

const API_BASE_URL = 'http://localhost:5000';

export interface NetworkDevice {
  ip: string;
  mac: string;
  hostname: string;
  manufacturer: string;
  bssid: string;
  open_ports: { port: number; service: string }[];
  streaming_ports: { port: number; service: string }[];
  netbios: any;
  smb_port: string;
  traceout: string;
  ttl: string;
  os: string;
}

export interface NetworkScanResult {
  current_ip: string;
  network_range: string;
  devices: NetworkDevice[];
}

export interface ScanHistoryItem {
  timestamp: string;
  devices: number;
  ports: number;
}

export interface DeviceHistoryItem {
  ip: string;
  mac: string;
  hostname: string;
  first_seen: string;
  last_seen: string;
}

export interface ScanConfig {
  autoScan: boolean;
  scanInterval: number;
  deepScan: boolean;
  scanPorts: boolean;
  osDetection: boolean;
}

export interface SecurityConfig {
  autoBlock: boolean;
  threatAnalysis: boolean;
  saveHistory: boolean;
  anonymousData: boolean;
}

// Global cache to store the latest scan result
let cachedScanResult: NetworkScanResult | null = null;
let lastScanTimestamp: number = 0;
let scanConfig: ScanConfig = {
  autoScan: true,
  scanInterval: 12,
  deepScan: false,
  scanPorts: true,
  osDetection: true
};
let securityConfig: SecurityConfig = {
  autoBlock: false,
  threatAnalysis: true,
  saveHistory: true,
  anonymousData: false
};

export const apiService = {
  /**
   * Get network scan results from cache if available, otherwise perform a new scan
   */
  async getNetworkScan(forceRefresh = false): Promise<NetworkScanResult> {
    if (cachedScanResult && !forceRefresh) {
      return cachedScanResult;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/hosts`);
      if (!response.ok) {
        throw new Error('Network scan failed');
      }
      const result = await response.json();
      // Update cache
      cachedScanResult = result;
      lastScanTimestamp = Date.now();
      return result;
    } catch (error) {
      console.error('Error fetching network scan:', error);
      // Return cached result if available, empty result otherwise
      return cachedScanResult || { current_ip: '', network_range: '', devices: [] };
    }
  },

  /**
   * Get latest scan statistics
   */
  async getLatestScan(): Promise<ScanHistoryItem> {
    try {
      const response = await fetch(`${API_BASE_URL}/latest-scan`);
      if (!response.ok) {
        throw new Error('Failed to fetch latest scan');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest scan:', error);
      return { timestamp: '', devices: 0, ports: 0 };
    }
  },

  /**
   * Get total devices ever detected
   */
  async getTotalDevices(): Promise<{ total_devices: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/total-devices`);
      if (!response.ok) {
        throw new Error('Failed to fetch total devices');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching total devices:', error);
      return { total_devices: 0 };
    }
  },

  /**
   * Get scan history
   */
  async getScanHistory(): Promise<ScanHistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/scan-history`);
      if (!response.ok) {
        throw new Error('Failed to fetch scan history');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching scan history:', error);
      return [];
    }
  },

  /**
   * Get device history
   */
  async getDeviceHistory(): Promise<DeviceHistoryItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/view_devices`);
      if (!response.ok) {
        throw new Error('Failed to fetch device history');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching device history:', error);
      return [];
    }
  },

  /**
   * Trigger a new scan
   */
  async triggerScan(): Promise<NetworkScanResult> {
    try {
      // The backend's /hosts endpoint performs a scan when called
      const response = await fetch(`${API_BASE_URL}/hosts`);
      if (!response.ok) {
        throw new Error('Failed to trigger scan');
      }
      const result = await response.json();
      // Update cache
      cachedScanResult = result;
      lastScanTimestamp = Date.now();
      return result;
    } catch (error) {
      console.error('Error triggering scan:', error);
      return { current_ip: '', network_range: '', devices: [] };
    }
  },

  /**
   * Clear the cached scan results
   */
  clearScanCache(): void {
    cachedScanResult = null;
    lastScanTimestamp = 0;
  },

  /**
   * Get the timestamp of the last scan
   */
  getLastScanTimestamp(): number {
    return lastScanTimestamp;
  },

  /**
   * Set scan configuration
   */
  setConfig(config: ScanConfig): void {
    scanConfig = { ...scanConfig, ...config };
    console.log('Scan config updated:', scanConfig);
  },

  /**
   * Get scan configuration
   */
  getConfig(): ScanConfig {
    return { ...scanConfig };
  },

  /**
   * Set security configuration
   */
  setSecurityConfig(config: SecurityConfig): void {
    securityConfig = { ...securityConfig, ...config };
    console.log('Security config updated:', securityConfig);
  },

  /**
   * Get security configuration
   */
  getSecurityConfig(): SecurityConfig {
    return { ...securityConfig };
  }
};
