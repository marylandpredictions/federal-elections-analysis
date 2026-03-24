import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import articles from '../lib/articlesData';

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black">
        <p className="text-white">Article not found</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/Articles')}
          className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-inter font-semibold">Back to Articles</span>
        </motion.button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12"
        >
          {article.image && (
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full max-h-96 object-cover rounded-2xl"
              />
            </div>
          )}

          <h1 className="text-white font-inter font-bold text-3xl sm:text-4xl mb-4 text-shadow-teal">
            {article.title}
          </h1>

          <p className="text-white/80 font-inter text-base mb-8">
            By {article.author} • {article.date}
          </p>

          <div className="text-white font-inter text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="indent-8">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}