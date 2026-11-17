# API Contract

## 1. Authentication

### Register User
- Method: POST
- Endpoint: /api/auth/register

Request Body:
```json
{
  "name": "Sneha",
  "email": "sneha@gmail.com",
  "password": "123456"
}