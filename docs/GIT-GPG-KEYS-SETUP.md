# GIT COMMIT SIGNING GUIDELINES

## Background Information

- Syneos Health requires the use of signed commits as part of its security strategy. To accommodate the requirement, developers must create and use GPG keys in GitHub and this document has the steps outlined to provide the guidance.

## Technical Guidance

- GPG Keys are cryptographic pairs used to verify the authenticity of commits and create a chain of trust for tamper protection to establish audit trails. Below steps will guide the process of creating GPG key and signing the code commits.

### Install gnugp

- Use your preferred package manager in a terminal

## Background

Syneos Health requires signed commits for auditability and integrity. This guide shows how to create a GPG key, add it to GitHub, and configure Git to sign commits and tags.

## Quick overview

- Install GnuPG and, on macOS, a pinentry helper.
- Generate a GPG keypair and export the public key.
- Add the public key to your GitHub account.
- Configure Git to use the key and enable commit/tag signing.

## 1) Install GnuPG

download installers from: <https://gnupg.org/download/>

Verify installation:

```bash
gpg --version
```

## 2) Generate a new GPG key

Run the interactive key generator:

```bash
gpg --full-generate-key
```

Recommended interactive choices:

- Key type: (1) RSA and RSA or use the default (ECC) if offered
- Key size / curve: accept defaults unless your organization prescribes a specific curve
- Expiration: choose a sensible expiration (for example `1y`) and rotate keys when needed
- Real name and email: provide your work name and email that matches your GitHub account
- Passphrase: choose a secure passphrase (you will need it when signing locally)

After creation, list your secret keys to find the key ID (use the long format):

```bash
gpg --list-secret-keys --keyid-format=long
```

You will see output similar to:

```
sec   rsa4096/0123456789ABCDEF 2026-01-20 [SC] [expires: 2027-01-20]
 ABCDEF0123456789ABCDEF0123456789ABCDEF01
uid           [ultimate] Your Name <your.email@example.com>
```

The key ID is the hex string after the `/` (for example `0123456789ABCDEF`) or the long 40-char fingerprint shown on the following line. GitHub accepts the public key block copy (no need to prefix `0x`).

## 3) Export your public key and add it to GitHub

Export the public (ASCII-armored) key for the key id or fingerprint you found above:

```bash
gpg --armor --export 0123456789ABCDEF
```

Copy the entire output including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` lines.

On GitHub:

1. Sign in and go to Settings -> SSH and GPG keys.
2. Click `New GPG key`.
3. Paste the armored public key and click `Add GPG key`.

GitHub will then display commits signed with that key as `Verified` when the email on the commit matches your GitHub account email.

## 4) Configure Git to use your signing key

Set your signing key in Git (use the 16- or 40-character key ID or fingerprint):

```bash
git config --global user.signingkey 0123456789ABCDEF
```

Enable automatic signing of commits:

```bash
git config --global commit.gpgsign true
```

Enable GPG signing for tags:

```bash
git config --global tag.gpgSign true
```

If you prefer per-repository settings, omit `--global` and run the commands inside the repo.

Verify your signing key is set:

```bash
git config --global --get user.signingkey
```

## 5) Test signing a commit

In a repository, make a small change and commit:

```bash
git commit -m "test gpg signing"
```

View the signature status for the last commit:

```bash
git log --show-signature -1
```

Git should show a `gpg: Signature made ...` line and, on GitHub, the commit will be shown as `Verified` if the email matches.

## Troubleshooting

- If Git keeps prompting for a passphrase repeatedly, ensure `GPG_TTY` is exported in your shell and that `pinentry` is configured.
- After changing `gpg-agent` config, restart it with `gpgconf --kill gpg-agent`.
- On macOS, if `pinentry-mac` is not found use `brew --prefix pinentry-mac` to locate the binary and update `gpg-agent.conf` accordingly.
- If signatures are not showing as `Verified` on GitHub, confirm the commit email (git config user.email) matches the email associated with the GitHub account where the key was added.

## Security notes

- Keep your private key and passphrase secret. Never share or check them into source control.
- Rotate keys periodically and remove old keys from GitHub when they are revoked.
