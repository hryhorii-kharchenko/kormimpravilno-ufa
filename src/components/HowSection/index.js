import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from '../SectionHeading';
import Chain from '../Chain';
import BlockQuote from '../BlockQuote';

function HowSection({ data }) {
  const chainElems = Object.entries(data)
    .filter(field => field[0].includes('Chain'))
    .map(field => field[1]);

  return (
    <section className="How">
      <SectionHeading text={data.howHeading} />

      <Chain elements={chainElems} />

      <BlockQuote text={data.howQuote} />
    </section>
  );
}

HowSection.propTypes = {
  data: PropTypes.shape({
    howHeading: PropTypes.string,
    howQuote: PropTypes.string,
  }).isRequired,
};

export default HowSection;
