import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/ArticleView/${article.id}`)}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 flex flex-col"
    >
      {article.image && (
        <div className="mb-4">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 object-cover rounded-2xl"
          />
        </div>
      )}
      
      <h2 className="text-white font-inter font-bold text-xl sm:text-2xl mb-2 text-shadow-teal">
        {article.title}
      </h2>
      
      <p className="text-white/80 font-inter text-sm mb-2">
        By {article.author} • {article.date}
      </p>
      
      <p className="text-white/70 font-inter text-sm line-clamp-4">
        {article.content.split('\n\n')[0]}
      </p>
    </motion.div>
  );
}