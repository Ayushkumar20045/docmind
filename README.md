# DocMind

> Turn documents into conversations.

DocMind is a Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents and interact with them using natural language. Instead of relying solely on an LLM's pre-trained knowledge, DocMind retrieves the most relevant information from uploaded documents before generating intelligent, context-aware responses.

The project is being built from scratch with a focus on learning modern AI application development, scalable backend architecture, and production-ready software engineering practices.

---

## How It Works

```text
PDF Upload
    │
    ▼
Text Extraction
    │
    ▼
Recursive Chunking
    │
    ▼
Sentence Embeddings
    │
    ▼
ChromaDB Vector Store
    │
    ▼
Semantic Retrieval
    │
    ▼
Groq LLM
    │
    ▼
AI Response
```

---

## Features

### AI Document Intelligence

- Upload PDF documents.
- Automatic text extraction.
- Recursive document chunking.
- Semantic vector search using ChromaDB.
- Context-aware retrieval.
- AI-powered question answering using Groq.
- Automatic document replacement for fresh indexing.

### Authentication

- User registration.
- Secure password hashing with bcrypt.
- JWT-based authentication.
- User login.
- Protected API endpoints.
- Current authenticated user endpoint (`/auth/me`).
- Email validation.
- Duplicate account prevention.

### Backend

- REST API built with FastAPI.
- PostgreSQL database integration.
- SQLAlchemy ORM.
- Modular backend architecture.
- Environment-based configuration.
- Service layer architecture.

---

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios

### Backend

- FastAPI
- PostgreSQL
- SQLAlchemy
- LangChain
- ChromaDB
- Sentence Transformers
- PyPDF
- Passlib (bcrypt)
- Python-JOSE (JWT)
- Python Dotenv

### AI

- Retrieval-Augmented Generation (RAG)
- Groq LLM
- all-MiniLM-L6-v2 Embeddings
- Semantic Search

---

## Project Structure

```text
docmind
├── client
│   ├── src
│   ├── public
│   └── ...
│
├── server
│   ├── app
│   │   ├── api
│   │   │   └── routes
│   │   ├── core
│   │   ├── models
│   │   ├── rag
│   │   ├── schemas
│   │   ├── services
│   │   └── utils
│   ├── uploads
│   ├── processed
│   └── chroma_db
│
└── docs
```

---

## API Endpoints

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Documents

- `POST /documents/upload`

### Chat

- `POST /chat`

---

## Current Progress

### Completed

- PDF Upload
- PDF Processing
- Text Extraction
- Recursive Chunking
- Embedding Generation
- ChromaDB Integration
- Semantic Retrieval
- Groq LLM Integration
- RAG Chat API
- PostgreSQL Integration
- SQLAlchemy ORM
- User Authentication
- JWT Authentication
- Password Hashing
- Protected Routes Foundation
- Service Layer Architecture

---

## Upcoming Features

- Repository Layer
- Alembic Database Migrations
- Multi-user Document Management
- Chat History
- Multiple Document Support
- Source Citations
- Frontend Authentication
- Protected React Routes
- User Dashboard
- Conversation Management
- Docker Deployment
- CI/CD Pipeline

---

## Learning Goals

This project is being developed to gain practical experience with:

- Retrieval-Augmented Generation (RAG)
- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT Authentication
- Vector Databases
- Semantic Search
- Large Language Models
- Production Backend Architecture
- Modern React Development

---

## Current Architecture

```text
                React Frontend
                       │
                       ▼
                 FastAPI Backend
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 Authentication      RAG Engine     PostgreSQL
        │              │
        ▼              ▼
      JWT        ChromaDB Vector Store
                        │
                        ▼
              Sentence Transformers
                        │
                        ▼
                   Groq LLM
```

---

## Status

**Current Version:** Early Development

Core RAG functionality and user authentication are fully operational. The next phase focuses on expanding the application into a production-ready, multi-user AI document platform.

---

Built while exploring modern Retrieval-Augmented Generation systems, scalable backend architecture, and production-ready AI application development from the ground up.