# Contribute to `@tetherto/dev-websites-core`

Thank you for your interest in contributing.

This repository is the shared non-UI library for WDK / QVAC websites (Payload CMS, SEO, i18n, utils).

## Licensing

This project is released under the [Apache License 2.0](LICENSE).

By contributing, you agree that:

- You retain copyright over your contributions
- You grant a perpetual, worldwide, royalty-free license for their use
- Contributions are provided "AS IS", without warranty

## Get started

### Prerequisites

- Node.js `>= 20`
- npm
- Git

### Fork and clone

Fork the repository, then clone your fork:

```bash
git clone git@github.com:your-username/dev-websites-core.git
cd dev-websites-core
```

Add the upstream remote:

```bash
git remote add upstream git@github.com:tetherto/dev-websites-core.git
```

### Install and check

```bash
npm install
npm run lint
npm run typecheck
npm run build
```

## Pull request workflow

Use Conventional Commits-style types for branch names and pull request titles (`feat`, `fix`, `docs`, `chore`, `ci`, …).

Branch naming:

```bash
{type}/{short-description}
```

1. Sync your fork with upstream `main`.
2. Create a branch from `main`.
3. Make your changes.
4. Run lint, typecheck, and build.
5. Open a pull request against `tetherto/dev-websites-core` `main`.

Pull request title format:

```
{type}({scope}): {description}
```

## Issues and security

Use GitHub issues for bugs, documentation problems, and feature requests that can be discussed publicly.

Do not include secrets, private keys, tokens, or other sensitive material in an issue or pull request.

## Community

Follow the [Code of Conduct](CODE_OF_CONDUCT.md) when participating in this project.
