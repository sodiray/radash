# Workflows

## Test
1. When a PR is created or updated, run unit tests on the PR (**require success to merge**)
2. When a commit is pushed to master, run unit tests

## Semver
1. When a PR has the `release` label added, require semver bump (`semver-on-label:release.yml`)
2. When a PR has the `release` label removed, automatically pass the semver bump (`semver-on-label:release.yml`)
3. When a PR is created, automatically pass the semver bump (`semver-on-label:release.yml`)

## Release
1. When a new commit is pushed to `master` and the linked pull request has the `release` label create a new release for the version in the `package.json`

## Publish
1. When a new release is created, publish to npm
