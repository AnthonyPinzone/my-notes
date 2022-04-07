import * as React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const Books = ({ data }) => {
  const bookSlug = data.mdx.slug.split("/")[0];
  const {
    bookCover,
    bookTitle,
    chapterName,
    chapterNumber,
    hero_image,
    hero_image_alt,
    hero_image_credit_link,
    hero_image_credit_text,
    type,
  } = data.mdx.frontmatter;

  let chapters = [];
  if (!!data.allMdx) {
    chapters = data.allMdx.nodes.filter((chapter) =>
      chapter.slug.includes(bookSlug)
    );
  }

  return (
    <Layout
      pageTitle={
        type === "book" ? bookTitle : `${chapterNumber}. ${chapterName}`
      }
    >
      <div className='sidebar'>
        <figure style={{ maxWidth: "200px" }}>
          <figcaption>
            <Link to={`/books/${bookSlug}`}>{bookTitle}</Link>
          </figcaption>
          <GatsbyImage
            image={getImage(bookCover)}
            alt={bookTitle}
            style={{ maxWidth: "200px" }}
          />
        </figure>

        {chapters.length > 0 &&
          chapters.map((chapter) => (
            <li key={chapter.id}>
              <Link to={`/books/${chapter.slug}`}>
                {chapter.frontmatter.chapterNumber}.{" "}
                {chapter.frontmatter.chapterName}
              </Link>
            </li>
          ))}
      </div>

      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String, $type: String = "chapter") {
    mdx(id: { eq: $id }) {
      id
      body
      slug
      frontmatter {
        type
        bookTitle
        bookCover {
          childImageSharp {
            gatsbyImageData
          }
        }
        chapterName
        chapterNumber
        date
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: $type } } }
      sort: { fields: frontmatter___chapterNumber, order: ASC }
    ) {
      nodes {
        id
        slug
        frontmatter {
          type
          bookTitle
          bookCover {
            childImageSharp {
              gatsbyImageData
            }
          }
          chapterName
          chapterNumber
        }
      }
    }
  }
`;

export default Books;
