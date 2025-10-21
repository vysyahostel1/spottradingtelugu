import React, { useState, useEffect } from "react";
import { Calendar, User, ArrowRight, AlertCircle } from "lucide-react";

export default function News() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = '9183632ec8d647bea9afcf0bb661a2b4'; // Get from https://newsapi.org/
        const sources = ['the-hindu', 'hindustan-times', 'times-of-india', 'economic-times'];

        // Fetch news from Indian sources in parallel
        const fetchPromises = sources.map(async (source) => {
          try {
            const response = await fetch(
              `https://newsapi.org/v2/top-headlines?sources=${source}&language=en&pageSize=5&apiKey=${apiKey}`
            );

            if (!response.ok) {
              console.warn(`Failed to fetch from ${source}: ${response.status}`);
              return [];
            }

            const data = await response.json();
            return data.articles.map((article, index) => ({
              id: `${source}-${index + 1}`,
              title: article.title,
              excerpt: article.description || 'No description available.',
              author: article.author || 'Unknown',
              date: article.publishedAt,
              category: 'Financial News',
              source: source.charAt(0).toUpperCase() + source.slice(1).replace('-', ' '),
              image: article.urlToImage || '/api/placeholder/400/250',
              url: article.url,
              readTime: '5 min read' // Placeholder
            }));
          } catch (err) {
            console.warn(`Error fetching from ${source}:`, err);
            return [];
          }
        });

        const results = await Promise.all(fetchPromises);
        const allArticles = results.flat().sort((a, b) => new Date(b.date) - new Date(a.date));

        setNewsArticles(allArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ["All", "Market Analysis", "Cryptocurrency", "Education", "Technical Analysis", "Economics", "Investment"];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Indian Financial News
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay informed with the latest Indian financial and company news, market insights, and business developments.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load News</h3>
              <p className="text-slate-600">{error}</p>
              <p className="text-sm text-slate-500 mt-2">Please check your NewsAPI key configuration.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-slate-200 relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.source}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-slate-900 hover:text-slate-600 font-medium transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest trading news, market insights, and educational content delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
