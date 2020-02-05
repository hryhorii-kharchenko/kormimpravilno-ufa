import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './Pagination.module.css';
import ArrowPrevIcon from '../../images/inline/arrow-previous.svg';
import ArrowNextIcon from '../../images/inline/arrow-next.svg';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const firstNumber = 1;
  const numbersAround = 3;
  const bufferSize = 2;
  const leftArrow = (
    <Button
      isAction
      isCircle
      onClick={
        currentPage === firstNumber
          ? null
          : () => setCurrentPage(currentPage - 1)
      }
      styleName={`left-arrow ${
        currentPage === firstNumber ? 'arrow-inactive' : ''
      }`}
    >
      <ArrowPrevIcon alt="Назад" styleName="arrow-prev-img" />
    </Button>
  );
  const rightArrow = (
    <Button
      isAction
      isCircle
      onClick={
        currentPage === totalPages
          ? null
          : () => setCurrentPage(currentPage + 1)
      }
      styleName={`right-arrow ${
        currentPage === totalPages ? 'arrow-inactive' : ''
      }`}
    >
      <ArrowNextIcon alt="Вперёд" styleName="arrow-next-img" />
    </Button>
  );
  const numbers = [];
  // if (totalPages > numbersAround + bufferSize) {
  //   if (currentPage - numbersAround - bufferSize > 0) {
  //     numbers.push(
  //       <>
  //         <Button isAction isCircle styleName="number-btn">
  //           {firstNumber}
  //         </Button>
  //         <div styleName="dots">
  //           <div styleName="dot" />
  //           <div styleName="dot" />
  //           <div styleName="dot" />
  //         </div>
  //       </>
  //     );

  //     if (currentPage - numbersAround > 0) {
  //       for (let i = currentPage - numbersAround; i < currentPage; i += 1) {
  //         numbers.push(
  //           <Button isAction isCircle styleName="number-btn">
  //             {i}
  //           </Button>
  //         );
  //       }
  //     } else {
  //       for (
  //         let i = currentPage - numbersAround - bufferSize;
  //         i < currentPage;
  //         i += 1
  //       ) {
  //         numbers.push(
  //           <Button isAction isCircle styleName="number-btn">
  //             {i}
  //           </Button>
  //         );
  //       }
  //     }
  //   } else {
  //     for (let i = firstNumber; i < currentPage; i += 1) {
  //       numbers.push(
  //         <Button isAction isCircle styleName="number-btn">
  //           {i}
  //         </Button>
  //       );
  //     }
  //   }

  //   for (
  //     let i = currentPage;
  //     i <= currentPage + numbersAround + bufferSize;
  //     i += 1
  //   ) {
  //     numbers.push(
  //       <Button isAction isCircle styleName="number-btn">
  //         {i}
  //       </Button>
  //     );
  //   }

  //   if (currentPage + numbersAround + bufferSize < totalPages) {
  //     if (currentPage + numbersAround < totalPages) {
  //       for (let i = currentPage; i <= currentPage + numbersAround; i += 1) {
  //         numbers.push(
  //           <Button isAction isCircle styleName="number-btn">
  //             {i}
  //           </Button>
  //         );
  //       }
  //     } else {
  //       for (
  //         let i = currentPage;
  //         i <= currentPage + numbersAround + bufferSize;
  //         i += 1
  //       ) {
  //         numbers.push(
  //           <Button isAction isCircle styleName="number-btn">
  //             {i}
  //           </Button>
  //         );
  //       }
  //     }
  //   } else {
  //     for (let i = currentPage; i <= totalPages; i += 1) {
  //       numbers.push(
  //         <Button isAction isCircle styleName="number-btn">
  //           {i}
  //         </Button>
  //       );
  //     }
  //   }

  //   if (currentPage + numbersAround + bufferSize < totalPages) {
  //     numbers.push(
  //       <>
  //         <div styleName="dots">
  //           <div styleName="dot" />
  //           <div styleName="dot" />
  //           <div styleName="dot" />
  //         </div>
  //         <Button isAction isCircle styleName="number-btn">
  //           {totalPages}
  //         </Button>
  //       </>
  //     );
  //   }
  // }

  for (let i = 1; i <= totalPages; i += 1) {
    numbers.push(
      <Button
        isAction
        isCircle
        styleName={`number-btn ${currentPage === i ? 'active' : ''}`}
        onClick={() => setCurrentPage(i)}
        key={i}
      >
        {i}
      </Button>
    );
  }

  if (numbers.length > 0) {
    return (
      <section styleName="Pagination" id="pagination">
        <div styleName="pagination-wrapper">
          {leftArrow}
          {numbers}
          {rightArrow}
        </div>
      </section>
    );
  }

  return null;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
