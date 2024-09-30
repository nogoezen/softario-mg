import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

type CustomFeed = Parser.Output<CustomItem>;
type CustomItem = Parser.Item & {
  enclosure?: {
    url: string;
    type: string;
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
  }

  const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      item: [
        ['enclosure', 'enclosure', { keepArray: false }],
      ],
    },
  });

  try {
    const feed = await parser.parseURL(url);
    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      description: item.contentSnippet || item.content,
      pubDate: item.pubDate,
      enclosure: item.enclosure,
    }));
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return NextResponse.json({ error: 'Failed to parse RSS feed' }, { status: 500 });
  }
}