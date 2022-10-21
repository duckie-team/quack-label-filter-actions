const core = require('@actions/core')

try {
  const labels = core.getInput('labels')
  console.log(`Input labels: ${labels}`)
} catch (error) {
  core.setFailed(error.message)
}
