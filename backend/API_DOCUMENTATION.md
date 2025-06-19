# Content Card API Documentation

## Overview
This API provides complete functionality for Content Cards with features like upvoting, sharing, saving, and user management.

## Base URL
```
http://localhost:3000/api/content
```

## Authentication
Most endpoints require authentication. Include the access token in cookies or use the `authenticateToken` middleware.

## Endpoints

### 1. Create Content
**POST** `/api/content`

Creates a new content card.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "type": "YouTube|Twitter|Document",
  "link": "https://example.com",
  "title": "Content Title"
}
```

**Response (201):**
```json
{
  "id": "content_id",
  "type": "YouTube",
  "link": "https://example.com",
  "title": "Content Title",
  "shared": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "savedCount": 0,
  "upvoteCount": 0,
  "shareCount": 0,
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

---

### 2. Get All Content
**GET** `/api/content`

Retrieves all content with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "content": [
    {
      "id": "content_id",
      "type": "YouTube",
      "link": "https://example.com",
      "title": "Content Title",
      "shared": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "User Name"
      },
      "_count": {
        "savedBy": 5,
        "upvotedBy": 10,
        "sharedBy": 2
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### 3. Get Single Content
**GET** `/api/content/:id`

Retrieves a specific content by ID.

**Response (200):**
```json
{
  "id": "content_id",
  "type": "YouTube",
  "link": "https://example.com",
  "title": "Content Title",
  "shared": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "user": {
    "id": "user_id",
    "name": "User Name"
  },
  "_count": {
    "savedBy": 5,
    "upvotedBy": 10,
    "sharedBy": 2
  },
  "isSaved": true,
  "isUpvoted": false,
  "isShared": false
}
```

---

### 4. Upvote Content
**POST** `/api/content/:id/upvote`

Upvotes a content (prevents duplicate upvotes).

**Response (200):**
```json
{
  "id": "content_id",
  "type": "YouTube",
  "link": "https://example.com",
  "title": "Content Title",
  "shared": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "upvoteCount": 11,
  "user": {
    "id": "user_id",
    "name": "User Name"
  },
  "_count": {
    "savedBy": 5,
    "upvotedBy": 11,
    "sharedBy": 2
  }
}
```

**Error (400):** Content already upvoted

---

### 5. Share Content (Owner Only)
**POST** `/api/content/:id/share`

Shares content (only content owner can share).

**Response (200):**
```json
{
  "id": "content_id",
  "type": "YouTube",
  "link": "https://example.com",
  "title": "Content Title",
  "shared": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "shareCount": 3,
  "user": {
    "id": "user_id",
    "name": "User Name"
  },
  "_count": {
    "savedBy": 5,
    "upvotedBy": 10,
    "sharedBy": 3
  }
}
```

**Error (403):** Only content owner can share
**Error (400):** Content already shared

---

### 6. Save/Bookmark Content
**POST** `/api/content/:id/save`

Saves content to user's bookmarks.

**Response (200):**
```json
{
  "id": "content_id",
  "type": "YouTube",
  "link": "https://example.com",
  "title": "Content Title",
  "shared": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "savedCount": 6,
  "user": {
    "id": "user_id",
    "name": "User Name"
  },
  "_count": {
    "savedBy": 6,
    "upvotedBy": 10,
    "sharedBy": 2
  }
}
```

**Error (400):** Content already saved

---

### 7. Remove Save/Bookmark
**DELETE** `/api/content/:id/save`

Removes content from user's bookmarks.

**Response (200):**
```json
{
  "id": "content_id",
  "type": "YouTube",
  "link": "https://example.com",
  "title": "Content Title",
  "shared": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "savedCount": 5,
  "user": {
    "id": "user_id",
    "name": "User Name"
  },
  "_count": {
    "savedBy": 5,
    "upvotedBy": 10,
    "sharedBy": 2
  }
}
```

---

### 8. Get User's Saved Content
**GET** `/api/content/user/saved`

Retrieves all content saved by the authenticated user.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "content": [
    {
      "id": "content_id",
      "type": "YouTube",
      "link": "https://example.com",
      "title": "Content Title",
      "shared": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "User Name"
      },
      "_count": {
        "savedBy": 5,
        "upvotedBy": 10,
        "sharedBy": 2
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

---

### 9. Get User's Own Content
**GET** `/api/content/user/my`

Retrieves all content created by the authenticated user.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "content": [
    {
      "id": "content_id",
      "type": "YouTube",
      "link": "https://example.com",
      "title": "Content Title",
      "shared": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "User Name"
      },
      "_count": {
        "savedBy": 5,
        "upvotedBy": 10,
        "sharedBy": 2
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "pages": 1
  }
}
```

---

### 10. Update Content (Owner Only)
**PUT** `/api/content/:id`

Updates content details (only content owner can update).

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "type": "Twitter",
  "link": "https://twitter.com/example",
  "title": "Updated Title"
}
```

**Response (200):**
```json
{
  "id": "content_id",
  "type": "Twitter",
  "link": "https://twitter.com/example",
  "title": "Updated Title",
  "shared": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": "user_id",
  "user": {
    "id": "user_id",
    "name": "User Name"
  },
  "_count": {
    "savedBy": 5,
    "upvotedBy": 10,
    "sharedBy": 2
  }
}
```

**Error (403):** Only content owner can update

---

### 11. Delete Content (Owner Only)
**DELETE** `/api/content/:id`

Deletes content (only content owner can delete).

**Response (200):**
```json
{
  "message": "Content deleted successfully"
}
```

**Error (403):** Only content owner can delete

---

## Error Responses

### Authentication Error (401)
```json
{
  "error": "User not authenticated"
}
```

### Authorization Error (403)
```json
{
  "error": "Only content owner can [action]"
}
```

### Validation Error (400)
```json
{
  "error": "Type, link, and title are required"
}
```

### Not Found Error (404)
```json
{
  "error": "Content not found"
}
```

### Server Error (500)
```json
{
  "error": "Failed to [action]"
}
```

---

## Database Schema

### Content Model
```prisma
model Content {
  id          String   @id @default(cuid())
  type        String   // "YouTube", "Twitter", "Document"
  link        String
  title       String
  shared      Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Owner relationship
  user        User     @relation("UserContents", fields: [userId], references: [id])
  userId      String
  
  // Many-to-many relationships for tracking
  savedBy     User[]   @relation("SavedContents")
  upvotedBy   User[]   @relation("UserUpvotes")
  sharedBy    User[]   @relation("UserShares")
  
  // Count fields for quick access
  savedCount  Int      @default(0)
  upvoteCount Int      @default(0)
  shareCount  Int      @default(0)
}
```

### User Model
```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String
  name      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  contents    Content[] @relation("UserContents")
  saved       Content[] @relation("SavedContents")
  upvoted     Content[] @relation("UserUpvotes")
  shared      Content[] @relation("UserShares")
}
```

---

## Features Implemented

✅ **Title** - Content title field  
✅ **Link** - Content URL field  
✅ **Type** - Content type ("YouTube", "Twitter", "Document")  
✅ **Upvotes** - Upvote functionality with count  
✅ **Shares** - Share button for content owners  
✅ **Save/Bookmark** - Public users can save content  
✅ **Share Count** - Number of shares tracking  
✅ **Upvote Count** - Number of upvotes tracking  
✅ **User Authentication** - Protected routes  
✅ **Owner Permissions** - Only owners can edit/delete/share  
✅ **Duplicate Prevention** - Users can't upvote/save/share same content twice  
✅ **Pagination** - Efficient data loading  
✅ **User Interaction Flags** - Shows if user has interacted with content  

---

## Testing the API

You can test these endpoints using tools like:
- **Postman**
- **Insomnia**
- **cURL**
- **Thunder Client (VS Code extension)**

Make sure to:
1. First authenticate using the auth endpoints
2. Include the access token in cookies
3. Use the correct HTTP methods and URLs
4. Check response status codes and error messages 