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

const RecentPosts: React.FC = () => {
  const [recentArticle, setRecentArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch articles from the API
  useEffect(() => {
    const fetchRecentArticle = async () => {
      try {
        const res = await fetch("/api/articles/recent");
        if (!res.ok) throw new Error("Failed to fetch articles");

        const data = await res.json();
        if (data.length > 0) {
          setRecentArticle(data[0]); // Le plus récent est le premier grâce au tri
        }
      } catch (error) {
        console.error("Error fetching recent article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentArticle();
  }, []);

  if (loading) {
    return <div className="text-center">Loading recent post...</div>;
  }

  if (!recentArticle) {
    return <div className="text-center">No recent posts available.</div>;
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <img
        src={recentArticle.image_url}
        alt={recentArticle.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="mt-4 text-2xl font-bold text-gray-800">{recentArticle.title}</h2>
      <p className="text-sm text-gray-600 mt-2">{recentArticle.content}</p>
      <p className="mt-4 text-xs text-gray-500">
        Published on {new Date(recentArticle.published_at).toLocaleDateString()} by {recentArticle.username}
      </p>
    </div>
  );
};

export default RecentPosts;
