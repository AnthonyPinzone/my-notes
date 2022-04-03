import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../../components/layout";
import styled from "styled-components";

const BookMetaData = styled.ul`
  color: #666;
  font-size: 0.9rem;
  list-style: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  width: 100%;

  li {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

const BlogPost = ({ data }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.chapterName}>
      <BookMetaData>
        <li>{data.mdx.frontmatter.book}</li>
        <li>Chapter {data.mdx.frontmatter.chapterNumber}</li>
        <li>{data.mdx.frontmatter.date}</li>
      </BookMetaData>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        book
        chapterName
        chapterNumber
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;

export default BlogPost;
