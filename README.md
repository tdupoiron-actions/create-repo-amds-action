# Create Repository in Organization Action

A GitHub Action to create a new repository in a specified organization using the GitHub API.

## Inputs

### `github-token`
**Required** GitHub token with repository creation permissions. Usually `${{ secrets.GITHUB_TOKEN }}` or a personal access token with `repo` scope.

### `org-name`
**Required** The name of the organization where the repository will be created.

### `repo-name`
**Required** The name of the repository to create.

### `repo-visibility`
**Optional** Repository visibility: `public` or `private`. Default: `private`.

## Outputs

### `repository-url`
The URL of the created repository (e.g., `https://github.com/org/repo`).

### `clone-url`
The clone URL of the created repository (e.g., `https://github.com/org/repo.git`).

### `repository-id`
The ID of the created repository.

## Example Usage

```yaml
name: Create Repository
on:
  workflow_dispatch:
    inputs:
      repo-name:
        description: 'Repository name'
        required: true

jobs:
  create-repo:
    runs-on: ubuntu-latest
    steps:
      - name: Create repository
        uses: tdupoiron-actions/create-repo-amds-action@v1
        id: create-repo
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          org-name: 'my-organization'
          repo-name: ${{ github.event.inputs.repo-name }}
          repo-visibility: 'private'
      
      - name: Display repository URL
        run: |
          echo "Repository created: ${{ steps.create-repo.outputs.repository-url }}"
          echo "Clone URL: ${{ steps.create-repo.outputs.clone-url }}"
```

## Development

### Install dependencies
```bash
npm install
```

### Build the action
```bash
npm run build
```

This compiles the action and its dependencies into a single file at `dist/index.js`.

## License

MIT
