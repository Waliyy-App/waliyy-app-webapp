import React from 'react';

const NotionRenderer = ({ blocks }) => {
  if (!blocks) return null;

  return blocks.map(block => {
    const { type, id } = block;
    const value = block[type];
    
    switch (type) {
      case 'paragraph':
        return (
          <p key={id} className="mb-4 text-gray-700 dark:text-gray-300">
            {value.text.map((text, i) => (
              <span key={i} className={text.annotations.code ? 'font-mono bg-gray-100 dark:bg-gray-700 p-1 rounded' : ''}>
                {text.plain_text}
              </span>
            ))}
          </p>
        );
      
      case 'heading_1':
        return (
          <h2 key={id} className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
            {value.text[0].plain_text}
          </h2>
        );
      
      case 'heading_2':
        return (
          <h3 key={id} className="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-100">
            {value.text[0].plain_text}
          </h3>
        );
      
      case 'heading_3':
        return (
          <h4 key={id} className="text-xl font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-200">
            {value.text[0].plain_text}
          </h4>
        );
      
      case 'bulleted_list_item':
        return (
          <ul key={id} className="list-disc pl-5 mb-4">
            <li>{value.text[0].plain_text}</li>
          </ul>
        );
      
      case 'image':
        const src = value.type === 'external' ? value.external.url : value.file.url;
        return (
          <div key={id} className="my-6">
            <img 
              src={src} 
              alt={value.caption[0]?.plain_text || ''} 
              className="rounded-xl shadow-md w-full"
            />
          </div>
        );
      
      default:
        return <div key={id}>Unsupported block type: {type}</div>;
    }
  });
};

export default NotionRenderer;