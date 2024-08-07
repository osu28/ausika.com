import { Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import client from '../../../lib/contentful';
import { notFound } from 'next/navigation';
import { Document } from '@contentful/rich-text-types';

function isDocument(content: any): content is Document {
  return content && content.nodeType === 'document';
}

const customRenderer = {
  [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
    <ul className="list-disc pl-6">{children}</ul>
  ),
  [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => <li className="mb-2">{children}</li>,
};

export async function generateStaticParams() {
  const entries = await client.getEntries<any>({
    content_type: 'blogPost',
  });

  return entries.items.map((post: Entry<any>) => ({
    slug: post.fields.slug as string,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const entries = await client.getEntries<any>({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  if (entries.items.length === 0) {
    notFound();
  }

  const post = entries.items[0] as Entry<any>;

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <article className="flex-grow">
        <header className="mb-2">
          <h1>{post.fields.title ? post.fields.title.toString() : 'Untitled Post'}</h1>
          <p className="text-gray-600">{post.fields.publishedDate ? new Date(post.fields.publishedDate as string).toLocaleDateString() : 'No date'} | Oscar Su</p>
        </header>
        <div key={post.sys.id} className="post">
          {isDocument(post.fields.content)
            ? documentToReactComponents(post.fields.content, { renderNode: customRenderer })
            : <p>No content available.</p>
          }
        </div>
      </article>
    </div>
  );
}