import fs from 'fs'
import c from 'chalk'
import { getLocalPath } from '../../utils/getLocalPath.js'

const PULL_REQUEST_TEMPLATE = '.github/PULL_REQUEST_TEMPLATE'
const CTA = c.redBright('USER ACTION REQUIRED')
const CLI = `@telicent-oss/telicent-frontend-cli`

export const writePullRequestTemplate = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const local = getLocalPath()
  const localPRTemplateLoc = `${local}/${PULL_REQUEST_TEMPLATE}`
  const outerPRTemplateLoc = `${process.cwd()}/${PULL_REQUEST_TEMPLATE}`

  const localPRTemplate = fs.readFileSync(localPRTemplateLoc, 'utf-8')
  const outerPRTemplate = fs.existsSync(outerPRTemplateLoc)
    ? fs.readFileSync(outerPRTemplateLoc, 'utf-8')
    : undefined

  const updateWithReason = (reason: string) => {
    fs.writeFileSync(outerPRTemplateLoc, localPRTemplate)
    console.log(`${CTA} — ${reason}`)
    console.log(`Please check diff and commit.`)
    process.exit(1)
  }

  if (outerPRTemplate === undefined) {
    updateWithReason(`Created: Expected ${PULL_REQUEST_TEMPLATE} to exist.`)
  } else if (outerPRTemplate !== localPRTemplate) {
    updateWithReason(
      `Overwritten: Expected ${PULL_REQUEST_TEMPLATE} to match ${CLI}'s.`,
    )
  }
}
