import OpenAI from 'openai';
import { Client } from '../types/clients';

// Check if API key is configured
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
}) : null;

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_MINUTE = 3;
const requestTimestamps: number[] = [];

const isRateLimited = () => {
  const now = Date.now();
  // Remove timestamps older than the window
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW) {
    requestTimestamps.shift();
  }
  return requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE;
};

const addRequestTimestamp = () => {
  requestTimestamps.push(Date.now());
};

const getTimeUntilNextRequest = () => {
  if (requestTimestamps.length === 0) return 0;
  const oldestTimestamp = requestTimestamps[0];
  const timeUntilExpiry = (oldestTimestamp + RATE_LIMIT_WINDOW) - Date.now();
  return Math.max(0, timeUntilExpiry);
};

let cachedSummaries: Record<string, { summary: string; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function generateClientSummary(client: Client): Promise<string> {
  if (!openai || !apiKey) {
    return "OpenAI API key not configured. Please add your API key to the environment variables.";
  }

  const cacheKey = `${client.id}-${client.timeline.length}`; // Include timeline length to invalidate on new events
  const cachedResult = cachedSummaries[cacheKey];
  
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.summary;
  }

  if (isRateLimited()) {
    const waitTime = Math.ceil(getTimeUntilNextRequest() / 1000);
    return `Rate limit reached. Please wait ${waitTime} seconds before requesting another summary. Using last available summary if exists${
      cachedResult ? '.' : ' (none available yet).'
    }`;
  }

  try {
    const timelineText = client.timeline
      .map(event => `${event.date.toISOString().split('T')[0]}: ${event.title} - ${event.description}`)
      .join('\n');

    const casesText = client.cases
      .map(c => `Case: ${c.title}\nType: ${c.type}\nStatus: ${c.status}\nStrategy: ${c.strategy}`)
      .join('\n\n');

    const prompt = `
      Please analyze this immigration client's history and provide a concise summary with recommendations:

      Client: ${client.name}
      Citizenship: ${client.citizenship}
      
      Timeline:
      ${timelineText}

      Cases:
      ${casesText}

      Please provide:
      1. Brief history summary
      2. Key challenges and opportunities
      3. Specific recommendations for their case
      4. Next steps
    `;

    addRequestTimestamp();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert immigration law analyst. Provide concise, practical analysis and recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const summary = response.choices[0].message.content || "Unable to generate summary";
    
    // Cache the successful response
    cachedSummaries[cacheKey] = {
      summary,
      timestamp: Date.now()
    };

    // Clean up old cache entries
    const now = Date.now();
    cachedSummaries = Object.fromEntries(
      Object.entries(cachedSummaries).filter(
        ([_, value]) => now - value.timestamp < CACHE_DURATION
      )
    );

    return summary;
  } catch (error: any) {
    console.error('Error generating summary:', error);
    
    // Return cached version if available when error occurs
    if (cachedResult) {
      return `${cachedResult.summary}\n\n(Note: This is a cached summary. Failed to fetch new summary: ${
        error.message || 'Unknown error'
      })`;
    }
    
    // Handle specific error cases
    if (error.code === 'invalid_api_key') {
      return "Invalid API key. Please check your OpenAI API key configuration.";
    }
    
    if (error.code === 'insufficient_quota') {
      return "OpenAI API quota exceeded. Please check your usage limits.";
    }

    if (error.code === 'rate_limit_exceeded') {
      const waitTime = Math.ceil(getTimeUntilNextRequest() / 1000);
      return `Rate limit reached. Please wait ${waitTime} seconds before requesting another summary.`;
    }

    return "Error generating summary. Please try again later.";
  }
}