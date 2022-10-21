# quack-label-filter-actions

꽥꽥 배포용으로 사용되는 label 필터링 액션

## Inputs & Outputs

```yaml
inputs:
  labels:
    description: '해당 PR 에 설정된 label'
    required: true

outputs:
  bump_type:
    description: 'Bump 할 버전'
  release_target:
    description: 'Release 할 대상'
  publish_module_id:
    description: 'Publish 할 모듈명'
  is_snapshot:
    description: '스냅샷 배포인지 여부'
  version_path:
    description: '버전 파일 경로'
  has_target:
    description: 'Release 대상이 있는지 여부'
```

## Usage

```yml
- name: Label filtering
  id: label
  uses: duckie-team/quack-label-filter-actions@{version}
  with:
    labels: "${{ toJson(github.event.pull_request.labels.*.name) }}"
```

---

자바스크립트를 8년전 프로그래밍 입문할 때 잠깐 배우고 아예 안써서... 생각나는 아주 기초적인 문법들만을 이용하여 제작하였습니다.
괜히 잘 모르는 영역까지 사용해서 코드 예쁘게 만들다가 시간 소비가 너무 많이 될 것 같아서... 그냥 이렇게 만들었습니다. 
