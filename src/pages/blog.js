import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layout";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle='My Blog Posts'>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            {node.frontmatter.chapterNumber}. {node.frontmatter.chapterName}
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
          <MDXRenderer>{node.body}</MDXRenderer>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query BlogQuery {
    allMdx(sort: { order: ASC, fields: frontmatter___chapterNumber }) {
      nodes {
        frontmatter {
          book
          chapterName
          chapterNumber
          date(formatString: "MMMM D, YYYY")
        }
        id
        body
      }
    }
  }
`;

export default BlogPage;
