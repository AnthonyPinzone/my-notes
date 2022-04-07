import * as React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const HomePage = ({ data }) => {
  return (
    <Layout>
      <div className='container mx-auto'>
        <ul className='grid grid-cols-4 gap-10'>
          {data.allMdx.nodes.map((node) => {
            if (node.frontmatter.type === "book") {
              const image = getImage(node.frontmatter.bookCover);
              return (
                <li key={node.id}>
                  <Link to={node.slug}>
                    <GatsbyImage
                      className='max-h-full'
                      image={image}
                      alt={node.frontmatter.bookTitle}
                    />
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx {
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
    }
  }
`;

export default HomePage;
