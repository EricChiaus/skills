---
name: codebase-explorer
description: Generates a structured codebase briefing ONLY when the user explicitly asks for it using phrases like "explore this codebase", "give me a codebase briefing", "summarize this project", or "what is this codebase". Do NOT invoke automatically or as part of general coding tasks.
---

# Codebase Explorer Skill

This skill produces a fast, structured briefing of an unfamiliar codebase. It is designed for situations where you need to understand a project quickly — such as the start of a live coding interview, a new work assignment, or an open-source contribution — so you can make confident changes without wasting time digging.

## How to Trigger This Skill

**This skill only runs when explicitly requested.** It does not activate automatically during normal coding tasks.

Trigger it by asking something like:
- *"Explore this codebase"*
- *"Give me a codebase briefing"*
- *"Summarize this project"*
- *"What is this codebase / what does this project do?"*
- *"Orient me in this repo"*

## What This Skill Produces

A single, structured output covering:

1. **Project purpose** — what the project does, in one or two sentences
2. **Tech stack** — languages, frameworks, runtime, and major libraries
3. **Directory structure** — annotated top-level layout with purpose of each folder
4. **Key files** — the most important files to know about and why
5. **Entry points** — where execution starts (server, CLI, app bootstrap, etc.)
6. **Data flow** — high-level path from input to output (request → handler → service → DB, etc.)
7. **Patterns in use** — architectural and coding conventions detected in the codebase
8. **Test setup** — test framework, location of tests, how to run them
9. **Build & dev tooling** — how to install, build, and run the project locally
10. **Gotchas and notable constraints** — anything unusual, deprecated, or worth flagging

## How to Run the Exploration

Work through the following steps in order. Each step should be fast — prefer scanning over deep reading.

### Step 1: Read the README
- Read `README.md` (or `README.rst`, `README.txt`) in full.
- Extract: project purpose, setup instructions, architecture notes, any diagrams.
- If no README exists, note it — that itself is useful context.

### Step 2: Identify the Tech Stack
Scan the root directory for these indicator files:

| File | Indicates |
|---|---|
| `package.json` | Node.js / JavaScript / TypeScript |
| `requirements.txt` / `pyproject.toml` / `Pipfile` | Python |
| `go.mod` | Go |
| `pom.xml` / `build.gradle` | Java / Kotlin (JVM) |
| `Cargo.toml` | Rust |
| `*.csproj` / `*.sln` | .NET / C# |
| `Gemfile` | Ruby |
| `composer.json` | PHP |
| `mix.exs` | Elixir |

- Read `package.json` (or equivalent) for declared dependencies and scripts.
- Identify the main framework (React, Express, Django, Spring, etc.) from dependency names.
- Note runtime version constraints (`.nvmrc`, `.python-version`, `go.mod` directive, etc.).

### Step 3: Map the Directory Structure
- List top-level directories and files.
- Infer the purpose of each directory from its name and a quick contents scan.
- Common patterns to recognise:

| Directory | Likely purpose |
|---|---|
| `src/` / `app/` / `lib/` | Main application source |
| `test/` / `tests/` / `__tests__/` / `spec/` | Test files |
| `public/` / `static/` / `assets/` | Static assets served directly |
| `scripts/` / `bin/` | CLI scripts, tooling, migrations |
| `config/` / `settings/` | Configuration files |
| `docs/` | Documentation |
| `migrations/` / `db/` | Database schema and migrations |
| `infra/` / `deploy/` / `.github/workflows/` | Infrastructure and CI/CD |

### Step 4: Find Entry Points
- **Web servers**: look for `server.js`, `app.js`, `main.py`, `main.go`, `Program.cs`, `Application.java`
- **Frontend apps**: look for `index.html`, `main.tsx`, `App.tsx`, `pages/_app.tsx` (Next.js)
- **CLIs**: check `bin/` directory, `scripts` field in `package.json`, `console_scripts` in `pyproject.toml`
- **Serverless / functions**: look for `handler.js`, `functions/`, `lambda/`

### Step 5: Detect Architectural Patterns
Scan `src/` (or equivalent) for structural clues:

| Pattern | Indicators |
|---|---|
| **MVC** | `models/`, `views/`, `controllers/` folders |
| **Feature-based** | Folders named after product features (e.g., `auth/`, `dashboard/`, `billing/`) |
| **Layered / N-tier** | `services/`, `repositories/`, `handlers/` or `routes/` |
| **Monorepo** | `packages/`, `apps/`, `libs/` at root; presence of `nx.json`, `turbo.json`, `lerna.json` |
| **Microservices** | Multiple top-level service directories, each with own `package.json` or `go.mod` |
| **Domain-Driven Design** | `domain/`, `application/`, `infrastructure/` folders |

### Step 6: Identify Coding Conventions
Sample 3–5 source files and note:
- **Naming style**: `camelCase`, `snake_case`, `PascalCase`, `kebab-case`
- **Error handling**: exceptions, result/error types (`Result<T>`, `(value, err)` tuples), error codes, callbacks
- **Null safety**: nullable types, `Option`/`Maybe`, defensive null checks
- **Dependency injection**: constructor injection, DI containers, service locators, or none
- **Concurrency model**: async/await, goroutines, threads, reactive streams, actors
- **Language-specific patterns to look for**:
  - *JavaScript/TypeScript*: module system (ESM vs CommonJS), strict mode, frontend state management
  - *Python*: type hints usage, dataclasses vs dicts, sync vs async (`asyncio`)
  - *Go*: idiomatic error returns, interface usage, package structure
  - *Java/Kotlin*: annotation-driven frameworks (Spring), builder patterns, immutability
  - *Rust*: ownership patterns, use of `unwrap` vs proper error propagation
  - *C#*: LINQ usage, async patterns, nullable reference types
- **API style** (if applicable): REST, GraphQL, gRPC, tRPC, message queues

### Step 7: Find the Test Setup
- Locate the test directory and identify the test framework.
- Find the command to run tests (check `scripts` in `package.json`, `Makefile`, or `README`).
- Note coverage tooling if present.
- Check whether tests are unit, integration, e2e, or a mix.

### Step 8: Identify Gotchas
Flag anything unusual:
- Monkeypatching or global state
- Deprecated dependencies or pinned older versions
- Non-standard folder structures
- Missing or sparse documentation
- Mixed paradigms (e.g., both class components and hooks in React)
- Environment-specific configuration that may require setup

## Output Format

Deliver the briefing as a structured markdown summary:

```
## Codebase Briefing: [Project Name]

### Purpose
[1–2 sentences on what the project does]

### Tech Stack
- Language: ...
- Framework: ...
- Runtime: ...
- Key libraries: ...

### Directory Structure
[Annotated tree of top-level layout]

### Key Files
- `path/to/file` — [why it matters]
- ...

### Entry Points
- [How the app starts]

### Data Flow
[Request/input → ... → Response/output]

### Patterns
- Architecture: ...
- Naming: ...
- Module system: ...
- Error handling: ...

### Tests
- Framework: ...
- Location: ...
- Run with: `...`

### Build & Dev
- Install: `...`
- Run locally: `...`
- Build: `...`

### Gotchas
- [Anything worth flagging]
```

## Scope and Boundaries

- **Read only** during exploration — do not modify any files.
- **Scan, don't deep-read** — skim files for structure and patterns; full reading is only needed for README and entry points.
- **Time-box** — the briefing should be producible in one pass. If the codebase is very large, focus on the most relevant module or service.
- **Flag uncertainty** — if a pattern or purpose is inferred rather than confirmed, say so explicitly.
