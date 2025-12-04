# GitHub Repository Creator

A simple JavaScript application that creates GitHub repositories using the Octokit SDK.

## Features

- Creates repositories using GitHub's REST API via Octokit
- Configurable repository name and visibility
- Environment variable-based configuration
- Error handling for common scenarios

## Prerequisites

- Node.js (v14 or higher)
- GitHub Personal Access Token with `repo` scope

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Edit `.env` and configure your settings:
```env
GITHUB_TOKEN=your_github_token_here
ORG_NAME=your-org-name
REPO_NAME=my-new-repository
REPO_VISIBILITY=private
```

### Getting a GitHub Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the `repo` scope
4. Generate and copy your token
5. Add it to your `.env` file

## Usage

Run the application:
```bash
npm start
```

Or directly with Node:
```bash
node index.js
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITHUB_TOKEN` | Yes | - | GitHub Personal Access Token |
| `ORG_NAME` | Yes | - | Organization name where repository will be created |
| `REPO_NAME` | Yes | - | Name of the repository to create |
| `REPO_VISIBILITY` | No | `private` | Repository visibility: `public` or `private` |

## Example Output

```
Creating repository: your-org-name/my-new-repository
Visibility: private

✓ Repository created successfully!
URL: https://github.com/your-org-name/my-new-repository
Clone URL: https://github.com/your-org-name/my-new-repository.git
```

## Error Handling

The application handles common errors:
- Missing environment variables
- Invalid GitHub token
- Repository name conflicts
- Invalid visibility values

## License

MIT