import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';

const articles = [
  {
    id: 1,
    title: "Illinois' Democratic Revolution",
    author: "Nathan",
    date: "March 15, 2026",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/3c8d9b846_FEA4.png",
    content: `Something may be brewing within the lines of the Democratic Party in Illinois. This will be put to the test next Tuesday in an open senate and an arousing four house seats. In all of these races, there is some sort of progressive candidate(s), but they are just all so different.

In the biggest race to watch on Tuesday, three top candidates are vying to fill the retiring old guard Dick Durbin's senate seat. Durbin has not endorsed a candidate in this race, however, the other senator from Illinois Tammy Duckworth has by endorsing Julianna Stratton. Lieutenant Governor Stratton was pushed into this race by Governor JB Pritzker, who is running for re-election and will win the nomination unopposed. Her other two opponents, are Reps. Raja Krishnamoorthi and Robin Kelly. Krishnamoorthi has been leading in polling aggregates by double digits until recently where Stratton has received a large ad boost. Stratton is the clearest progressive in this race on all but one key issue, Gaza which goes to Kelly. Robin Kelly entered this race to split not only the progressive vote but also the black vote in opposition to JB Pritzker, who kicked her out of the Democratic state chair position several years ago. This race will be a test to see how Illinois Democrats feel about each level of progressivism.

In IL-02, the House seat of retiring U.S. Representative Robin Kelly, who opted to run for Senate, has three frontrunners. Jesse Jackson Jr., the son of the late Jesse Jackson Sr. who may have given his son a large boost as he passed away during the early voting period, faces off against the AIPAC backed candidate, Donna Miller. The organization has taken action in all four U.S. House races in a front organization, Elect Chicago Women. The progressive candidate who has been backed by both Sens. Sanders and Warren is Robert Peters. It is likely that both AIPAC and the left could suffer losses in this district with the powerhouse Jesse Jackson.

In IL-07, the House seat of retiring 84-year old Danny Davis, has little to no progressive consolidation. The AIPAC candidate is not necessarily favored to win here either. Melissa Conyears-Ervin, who has faced controversies over not only her ties to AIPAC, but also to AI and crypto lobbyists. Rather than her, the local and mainstream progressive leader, La Shawn Ford, is favored to win this district on Tuesday.

Moving to IL-08, which is really a head-on-head matchup, has Elect Chicago Women-backed Melissa Bean. She served in the U.S. House for three terms from 2005-2011. She ultimately lost to tea party Republican Joe Walsh in the 2010 red wave. Her main opponent, Bernie, Warren, and AOC backed candidate Junaid Ahmed. Notably, this is AOC's only endorsement in an open primary in Illinois this primary cycle. This is likely leftists' best shot at picking up a house seat in 2026 as Bean is a notably weak candidate who also has major advertising backing from crypto, AI, and pro-Israel lobbyists.

Finally, arguably the most interesting of all, IL-09. This seat was left open when 81-year old Jan Schakowsky announced her retirement last May. She endorsed mainstream progressive and mayor of Evanston, Daniel Biss. The AIPAC-backed candidate in this field is Laura Fine while the field of candidates towards the left of Biss is also split in this district. But the largest leftist candidate, Kat Abughazaleh, who was previously arrested for obstructing an ICE operation in Chicago stands a striking shot at winning this district. The other candidates that may obstruct her win are state senator Mike Simmons and activist Bushra Amiwala. Amiwala has publicly talked about concerns and believes she is the best candidate on not only policy, but to win. This is unsurprisingly the one at the top of my list to watch on Tuesday.

So, even if you don't live in Illinois, you should we watching out for these 5 congressional Democratic primaries as they could turn out monumental for the future of this party.`
  }
];

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
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/493863590_FEA3.png)',
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