import * as React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const StyledLink = (props) => (
  <Link
    {...props}
    className={`border-b border-amber-800 border-dotted hover:border-solid focus:border-solid text-amber-800 ${props.className}`}
  >
    {props.children}
  </Link>
);

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
      pageMeta={{
        eyebrow:
          type === "chapter" && `${bookTitle} | Chapter ${chapterNumber}`,
        title: type === "book" ? bookTitle : chapterName,
      }}
    >
      <div className='bg-amber-100'>
        <nav className='container mx-auto py-3 flex'>
          <StyledLink to='/'>Home</StyledLink>
          {type === "book" && (
            <>
              <span className='mx-2'>&raquo;</span>
              <span className=''>{bookTitle}</span>
            </>
          )}
          {type === "chapter" && (
            <>
              <span className='mx-2'>&raquo;</span>
              <StyledLink to={`/${bookSlug}`}>{bookTitle}</StyledLink>
              <span className='mx-2'>&raquo;</span>
              <span className=''>{chapterName}</span>
            </>
          )}
        </nav>
      </div>

      <div class='container mx-auto flex py-10'>
        <div className='w-80'>
          <span className='font-bold text-xl text-orange-600 uppercase'>
            Chapters
          </span>
          <ul className='list-none'>
            {chapters.length > 0 &&
              chapters.map((chapter) => (
                <li key={chapter.id} className='my-1'>
                  <StyledLink
                    to={`/${chapter.slug}`}
                    className={
                      data.mdx.slug === chapter.slug &&
                      "font-bold pointer-events-none border-none"
                    }
                  >
                    {chapter.frontmatter.chapterNumber}.{" "}
                    {chapter.frontmatter.chapterName}
                  </StyledLink>
                </li>
              ))}
          </ul>
        </div>

        <div className='flex-1'>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </div>
      </div>
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
