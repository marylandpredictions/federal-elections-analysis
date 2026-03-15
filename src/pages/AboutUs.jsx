import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamMember from '../components/about/TeamMember';

const teamMembers = [
{
  name: 'Nathan',
  description: 'The founder, CEO of Federal Elections Analysis, and the leading producer of content for FEA. Deeply involved and expert of regional Maryland and DC politics and is from the Greater DC Area.'
},
{
  name: 'Darrius',
  description: 'The chief of Democratic political affairs at FEA and the second to join the channel, another leading producer of content for the channel. He is located in Georgia, United States.'
},
{
  name: 'Cyrus',
  description: 'Chief of Republican political affairs at FEA and an expert in the populist movement for the right and the left. Is from the Albuquerque Metro.'
},
{
  name: 'Ryker',
  description: 'Chief historical analyst at FEA. The newest addition to the team. Ryker is from the Greater NYC Area and deeply involved in local NY and NJ politics.'
}];


export default function AboutUs() {
  const [selected, setSelected] = useState(null);

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24 bg-black"
      style={{
        backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b6f149a83e2b792ef60e35/493863590_FEA3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white font-inter font-bold text-7xl sm:text-8xl md:text-9xl text-center mb-8 text-shadow-teal"
        >
          About Us
        </motion.h1>

        {/* Mission Statement */}
        <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }} className="bg-transparent text-white text-base font-inter text-center normal-case leading-relaxed opacity-100 sm:text-lg md:text-xl text-shadow-teal">


          At Federal Elections Analysis, we give data-driven takes and predictions to deliver the most
          recent and important news about our political and electoral atmosphere to election fanatics
          and people who are just trying to stay in the bubble to our nation's politics.
        </motion.p>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 sm:mt-20">

          <h2 className="text-white font-inter font-bold text-2xl sm:text-3xl text-center mb-10 text-shadow-teal">
            Our Team
          </h2>

          <div className="flex justify-center gap-6 sm:gap-10 md:gap-14 flex-wrap">
            {teamMembers.map((member) =>
            <TeamMember
              key={member.name}
              name={member.name}
              isSelected={selected?.name === member.name}
              onClick={() =>
              setSelected(selected?.name === member.name ? null : member)
              } />

            )}
          </div>
        </motion.div>

        {/* Member Profile */}
        <AnimatePresence mode="wait">
          {selected &&
          <motion.div
            key={selected.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-12 bg-primary/40 rounded-2xl p-8 sm:p-10">

              <h3 className="text-white font-inter font-bold text-2xl sm:text-3xl mb-4 text-shadow-teal">
                {selected.name}
              </h3>
              <p className="text-white font-inter text-base sm:text-lg leading-relaxed text-shadow-teal">
                {selected.description}
              </p>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}