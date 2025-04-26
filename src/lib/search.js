import { MeiliSearch } from 'meilisearch';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Initialize MeiliSearch client
const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY || 'masterKey',
});

const INDEX_NAME = 'docs';

// Initialize the search index
async function initializeIndex() {
  try {
    console.log('Initializing search index...');
    
    // Check if index exists
    const indexes = await client.getIndexes();
    const indexExists = indexes.results.some(index => index.uid === INDEX_NAME);
    
    if (!indexExists) {
      console.log('Creating new search index...');
      await client.createIndex(INDEX_NAME, { primaryKey: 'id' });
    }
    
    // Configure searchable attributes and ranking rules
    console.log('Configuring search settings...');
    await client.index(INDEX_NAME).updateSettings({
      searchableAttributes: ['title', 'description', 'content'],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness'
      ],
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8,
        },
      },
    });
    
    console.log('Search index initialized successfully');
  } catch (error) {
    console.error('Error initializing search index:', error);
    throw error;
  }
}

// Index all MDX files
async function indexMDXFiles() {
  try {
    console.log('Starting to index MDX files...');
    const contentDir = path.join(process.cwd(), 'content');
    const documents = [];

    function processDirectory(dir) {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          processDirectory(filePath);
        } else if (file.endsWith('.mdx')) {
          const content = fs.readFileSync(filePath, 'utf8');
          const { data, content: mdxContent } = matter(content);
          
          const slug = filePath
            .replace(process.cwd(), '')
            .replace(/\\/g, '/')
            .replace(/\.mdx$/, '')
            .replace(/^\/content/, '');

          documents.push({
            id: slug,
            title: data.title || file,
            description: data.description || '',
            content: mdxContent,
            path: filePath.replace(process.cwd(), '').replace(/\\/g, '/'),
            slug,
          });
        }
      }
    }

    processDirectory(contentDir);
    
    if (documents.length > 0) {
      console.log(`Found ${documents.length} MDX files to index`);
      await client.index(INDEX_NAME).addDocuments(documents);
      console.log('Indexing completed successfully');
    } else {
      console.log('No MDX files found to index');
    }
  } catch (error) {
    console.error('Error indexing documents:', error);
    throw error;
  }
}

// Initialize search on module load
let isInitialized = false;

export async function initializeSearch() {
  if (!isInitialized) {
    try {
      await initializeIndex();
      await indexMDXFiles();
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize search:', error);
      throw error;
    }
  }
}

export async function searchMDXFiles(query) {
  if (!isInitialized) {
    await initializeSearch();
  }

  try {
    console.log(`Searching for: ${query}`);
    const searchResponse = await client.index(INDEX_NAME).search(query, {
      limit: 10,
      attributesToRetrieve: ['title', 'description', 'content', 'slug'],
      attributesToHighlight: ['title', 'description', 'content'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    });

    console.log(`Found ${searchResponse.hits.length} results`);
    return searchResponse.hits.map(hit => ({
      title: hit.title,
      description: hit.description,
      slug: hit.slug,
      snippet: hit._formatted?.content || hit.content?.slice(0, 200) + '...',
      highlights: hit._formatted,
    }));
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
} 