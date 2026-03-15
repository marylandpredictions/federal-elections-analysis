import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TeamMember from '../components/about/TeamMember';

const teamMembers = [
{
  name: 'Nathan',
  description: 'Description coming soon.'
},
{
  name: 'Darrius',
  description: 'Description coming soon.'
},
{
  name: 'Cyrus',
  description: 'Description coming soon.'
},
{
  name: 'Denn',
  description: 'Description coming soon.'
}];


export default function AboutUs() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="bg-transparent text-white text-base font-inter text-center normal-case leading-relaxed opacity-100 sm:text-lg md:text-xl text-shadow-teal">


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
              <p className="text-white/90 font-inter text-base sm:text-lg leading-relaxed text-shadow-teal">
                {selected.description}
              </p>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}