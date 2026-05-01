/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export interface SystemMetric {
  label: string;
  value: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
}
