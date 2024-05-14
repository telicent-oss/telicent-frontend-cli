type Command = 'check-dist-tag'

const RESERVED = ['latest', 'stable', 'next']

const fail = (str: string) => {
  console.error(`TEFE publish-utils: ${str}`)
  process.exit(1)
}

export const publishUtils = (command: Command, tag: string): void => {
  if (command !== 'check-dist-tag') {
    fail('Unsupported command. Use "check-dist-tag".')
  }
  if (!tag) {
    fail(`check-dist-tag:  No tag to validate.`)
  }
  if (/^[.-]|[^a-zA-Z0-9-._]/.test(tag)) {
    fail(`check-dist-tag:  "${tag}" has illegal dist-tag characters.`)
  }
  if (RESERVED.includes(tag)) {
    fail(`check-dist-tag:  "${tag}" is reserved word (${RESERVED.join(',')}).`)
  }
  console.log(`"${tag}" valid`)
}

export default publishUtils
