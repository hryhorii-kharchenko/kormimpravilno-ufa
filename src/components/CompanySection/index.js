import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import SectionSubheading from '../SectionSubheading';
import BoxedQuote from '../BoxedQuote';
import ContentWrapper from '../ContentWrapper';

function CompanySection({ data }) {
  return (
    <section className="Company" id="company">
      <ContentWrapper>
        <SectionHeading text={data.companyHeading} />
        <SectionSubheading text={data.companySubheading} />

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
