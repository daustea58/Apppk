/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const INITIAL_LOGS = [
  { id: '1', timestamp: '12:00:01', level: 'INFO', message: 'System initialization started.' },
  { id: '2', timestamp: '12:00:05', level: 'SUCCESS', message: 'Kernel modules loaded successfully.' },
  { id: '3', timestamp: '12:00:10', level: 'INFO', message: 'Establishing secure link to POCO_X3_NFC...' },
  { id: '4', timestamp: '12:00:12', level: 'SUCCESS', message: 'Connection established. Handshake verified.' },
];

export const MOCK_CHART_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  usage: Math.floor(Math.random() * 40) + 20,
}));
