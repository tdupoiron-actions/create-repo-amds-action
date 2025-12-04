const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

// Get configuration from action inputs
const GITHUB_TOKEN = core.getInput('github-token', { required: true });
const ORG_NAME = core.getInput('org-name', { required: true });
const REPO_NAME = core.getInput('repo-name', { required: true });
const REPO_VISIBILITY = core.getInput('repo-visibility') || 'private';

// Validate visibility value
const validVisibility = ['public', 'private'];
if (!validVisibility.includes(REPO_VISIBILITY)) {
  core.setFailed(`REPO_VISIBILITY must be either 'public' or 'private' (got: ${REPO_VISIBILITY})`);
  process.exit(1);
}

// Initialize Octokit with authentication
const octokit = new Octokit({
  auth: GITHUB_TOKEN
});

async function createRepository() {
  try {
    core.info(`Creating repository: ${ORG_NAME}/${REPO_NAME}`);
    core.info(`Visibility: ${REPO_VISIBILITY}`);

    const response = await octokit.repos.createInOrg({
      org: ORG_NAME,
      name: REPO_NAME,
      private: REPO_VISIBILITY === 'private',
      auto_init: true // Creates an initial commit with empty README
    });

    core.info('✓ Repository created successfully!');
    core.info(`URL: ${response.data.html_url}`);
    core.info(`Clone URL: ${response.data.clone_url}`);
    
    // Set action outputs
    core.setOutput('repository-url', response.data.html_url);
    core.setOutput('clone-url', response.data.clone_url);
    core.setOutput('repository-id', response.data.id);
    
    return response.data;
  } catch (error) {
    let errorMessage = 'Error creating repository: ';
    
    if (error.status === 401) {
      errorMessage += 'Authentication failed. Please check your GitHub token.';
    } else if (error.status === 422) {
      errorMessage += 'Repository name already exists or is invalid.';
    } else {
      errorMessage += error.message;
    }
    
    core.setFailed(errorMessage);
  }
}

// Run the main function
createRepository();
