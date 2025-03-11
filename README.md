# Vehicle Rental System

This repository contains a collection of microservices for a vehicle rental application. The system is structured as a monorepo with three independent modules:

- **User Service:** Manages customer registration, login, and profile management.
- **Admin Service:** Provides an admin interface for logging in, managing provider registration requests, updating provider statuses (approve/reject), and viewing system analytics.
- **Provider Service:** Enables vehicle rental providers to register (upload legal documents, images, etc.), manage their vehicles, and receive ratings & reviews. Providers must be approved by an admin before they can log in.

This README will guide you through setting up the development environment, running the project, and testing every endpoint using Postman.

---

## Table of Contents

1. [Project Overview & Architecture](#project-overview--architecture)
2. [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installing MongoDB](#installing-mongodb)
    - [Environment Variables](#environment-variables)
3. [Installation & Running the Services](#installation--running-the-services)
4. [API Endpoints & Usage](#api-endpoints--usage)
    - [User Service Endpoints](#user-service-endpoints)
    - [Admin Service Endpoints](#admin-service-endpoints)
    - [Provider Service Endpoints](#provider-service-endpoints)
5. [Future Enhancements](#future-enhancements)
6. [Contributing & License](#contributing--license)

---

## Project Overview & Architecture

The system is divided into three microservices:

### 1. User Service
- **Purpose:** Manages customer accounts.
- **Key Endpoints:**
  - `POST /api/users/register` – Register a new user.
  - `POST /api/users/login` – User login.
  - `GET /api/users/profile` – Retrieve the logged-in user's profile (JWT-protected).

### 2. Admin Service
- **Purpose:** Enables admins to review and manage provider registrations, update provider statuses, and view system analytics.
- **Key Endpoints:**
  - `POST /api/admin/login` – Admin login.
  - `GET /api/admin/providers/pending` – List pending provider requests.
  - `POST /api/admin/providers/:providerId/status` – Update provider status.
  - `GET /api/admin/analytics` – Retrieve aggregated statistics.

### 3. Provider Service
- **Purpose:** Allows rental providers to register, upload documents, manage vehicles, and receive reviews.
- **Key Endpoints:**
  - `POST /api/provider/register` – Register a new provider.
  - `POST /api/provider/login` – Provider login.
  - `POST /api/provider/upload/document` – Upload a legal document.
  - `POST /api/vehicles` – Add a new vehicle.
  - `PUT /api/vehicles/:id` – Update vehicle details.
  - `DELETE /api/vehicles/:id` – Soft delete a vehicle.
  - `GET /api/reviews/provider/:providerId` – Get provider reviews.
  - `GET /api/reviews/vehicle/:vehicleId` – Get vehicle reviews.

---

## Setup Instructions

### Prerequisites
- **Node.js:** Install from [https://nodejs.org/](https://nodejs.org/)
- **MongoDB:** Install from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Installing MongoDB
1. Download and install MongoDB.
2. Start MongoDB server.
3. Optionally, install MongoDB Compass for database management.

### Environment Variables
Each service requires its own `.env` file. Example:

#### Provider Service `.env`
```
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=your_jwt_secret_here_provider
```

#### Admin Service `.env`
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=VehicleRentalSuperSecret123
```

#### User Service `.env`
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=your_jwt_secret_here_user
```

---

## Installation & Running the Services

### Installation
For each service, run:
```bash
npm install
```

### Running the Services
To start each service:

**User Service:**
```bash
cd user-service
npm run dev
```

**Admin Service:**
```bash
cd admin-service
npm run dev
```

**Provider Service:**
```bash
cd provider-service
npm run dev
```

---

## API Endpoints & Usage

### User Service Endpoints
**User Registration:**
```http
POST /api/users/register
```
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**User Login:**
```http
POST /api/users/login
```
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**User Profile:**
```http
GET /api/users/profile
```
Authorization: Bearer `<user_token>`

### Admin Service Endpoints
**Admin Login:**
```http
POST /api/admin/login
```
```json
{
  "email": "admin@gmail.com",
  "password": "12345"
}
```

**View Pending Providers:**
```http
GET /api/admin/providers/pending
```
Authorization: Bearer `<admin_token>`

**Update Provider Status:**
```http
POST /api/admin/providers/:providerId/status
```
```json
{
  "status": "approved"
}
```

**Analytics:**
```http
GET /api/admin/analytics
```
Authorization: Bearer `<admin_token>`

### Provider Service Endpoints
**Provider Registration:**
```http
POST /api/provider/register
```
```json
{
  "name": "Provider One",
  "email": "provider1@example.com",
  "password": "secretpass",
  "city": "New York",
  "address": "123 Main St",
  "mobile": "1234567890",
  "description": "Quality rental vehicles",
  "images": ["http://example.com/image1.jpg"],
  "document": "http://example.com/document.pdf"
}
```

**Provider Login:**
```http
POST /api/provider/login
```
```json
{
  "email": "provider1@example.com",
  "password": "secretpass"
}
```

**File Upload:**
```http
POST /api/provider/upload/document
```

**Vehicle Management:**
```http
POST /api/vehicles
```
```json
{
  "providerId": "<provider_object_id>",
  "type": "2-wheeler",
  "name": "Scooter",
  "price": 150,
  "quantity": 5
}
```

---

## Future Enhancements
- **Automate provider approval notifications.**
- **Enhance file handling with cloud storage.**
- **Implement booking & reservation systems.**
- **Improve security with HTTPS and rate limiting.**

