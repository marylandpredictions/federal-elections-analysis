import React from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/articles/ArticleCard';

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

export default function Articles() {
  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/ec271415e_Screenshot2026-03-16at44509PM.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-3xl sm:text-4xl text-center mb-12 text-shadow-teal"
        >
          Articles
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}