import { Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import client from '../lib/contentful';
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

export default async function Home() {
  const entries = await client.getEntries<any>({
    content_type: 'blogPost',
    order: ['-fields.publishedDate'],
  });

  const posts = entries.items as Entry<any>[];

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-4xl font-bold mb-3">Oscar Su</h1>
      </div>
      <div className="overflow-y-auto flex-grow mt-1">
        {posts.map((post) => (
          <div key={post.sys.id} className="post mb-1">
            <h2 className="text-2xl font-bold mb-1">
              <a href={`/posts/${post.fields.slug}`}>{post.fields.title ? post.fields.title.toString() : 'Untitled Post'}</a>
            </h2>
            <p className="text-gray-500 mb-2">{post.fields.publishedDate ? new Date(post.fields.publishedDate as string).toLocaleDateString() : 'No date'}</p>
            {isDocument(post.fields.content)
              ? documentToReactComponents(post.fields.content, { renderNode: customRenderer })
              : <p>No content available.</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}