<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD028 -->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![pre-commit][pre-commit-shield]][pre-commit-url]
[![taskfile][taskfile-shield]][taskfile-url]

# Project

Short project description

<details>
  <summary style="font-size:1.2em;">Table of Contents</summary>
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Code-Style](#code-style)
  - [ESLint](#eslint)
  - [pre-commit](#pre-commit)
- [Getting Started](#getting-started)
  - [Use npm commands in docker](#use-npm-commands-in-docker)
  - [Install](#install)
  - [Start Service](#start-service)
  - [Start Reloading DEV-Server](#start-reloading-dev-server)
- [GraphQL](#graphql)
  - [Generating types from the schema](#generating-types-from-the-schema)
- [Configuration](#configuration)
  - [Env](#env)
  - [App configuration](#app-configuration)
  - [Preparation](#preparation)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
</details>

## Code-Style

### ESLint

We are using [eslint](https://eslint.org/) for linting.
You can run a lint check:

```bash
task npm:run -- lint
```

To autofix based on defined rulset:

```bash
task npm:run -- lint:fix
```

### pre-commit

We are using [pre-commit](https://pre-commit.com/).
This is not mandatory, but you can enable the pre-commit hooks to avoid push unlinted/malformed code.

```bash
pre-commit install
```

## Getting Started

### Use npm commands in docker

Using the provided tasks, you can run npm commands within a Docker container to ensure compatibility and consistency across different environments.

#### Running npm commands

To run an npm command inside a Docker container, use the `npm` task. This task reads the Node.js version from the `.nvmrc` file in the repository and runs the specified npm command inside a Docker container.

**Basic usage:**

```bash
task npm:<npm_command> -- [<args>]
```

**Examples:**

1. **Run `npm run build`:**

   ```bash
   task npm:run -- build
   ```

2. **Run `npm ls`:**

   ```bash
   task npm -- ls
   ```

   or

```bash
 task npm:ls
```

**Note:**

- You can use task command wildcards and arguments to run specific npm commands.
- Both `task npm:<command>` and `task npm -- <command>` are supported.
- For instance, `task npm:run -- build` and `task npm -- run build` achieve the same result.

These tasks ensure that your npm commands run within the context of the Docker container with the appropriate Node.js version specified in the `.nvmrc` file.

### Install

```bash
task npm:install
```

### Start Service

```bash
task npm:run -- start
```

### Start Reloading DEV-Server

```bash
task npm:run -- dev
```

### Running using local node

If you want to run the project using your local Node.js instead of the dockerized one, you need to pick correct Node version by running:
```bash
nvm use
```

Then it is possible turn on the dev server using:
```bash
npm run dev
```

## GraphQL

### Generating types from the schema

```bash
task npm:run -- build:gql-schema
```

This will generate the types in the file `./src/schema/resolvers-types.ts`.

**Note:**
Currently there are two graphql-modules present: `books`, `heartbeat` and `scalars`.
However, they only serve as an example on how to structure the source code and could be deleted be later.

## Configuration

### Env

> ⚠️ Please avoid unneccessary env bloat, there's a dedicated configuration
> file for everything else, see below.

| Name            | Description                                                                      | Default                          |
| --------------- | -------------------------------------------------------------------------------- | -------------------------------- |
| **NODE_ENV**    | available options are (development, production, test)                            | `n/a`                            |
| **CONFIG_PATH** | PATH to the configuration file to be loaded by the client in runtime (see below) | `./resources/configuration.yaml` |

### App configuration

create the file `resources/configuration.yaml` and set your application configuration there.

```yaml
---
app:
  port: 4000
  host: '0.0.0.0'
  environment: 'PROD'
  datasources:
    booksApi:
      url: http://some-url:3000
```

### Preparation

All changes require a PR and review. Create a new branch and reference a Jira ticket, f.e.

```console
git switch -c feature/INPRO-1-configure-resource
```

## Known Issues

<!-- TBD -->

## Future Improvements

In the future it would be nice to integrate **[Pothos](https://pothos-graphql.dev/)**, a plugin based GraphQL schema builder for typescript.
It makes building graphql schemas in typescript easy, fast and enjoyable.
An example application is available [here](https://github.com/prisma/prisma-examples/tree/latest/orm/graphql)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!-- Links -->

<!-- Badges -->

[pre-commit-shield]: https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit
[pre-commit-url]: https://github.com/pre-commit/pre-commit
[taskfile-url]: https://taskfile.dev/
[taskfile-shield]: https://img.shields.io/badge/Taskfile-Enabled-brightgreen?logo=task
