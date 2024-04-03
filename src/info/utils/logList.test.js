import { describe, it, expect, vi } from 'vitest';
import logList from './logList.js';

// Required
import chalk from 'chalk';
import padRightWithLength from '../../utils/padRightWithLength.js';
import clean from '../../utils/clean.js';


vi.mock('chalk', () => ({default:{
  bold: vi.fn((str) => `**${str}**`),
  green: vi.fn((str) => `green(${str})`),
  red: vi.fn((str) => `red(${str})`)
}}));
vi.mock('../../utils/padRightWithLength.js', () => ({ default: vi.fn((length) => (str) => `padded(${str})`)}));
vi.mock('../../utils/clean.js', () => ({ default: vi.fn((str) => `cleaned(${str})`)}));

describe('logList function', () => {
  it('correctly formats and logs list items', () => {
    const mockLog = vi.fn();
    const list = [
      ['Item1', true, ' Comment1'],
      ['Item2', false],
      ['Item3', 'Value3']
    ];

    logList(mockLog, list);

    expect(mockLog).toHaveBeenCalledWith('%s', 'cleaned(**padded(Item1)** green(true) Comment1)');
    expect(mockLog).toHaveBeenCalledWith('%s', 'cleaned(**padded(Item2)** red(false))');
    expect(mockLog).toHaveBeenCalledWith('%s', 'cleaned(**padded(Item3)** Value3)');
  });
});
