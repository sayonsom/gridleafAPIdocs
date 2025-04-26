import Link from 'next/link';
import { Metadata } from 'next';

export const metadata = {
  title: 'Getting Started - GridLeaf API Documentation',
  description: 'Learn how to get started with GridLeaf APIs, obtain your API key, and explore available endpoints.',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Getting Started with GridLeaf APIs</h1>
        
        {/* Quick Start Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">Quick Start</h2>
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">1. Get Your API Key</h3>
            <p className="text-gray-300 mb-4">
              To start using GridLeaf APIs, you will need to:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Sign up for a GridLeaf account at <a href="#" className="text-green-500 hover:text-green-400">gridleaf.com/signup</a></li>
              <li>Navigate to your dashboard</li>
              <li>Go to API Settings</li>
              <li>Generate a new API key</li>
            </ol>
          </div>
        </section>

        {/* API Categories Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">Available APIs</h2>
          <div className="grid gap-6">
            {[
              {
                title: "Grid Management APIs",
                description: "APIs for grid optimization, load balancing, and demand forecasting",
                endpoints: [
                  "POST /api/v1/grid/optimize",
                  "GET /api/v1/grid/status",
                  "POST /api/v1/grid/forecast"
                ]
              },
              {
                title: "Renewable Energy APIs",
                description: "APIs for renewable integration and management",
                endpoints: [
                  "POST /api/v1/renewables/integrate",
                  "GET /api/v1/renewables/status",
                  "POST /api/v1/renewables/forecast"
                ]
              },
              {
                title: "Market Analysis APIs",
                description: "APIs for energy market analysis and trading",
                endpoints: [
                  "GET /api/v1/market/prices",
                  "POST /api/v1/market/analyze",
                  "GET /api/v1/market/forecast"
                ]
              }
            ].map((category, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-white">{category.title}</h3>
                <p className="text-gray-300 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.endpoints.map((endpoint, idx) => (
                    <div key={idx} className="bg-gray-800 rounded px-4 py-2 text-sm font-mono text-green-400">
                      {endpoint}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Grid Optimization",
                description: "Use our APIs to optimize grid operations, reduce costs, and improve reliability"
              },
              {
                title: "Renewable Integration",
                description: "Seamlessly integrate renewable energy sources into your grid infrastructure"
              },
              {
                title: "Market Analysis",
                description: "Analyze energy markets and make data-driven trading decisions"
              },
              {
                title: "Risk Management",
                description: "Assess and manage risks in your energy portfolio"
              }
            ].map((useCase, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-colors">
                <h3 className="text-xl font-semibold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-white">Next Steps</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Ready to Start Building?</h3>
            <p className="text-gray-300 mb-6">
              Check out our detailed API documentation and start integrating GridLeaf into your applications.
            </p>
            <div className="flex gap-4">
              <Link
                href="/docs/resiliency-api"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                View API Reference
              </Link>
              <Link
                href="/docs/examples"
                className="border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors"
              >
                View Examples
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 