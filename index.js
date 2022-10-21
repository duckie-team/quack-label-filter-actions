const core = require('@actions/core')

try {
  const rawLabel = core.getInput('labels')

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
    core.setOutput('has_target', true)
  } else {
    core.setOutput('has_target', false)
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

  // default ('Playground' 배포의 경우 ReleaseTarget 설정을 필수로 하지 않음)
  let version_path = 'versions/playground.txt'
  switch (release_target) {
    case 'LintCore':
      version_path = 'versions/lint-core.txt'
      break
    case 'LintQuack':
      version_path = 'versions/lint-quack.txt'
      break
    case 'LintCompose':
      version_path = 'versions/lint-compose.txt'
      break
    case 'LintWriting':
      version_path = 'versions/lint-writing.txt'
      break
    case 'UiComponents':
      version_path = 'versions/ui-components.txt'
      break
  }
  console.log(`Version_path: ${version_path}`)
  core.setOutput('version_path', version_path)

  const is_snapshot = labels.indexOf('publish') === -1
  console.log(`Is snapshot: ${is_snapshot}`)
  core.setOutput('is_snapshot', is_snapshot)
} catch (error) {
  core.setFailed(error.message)
}
