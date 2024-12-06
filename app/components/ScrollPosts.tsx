"use client";

import React, { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
  username: string;
  category_id: number;
}

const ScrollPosts: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from the API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error("Failed to fetch articles");

        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="text-center">Loading articles...</div>;
  }

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div className="flex space-x-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="w-64 min-w-[16rem] p-4 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="mt-4 text-lg font-bold text-gray-800">{article.title}</h2>
            <p className="text-sm text-gray-600 truncate">{article.content}</p>
            <p className="mt-2 text-xs text-gray-500">By {article.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollPosts;
