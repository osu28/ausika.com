import { Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import client from '../lib/contentful';
import { Document } from '@contentful/rich-text-types';

function isDocument(content: any): content is Document {
  return content && content.nodeType === 'document';
}

export default async function Home() {
  const entries = await client.getEntries<any>({ content_type: 'blogPost' });
  const posts = entries.items as Entry<any>[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Blog</h1>
      {posts.map((post) => (
        <div key={post.sys.id} className="mb-8">
          <h2 className="text-xl font-semibold">{post.fields.title ? post.fields.title.toString() : 'Untitled Post'}</h2>
          {isDocument(post.fields.content)
            ? documentToReactComponents(post.fields.content)
            : <p>No content available.</p>
          }
        </div>
      ))}
    </div>
  );
}