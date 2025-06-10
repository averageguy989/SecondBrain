# Content Management System Documentation

## Database Schema

### Content Model
```prisma
model Content {
  id        String   @id @default(uuid())
  type      ContentType
  link      String?  // URL for the content
  title     String
  tags      String[] // Array of tags
  share     Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relation to User
  userId    String   // Foreign key to User
  user      User     @relation(fields: [userId], references: [id])

  @@map("contents")
}

enum ContentType {
  DOCUMENT
  TWEET
  YOUTUBE
  LINK
}
```

## Model Details

### Fields
1. **id** (String, UUID)
   - Primary key
   - Auto-generated UUID
   - Required

2. **type** (ContentType enum)
   - Type of content
   - Values: DOCUMENT, TWEET, YOUTUBE, LINK
   - Required

3. **link** (String, optional)
   - URL for the content
   - Optional field
   - Can be null

4. **title** (String)
   - Title of the content
   - Required
   - No length restrictions

5. **tags** (String[])
   - Array of tags
   - Examples: ["productivity", "politics", "technology"]
   - Can be empty array

6. **share** (Boolean)
   - Default: false
   - Indicates if content is shared publicly
   - Required

7. **createdAt** (DateTime)
   - Auto-generated timestamp
   - Set when content is created
   - Required

8. **updatedAt** (DateTime)
   - Auto-updated timestamp
   - Updates when content is modified
   - Required

9. **userId** (String)
   - Foreign key to User model
   - Required
   - References User.id

### Relations
- **User**: Many-to-One relationship
  - One user can have many contents
  - Each content belongs to one user
  - Access via `user` field

## Planned Endpoints

### 1. Content Creation
- **POST** `/api/contents`
- **Purpose**: Create new content
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "type": "DOCUMENT" | "TWEET" | "YOUTUBE" | "LINK",
    "link": "string (optional)",
    "title": "string",
    "tags": ["string"],
    "share": boolean (optional, default: false)
  }
  ```

### 2. Content Retrieval
- **GET** `/api/contents`
- **Purpose**: Get user's contents
- **Authentication**: Required
- **Query Parameters**:
  - `type`: Filter by content type
  - `tags`: Filter by tags
  - `share`: Filter by share status
  - `page`: Pagination
  - `limit`: Items per page

### 3. Content Update
- **PUT** `/api/contents/:id`
- **Purpose**: Update existing content
- **Authentication**: Required
- **Request Body**: Same as creation (all fields optional)

### 4. Content Deletion
- **DELETE** `/api/contents/:id`
- **Purpose**: Delete content
- **Authentication**: Required

### 5. Content Sharing
- **PATCH** `/api/contents/:id/share`
- **Purpose**: Toggle content sharing
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "share": boolean
  }
  ```

## Validation Rules (To Be Implemented)

1. **Title Validation**
   - Required
   - Minimum length: 1 character
   - Maximum length: TBD

2. **Link Validation**
   - Optional
   - Must be valid URL when provided
   - Type-specific validation:
     - YOUTUBE: Must be valid YouTube URL
     - TWEET: Must be valid Twitter URL
     - LINK: Must be valid URL
     - DOCUMENT: Optional

3. **Tags Validation**
   - Array of strings
   - Each tag: alphanumeric with hyphens/underscores
   - Maximum tags per content: TBD
   - Maximum tag length: TBD

4. **Type-Specific Rules**
   - DOCUMENT: Link optional
   - TWEET: Link required, must be Twitter URL
   - YOUTUBE: Link required, must be YouTube URL
   - LINK: Link required, must be valid URL

## Security Considerations

1. **Access Control**
   - Users can only access their own content
   - Shared content visibility rules to be defined
   - Role-based access for admin features

2. **Data Protection**
   - Input sanitization for links and titles
   - Tag validation to prevent injection
   - Rate limiting for content creation

## Next Steps
1. Implement content creation endpoint
2. Add content validation middleware
3. Implement content retrieval with filtering
4. Add content update and delete functionality
5. Implement sharing mechanism
6. Add content search functionality
7. Implement tag management system 