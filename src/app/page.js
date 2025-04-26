import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata = {
  title: 'GridLeaf API Documentation',
  description: 'Comprehensive API documentation and guides for building next-generation energy analytics and AI applications with GridLeaf.',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

async function getDocs() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const files = fs.readdirSync(docsDirectory);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
      title: file.replace(/\.mdx$/, '').replace(/-/g, ' ')
    }));
}

export default async function Home() {
  const docs = await getDocs();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="text-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Build the Future of Energy Analytics
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Comprehensive API documentation and tools for energy industry professionals to build powerful AI and quantitative applications.
          </p>
          <div className="flex gap-4">
            <Link
              href="/docs"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#api-showcase"
              className="border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors"
            >
              Explore APIs
            </Link>
          </div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">See GridLeaf in Action</h2>
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Video Demo Coming Soon</p>
          </div>
        </div>
      </div>

      {/* API Showcase Section */}
      <div id="api-showcase" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-white text-center">Available APIs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Grid Optimization API",
                description: "Optimize grid operations with AI-powered load balancing and demand forecasting",
                category: "Grid Management"
              },
              {
                title: "Renewable Integration API",
                description: "Seamlessly integrate renewable energy sources into existing grid infrastructure",
                category: "Renewables"
              },
              {
                title: "Market Analysis API",
                description: "Real-time energy market analysis and price forecasting",
                category: "Trading"
              },
              {
                title: "Risk Assessment API",
                description: "Comprehensive risk analysis for grid operations and energy portfolios",
                category: "Risk Management"
              },
              {
                title: "Demand Response API",
                description: "Manage and optimize demand response programs",
                category: "Grid Management"
              },
              {
                title: "Asset Management API",
                description: "Monitor and optimize grid assets and infrastructure",
                category: "Operations"
              }
            ].map((api, index) => (
              <div
                key={index}
                className="group p-6 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              >
                <span className="text-sm text-green-500 mb-2 block">{api.category}</span>
                <h3 className="text-xl font-semibold mb-3 text-white">{api.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {api.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Energy Analytics?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join leading energy companies using GridLeaf to build the future of grid analytics.
          </p>
          <Link
            href="/docs/resiliency-api"
            className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Start Building Now
          </Link>
        </div>
      </div>
    </div>
  );
}
