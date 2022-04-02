import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const AboutPage = () => {
  return (
    <Layout pageTitle='About Me'>
      <p>
        Hi there! I'm the proud creator of this site, which I built with Gatsby.
      </p>
      <StaticImage
        alt='All Pro Offensive Tackle Terron Armstead signed a mega deal with the Miami Dolphins'
        src='../images/Terron-Armstead-Media.webp'
      />
    </Layout>
  );
};

export default AboutPage;
