import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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

const FigCaption = styled.figcaption`
  color: #333;
  font-size: 0.9rem;
  margin: 0.5rem;
`;

const BlogPost = ({ data }) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  return (
    <Layout pageTitle={data.mdx.frontmatter.chapterName}>
      <BookMetaData>
        <li>{data.mdx.frontmatter.book}</li>
        <li>Chapter {data.mdx.frontmatter.chapterNumber}</li>
        <li>{data.mdx.frontmatter.date}</li>
      </BookMetaData>
      <figure>
        <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
        <FigCaption>
          Photo Credit:{" "}
          <a href={data.mdx.frontmatter.hero_image_credit_link}>
            {data.mdx.frontmatter.hero_image_credit_text}
          </a>
        </FigCaption>
      </figure>
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
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`;

export default BlogPost;
