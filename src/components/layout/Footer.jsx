import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const TOS_TEXT = `Terms of Service
Last updated: March 20, 2026

fedelectionsanalysis.com ("Federal Elections Analysis," "the Site") is a publication run by Federal Elections Analysis ("we," "us," or "our"). These Terms of Service outline the rules for using fedelectionsanalysis.com. By accessing or using the website, you agree to follow these terms. If you do not agree, you should not use the site.

1. Purpose of the Site
fedelectionsanalysis.com offers political analysis, election forecasts, journalism, commentary, and data visualizations for informational purposes only. Nothing on this site should be considered professional, legal, financial, or political advice.

2. Intellectual Property
All content on fedelectionsanalysis.com—including text, graphics, charts, models, branding, and code—is owned by Federal Elections Analysis unless stated otherwise.
You may:
• Share links to our content
• Quote brief excerpts with proper attribution

You may not:
• Copy, reproduce, or republish full articles
• Scrape or redistribute forecasts or datasets
• Use our branding or models for commercial or political purposes without permission

3. Forecasting, Polling, and Accuracy Disclaimer
Our forecasts, articles, and polling rely on data, models, and assumptions that may involve uncertainty and potential error. Past results do not guarantee future outcomes.
We do not guarantee the accuracy, completeness, or reliability of any forecast, prediction, or data presented on the site.

4. Third-Party Links
The site may include links to third-party websites. We are not responsible for their content, policies, or practices.

5. User-Generated Content
If you submit comments, messages, or other content, you grant Federal Elections Analysis a non-exclusive right to display, publish, or remove that content. You are responsible for anything you submit.

6. Limitation of Liability
Federal Elections Analysis and fedelectionsanalysis.com are not responsible for any damages resulting from:
• Use of the website
• Reliance on forecasts, polling, or other data
• Errors, downtime, or data loss

Use of this site is at your own risk.

7. Changes to These Terms
We may revise these Terms of Service at any time. Continued use of the site after updates means you accept the revised terms.

8. Governing Law
These terms are governed by the laws of the United States.

9. Contact
If you have any questions about these Terms, contact:
Federal Elections Analysis
federalelectionsanalysis.com`;

const PRIVACY_TEXT = `Privacy Policy
Last updated: March 20, 2026

fedelectionsanalysis.com ("Federal Elections Analysis," "the Site") is operated by Federal Elections Analysis ("we," "us," or "our"). This Privacy Policy explains how we collect, use, and protect your information when you use our website. By accessing or using the Site, you agree to this Privacy Policy. If you do not agree, please do not use the Site.

1. Information We Collect
We may collect both personal and non-personal information from users of the Site, including:
• Information you voluntarily provide (such as email addresses if you contact us)
• Basic usage data (such as pages visited, time spent on the Site, and browser type)
• Cookies or similar tracking technologies

2. How We Use Your Information
We use collected information to:
• Operate and improve the Site
• Understand how users interact with our content
• Respond to inquiries or messages
• Maintain the security and functionality of the Site

We do not sell your personal information.

3. Cookies and Tracking Technologies
The Site may use cookies or similar technologies to enhance user experience and analyze traffic. You can control or disable cookies through your browser settings.

4. Third-Party Services
We may use third-party tools (such as analytics providers) that collect, monitor, and analyze usage of the Site. These third parties have their own privacy policies, and we are not responsible for their practices.

5. Data Security
We take reasonable measures to protect your information, but no method of transmission over the internet is completely secure. We cannot guarantee absolute security.

6. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.

7. Contact
If you have any questions about these Terms, contact:
Federal Elections Analysis
federalelectionsanalysis.com`;

function Modal({ title, content, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white font-inter font-bold text-xl">{title}</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto p-6 text-white/80 font-inter text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}

function FooterLink({ href, to, children, onClick }) {
  const cls = "text-white/60 hover:text-white transition-colors cursor-pointer relative group w-fit";
  const inner = (
    <>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
    </>
  );

  if (onClick) return <button onClick={onClick} className={cls}>{inner}</button>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
}

export default function Footer() {
  const [modal, setModal] = useState(null); // 'tos' | 'privacy' | null

  return (
    <>
      <footer className="bg-primary py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white font-inter font-bold text-xl md:text-2xl text-shadow-teal text-center mb-10">
            Welcome to Federal Elections Analysis
          </h2>

          {/* Columns */}
          <div className="flex flex-wrap justify-center gap-12 mb-10 text-sm">
            {/* Site */}
            <div className="flex flex-col gap-3 min-w-[120px]">
              <span className="text-white font-inter font-bold text-base">Site</span>
              <FooterLink onClick={() => setModal('privacy')}>Privacy Policy</FooterLink>
              <FooterLink onClick={() => setModal('tos')}>Terms of Service</FooterLink>
            </div>

            {/* Explore */}
            <div className="flex flex-col gap-3 min-w-[120px]">
              <span className="text-white font-inter font-bold text-base">Explore</span>
              <FooterLink to="/Home">Home</FooterLink>
              <FooterLink to="/Polling">Polling</FooterLink>
              <FooterLink to="/Forecasts">Forecasts</FooterLink>
              <FooterLink to="/Interactives">Interactives</FooterLink>
            </div>

            {/* More */}
            <div className="flex flex-col gap-3 min-w-[120px]">
              <span className="text-white font-inter font-bold text-base">More</span>
              <FooterLink href="https://www.youtube.com/@FedElections/featured">YouTube</FooterLink>
              <FooterLink href="https://discord.gg/jYYGrgEaMX">Discord</FooterLink>
              <FooterLink href="https://www.youtube.com/@FedElections/membership">Membership</FooterLink>
              <FooterLink href="https://x.com/FedElects">Twitter / X</FooterLink>
            </div>
          </div>

          <p className="text-white/50 font-inter text-sm text-center">
            © {new Date().getFullYear()} Federal Elections Analysis. All rights reserved.
          </p>
        </div>
      </footer>

      {modal === 'tos' && <Modal title="Terms of Service" content={TOS_TEXT} onClose={() => setModal(null)} />}
      {modal === 'privacy' && <Modal title="Privacy Policy" content={PRIVACY_TEXT} onClose={() => setModal(null)} />}
    </>
  );
}