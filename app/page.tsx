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
    <div className="flex flex-col h-full">
      <h1 className="text-4xl font-bold mb-8">Oscar Su</h1>
      <div className="flex-grow overflow-y-auto">
        {posts.map((post) => (
          <div key={post.sys.id} className="post mb-8">
            <h2 className="text-xl font-semibold">{post.fields.title ? post.fields.title.toString() : 'Untitled Post'}</h2>
            <p>{post.fields.publishedDate ? new Date(post.fields.publishedDate as string).toLocaleDateString() : 'No date'}</p>
            <a href={`/posts/${post.fields.slug}`} className="text-blue-500 hover:underline">{post.fields.slug as string}</a>
            {isDocument(post.fields.content)
              ? documentToReactComponents(post.fields.content)
              : <p>No content available.</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
