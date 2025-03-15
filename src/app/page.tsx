'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [storyPrompt, setStoryPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Voice input states
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // Check if browser supports speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && 
        !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  // Voice recognition function
  const startListening = () => {
    // Reset any previous input
    setStoryPrompt('');
    setError('');
    
    // Create speech recognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition settings
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    // Start listening
    recognition.start();
    setIsListening(true);
    
    // Handle results
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setStoryPrompt(transcript);
      setIsListening(false);
    };
    
    // Handle errors
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setError(`Couldn't understand audio. Please try again.`);
      setIsListening(false);
    };
    
    // Handle end of speech
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // High-quality fallback stories for when API fails
  const generateFallbackStory = (prompt: string) => {
    // Add the user's prompt to personalize the fallback stories
    const userConcept = prompt.trim() || "a magical adventure";
    
    const templates = [
      `Once upon a time, there was a curious girl named Lily who loved exploring. One sunny morning, she decided to venture into the forest near her home, a place locals called the Whispering Woods.

As Lily walked along the winding path, she noticed how the sunlight filtered through the leaves, creating dancing patterns on the forest floor. The birds sang cheerful melodies above her head, and a gentle breeze rustled the branches.

Suddenly, a flash of blue caught her eye. It was a small bird with feathers that seemed to shimmer with magical light. The bird chirped excitedly when it saw Lily and fluttered closer.

"Hello there, little one," Lily said with a smile. The bird circled around her head, then darted forward along the path, looking back as if asking her to follow.

Curious about ${userConcept}, Lily quickened her pace. The bird led her to a clearing where a magnificent old oak tree stood. At the base of the tree was a small wooden door, barely visible among the roots.

Lily knelt down to examine the door. It had intricate carvings of leaves and stars. When she touched it gently, the door swung open, revealing a soft, golden light from within.

What mysteries awaited Lily on the other side of the magical door?`,

      `Once upon a time, there was a boy named Oliver who lived in a small cottage at the edge of an enchanted meadow. Every morning, he would watch the sunrise paint the sky in shades of pink and gold.

One day, Oliver noticed something unusual about ${userConcept}. The morning dew on the grass sparkled more brightly than usual, forming a trail that led into the meadow.

"How strange," Oliver whispered to himself as he stepped outside. The air felt electric, as if something magical was about to happen.

Following the trail of glistening dewdrops, Oliver found himself in the center of the meadow where a circle of mushrooms had appeared overnight. Inside the circle was a tiny silver key that glowed with an inner light.

As Oliver reached for the key, he heard a soft melody carried by the wind. The music seemed to come from nowhere and everywhere at once.

The key felt warm in his palm, and Oliver knew it must unlock something special. But what could it be, and how would he find the lock that matched this mysterious key?`,

      `Once upon a time, in a village surrounded by rolling hills, lived a girl named Amara who loved stories about ${userConcept}. She collected tales from travelers and wrote them down in a journal bound in blue leather.

One misty morning, Amara woke to find a map had appeared on her windowsill. It was drawn on parchment that felt old as time itself, with edges that shimmered in the early light.

The map showed a path Amara had never noticed before, winding from behind her house up to the highest hill. At the top of the hill, the map showed a single star.

Heart racing with excitement, Amara tucked the map into her pocket and set out. The grass beneath her feet was wet with dew, and birds called to each other in the trees above.

When she reached the top of the hill, Amara found a small telescope made of brass and copper, pointing to the sky. Though it was daytime, when she looked through it, she could see stars—constellations unlike any she had ever seen before.

And there, among the stars, was what looked like a doorway. But how could Amara reach a door in the sky? And who had left her the map that led to this magical telescope?`
    ];
    
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  };

  const handleGenerateStory = async () => {
    if (!storyPrompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    setIsUsingFallback(false);
    
    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: storyPrompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Special handling for 503 errors
        if (response.status === 503) {
          throw new Error("API service unavailable. Using our offline story generator instead.");
        }
        throw new Error(data.error || 'Failed to generate story');
      }

      setGeneratedStory(data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      
      // Use fallback story generator
      const errorMessage = error instanceof Error ? error.message : 'Error occurred';
      setError(errorMessage);
      
      const fallbackStory = generateFallbackStory(storyPrompt);
      setGeneratedStory(fallbackStory);
      setIsUsingFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-24 flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Interactive Story Generator</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl">
        Describe a scene or character, and our AI will create a magical story based on your description!
      </p>
      
      <div className="w-full max-w-2xl mb-8 bg-white rounded-lg shadow-md p-6">
        <label className="block mb-2 text-lg font-medium">Enter your story idea:</label>
        <div className="mb-4 p-4 bg-blue-50 rounded-md text-sm text-gray-600">
          <strong>Example:</strong> A girl named Lily in a forest spotted a bird and ran toward it.
        </div>
        
        {/* Text input area */}
        <div className="relative">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={isListening ? "Listening..." : "Describe a scene, character, or situation for your story..."}
            value={storyPrompt}
            onChange={(e) => setStoryPrompt(e.target.value)}
            disabled={isListening}
          />
          
          {/* Voice input button */}
          {speechSupported && (
            <button 
              className={`absolute bottom-3 right-3 p-2 rounded-full ${
                isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-primary hover:bg-primary-dark'
              } text-white`}
              onClick={startListening}
              disabled={isListening}
              title="Click to speak your story idea"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Voice input status */}
        {isListening && (
          <p className="mt-2 text-center text-primary animate-pulse">
            Listening... Speak your story idea
          </p>
        )}
        
        {!speechSupported && (
          <p className="mt-2 text-amber-600 text-sm">
            Voice input is not supported in your browser. Please use a modern browser like Chrome or Edge.
          </p>
        )}
        
        {/* Generate button */}
        <button
          className="mt-4 w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-colors font-medium"
          onClick={handleGenerateStory}
          disabled={isLoading || isListening}
        >
          {isLoading ? 'Creating Your Story...' : 'Generate Story'}
        </button>
        
        {error && (
          <p className="mt-2 text-red-500">{error}</p>
        )}
      </div>

      {generatedStory && (
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Your Story</h2>
          {isUsingFallback && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
              We're using our offline story generator because the online service is currently unavailable.
            </div>
          )}
          <div className="prose max-w-none">
            <p className="whitespace-pre-line leading-relaxed">{generatedStory}</p>
          </div>
        </div>
      )}
    </main>
  );
} 