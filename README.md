# Vehicle Rental System

This repository contains a collection of microservices for a vehicle rental application. The project is structured as a monorepo with separate modules for:

- **User Service**: Handles user registration, login, and profile functionalities.
- **Admin Service**: Provides an admin interface for logging in, managing provider registration requests, updating provider statuses (approve/reject), and viewing system analytics.
- **Provider Service**: Allows vehicle rental providers to register (with legal documents, images, etc.), manage their vehicles, and receive ratings & reviews. Providers must be approved by an admin before they can log in.

---

## Module Details

### User Service

**Purpose:**  
Manages customer interactions including registration, login, and profile management.

**Key Endpoints:**
- `POST /api/users/register` – User registration.
- `POST /api/users/login` – User login.
- `GET /api/users/profile` – Protected endpoint to retrieve user profile.

---

### Admin Service

**Purpose:**  
Allows designated admins to log in and manage provider registrations, update provider statuses, and view analytics.

**Key Endpoints:**
- `POST /api/admin/login` – Admin login (credentials: email: `admin@gmail.com`, password: `12345`).
- `GET /api/admin/providers/pending` – View pending provider registration requests.
- `POST /api/admin/providers/:providerId/status` – Update a provider's status to "approved" or "rejected".
- `GET /api/admin/analytics` – Retrieve aggregated system statistics (e.g., total providers, approved/pending/rejected counts, total vehicles, two-wheelers, four-wheelers).

**Security:**  
Admin routes (except login) are protected using JWT middleware.

---

### Provider Service

**Purpose:**  
Enables rental providers to register, upload legal documents, manage their vehicles, and receive ratings & reviews.

**Key Functionalities:**

- **Provider Registration & Login:**
  - `POST /api/provider/register` – Provider registers with details such as name, email, password (hashed), city, address, mobile, images, document URLs, etc. The default status is "pending".
  - `POST /api/provider/login` – Provider login (only if the status is updated to "approved").
  - `GET /api/provider/approved` – Retrieve a list of approved providers.

- **File Uploads:**
  - `POST /api/provider/upload/document` – Upload a legal document (PDF) for provider verification. Only PDF files are accepted; files are stored in the `uploads/` folder at the root of the provider-service.

- **Vehicle Management:**
  - `POST /api/vehicles` – Add a new vehicle.
  - `PUT /api/vehicles/:id` – Update vehicle details.
  - `DELETE /api/vehicles/:id` – Soft delete a vehicle (mark as deleted using `isDeleted` flag).
  - `GET /api/vehicles` – Retrieve all vehicles with pagination and sorting.
  - `GET /api/vehicles/provider/:providerId` – Retrieve vehicles for a specific provider.
  - *(Additional endpoints for searching, filtering by price, updating quantity, etc.)*

- **Ratings & Reviews:**
  - `POST /api/reviews` – Add a review for a provider or vehicle.
  - `GET /api/reviews/provider/:providerId` – Retrieve reviews for a specific provider.
  - `GET /api/reviews/vehicle/:vehicleId` – Retrieve reviews for a specific vehicle.
  - `GET /api/reviews/provider/:providerId/average` – Compute and return the average rating for a provider.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (running locally on port 27017, or update the connection string accordingly)

### Environment Variables

Each service has its own `.env` file. Examples:

**provider-service/.env**
```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=your_jwt_secret_here_provider

**provider admin-service/.env**
```PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=VehicleRentalSuperSecret123

**user-service/.env**
```PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=your_jwt_secret_here_user


#### Installation

cd user-service
npm install

cd ../admin-service
npm install

cd ../provider-service
npm install

#### Running the Services
# User Service:

cd user-service
npm run dev

#Admin Service:
cd admin-service
npm run dev

#Provider Service
cd provider-service
npm run dev

### Use Postman or any API testing tool to verify the endpoints


**Provider Service Testing (using Postman)**

### Provider Registration:
**URL:** `POST http://localhost:5002/api/provider/register`

**Body (raw JSON):**
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

### Provider Login:
**URL:** `POST http://localhost:5002/api/provider/login`

**Body:**
```json
{
  "email": "provider1@example.com",
  "password": "secretpass"
}
```
**Outcome:**
- If status is "pending": a `403` error is returned.
- After admin updates the status to "approved", login returns a JWT token.

### File Upload (Legal Document):
**URL:** `POST http://localhost:5002/api/provider/upload/document`

**Body:** Use `form-data` with key **"document"** (set type to **File**) and attach a PDF.

**Outcome:** Document is uploaded successfully with file details returned.

---

## Vehicle Management:

### Add Vehicle:
**URL:** `POST http://localhost:5002/api/vehicles`

**Body:**
```json
{
  "providerId": "<provider_object_id>",
  "type": "2-wheeler",
  "name": "Scooter",
  "price": 150,
  "quantity": 5
}
```

### Update Vehicle:
**URL:** `PUT http://localhost:5002/api/vehicles/<vehicle_id>`

**Body:**
```json
{
  "price": 200
}
```

### Soft Delete Vehicle:
**URL:** `DELETE http://localhost:5002/api/vehicles/<vehicle_id>`

### Get Vehicles by Provider:
**URL:** `GET http://localhost:5002/api/vehicles/provider/<provider_object_id>`

---

## Ratings & Reviews:

### Add Review:
**URL:** `POST http://localhost:5002/api/reviews`

**Body:**
```json
{
  "rating": 5,
  "comment": "Excellent service!",
  "reviewedBy": "<user_object_id>",
  "provider": "<provider_object_id>"
}
```

### Get Provider Reviews:
**URL:** `GET http://localhost:5002/api/reviews/provider/<provider_object_id>`

### Get Vehicle Reviews:
**URL:** `GET http://localhost:5002/api/reviews/vehicle/<vehicle_object_id>`

### Get Average Rating for Provider:
**URL:** `GET http://localhost:5002/api/reviews/provider/<provider_object_id>/average`

---

## Admin Service Testing:

### Admin Login:
**URL:** `POST http://localhost:5001/api/admin/login`

**Body:**
```json
{
  "email": "admin@gmail.com",
  "password": "12345"
}
```
**Outcome:** Returns a JWT token for the admin.

### View Pending Providers:
**URL:** `GET http://localhost:5001/api/admin/providers/pending`

**Headers:**
```
Authorization: Bearer <admin_token>
```
**Outcome:** List of providers with status "pending".

### Update Provider Status:
**URL:** `POST http://localhost:5001/api/admin/providers/<providerId>/status`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Body:**
```json
{
  "status": "approved"
}
```
**Outcome:** Provider status is updated accordingly.

### Analytics:
**URL:** `GET http://localhost:5001/api/admin/analytics`

**Headers:**
```
Authorization: Bearer <admin_token>
```
**Outcome:** Returns aggregated analytics data for providers and vehicles.

---

## User Service Testing:
Test endpoints for user registration, login, and profile retrieval similarly using Postman.

---

## Future Enhancements:
- **Admin Approval Enhancements:** Automate notifications and add more detailed provider management.
- **File Uploads:** Enhance file handling by integrating cloud storage solutions like AWS S3.
- **Input Validation:** Implement robust validation using libraries like `express-validator` or `Joi`.
- **Advanced Ratings & Reviews:** Allow updating or deleting reviews.
- **User Service Enhancements:** Implement booking/reservation systems, favorites, and reviews integration.
- **Security & Deployment:** Add HTTPS, rate limiting, Dockerization, CI/CD pipelines, and comprehensive logging.


