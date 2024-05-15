import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest'
import { fs as memfs, vol } from 'memfs'
import { writePullRequestTemplate } from './writePullRequestTemplate' // Adjust the import path as needed

// Mocking filesystem and path utilities
vi.mock('fs', () => ({
  default: {
    ...memfs,
    promises: memfs.promises,
  },
}))
vi.mock('../../utils/getLocalPath', () => ({
  getLocalPath: () => '/local',
}))

vi.mock('chalk', () => ({
  default: {
    redBright: (text: string) => text,
  },
}))

// Stubbing process.cwd to return a consistent directory
vi.stubGlobal('process', {
  ...process,
  cwd: () => '/outer',
})

let consoleOutput: string[] = []
const mockedConsoleLog = (output: string) => consoleOutput.push(output)
global.console.log = mockedConsoleLog // Capture console.log output

const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('Process exit called')
})

describe('writePullRequestTemplate Functionality', () => {
  beforeEach(() => {
    vol.mkdirSync('/local', { recursive: true })
    vol.mkdirSync('/local/.github', { recursive: true })
    vol.writeFileSync(
      '/local/.github/PULL_REQUEST_TEMPLATE',
      'Local Template Content',
    )

    vol.mkdirSync('/outer', { recursive: true })
    vol.mkdirSync('/outer/.github', { recursive: true })
    consoleOutput = [] // Reset captured console output
  })

  afterEach(() => {
    vol.reset()
    exitSpy.mockClear()
  })

  it('creates PULL_REQUEST_TEMPLATE if it does not exist', () => {
    expect(() => writePullRequestTemplate()).toThrowErrorMatchingInlineSnapshot(
      `[Error: Process exit called]`,
    )
    expect(consoleOutput).toMatchInlineSnapshot(`
      [
        "USER ACTION REQUIRED — Created: Expected .github/PULL_REQUEST_TEMPLATE to exist.",
        "Please check diff and commit.",
      ]
    `)
  })

  it('overwrites PULL_REQUEST_TEMPLATE if content does not match', () => {
    vol.mkdirSync('/outer/.github', { recursive: true })
    vol.writeFileSync(
      '/outer/.github/PULL_REQUEST_TEMPLATE',
      'Different Content',
    )
    expect(() => writePullRequestTemplate()).toThrowErrorMatchingInlineSnapshot(
      `[Error: Process exit called]`,
    )
    expect(consoleOutput).toMatchInlineSnapshot(`
      [
        "USER ACTION REQUIRED — Overwritten: Expected .github/PULL_REQUEST_TEMPLATE to match @telicent-oss/telicent-frontend-cli's.",
        "Please check diff and commit.",
      ]
    `)
  })

  it('does nothing if the PULL_REQUEST_TEMPLATE matches expected', () => {
    vol.mkdirSync('/outer/.github', { recursive: true })
    vol.writeFileSync(
      '/outer/.github/PULL_REQUEST_TEMPLATE',
      'Local Template Content',
    )
    expect(() => writePullRequestTemplate()).not.toThrow()
    expect(consoleOutput).toMatchInlineSnapshot(`[]`)
  })
})
