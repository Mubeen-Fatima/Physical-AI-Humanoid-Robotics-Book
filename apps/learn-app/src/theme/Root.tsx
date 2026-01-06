import React from 'react';
import ChatWidget from '@site/src/components/ChatWidget';
import ChatSection from '@site/src/components/LandingPage/ChatSection';

// This component wraps the entire Docusaurus app
export default function Root({ children }): JSX.Element {
  return (
    <>
      {children}
      <ChatSection />
      <ChatWidget />
    </>
  );
}
