import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // For now, return pre-written high-quality story samples
    // We'll implement proper AI generation later with better models
    const sampleStories = [
      `Once upon a time, in a forest where the trees whispered secrets and the air smelled of sweet pine, a girl named Lily wandered along a mossy path. Sunlight streamed through the emerald leaves, painting golden patches on the ground. Birds chirped like tiny bells, and a soft breeze carried the scent of wildflowers.

As Lily walked, she spotted a bird unlike any she had ever seen. Its feathers shimmered like liquid silver, and its eyes sparkled like tiny stars. Excited, she ran toward it, but the bird flitted away, leading her deeper into the woods. Her heart pounded with curiosity.

Suddenly, the bird landed on a twisted oak tree, where a single feather floated down, glowing softly. Lily picked it up, and as soon as her fingers touched it, a gentle voice echoed in her mind:

"A wish you hold, a path untold."

The feather sparkled, and before her, the trees parted to reveal a glowing doorway made of vines and moonlight. Lily's breath caught in wonder. Was this a dream? Or the start of an extraordinary adventure?

She stepped forward, heart racing. Would she dare to cross through?`,

      `Once upon a time, in a village nestled between rolling hills, lived a curious boy named Max who dreamed of adventure. One misty morning, while exploring the meadow behind his house, he discovered a mysterious map tucked inside an old hollow tree.

The parchment felt warm to the touch, and the ink seemed to shimmer and move as Max traced the path with his finger. It showed a route to a place called "The Forgotten Tower" that wasn't on any map he'd ever seen.

With excitement bubbling in his chest, Max packed a small bag with an apple, his grandfather's compass, and a notebook. The air around him felt electric, as if the world itself was holding its breath in anticipation.

Following the map, Max walked until he reached a circle of unusual stones covered in glowing moss. In the center stood a spiral staircase that seemed to appear from nowhere, leading down into the earth.

Strange lights danced at the bottom of the stairs, and echoes of distant laughter floated up from below. Max hesitated at the top step. What wonders awaited him beneath the ground? And who had left the map for him to find?`
    ];

    // Use the prompt to customize which story to return
    // For simplicity, we'll just return the first story for now
    // In a real implementation, we would use the prompt to select or modify the story
    const storyIndex = 0;  // Could use logic based on the prompt to select a story
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ story: sampleStories[storyIndex] });
    
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
} 