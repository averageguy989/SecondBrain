# Automatic Token Refresh Implementation

## Overview
This implementation provides automatic JWT token refresh for the frontend application. When an API request fails with a 401 (Unauthorized) error, the system automatically attempts to refresh the access token using the refresh token stored in httpOnly cookies.

## How It Works

### 1. Backend Setup
- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Both tokens are stored as httpOnly cookies for security
- `/api/auth/refresh` endpoint accepts refresh tokens and returns new access tokens

### 2. Frontend Implementation

#### Axios Configuration (`src/api/axiosConfig.ts`)
- Creates a configured axios instance with `withCredentials: true`
- Implements response interceptors to handle 401 errors
- Automatically attempts token refresh when access token expires
- Retries the original request after successful token refresh
- Redirects to login page if refresh fails

#### Auth API (`src/api/auth.tsx`)
- Updated to use axios instance with credentials
- Includes `refreshAccessToken()` function
- All auth requests now include cookies automatically

#### User API (`src/api/user.tsx`)
- Uses the configured axios instance
- All requests automatically benefit from token refresh
- No manual token handling required

## Flow Diagram

```
1. User makes API request
2. Request fails with 401 (token expired)
3. Axios interceptor catches 401 error
4. Automatically calls /api/auth/refresh
5. Backend validates refresh token and returns new access token
6. Original request is retried with new token
7. User gets successful response (seamless experience)
```

## Testing the Feature

1. **Sign in** to the application
2. **Wait 15 minutes** (or manually expire the token)
3. **Make any API request** (e.g., load dashboard, update profile)
4. **Observe** that the request succeeds automatically without user intervention

## Security Benefits

- **httpOnly cookies**: Tokens are not accessible via JavaScript (XSS protection)
- **Automatic refresh**: Users don't need to manually re-authenticate
- **Seamless UX**: No interruption to user workflow
- **Secure storage**: Refresh tokens are stored server-side in cookies

## Error Handling

- If refresh token is invalid/expired → Redirect to login
- If refresh endpoint is unavailable → Redirect to login
- If original request fails after refresh → Show error to user

## Files Modified/Created

- `src/api/auth.tsx` - Enhanced with refresh functionality
- `src/api/axiosConfig.ts` - New file with interceptors
- `src/api/user.tsx` - New file for user API calls
- `src/pages/Dashboard.tsx` - New dashboard page for testing
- `src/App.tsx` - Added dashboard route 