#!/usr/bin/env bash
set -eo pipefail

echo "Running linter..."
yarn lint
