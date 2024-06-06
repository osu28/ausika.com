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
    <div className="flex flex-col h-screen">
      <h1 className="text-4xl font-bold mb-8">{post.fields.title ? post.fields.title.toString() : 'Untitled Post'}</h1>
      <p>{post.fields.publishedDate ? new Date(post.fields.publishedDate).toLocaleDateString() : 'No date'}</p>
      <div className="flex-grow overflow-y-auto">
        <div key={post.sys.id} className="post">
          {isDocument(post.fields.content)
            ? documentToReactComponents(post.fields.content)
            : <p>No content available.</p>
          }
        </div>
      </div>
    </div>
  );
}
