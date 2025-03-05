
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  imageUrl?: string;
  url: string;
  pricing: ToolPricing;
  features: string[];
  useCases: string[];
}

export type ToolCategory = 
  | 'Design'
  | 'Development'
  | 'Writing'
  | 'Marketing'
  | 'Productivity'
  | 'Research'
  | 'Communication'
  | 'Data Analysis'
  | 'Video & Audio';

export type ToolPricing = 
  | 'Free'
  | 'Freemium'
  | 'Paid'
  | 'Free Trial'
  | 'Contact for Pricing';

export const dummyTools: Tool[] = [
  {
    id: '1',
    name: 'Midjourney',
    description: 'An AI image generation tool that creates stunning visuals from text descriptions.',
    category: 'Design',
    imageUrl: 'https://www.midjourney.com/images/logo.png',
    url: 'https://www.midjourney.com',
    pricing: 'Paid',
    features: [
      'Text-to-image generation',
      'High-quality artistic outputs',
      'Discord integration',
      'Style customization'
    ],
    useCases: [
      'Creating concept art',
      'Generating marketing visuals',
      'Designing mood boards',
      'Visualizing architectural concepts'
    ]
  },
  {
    id: '2',
    name: 'GitHub Copilot',
    description: 'AI-powered code completion tool that helps developers write code faster.',
    category: 'Development',
    imageUrl: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
    url: 'https://github.com/features/copilot',
    pricing: 'Paid',
    features: [
      'Code suggestions based on context',
      'Multi-language support',
      'IDE integration',
      'Natural language to code conversion'
    ],
    useCases: [
      'Speeding up routine coding tasks',
      'Learning new programming languages',
      'Exploring alternative implementations',
      'Generating boilerplate code'
    ]
  },
  {
    id: '3',
    name: 'ChatGPT',
    description: 'A conversational AI model that can discuss virtually any topic and help with various tasks.',
    category: 'Communication',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png',
    url: 'https://chat.openai.com',
    pricing: 'Freemium',
    features: [
      'Natural language understanding',
      'Context retention',
      'Multi-turn conversations',
      'Knowledge up to training cutoff'
    ],
    useCases: [
      'Answering questions',
      'Brainstorming ideas',
      'Draft writing',
      'Explaining complex concepts'
    ]
  },
  {
    id: '4',
    name: 'Notion AI',
    description: 'AI writing assistant integrated directly into Notion for better note-taking and content creation.',
    category: 'Writing',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    url: 'https://www.notion.so/product/ai',
    pricing: 'Paid',
    features: [
      'Text generation and improvement',
      'Summarization',
      'Translation',
      'Integration with Notion workspace'
    ],
    useCases: [
      'Taking better notes',
      'Drafting blog posts',
      'Creating meeting summaries',
      'Brainstorming content ideas'
    ]
  },
  {
    id: '5',
    name: 'Zapier',
    description: 'Automation tool that connects apps and automates workflows with AI-powered suggestions.',
    category: 'Productivity',
    imageUrl: 'https://cdn.zapier.com/zapier/images/logo-black.png',
    url: 'https://zapier.com',
    pricing: 'Freemium',
    features: [
      'App integration platform',
      'Automated workflow creation',
      'AI-suggested automations',
      'No-code interface'
    ],
    useCases: [
      'Automating repetitive tasks',
      'Connecting disparate applications',
      'Creating custom workflows',
      'Saving time on routine processes'
    ]
  },
  {
    id: '6',
    name: 'Descript',
    description: 'Video and audio editing tool that uses AI to transcribe, edit, and enhance media.',
    category: 'Video & Audio',
    imageUrl: 'https://assets-global.website-files.com/61734ecee390d81c7640104d/62df99b5e875e759bbd693ae_descript-icon-2022.svg',
    url: 'https://www.descript.com',
    pricing: 'Freemium',
    features: [
      'Automatic transcription',
      'Text-based video editing',
      'Voice cloning (Overdub)',
      'Filler word removal'
    ],
    useCases: [
      'Creating and editing podcasts',
      'Professional video production',
      'Generating social media content',
      'Remote interview recording'
    ]
  },
  {
    id: '7',
    name: 'Otter.ai',
    description: 'AI-powered transcription service that captures and shares insights from meetings and interviews.',
    category: 'Productivity',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Otter.ai_Logo.png/640px-Otter.ai_Logo.png',
    url: 'https://otter.ai',
    pricing: 'Freemium',
    features: [
      'Real-time transcription',
      'Speaker identification',
      'Meeting summary generation',
      'Searchable audio library'
    ],
    useCases: [
      'Transcribing meetings',
      'Creating shareable notes',
      'Documenting interviews',
      'Capturing lecture content'
    ]
  },
  {
    id: '8',
    name: 'Grammarly',
    description: 'Writing assistant that checks text for grammar, clarity, engagement, and delivery issues.',
    category: 'Writing',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Grammarly_logo.svg/1200px-Grammarly_logo.svg.png',
    url: 'https://www.grammarly.com',
    pricing: 'Freemium',
    features: [
      'Grammar and spell checking',
      'Tone adjustment suggestions',
      'Clarity improvements',
      'Browser and app integration'
    ],
    useCases: [
      'Proofreading documents',
      'Improving email communications',
      'Enhancing student papers',
      'Polishing professional content'
    ]
  }
];

export const categories: ToolCategory[] = [
  'Design',
  'Development',
  'Writing',
  'Marketing',
  'Productivity',
  'Research',
  'Communication',
  'Data Analysis',
  'Video & Audio'
];

export const getRecommendations = (query: string): Promise<Tool[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Very simple "AI" matching
      const lowerQuery = query.toLowerCase();
      
      const results = dummyTools.filter(tool => {
        // Match by name
        if (tool.name.toLowerCase().includes(lowerQuery)) return true;
        
        // Match by description
        if (tool.description.toLowerCase().includes(lowerQuery)) return true;
        
        // Match by category
        if (tool.category.toLowerCase().includes(lowerQuery)) return true;
        
        // Match by features
        if (tool.features.some(feature => feature.toLowerCase().includes(lowerQuery))) return true;
        
        // Match by use cases
        if (tool.useCases.some(useCase => useCase.toLowerCase().includes(lowerQuery))) return true;
        
        return false;
      });
      
      resolve(results);
    }, 1500); // Simulate network delay
  });
};
