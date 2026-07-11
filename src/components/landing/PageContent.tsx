"use client";

import React from "react";
import DOMPurify from "dompurify";

interface PageContentProps {
  content: string;
}

const PageContent: React.FC<PageContentProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','a','ul','ol','li','strong','em','br','img','div','span','table','thead','tbody','tr','th','td','blockquote','pre','code','hr','iframe','video','source'],
    ALLOWED_ATTR: ['href','src','alt','class','style','target','rel','width','height','id','frameborder','allowfullscreen','allow'],
  });

  return (
    <div 
      className="dynamic-content max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default PageContent;
