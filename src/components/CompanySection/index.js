import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import BoxedQuote from '../BoxedQuote';
import ContentWrapper from '../ContentWrapper';

import './CompanySection.module.css';

function CompanySection({ data }) {
  return (
    <section styleName="CompanySection" id="company">
      <ContentWrapper>
        <SectionHeading text={data.companyHeading} />
        <SectionSubheading
          text={data.companySubheading}
          styleName="subheading"
        />

        <BoxedQuote text={data.companyQuote} btnText={data.companyBtnSignup} />
      </ContentWrapper>
    </section>
  );
}

CompanySection.propTypes = {
  data: PropTypes.shape({
    companyHeading: PropTypes.string,
    companySubheading: PropTypes.string,
    companyQuote: PropTypes.string,
    companyBtnSignup: PropTypes.string,
  }).isRequired,
};

export default CompanySection;
