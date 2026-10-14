
# Insurance Document AI

An educational document-processing prototype built with React,
TypeScript, FastAPI, and Python.

## Features

- Upload PDF, PNG, and JPEG files
- FastAPI backend
- Mock structured extraction results
- Human-review indicators
- React and TypeScript frontend

## Requirements

- Python 3
- Node.js and npm
- Git (for version control)

## Run locally

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend: http://localhost:8000

API documentation: http://localhost:8000/docs

### Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Current limitations

Extraction is mocked; uploaded document contents are not analyzed.
Jobs are stored in memory and disappear when the backend restarts.
This prototype is not suitable for real insurance claims.

## Planned improvements

1. OCR and AI-based extraction
2. Pydantic validation and confidence scores
3. Background jobs, retries, and failure handling
4. PostgreSQL persistence
5. Automated tests
6. Docker
7. AWS infrastructure using Terraform
8. GitHub Actions CI/CD
