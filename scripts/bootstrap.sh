#!/bin/bash

echo "🔧 Setting up pre-commit..."

# Check for python
if ! command -v python3 &> /dev/null
then
    echo "❌ Python is not installed. Please install Python 3."
    exit 1
fi

# Install pip if missing
if ! command -v pip &> /dev/null
then
    echo "❌ pip not found. Install pip first."
    exit 1
fi

# Install pre-commit
pip install pre-commit

# Install the Git hook
pre-commit install

echo "✅ pre-commit is installed and the hook is set up!"
