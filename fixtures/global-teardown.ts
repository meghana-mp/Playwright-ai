import { FullConfig } from '@playwright/test';
import * as fs from 'fs';

async function globalTeardown(config: FullConfig) {
  console.log('Stopping WireMock...');
  if (fs.existsSync('wiremock.pid')) {
    const pid = parseInt(fs.readFileSync('wiremock.pid', 'utf8'), 10);
    try {
      console.log(`Sending SIGTERM to WireMock process ${pid}`);
      process.kill(pid, 'SIGTERM');
      console.log(`WireMock process ${pid} stopped.`);
    } catch (e: any) {
      if (e.code === 'ESRCH') {
        console.log('WireMock already stopped');
      } else {
        console.error(`Failed to kill WireMock process ${pid}:`, e);
      }
    }
    fs.unlinkSync('wiremock.pid');
  }
}

export default globalTeardown;
