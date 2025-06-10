# Content Creation App

A modern React application for creating and managing content with a clean, minimal interface.

## Features

- ✨ **Simple Content Creation**: Easy-to-use form for creating content
- 🎨 **Clean UI**: Minimal, professional black and white design
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🏷️ **Tag System**: Add tags to organize your content
- 🔒 **Privacy Control**: Choose between public and private content
- 📊 **Content Types**: Support for YouTube, Twitter, Link, and Document content

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── CreateContentForm.tsx
│   │   ├── pages/
│   │   │   └── Home.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
└── backend/
    └── (backend files will go here)
```

## Usage

1. **Create Content**: Click the "Create Content" button on the home page
2. **Fill Form**: Enter title, link, select type and visibility
3. **Add Tags**: Optionally add tags to organize your content
4. **Submit**: Click "Create" to save your content

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 