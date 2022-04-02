import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle='Home Page'>
      <p>I'm making this by following the Gatsby tutorial.</p>
      <StaticImage
        alt='Kansas City Chiefs Wide Receiver Tyreek Hill was Traded to the Miami Dolphins'
        src='https://dolphinswire.usatoday.com/wp-content/uploads/sites/53/2022/03/Tyreek-Hill_TA.png?w=1000&h=600'
      />
    </Layout>
  );
};

export default IndexPage;
