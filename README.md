
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
- fastapi
- uvicorn[standard]
- python-multipart
- pytesseract
- Pillow
- pymupdf
- ollama

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

## Current features

Extraction utilizes AI and OCR; uploaded document contents are analyzed and parsed into fields.
Jobs are stored in memory and disappear when the backend restarts.
This prototype is not suitable for real insurance claims.

## Planned improvements

1. Pydantic validation and confidence scores
2. Background jobs, retries, and failure handling
3. PostgreSQL persistence
4. Automated tests
5. Docker
6. AWS infrastructure using Terraform
7. GitHub Actions CI/CD
