#!/usr/bin/env node
import updateNotifier from 'update-notifier'
import * as fs from 'fs'

const pkg = JSON.parse(`${fs.readFileSync('./package.json')}`)
updateNotifier({ pkg }).notify()
