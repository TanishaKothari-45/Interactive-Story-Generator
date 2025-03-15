# Interactive Story Generator

An interactive web application that generates animated stories based on text input. The app uses AI to create stories from simple scene descriptions.

## Features

- Text input for scene/character descriptions
- AI-powered story generation using Hugging Face models
- Responsive UI for all device sizes

## Getting Started

### Prerequisites

- Node.js 16.8 or later

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root directory (optional):
   ```
   HUGGINGFACE_API_KEY=your_api_key_here
   ```
   (You can start without an API key, but will have limited usage)

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. Enter a scene or character description in the text area
2. Click "Generate Story" to create a story based on your input
3. The generated story will appear below the input area

## Technology Stack

- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Hugging Face Inference API

## Future Enhancements

- Voice input capabilities
- Story animation using web technologies
- Character visualization
- Save and share stories 