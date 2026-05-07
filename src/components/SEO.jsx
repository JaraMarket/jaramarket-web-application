import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | JaraMarket` : 'JaraMarket | Premium Food Marketplace';
    
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);

  return null;
};

export default SEO;
