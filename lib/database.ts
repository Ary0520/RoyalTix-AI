import fs from 'fs';
import path from 'path';

interface ContentItem {
  contentId: string;
  ipId: string;
  txHash: string;
  licenseId: string;
  metadata: {
    name: string;
    description: string;
    contentType: string;
    fullContent: string;
    imageBase64?: string;
    licensing: { personal: number; commercial: number; exclusive: number };
    collaborators: Array<{ address: string; percentage: number }>;
    createdAt: string;
  };
  generatedContent: string;
  status: string;
}

const DB_FILE = path.join(process.cwd(), 'data', 'content.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load data from file
const loadData = (): ContentItem[] => {
  try {
    ensureDataDir();
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  return [];
};

// Save data to file
const saveData = (data: ContentItem[]) => {
  try {
    ensureDataDir();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    console.log('✅ Database saved to file:', DB_FILE);
  } catch (error) {
    console.error('❌ Error saving database:', error);
  }
};

export const db = {
  addContent: (content: ContentItem) => {
    const data = loadData();
    data.push(content);
    saveData(data);
    console.log('✅ Content added to persistent database:', content.contentId);
  },
  getAllContent: () => {
    const data = loadData();
    console.log('📖 Loading content from database, found:', data.length, 'items');
    return data;
  },
  getContentById: (id: string) => {
    const data = loadData();
    return data.find(c => c.contentId === id);
  },
};