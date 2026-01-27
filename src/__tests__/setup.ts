// @ts-ignore - Bun test types not available in tsc
import { beforeAll, afterEach } from 'bun:test';
import '@testing-library/jest-dom';
import { Window } from 'happy-dom';

// Initialize happy-dom environment
const window = new Window();
// @ts-ignore
globalThis.window = window;
// @ts-ignore
globalThis.document = window.document;
// @ts-ignore
globalThis.navigator = window.navigator;
// @ts-ignore
globalThis.HTMLElement = window.HTMLElement;
// @ts-ignore
globalThis.HTMLButtonElement = window.HTMLButtonElement;
// @ts-ignore
globalThis.SVGElement = window.SVGElement;

// Mock framer-motion globally (CRITICAL for preventing flaky tests)
// framer-motion uses requestAnimationFrame and other animation APIs
// We mock it to render plain HTML elements without animation
// @ts-ignore
globalThis.motion = new Proxy(
  {},
  {
    get: () => {
      // Return a mock component for any framer-motion component
      // (motion.div, motion.span, motion.button, etc.)
      return (props: any) => {
        const { children } = props;
        // Return children directly, avoiding animation side effects
        return children;
      };
    },
  }
);

// Mock localStorage for Node environment
beforeAll(() => {
  const localStorageData: Record<string, string> = {};

  global.localStorage = {
    getItem: (key: string) => localStorageData[key] || null,
    setItem: (key: string, value: string) => {
      localStorageData[key] = value;
    },
    removeItem: (key: string) => {
      delete localStorageData[key];
    },
    clear: () => {
      Object.keys(localStorageData).forEach((key) => {
        delete localStorageData[key];
      });
    },
    length: 0,
    key: (index: number) => {
      const keys = Object.keys(localStorageData);
      return keys[index] || null;
    },
  };
});

// Clear mocks after each test
afterEach(() => {
  localStorage.clear();
});
