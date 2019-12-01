import React from 'react';

import ChainElem from '../ChainElem';

function Chain({ elements }) {
  const chain = elements.map(elem => (
    <ChainElem heading={elem.heading} text={elem.text} />
  ));

  return { chain };
}

export default Chain;
