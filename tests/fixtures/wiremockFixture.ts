import { test as base, expect } from '@playwright/test';
import { spawn, ChildProcess } from 'child_process';

interface WireMockFixture {
  wiremock: ChildProcess;
}

export const test = base.extend<WireMockFixture>({
  wiremock: async ({}, use) => {
    console.log('--- Attempting to start WireMock ---');
    
    const wiremockProcess: ChildProcess = spawn('java', [
      '-jar',
      './lib/wiremock-standalone-3.13.2.jar',
      '--port',
      '9090',
      '--root-dir',
      '.'
    ]);

    // Add these listeners to see the REAL error in your console
    wiremockProcess.stdout?.on('data', (data: any) => console.log(`WireMock Log: ${data}`));
    wiremockProcess.stderr?.on('data', (data: any) => console.error(`WireMock Error: ${data}`));

    // Wait and check if the process is still alive
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (wiremockProcess.exitCode !== null) {
      throw new Error(`WireMock failed to start with exit code ${wiremockProcess.exitCode}. Check the logs above.`);
    }

    await use(wiremockProcess);

    console.log('Stopping WireMock...');
    wiremockProcess.kill();
  },
});

export { expect };