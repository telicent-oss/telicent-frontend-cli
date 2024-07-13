module.exports = {
  types: [
    { type: 'build', section: 'Build System' },
    { type: 'ci', section: 'CI' },
    { type: 'docs', section: 'Documentation' },
    { type: 'feat', section: 'Features' },
    { type: 'update', section: 'Updates' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'perf', section: 'Performance' },
    { type: 'refactor', section: 'Refactor' },
    { type: 'test', section: 'Tests' },
    { type: 'revert', section: 'Reverts' },
    { type: 'wip', section: 'Work in Progress' },
  ],
  commitUrlFormat: 'https://telicent-oss/telicent-frontend-cli/commit/{{hash}}',
  compareUrlFormat:
    'https://telicent-oss/telicent-frontend-cli/compare/{{previousTag}}...{{currentTag}}',
  issueUrlFormat: 'https://telicent-oss/telicent-frontend-cli/issues/{{id}}',
  userUrlFormat: 'https://github.com/{{user}}',
}
