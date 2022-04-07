import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const Layout = ({ pageTitle, children }) => {
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
    <div className=''>
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>
      <header className=''>{data.site.siteMetadata.title}</header>
      <main>
        <h1 className=''>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
