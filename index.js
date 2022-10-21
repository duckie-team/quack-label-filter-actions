const core = require('@actions/core')

try {
  const rawLabel = core.getInput('labels')
  // const rawLabel = `[
  //   "ReleaseTarget_UiComponents",
  //   "BumpType_Major",
  //   "publish"
  // ]`

  const labels = rawLabel.substring(1, rawLabel.length - 2).
    replace(/[\n"]/gi, '').
    split(',').
    map(label => label.trim())
  console.log(`Input labels: ${labels}`)

  // starts with BumpType_
  let bump_type = labels.find(label => label.startsWith('BumpType_'))
  if (bump_type !== undefined) {
    bump_type = bump_type.split('_')[1]
  }
  console.log(`Bump type: ${bump_type}`)
  core.setOutput('bump_type', bump_type)

  // starts with ReleaseTarget_
  let release_target = labels.find(label => label.startsWith('ReleaseTarget_'))
  if (release_target !== undefined) {
    release_target = release_target.split('_')[1]
  }
  console.log(`Release target: ${release_target}`)
  core.setOutput('release_target', release_target)

  let publish_module_id
  switch (release_target) {
    case 'LintCore':
      publish_module_id = ':lint-core-publish'
      break
    case 'LintQuack':
      publish_module_id = ':lint-quack-publish'
      break
    case 'LintCompose':
      publish_module_id = ':lint-compose-publish'
      break
    case 'LintWriting':
      publish_module_id = ':lint-writing-publish'
      break
    case 'UiComponents':
      publish_module_id = ':ui-components'
      break
  }
  console.log(`Publish module id: ${publish_module_id}`)
  core.setOutput('publish_module_id', publish_module_id)

  const is_snapshot = labels.indexOf('publish') === -1
  console.log(`Is snapshot: ${is_snapshot}`)
  core.setOutput('is_snapshot', is_snapshot)
} catch (error) {
  core.setFailed(error.message)
}
