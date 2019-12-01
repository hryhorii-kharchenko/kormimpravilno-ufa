import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

import BannerSection from '../components/BannerSection';
import CompanySection from '../components/CompanySection';
import HowSection from '../components/HowSection';
import PopularSection from '../components/PopularSection';
import RecipeSection from '../components/RecipeSection';
import InstaSection from '../components/InstaSection';

function IndexPage({ data }) {
  const page = data.wpgraphql.page.main_page;

  function getSectionEntries(sectionName) {
    return Object.fromEntries(
      Object.entries(page).filter(field => field[0].includes(sectionName))
    );
  }

  const banner = getSectionEntries('banner');
  const company = getSectionEntries('company');
  const how = getSectionEntries('how');
  const popular = getSectionEntries('popular');
  const recipe = getSectionEntries('recipe');
  const instagram = getSectionEntries('instagram');

  return (
    <Layout>
      <SEO title="Главная" />

      <BannerSection data={banner} />
      <CompanySection data={company} />
      <HowSection data={how} />
      <PopularSection data={popular} />
      <RecipeSection data={recipe} />
      <InstaSection data={instagram} />
    </Layout>
  );
}

export default IndexPage;

export const query = graphql`
  query indexQuery {
    wpgraphql {
      page(id: "cGFnZToxNw==") {
        id
        main_page {
          bannerBtnRecipes
          bannerBtnStore
          bannerHeading {
            fieldGroupName
            firstLine
            secondLine
          }
          bannerSubheading
          companyBtnSignup
          companyHeading
          companySubheading
          companyQuote
          howHeading
          howQuote
          howChainFirst {
            text
            heading
            fieldGroupName
          }
          howChainSecond {
            text
            heading
            fieldGroupName
          }
          howChainThird {
            text
            heading
            fieldGroupName
          }
          howChainFourth {
            text
            heading
            fieldGroupName
          }
          instagramHeading
          instagramSubheading
          popularBtnStore
          popularHeading
          recipesHeading
          recipesSubheading
          fieldGroupName
        }
      }
    }
  }
`;
