// ./frontend/src/app/[lang]/components/PageHeader.tsx

import React from "react";

interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text } : PageHeaderProps) {
  return (
    <div className="my-16 w-full text-center">
    <h2 className="text-4xl my-4 lg:text-5xl font-bold font-heading">{heading}</h2>
    { text && <span className="text-xl">{text}</span> }
  </div>
  );
}