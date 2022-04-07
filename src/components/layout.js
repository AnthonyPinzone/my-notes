import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Layout = ({ pageMeta = {}, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div>
      <title>{pageMeta.title || data.site.siteMetadata.title}</title>
      <header className='bg-amber-200 py-12'>
        <div className='container mx-auto'>
          {pageMeta.eyebrow && (
            <span className='text-orange-900'>{pageMeta.eyebrow}</span>
          )}
          <h1 className='text-orange-700 text-3xl font-bold'>
            {pageMeta.title || data.site.siteMetadata.title}
          </h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
