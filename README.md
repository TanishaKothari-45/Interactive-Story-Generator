# Interactive Story Generator

> Give it a theme and a tone. It writes the story, animates it in 3D, and publishes it to Twitter — automatically.

No manual steps between idea and published content. The entire pipeline runs end-to-end: 
theme → story → 3D animation → Twitter post.

---

## The Pipeline

```
User inputs theme + tone (e.g. "mystery, dark and suspenseful")
      ↓
LLM generates a full structured story
      ↓
Story scenes converted to 3D animated video
      ↓
Auto-posted to Twitter with generated preview image
      ↓
Next.js frontend renders story + image preview in real time
```

---

## What makes this interesting

- **Theme + tone as creative controls** — not just a prompt box; structured inputs give the LLM enough direction to produce coherent, stylistically consistent stories
- **Story → video, not just story → text** — the output is a 3D animated artifact, not a wall of text
- **Fully automated publishing** — Twitter post triggered programmatically at the end of the pipeline, no copy-paste
- **Real-time frontend rendering** — story and image preview stream into the Next.js UI as they're generated, not after
- **End-to-end creative automation** — demonstrates a multi-step agentic workflow where each stage feeds the next without human intervention

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Story Generation | LLM API |
| 3D Animation | Three.js / WebGL |
| Image Generation | AI image model |
| Publishing | Twitter API v2 |

---

## Getting Started

```bash
git clone https://github.com/TanishaKothari-45/Interactive-Story-Generator.git
cd Interactive-Story-Generator
npm install
npm run dev
```

Create a `.env.local` file:
```env
LLM_API_KEY=your_key
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_ACCESS_TOKEN=your_token
TWITTER_ACCESS_SECRET=your_access_secret
```

Open `http://localhost:3000`

---

## How to Use

1. Enter a **theme** (e.g. "a lost astronaut", "a haunted village")
2. Choose a **tone** (e.g. dark, whimsical, suspenseful)
3. Hit **Generate** — watch the story, animation, and preview render live
4. Pipeline auto-posts the finished story to Twitter

---

## License

MIT
