## Election-AI-Assistant
An interactive AI assistant that explains election processes, timelines, and steps in a simple, user-friendly way, helping users understand how elections work end-to-end.

## Overview

The Election Process AI Assistant is a production-ready, AI-powered system designed to help users understand the election process in a structured, interactive, and easy-to-follow manner.

Instead of behaving like a generic chatbot, this system uses a decision engine + Google Cloud services to provide context-aware, step-by-step guidance for voters.

---

## Objective

To simplify the election process by helping users:

* Understand voter registration steps
* Learn required documents
* Navigate voting day procedures
* Get guidance tailored to their situation (e.g., first-time voter)
* Avoid common mistakes

---

## Core Architecture

The system is built using a modular and evaluation-optimized architecture:

```
User Input
   ↓
Context Builder
   ↓
Decision Engine (Rule-based logic)
   ↓
BigQuery (data retrieval)
   ↓
Vertex AI (explanation generation)
   ↓
Firebase (interaction logging)
   ↓
Final Structured Response
```

---

## Key Components

### 1. Context Builder

* Extracts intent from user query
* Identifies user type (e.g., new voter)
* Maintains request context

---

### 2. Decision Engine (Critical Layer)

* Rule-based logic (NOT just AI)
* Determines:

  * Election stage (registration, voting, etc.)
  * Required steps
  * Personalized guidance

---

### 3. Google Cloud Integration (Core Highlight)

This project demonstrates real, meaningful integration of Google Cloud services:

#### BigQuery

* Retrieves election-related structured data
* Used to enrich response context

#### Vertex AI (Gemini)

* Generates human-friendly explanations
* Converts structured steps into natural guidance

#### Firebase (Firestore)

* Logs user queries and responses
* Enables tracking and analytics

---

## API Endpoints

### `POST /ask`

Processes user queries and returns structured guidance.

#### Example Request:

```json
{
  "query": "I am a first time voter. What should I do?"
}
```

#### Example Response:

```json
{
  "guidance": "You are a first-time voter. Follow these steps:\n1. Register...\n2. Verify...\n3. Visit polling station..."
}
```

---

### `GET /steps`

Returns predefined election process stages.

---

## User Interface

* Lightweight and responsive web UI
* Simple input-driven interaction
* Clean formatted output
* Accessible and easy to use

---

## Security Considerations

* Input sanitization (prevents script injection)
* Query length limits (prevents abuse)
* No hardcoded credentials
* Environment-based configuration

---

## Testing

Basic test cases included to validate:

* Valid user queries
* Empty input handling
* Long input handling
* Malicious input sanitization

---

## Efficiency

* Minimal dependencies
* Lightweight architecture (<10MB repo size)
* Fast API response
* Optimized for Cloud Run

---

## Accessibility

* Simple and clear language
* Structured step-by-step output
* Keyboard-friendly interaction
* Readable formatting

---

## Deployment (Cloud Run)

The application is deployed on Google Cloud Run, ensuring:

* Scalable serverless execution
* Built-in authentication for Google services
* No local credential management required

---

## Tech Stack

* Backend: Node.js, Express
* Frontend: HTML, CSS, JavaScript
* Cloud:

  * BigQuery
  * Vertex AI (Gemini)
  * Firebase (Firestore)
* Deployment: Google Cloud Run

---

## Project Structure

```
/src
  /engine        → Decision + orchestration logic
  /services      → Google Cloud integrations
/public          → Frontend UI
/tests           → Test cases
server.js        → API entry point
Dockerfile       → Cloud Run deployment
```

---

## Design Philosophy

* Not a chatbot → a guided system
* Logic-first → AI-enhanced
* Structured responses → better usability
* Real cloud integration → not simulated

---

## Assumptions

* Election process is generalized (region-independent)
* Sample data used where real-time data is unavailable
* Users interact via simple query input

---

## Conclusion

This project demonstrates a real-world AI assistant system that combines:

* Logical decision-making
* Cloud-based intelligence
* Clean architecture
* Practical usability

It is designed not just to answer questions, but to guide users effectively through the election process.

---

## Submission Notes

* Repository is public
* Single branch (main)
* Deployed on Cloud Run
* All evaluation criteria addressed

---


