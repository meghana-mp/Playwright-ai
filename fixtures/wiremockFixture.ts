import { test as base, expect } from '@playwright/test';
import { spawn, ChildProcess } from 'child_process';
import * as net from 'net';

interface WireMockFixture {
  wiremock: ChildProcess;
}

export const test = base.extend<WireMockFixture>({
  wiremock: async ({}, use) => {
    console.log('--- Attempting to start WireMock ---');
    
    const wiremockProcess: ChildProcess = spawn('java', [
      '-jar',
      'lib/wiremock-standalone-3.13.2.jar',
      '--port',
      '9090',
      '--root-dir',
      '.'
    ], {
      stdio: 'inherit'
    });

    // Add these listeners to see the REAL error in your console
    wiremockProcess.stdout?.on('data', (data: any) => console.log(`WireMock Log: ${data}`));
    wiremockProcess.stderr?.on('data', (data: any) => console.error(`WireMock Error: ${data}`));

    await new Promise<void>((resolve, reject) => {
        const checkWireMock = () => {
            const socket = new net.Socket();
            socket.once("connect", () => {
                socket.end();
                resolve();
            });
            socket.once("error", (err) => {
                if (err.message.includes("ECONNREFUSED") || err.message.includes("EADDRNOTAVAIL")) {
                    setTimeout(checkWireMock, 1000);
                } else {
                    reject(err);
                }
            });
            socket.connect(9090, "127.0.0.1");
        };
        checkWireMock();
    });

    if (wiremockProcess.exitCode !== null) {
        throw new Error(`WireMock failed to start with exit code ${wiremockProcess.exitCode}. Check the logs above.`);
    }

    console.log("WireMock is ready!");
    // Wait for WireMock to be ready by polling its __admin endpoint
    let wiremockReady = false;
    for (let i = 0; i < 10; i++) { // Try up to 10 times with 1-second intervals
      try {
        const response = await fetch("http://127.0.0.1:9090/__admin");
        if (response.ok) {
          wiremockReady = true;
          break;
        }
      } catch (error) {
        // Ignore connection errors, WireMock might not be up yet
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }

    if (!wiremockReady) {
      if (wiremockProcess.exitCode !== null) {
        throw new Error(`WireMock failed to start with exit code ${wiremockProcess.exitCode}. Check the logs above.`);
      }
      throw new Error('WireMock did not become ready within the expected time.');
    }

    console.log('WireMock is ready!');
    await use(wiremockProcess);

    console.log('Stopping WireMock...');
    wiremockProcess.kill();
  },
});

export { expect };