import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet>
        <title>{article.title} - Federal Elections Analysis</title>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.content.substring(0, 200) + '...'} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.content.substring(0, 200) + '...'} />
        <meta name="twitter:image" content={article.image} />
      </Helmet>
      <div 
        className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
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
    </>
  );
}