import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';

const articles = [
  {
    id: 4,
    title: 'Primary Review: Illinois',
    author: 'The FEA Team',
    date: 'March 18, 2026',
    image: 'https://media.base44.com/images/public/69b6f149a83e2b792ef60e35/4dfeb229d_FEA8.png',
    content: `Last night in Illinois, we saw a mixed results for progressive, liberal, leftist, and establishment candidates. The wide range of results from senate and house races will be able to tell us a new perspective of the Democratic Party going into November.

In the long awaited Senate primary to fill longtime establishment Senator Dick Durbin's seat, progressive Lieutenant Governor Julianna Stratton defeated her main opponents, U.S. Representatives Raja Krishnamoorthi and Robin Kelly. Kelly entered into the race in an attempt to split the progressive and black vote to prevent a win from Julianna Stratton as a plot to fool Governor JB Pritzker's plans, who fueled Stratton's campaign. In the end, Stratton would win with around 40% of the vote, Krishnamoorthi trailed with 33%, and Kelly far behind at 18%. Stratton ran a hard campaign targeting Trump's immigration efforts in Chicago while Krishnamoorthi ran a lackbuster campaign with little enthuasism and more so on DC fundraising.

In IL-02, AIPAC backed Donna Miller defeated Former U.S. Representative Jesse Jackson Jr. by double digits. This is a notably shocking result after it was predicted Jackson's campaign morale would have been boosted by the passing of his late father just weeks ago. Also notable, Robert Peters, the progressive who was endorsed by Senators Bernie Sanders and Elizabeth Warren, somewhat flopped by pulling in just 12% of the vote.

Then, in IL-07, machine Democrat and progressive state representative La Shawn Ford, defeated AIPAC backed Melissa Conyears-Ervin, who recieved millions in adverts from organizations tied with the PAC 23% to 20%. The leftist failure to consolidate over one candidate certainly led to their defeat. All candidates who ranked from 3rd to 7th place in the primary had leftist backing and were to the left of Ford. If they were able to gather around a single candidate, they would've had a total combined percentage total of around 40%, which would have easily toppled Ford's lead.

We will be seeing a return of a former moderate blue dog U.S. Representative, Melissa Bean. Bean has defeated AOC, Bernie, and Warren backed Junaid Ahmed by around 5 points. Bean, who is backed by AIPAC and AI PACS, supported the war in Iraq, several of Bush backed tax legislation, and was one of the last Democrats to pledge their support for Obamacare. In her likely return to congress, Bean will likely be one of the most conservative members of the Democratic caucus and could face a progressive challenger later on the line.

Finally, in IL-09, we see another progressive machine Democrat, Daniel Biss winning the primary. Biss defeated a slew of candidates both to the left and right of him. Biss, a target of millions of negative advertising from AIPAC affiliated PACS defeated Laura Fine, who was backed by the establishment and AIPAC, as well as Democratic Socialist Kat Abughazaleh. Biss garnered 29% of the vote, Fine 20%, and Abughazaleh coming up just short at 26%. It is possible the application of other left wing candidates such as Mike Simmons and Bushra Amiwala cost Abughazaleh a victory, but it is truthfully unclear.

The Illinois primaries are truly a mixed bag, there were progressive wins in some aspects and establishment wins in others. It has told us that there will be more establishment wins in house primaries for the rest of the cycle and some leftist wins unless something major snaps within the party base.`
  },
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