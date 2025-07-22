import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

// Make TextEncoder available in the test environment
global.TextEncoder = TextEncoder; 