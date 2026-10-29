# ⚙️ Backend API — Expert System for Digital Printing Material Selection

A RESTful API developed for **Fortune Digital Printing** to support a web-based expert system for digital printing material selection using the **Rule-Based Forward Chaining Method**.

The backend handles application logic, database operations, authentication, knowledge base management, and material recommendation processing. It integrates with the frontend application to provide a structured consultation experience and support product information and promotional content.

## 🔗 Live Demo & Repositories

🌐 **Live API Deployment:** [Visit Backend API](https://back-end-es.vercel.app/)

⚙️ **Backend Repository:** [View Backend Source Code](https://github.com/Yudhadp13/back-end-es)

💻 **Frontend Repository:** [View Frontend Source Code](https://github.com/Yudhadp13/front-end-es)

📖 **API Documentation:** Generated using Swagger and Swagger Autogen. See the API documentation section below for configuration details.

---

## 📌 Project Overview

Choosing suitable digital printing materials can be challenging because each material has different characteristics, specifications, and applications.

This project implements a rule-based expert system that evaluates user requirements and provides material recommendations based on predefined rules in a knowledge base.

The backend serves as the central processing layer between the frontend application and the database.

### 🎯 Project Objectives

- **Intelligent Recommendations:** Determine suitable printing materials based on user requirements.
- **Knowledge Base Management:** Maintain consultation questions, specifications, and IF–THEN rules.
- **Data Management:** Organize categories, materials, specifications, and related application data.
- **Secure Authentication:** Support account authentication and protected application resources.
- **Consultation History:** Store and retrieve previous consultation results.
- **Product Promotion:** Support promotional banners and product information displayed through the frontend.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [TypeScript](https://www.typescriptlang.org/) | Static typing and maintainable code |
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | REST API framework |
| [MongoDB](https://www.mongodb.com/) | NoSQL database for application data |
| [JSON Web Token](https://jwt.io/) | Token-based authentication |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Password hashing |
| [Swagger Autogen](https://www.npmjs.com/package/swagger-autogen) | API documentation generation |
| [Cloudinary](https://cloudinary.com/) | Media storage and image management |
| [Zoho Mail](https://www.zoho.com/mail/) | SMTP email configuration |
| [Vercel](https://vercel.com/) | Deployment and hosting |

---

## 🧠 Core Engine: Forward Chaining

The backend implements the **Forward Chaining inference method**, a data-driven reasoning approach that evaluates known facts against predefined rules to derive a conclusion.

### How It Works

1. **Receive User Answers:** The backend receives consultation inputs from the frontend.
2. **Collect Specifications:** Answers are associated with the relevant specifications.
3. **Evaluate Rules:** The inference engine checks the collected specifications against conditions in the knowledge base.
4. **Determine Recommendations:** Applicable IF–THEN rules are evaluated to identify a suitable material.
5. **Return Results:** The backend sends the recommendation to the frontend.
6. **Record Consultation:** Consultation information and results can be stored for history and review.

### Example of a Knowledge Base Rule

```text
IF
  Specification A is satisfied
  AND Specification B is satisfied

THEN
  Recommend Material X
```

The actual recommendation depends on the questions, specifications, and rules configured in the database.

---

## ✨ Key API Features

### 🔐 1. Authentication & User Management

- User registration and login.
- Token-based authentication.
- Account activation.
- User profile management.
- Password updates.
- Access control for protected resources.

### 🧩 2. Expert System Consultation

- Retrieve consultation questions and answer options.
- Process user answers and associated specifications.
- Evaluate rules using Forward Chaining.
- Generate material recommendations.
- Record and retrieve consultation history.

### 📚 3. Knowledge Base Management

- Manage consultation questions and answer options.
- Configure specification associations.
- Create, update, and delete IF–THEN rules.
- Associate rule conditions with specifications.
- Associate rule outcomes with recommended materials.

### 🗂️ 4. Master Data Management

- **Categories:** Organize printing materials.
- **Materials:** Manage product information and material details.
- **Specifications:** Maintain characteristics used by the inference engine.
- **Platforms:** Manage platform information and its associated materials, where applicable.

### 🖼️ 5. Promotional Content Management

- Manage promotional banner records.
- Store and retrieve banner image URLs.
- Update promotional content displayed on the homepage.
- Support product discovery through the frontend catalog.

These services support the application's additional role as a digital product catalog and promotional platform for Fortune Digital Printing.

### 📊 6. Consultation History

- Store consultation records.
- Associate records with user accounts, according to the implemented data model.
- Retrieve previous recommendations.
- Support users reviewing their consultation results.

---

## 🏗️ Application Architecture

The application uses a client-server architecture in which the frontend communicates with the backend through HTTP requests and JSON responses.

```text
┌──────────────────────────────────┐
│          Frontend Web            │
│       Next.js + TypeScript       │
└────────────────┬─────────────────┘
                 │
                 │ HTTP / JSON
                 ▼
┌──────────────────────────────────┐
│          Backend API             │
│        Node.js + Express          │
├──────────────────────────────────┤
│ Routes & Middlewares              │
│ Controllers                       │
│ Services & Business Logic         │
│ Models                            │
│ Forward Chaining Engine           │
│ Authentication & Authorization   │
└──────────┬──────────────┬────────┘
           │              │
           ▼              ▼
      Database         Cloudinary
      DATABASE_URL     Media Storage
```

The backend processes incoming requests, applies application rules, communicates with the configured database, and returns responses to the frontend. Cloudinary is configured for external media management.

---

## 📂 Project Structure

The repository is organized into the following directories:

```text
back-end-es/
├── src/
│   ├── controllers/    # Request handlers and API responses
│   ├── docs/           # Documentation-related files
│   ├── middlewares/    # Authentication and request processing
│   ├── models/         # Data models
│   ├── routes/         # API route definitions
│   ├── services/       # Business logic and inference processing
│   └── utils/          # Shared helper functions
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json
└── README.md
```

### Directory Responsibilities

- **controllers/** — Handle incoming requests and prepare API responses.
- **docs/** — Organize documentation-related resources.
- **middlewares/** — Process requests, including authentication and authorization where configured.
- **models/** — Define the application's data models.
- **routes/** — Define API endpoints and connect them to the appropriate handlers.
- **services/** — Implement business logic and inference-related processing.
- **utils/** — Provide reusable helper functions and utilities.

---

## 📖 API Documentation

The project uses **Swagger Autogen** to generate API documentation from the configured endpoint definitions.

The Swagger configuration includes the following server URLs:

| Environment | Base URL |
|---|---|
| Local API | `http://localhost:3000/api` |
| Deployed API | `https://back-end-es.vercel.app/api` |

### Authentication

The Swagger configuration defines HTTP Bearer authentication for endpoints that require an access token.

To test a protected endpoint, obtain a valid token through the implemented authentication flow and provide it using the Swagger authorization interface, if enabled.

### Documentation Configuration

The Swagger setup includes:

- API title and version.
- Local and deployed server definitions.
- Bearer authentication scheme.
- Request schemas for authentication, materials, categories, specifications, rules, questions, banners, and consultation sessions.

**Note:** The actual Swagger UI URL depends on how the documentation route is configured in the application. The server base URLs above are API base URLs, not necessarily the Swagger UI page.

---

## ⚙️ Environment Configuration

The backend uses environment variables to configure the database, authentication, email service, frontend origin, and media storage.

Create a `.env` file in the project root and configure the variables required by the application.

```env
# Database
DATABASE_URL="DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>""

# Authentication
SECRET=""

# SMTP Email Configuration
EMAIL_SMTP_SECURE=true
EMAIL_SMTP_HOST="smtp.zoho.com"
EMAIL_SMTP_PORT=465
EMAIL_SMTP_USER=""
EMAIL_SMTP_PASS=""
EMAIL_SMTP_SERVICE_NAME="Zoho"

# Frontend Application
CLIENT_HOST="http://localhost:3001"

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Environment Variable Reference

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Database connection configuration |
| `SECRET` | Secret used by the application's authentication or token logic |
| `EMAIL_SMTP_SECURE` | Enables secure SMTP transport |
| `EMAIL_SMTP_HOST` | SMTP server hostname |
| `EMAIL_SMTP_PORT` | SMTP server port |
| `EMAIL_SMTP_USER` | SMTP account username |
| `EMAIL_SMTP_PASS` | SMTP account password or app-specific credential |
| `EMAIL_SMTP_SERVICE_NAME` | Email service identifier |
| `CLIENT_HOST` | Frontend origin used by the backend where configured |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

Use the exact environment variable names expected by the source code. The example values above are placeholders; replace them with your own local configuration.

**Security:** Never commit real credentials, database connection strings, authentication secrets, SMTP passwords, or Cloudinary API secrets to GitHub.

---

## 🚀 Getting Started

### Prerequisites

Install the following tools and prepare the required services:

- Node.js
- npm
- Git
- Access to the configured database
- SMTP and Cloudinary credentials, if required for the features being tested

### 1. Clone the Repository

```bash
git clone https://github.com/Yudhadp13/back-end-es.git
cd back-end-es
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and populate it with the required environment variables.

Ensure `.env` is excluded from version control through `.gitignore`.

### 4. Run the Development Server

Use the development command defined in `package.json`. For example, if the project has a `dev` script:

```bash
npm run dev
```

The local API base URL configured in Swagger is:

```text
http://localhost:3000/api
```

The actual startup command and port depend on the project's scripts and server configuration.

### 5. Test the API

Use Postman or the configured Swagger UI to test available endpoints, including authentication, material management, and expert system consultation.

---

## 🔒 Security Considerations

- Store passwords using secure password hashing.
- Validate authentication tokens on protected endpoints.
- Restrict administrative operations to authorized users.
- Validate incoming request data.
- Keep secrets and credentials in environment variables.
- Avoid returning sensitive internal details in error responses.
- Configure CORS to permit only the intended frontend origins in production.

These are recommended security practices; verify the corresponding implementations in the source code before treating them as confirmed security guarantees.

---

## 🎓 Project Context

This backend was developed as part of an academic project focused on implementing an expert system for digital printing material selection.

The application combines rule-based inference, structured data management, authentication, and API integration to support material recommendations and product information services for Fortune Digital Printing.

**Industry:** Digital Printing  
**Application Type:** RESTful Web API  
**Inference Method:** Rule-Based Forward Chaining  
**Backend Framework:** Node.js & Express.js  
**API Documentation:** Swagger Autogen  
**Deployment Platform:** Vercel

---

## 👨‍💻 Developer

Developed as part of a web-based information system project focused on software development, expert systems, and digital business solutions.

**GitHub:** [Yudhadp13](https://github.com/Yudhadp13)

**Related Project:** [Frontend — Expert System for Digital Printing Material Selection](https://github.com/Yudhadp13/front-end-es)