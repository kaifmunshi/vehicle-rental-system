# Vehicle Rental System

This repository contains a collection of microservices for a vehicle rental application. The project is structured as a monorepo with separate modules for:

- **User Service**: Handles user registration, login, and profile functionalities.
- **Admin Service**: Provides an admin interface for logging in and managing rental provider requests (approval/rejection).
- **Provider Service**: Allows vehicle rental providers to register with details such as name, email, password, city, address, mobile number, images, and documents. Providers must be approved by an admin before they can log in.


## Module Details

### User Service
- **Purpose**: Manages user registration, login, and profile management.
- **Key Endpoints**:
  - `/api/users/register` – User registration.
  - `/api/users/login` – User login.
  - `/api/users/profile` – Protected endpoint to get user profile.

### Admin Service
- **Purpose**: Allows admins (with pre-defined credentials) to log in and manage provider registration requests.
- **Key Endpoints**:
  - `/api/admin/login` – Admin login.
  - `/api/admin/providers/pending` – View pending provider registration requests.
- **Authentication**: Admin routes are protected using JWT middleware (`adminProtect.js`).

### Provider Service
- **Purpose**: Allows vehicle rental providers to register by providing details (name, email, password, city, address, mobile, images, document, etc.). Providers are created with a default status of `pending` and must be approved by an admin to log in.
- **Key Endpoints**:
  - `/api/provider/register` – Provider registration.
  - `/api/provider/login` – Provider login (only for approved providers).
  - `/api/provider/approved` – Retrieve list of approved providers for user display.
- **Password Security**: Provider passwords are hashed using bcrypt.

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or later)
- **MongoDB** (running locally on port 27017, or adjust the URI accordingly)

### Environment Variables
Each service has its own `.env` file. Example for **provider-service**:
```env
PORT=5002
MONGO_URI=mongodb://127.0.0.1:27017/vehicle-rental
JWT_SECRET=your_jwt_secret_here_provider

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


Registration:

URL: http://localhost:5002/api/provider/register
Method: POST
Body (raw JSON):

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
Expected Outcome: A response confirming registration with a pending status.
Login:

URL: http://localhost:5002/api/provider/login
Method: POST
Body (raw JSON):
json
Copy
{
  "email": "provider1@example.com",
  "password": "secretpass"
}
Note: Initially returns a 403 error since the status is pending. After manually setting the provider's status to approved in MongoDB, login should succeed and return a JWT token.
Get Approved Providers:

URL: http://localhost:5002/api/provider/approved
Method: GET
Expected Outcome: A list of providers with status approved
