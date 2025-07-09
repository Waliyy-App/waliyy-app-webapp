import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.REACT_APP_NOTION_API_KEY });

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: process.env.REACT_APP_NOTION_BLOG_DB_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });
  return response.results.map(page => ({
    id: page.id,
    title: page.properties.Title.title[0].plain_text,
    slug: page.properties.Slug.rich_text[0].plain_text,
    excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || '',
    date: new Date(page.properties.Date.date.start).toLocaleDateString(),
    category: page.properties.Category.select.name,
    cover: page.cover?.file?.url || page.cover?.external?.url || null,
  }));
};

export const getPageContent = async (pageId) => {
  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  return response.results;
};