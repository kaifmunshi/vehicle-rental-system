# Vehicle Rental System

This repository contains a collection of microservices for a vehicle rental application. The project is structured as a monorepo with three main modules:

- **User Service:** Manages customer registration, login, and profile functionalities.
- **Admin Service:** Provides an admin interface for logging in, managing provider registration requests (approve/reject), and viewing system analytics.
- **Provider Service:** Enables vehicle rental providers to register (upload legal documents and images), manage their vehicles, and receive ratings & reviews. Providers must be approved by an admin before they can log in.

This document explains the flow of the system and details every API endpoint, including how to test them using Postman.

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
5. [Testing the Endpoints with Postman](#testing-the-endpoints-with-postman)
6. [Future Enhancements](#future-enhancements)
7. [Contributing & License](#contributing--license)

---

## 1. Project Overview & Architecture

The system consists of three independent microservices:

### User Service
- **Purpose:** Manages customer accounts.
- **Flow:** Users register, log in, and then use a JWT token to access protected endpoints (like retrieving profile details).

### Admin Service
- **Purpose:** Allows admins to log in, review pending provider registration requests, update provider statuses, and view system-wide analytics.
- **Flow:** Admin logs in using predefined credentials and can manage provider requests and analytics.

### Provider Service
- **Purpose:** Enables vehicle rental providers to register, log in (if approved), manage vehicles, and receive ratings & reviews.
- **Flow:** Providers register with a status of "pending." An admin must update their status to "approved" before they can log in.

---

## 2. Setup Instructions

### Prerequisites
- **Node.js:** Download and install from [nodejs.org](https://nodejs.org/) (v14 or later recommended).
- **MongoDB:** Install from [mongodb.com](https://www.mongodb.com/try/download/community). Optionally, install MongoDB Compass.

### Installing MongoDB
1. Download & Install MongoDB.
2. Start MongoDB server.

### Environment Variables
Each service has its own `.env` file:

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

## 3. Installation & Running the Services

### Installation
For each service:
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

Ensure MongoDB is running before starting the services.

---

## 4. API Endpoints & Usage

### User Service Endpoints
**User Registration:**
```http
POST /api/users/register
```

**User Login:**
```http
POST /api/users/login
```

**User Profile:**
```http
GET /api/users/profile
```

### Admin Service Endpoints
**Admin Login:**
```http
POST /api/admin/login
```

**View Pending Providers:**
```http
GET /api/admin/providers/pending
```

**Update Provider Status:**
```http
POST /api/admin/providers/:providerId/status
```

**Analytics:**
```http
GET /api/admin/analytics
```

### Provider Service Endpoints
**Provider Registration:**
```http
POST /api/provider/register
```

**Provider Login:**
```http
POST /api/provider/login
```

**File Upload:**
```http
POST /api/provider/upload/document
```

**Vehicle Management:**
```http
POST /api/vehicles
```

**Update Vehicle:**
```http
PUT /api/vehicles/:id
```

**Soft Delete Vehicle:**
```http
DELETE /api/vehicles/:id
```

**Ratings & Reviews:**
```http
POST /api/reviews
```

---

## 5. Testing the Endpoints with Postman

### General Steps:
1. Open Postman and create a new request.
2. Set the HTTP method and URL as per the endpoint details above.
3. Add necessary headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer <token>` for protected endpoints.
4. Enter the request body in raw JSON (or use form-data for file uploads).
5. Send the request and verify that the response matches the expected outcome.

### Example: Testing Provider Registration
**Method:** `POST`
**URL:** `http://localhost:5002/api/provider/register`
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
**Outcome:** Provider registered with a status of "pending".

### Example: Testing Admin Update Provider Status
**Method:** `POST`
**URL:** `http://localhost:5001/api/admin/providers/<providerId>/status`
**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```
```json
{
  "status": "approved"
}
```
**Outcome:** Provider's status is updated and the updated provider document is returned.

---

## 6. Future Enhancements
- **Automate provider approval notifications.**
- **Enhance file handling with cloud storage.**
- **Implement booking & reservation systems.**
- **Improve security with HTTPS and rate limiting.**

---

## 7. Contributing & License
- Feel free to open issues or submit pull requests.
- Licensed under the MIT License.

