# kiosq-backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Mongoose tests

Needs to comment line 83 in `node_modules/mongodb-memory-server-core/lib/util/getport/index.js` for tests to work.