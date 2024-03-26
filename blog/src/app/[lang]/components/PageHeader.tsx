// ./frontend/src/app/[lang]/components/PageHeader.tsx

import React from "react";

interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text } : PageHeaderProps) {
  return (
    <div className="my-16 mx-auto w-3/5 text-center">
    <h2 className="text-4xl my-4 lg:text-5xl font-bold font-heading">{heading}</h2>
    { text && <span className="text-md">{text}</span> }
    
  </div>
  );
}
