import { Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import client from '../../../lib/contentful';
import { notFound } from 'next/navigation';
import { Document } from '@contentful/rich-text-types';

function isDocument(content: any): content is Document {
  return content && content.nodeType === 'document';
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
    <div>
      <h1 className="text-2xl font-bold mb-4">{post.fields.title ? post.fields.title.toString() : 'Untitled Post'}</h1>
      {isDocument(post.fields.content)
        ? documentToReactComponents(post.fields.content)
        : <p>No content available.</p>
      }
    </div>
  );
}