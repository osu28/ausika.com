import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oscar Su",
  description: "My personal website!",
  icons: {
    icon: "/ausika_logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/ausika_logo.ico" type="image/x-icon" />
        <title>Oscar Su</title>
      </Head>
      <body className={`${inter.className} flex h-screen overflow-hidden`}>
        <div className="overflow-y-auto w-full md:w-2/3 p-8 overflow-hidden">
          {children}
        </div>
        <div className="w-1/3 p-8 bg-gray-100 overflow-y-auto hidden md:block">
          <h2>About Me</h2>
          <p>
            My name is Oscar Su. My life has revolved around learning, innovating,
            and building. I find immense satisfaction in turning complex problems
            into elegant, scalable solutions.
          </p>
          <p className="mt-4">
            I am currently an engineer at Amazon Web Services (AWS) in Seattle,
            where I work on serverless computing platforms and microservice
            architectures at Lambda.
          </p>
          <p className="mt-4">All opinions are my own.</p>
          <h3>Links</h3>
          <ul className="mt-2">
            <li>
                <a href="/books" className="text-blue-500 hover:underline">
                  My Book List
                </a>
            </li>
            <li>
              <a href="/projects" className="text-blue-500 hover:underline">
                My Projects
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/oscarsu28/"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://github.com/osu28"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/oscarsu__/"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Instagram
              </a>
            </li>
          </ul>
        </div>
      </body>
    </html>
  );
}