import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { publishUtils } from './index'

const exitError = () => {
  throw `fake process.exit()`
}

const spies = {
  console: {
    log: vi.spyOn(console, 'log').mockImplementation(() => {}),
    error: vi.spyOn(console, 'error').mockImplementation(() => {}),
  },
  process: {
    exit: vi.spyOn(process, 'exit').mockImplementation(exitError),
  },
}
describe('publishUtils', () => {
  beforeEach(() => {
    spies.console.log.mockImplementation(() => {})
    spies.console.error.mockImplementation(() => {})
    spies.process.exit.mockImplementation(exitError)
  })
  afterEach(() => {
    spies.process.exit.mockClear()
    spies.console.log.mockClear()
    spies.console.error.mockClear()
  })
  it('should fail with unsupported command', () => {
    expect(() =>
      publishUtils('wrong-command' as unknown as 'check-dist-tag', '0.1.0'),
    ).toThrowErrorMatchingInlineSnapshot(`"fake process.exit()"`)
    expect(spies.console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "TEFE publish-utils: Unsupported command. Use "check-dist-tag".",
        ],
      ]
    `)
    expect(spies.process.exit.mock.calls).toMatchInlineSnapshot(`
      [
        [
          1,
        ],
      ]
    `)
    expect(spies.console.log.mock.calls).toMatchInlineSnapshot(`[]`)
  })

  describe('check-dist-tag', () => {
    it('should log and fail if no tag is provided', () => {
      expect(() =>
        publishUtils('check-dist-tag', ''),
      ).toThrowErrorMatchingInlineSnapshot(`"fake process.exit()"`)
      expect(spies.console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "TEFE publish-utils: check-dist-tag:  No tag to validate.",
        ],
      ]
    `)
      expect(spies.process.exit.mock.calls).toMatchInlineSnapshot(`
      [
        [
          1,
        ],
      ]
    `)
      expect(spies.console.log.mock.calls).toMatchInlineSnapshot(`[]`)
    })

    it('should fail if tag has illegal characters', () => {
      expect(() =>
        publishUtils('check-dist-tag', '??invalid??'),
      ).toThrowErrorMatchingInlineSnapshot(`"fake process.exit()"`)
      expect(spies.console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "TEFE publish-utils: check-dist-tag:  "??invalid??" has illegal dist-tag characters.",
        ],
      ]
    `)
      expect(spies.process.exit.mock.calls).toMatchInlineSnapshot(`
      [
        [
          1,
        ],
      ]
    `)
      expect(spies.console.log.mock.calls).toMatchInlineSnapshot(`[]`)
    })

    it('should fail if tag is a reserved word', () => {
      expect(() =>
        publishUtils('check-dist-tag', 'latest'),
      ).toThrowErrorMatchingInlineSnapshot(`"fake process.exit()"`)
      expect(spies.console.error.mock.calls).toMatchInlineSnapshot(`
      [
        [
          "TEFE publish-utils: check-dist-tag:  "latest" is reserved word (latest,stable,next).",
        ],
      ]
    `)
      expect(spies.process.exit.mock.calls).toMatchInlineSnapshot(`
      [
        [
          1,
        ],
      ]
    `)
      expect(spies.console.log.mock.calls).toMatchInlineSnapshot(`[]`)
    })

    it('should validate a correct tag', () => {
      publishUtils('check-dist-tag', '1.0.0-alpha')
      expect(spies.console.error.mock.calls).toMatchInlineSnapshot(`[]`)
      expect(spies.process.exit.mock.calls).toMatchInlineSnapshot(`[]`)
      expect(spies.console.log.mock.calls).toMatchInlineSnapshot(`
      [
        [
          ""1.0.0-alpha" valid",
        ],
      ]
    `)
    })
  })
})
