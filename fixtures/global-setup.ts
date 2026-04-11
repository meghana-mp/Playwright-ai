import { FullConfig, chromium, request } from '@playwright/test';
import { spawn } from 'child_process';
import * as net from 'net';

async function globalSetup(config: FullConfig) {
  console.log('Starting WireMock...');
  const wiremockProcess = spawn('java', [
    '-jar',
    'lib/wiremock-standalone-3.13.2.jar',
    '--port',
    '9090',
    '--root-dir',
    '.'
  ], {
    detached: true,
    stdio: 'ignore'
  });

  wiremockProcess.unref();

  // Save the PID to a file to kill it later
  require('fs').writeFileSync('wiremock.pid', wiremockProcess.pid!.toString());
  console.log(`WireMock started with PID: ${wiremockProcess.pid}`);

  // Wait for it to be ready
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await fetch('http://127.0.0.1:9090/__admin');
      if (response.ok) {
        console.log('WireMock is ready!');
        return;
      }
    } catch (e) {
      // Continue polling
    }
  }
  throw new Error('WireMock failed to start');
}

export default globalSetup;
