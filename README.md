# MeetUs VR Login System

A React-based authentication system with a beautiful login interface and dashboard functionality, implementing the exact requirements from the task specification.

## Features

- **Beautiful Login Interface**: Modern design with gradient backgrounds and smooth animations
- **Form Validation**: Real-time email and password validation using Formik + Yup
- **Redux State Management**: Centralized state management using Redux Toolkit
- **Protected Routes**: Automatic redirection based on authentication status
- **API Integration**: RESTful API integration with axios interceptors
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Requirements Implementation

✅ **Login Form**: Email and password fields with validation  
✅ **Business Rules**: Login button disabled until valid email and password  
✅ **API Integration**: Calls login API with proper credentials  
✅ **Token Storage**: Stores authentication token (prepared for HTTP-only cookies)  
✅ **User Info**: Retrieves and displays user ID and name  
✅ **Dashboard**: Simple dashboard with user ID, name, and logout  
✅ **Authentication Flow**: Complete login/logout cycle  
✅ **Error Handling**: Comprehensive error handling and validation  
✅ **Redux Integration**: State management with Redux Toolkit

## API Endpoints & Flow

### 1. Login API

- **URL**: `POST /v1/yeshtery/token`
- **Headers**: `Content-Type: application/json`
- **Body**: `{email: string, password: string, isEmployee: true}`
- **Response**: `{ token: string, refresh: string, ... }`
- **Note**: Access token is in `token` attribute, not `refresh`

### 2. User Info API

- **URL**: `GET /v1/user/info`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`
- **Body**: None (GET request)
- **Response**: `{ id: string, name: string, ... }`

### 3. Logout API

- **URL**: `POST /v1/auth/logout`
- **Headers**: `Authorization: Bearer <token>`

### 4. Authentication Flow

1. User enters credentials
2. System validates email format and required fields
3. **Step 6**: API call to login endpoint
4. **Step 7**: Store token (currently localStorage, prepared for HTTP-only cookies)
5. **Step 8**: API call to user info endpoint
6. **Step 9**: Store user ID and name
7. **Step 10**: Redirect to dashboard
8. Logout clears token and redirects to login

## Test Credentials

Use these credentials to test the system:

- **Email**: `dev.aert@gmail.com`
- **Password**: `helloworld`

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd meetusar-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file** (optional)

   ```bash
   # Create .env file in root directory
   VITE_API_URL=https://api-yeshtery.dev.meetusvr.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── api/
│   ├── auth/
│   │   └── login.js          # Login API functions
│   └── axios.js              # Axios configuration with interceptors
├── components/
│   └── ui/                   # UI components (Button, Input, Card)
├── config/
│   └── config.js             # Application configuration
├── layout/
│   └── MainLayout.jsx        # Main routing layout
├── pages/
│   ├── Login/                # Login page component
│   └── Dashboard/            # Dashboard page component
├── store/
│   ├── authSlice.js          # Authentication state management
│   └── store.js              # Redux store configuration
└── main.jsx                  # Application entry point
```

## Key Components

### Login Component

- Form validation for email and password using Formik + Yup
- Real-time error display
- Loading states during API calls
- Beautiful gradient background design
- Arabic text support

### Dashboard Component

- Displays user ID and name from API
- Logout functionality
- Protected route (redirects to login if not authenticated)

### Authentication Flow

1. User enters credentials
2. System validates email format and required fields
3. API call to login endpoint
4. Token storage (localStorage for now, HTTP-only cookies ready)
5. User info retrieval
6. Redirect to dashboard
7. Logout clears token and redirects to login

## Technologies Used

- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Formik + Yup** - Form handling and validation
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

# Test user info (after getting token)
curl https://api-yeshtery.dev.meetusvr.com/v1/user/info \
  -X GET \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Test logout
curl https://api-yeshtery.dev.meetusvr.com/v1/auth/logout \
  -X POST \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Implementation Notes

### HTTP-Only Cookies

The system is prepared for HTTP-only cookies but currently uses localStorage for development. To implement HTTP-only cookies:

1. Backend must set `Set-Cookie` header with `HttpOnly` flag
2. Frontend will automatically send cookies with requests
3. Remove localStorage token handling

### Error Handling

- Login API failure returns to login form (step 3)
- User info API failure clears token and returns to login
- Network errors are handled gracefully
- Validation errors are displayed immediately

### State Management

- **Redux Toolkit** for centralized state management
- **Async thunks** for API calls
- **Automatic error handling** and loading states
- **Persistent authentication** across page reloads

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Dependencies not found**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **API connection issues**

   - Check if API server is running
   - Verify API URL in config
   - Check network connectivity

4. **401 Unauthorized Error**
   - **Problem**: Getting 401 error when trying to login
   - **Cause**: Invalid credentials or API endpoint issues
   - **Solutions**:

     ```bash
     # 1. Verify API URL is correct
     # Check .env file contains:
     VITE_API_URL=https://api-yeshtery.dev.meetusvr.com

     # 2. Test API with curl
     curl https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token \
       -X POST \
       -H "Content-Type: application/json" \
       -d '{"email": "dev.aert@gmail.com", "password": "helloworld", "isEmployee": true}'

     # 3. Check if API server is accessible
     curl -I https://api-yeshtery.dev.meetusvr.com
     ```

   - **Common fixes**:
     - Ensure `.env` file exists with correct API URL
     - Restart development server after creating `.env`
     - Check if API server is running and accessible
     - Verify credentials are correct

### Build Issues

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- HTTP-only cookie implementation for better security
- Refresh token handling
- Remember me functionality
- Password reset capabilities
- User profile management
- Multi-language support (Arabic/English)
- Dark mode support
- Progressive Web App (PWA) features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
