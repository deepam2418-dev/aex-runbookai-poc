# Configure Git Credential Manager with Microsoft Entra ID (Windows & macOS)

This guide shows how to configure Git Credential Manager (GCM) to authenticate with **Microsoft Entra ID (OAuth tokens)** when connecting to Github. This is the **recommended method** for both Windows and macOS because it provides stronger security, MFA support, and seamless integration with Azure AD policies.

---

## Prerequisites

- Git installed on your system.
- Access to GitHub

### Windows

- Git Credential Manager (GCM):
  - Installed automatically with Git for Windows (if "Enable Git Credential Manager" is selected during installation).

### MacOs

- Git Credential Manager (GCM):
- Install via [Homebrew](https://brew.sh/) or from the [GCM GitHub releases](https://github.com/git-ecosystem/git-credential-manager).

  ```bash
  brew install git
  brew install --cask git-credential-manager
  ```

---

## Configuration

Run the following command to configure GCM to prefer Microsoft Entra ID (OAuth) tokens for Azure Repos:

```bash
git config --global credential.gitHubAccountFiltering "false"
```

---

## First-Time Sign-In

1. Run a Git command that contacts Azure Repos, e.g.:

   ```bash
   git clone https://github.com/syneos-internal/<repo-name>.git
   ```

2. GCM will launch a browser window and prompt you to sign in with your **Microsoft Entra account**.
3. Complete MFA if required.
4. GCM securely caches a token so you won't be prompted again until it expires.

---

## Verifying Configuration

To confirm your configuration:

```bash
git config --global --get credential.helper
```

Expected output:

```txt
MacOs:- <path>/gcm-core/git-credential-manager
Windows:- manager-core
```

---

## Troubleshooting

- **Old credentials cached?** Clear your OS keychain/credential manager and retry.
- **Falling back to PATs?** Ensure the config is set to `core`.
- **Multiple accounts?** Sign in with the one tied to your GitHub Account.

---

## References

- [Windows](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git?platform=windows)
- [MacOs](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git?platform=mac)
