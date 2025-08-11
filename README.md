# MeetUs VR Login System

A React-based authentication system with a beautiful login interface and dashboard functionality.

## Features

- **Beautiful Login Interface**: Modern design with gradient backgrounds and smooth animations
- **Form Validation**: Real-time email and password validation
- **Redux State Management**: Centralized state management using Redux Toolkit
- **Protected Routes**: Automatic redirection based on authentication status
- **API Integration**: RESTful API integration with axios interceptors
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Requirements Met

✅ **Login Form**: Email and password fields with validation  
✅ **Business Rules**: Login button disabled until valid email and password  
✅ **API Integration**: Calls login API with proper credentials  
✅ **Token Storage**: Stores authentication token in localStorage  
✅ **User Info**: Retrieves and displays user information  
✅ **Dashboard**: Simple dashboard with user ID, name, and logout  
✅ **Authentication Flow**: Complete login/logout cycle  
✅ **Error Handling**: Comprehensive error handling and validation  
✅ **Redux Integration**: State management with Redux Toolkit

## API Endpoints

- **Login**: `POST /v1/yeshtery/token`
- **User Info**: `GET /v1/user/info`

## Test Credentials

Use these credentials to test the system:

- **Email**: `dev.aert@gmail.com`
- **Password**: `helloworld`

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── api/
│   └── axios.js          # Axios configuration with interceptors
├── components/
│   └── ui/               # UI components (Button, Input, Card)
├── config/
│   └── config.js         # Application configuration
├── layout/
│   └── MainLayout.jsx    # Main routing layout
├── pages/
│   ├── Login/            # Login page component
│   └── Dashboard/        # Dashboard page component
├── store/
│   ├── authSlice.js      # Authentication state management
│   └── store.js          # Redux store configuration
└── main.jsx              # Application entry point
```

## Key Components

### Login Component

- Form validation for email and password
- Real-time error display
- Loading states during API calls
- Beautiful gradient background design

### Dashboard Component

- Displays user ID and name from API
- Logout functionality
- Protected route (redirects to login if not authenticated)

### Authentication Flow

1. User enters credentials
2. System validates email format and required fields
3. API call to login endpoint
4. Token storage in localStorage
5. User info retrieval
6. Redirect to dashboard
7. Logout clears token and redirects to login

## Technologies Used

- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## Development

The application runs on port 3000 as configured in `vite.config.js`. The axios interceptor automatically handles:

- Authentication headers
- Error responses
- Token expiration (401 handling)
- Request/response logging

## Testing the API

You can test the API endpoints using curl:

```bash
# Test login
curl https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email": "dev.aert@gmail.com", "password": "helloworld", "isEmployee": true}'
```

## Future Enhancements

- HTTP-only cookie implementation for better security
- Refresh token handling
- Remember me functionality
- Password reset capabilities
- User profile management
