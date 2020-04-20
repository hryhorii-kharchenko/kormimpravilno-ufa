/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Scrollbar from 'react-scrollbars-custom';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';

import './ContactsAboutSection.module.css';
import phoneIcon from '../../images/icons/phone.svg';
import pinIcon from '../../images/icons/pin.svg';
import mailIcon from '../../images/icons/mail.svg';
import pdfIcon from '../../images/icons/pdf.svg';
import workingHoursIcon from '../../images/icons/working-hours.svg';

function ContactsAboutSection({ data }) {
  const { contactsShops } = data;

  const [selectedCity, changeSelectedCity] = useState(1);

  const shops = [];
  const maps = [];

  if (contactsShops.address1) {
    if (contactsShops.workingHours1) {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 1 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(1)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address1}</p>
            </li>
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img
                  src={workingHoursIcon}
                  alt="Время работы"
                  styleName="icon workinghours-icon"
                />
              </div>
              <p styleName="info">{contactsShops.workingHours1}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    } else {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 1 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(1)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address1}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    }
  }

  if (contactsShops.address2) {
    if (contactsShops.workingHours2) {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 2 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(2)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address2}</p>
            </li>
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img
                  src={workingHoursIcon}
                  alt="Время работы"
                  styleName="icon workinghours-icon"
                />
              </div>
              <p styleName="info">{contactsShops.workingHours2}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    } else {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 2 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(2)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address2}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    }
  }

  if (contactsShops.address3) {
    if (contactsShops.workingHours3) {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 3 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(3)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address3}</p>
            </li>
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img
                  src={workingHoursIcon}
                  alt="Время работы"
                  styleName="icon workinghours-icon"
                />
              </div>
              <p styleName="info">{contactsShops.workingHours3}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    } else {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 3 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(3)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address3}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    }
  }

  if (contactsShops.address4) {
    if (contactsShops.workingHours4) {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 4 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(4)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address4}</p>
            </li>
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img
                  src={workingHoursIcon}
                  alt="Время работы"
                  styleName="icon workinghours-icon"
                />
              </div>
              <p styleName="info">{contactsShops.workingHours4}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    } else {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 4 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(4)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address4}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    }
  }

  if (contactsShops.address5) {
    if (contactsShops.workingHours5) {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 5 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(5)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address5}</p>
            </li>
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img
                  src={workingHoursIcon}
                  alt="Время работы"
                  styleName="icon workinghours-icon"
                />
              </div>
              <p styleName="info">{contactsShops.workingHours5}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    } else {
      shops.push(
        <section
          styleName={`city-wrapper ${selectedCity === 5 ? 'active' : ''}`}
          onClick={() => changeSelectedCity(5)}
        >
          <ul styleName="contacts-list">
            <li styleName="list-item">
              <div styleName="icon-wrapper">
                <img src={pinIcon} alt="Адрес" styleName="icon" />
              </div>
              <p styleName="info">{contactsShops.address5}</p>
            </li>
          </ul>

          <div styleName="active-line" />
        </section>
      );
    }
  }

  if (contactsShops.map1) {
    maps.push(
      <iframe
        title="Карта"
        width="100%"
        height="473"
        frameBorder="0"
        style={{ border: 0 }}
        src={contactsShops.map1}
        allowFullScreen
        styleName={`map${selectedCity === 1 ? ' active-map' : ''}`}
      />
    );
  }

  if (contactsShops.map2) {
    maps.push(
      <iframe
        title="Карта"
        width="100%"
        height="473"
        frameBorder="0"
        style={{ border: 0 }}
        src={contactsShops.map2}
        allowFullScreen
        styleName={`map${selectedCity === 2 ? ' active-map' : ''}`}
      />
    );
  }

  if (contactsShops.map3) {
    maps.push(
      <iframe
        title="Карта"
        width="100%"
        height="473"
        frameBorder="0"
        style={{ border: 0 }}
        src={contactsShops.map3}
        allowFullScreen
        styleName={`map${selectedCity === 3 ? ' active-map' : ''}`}
      />
    );
  }

  if (contactsShops.map4) {
    maps.push(
      <iframe
        title="Карта"
        width="100%"
        height="473"
        frameBorder="0"
        style={{ border: 0 }}
        src={contactsShops.map4}
        allowFullScreen
        styleName={`map${selectedCity === 4 ? ' active-map' : ''}`}
      />
    );
  }

  if (contactsShops.map5) {
    maps.push(
      <iframe
        title="Карта"
        width="100%"
        height="473"
        frameBorder="0"
        style={{ border: 0 }}
        src={contactsShops.map5}
        allowFullScreen
        styleName={`map${selectedCity === 5 ? ' active-map' : ''}`}
      />
    );
  }

  let scrollbarStyle = { width: '100%', height: '473px' };

  if (typeof window !== 'undefined') {
    if (window.innerWidth <= 950) {
      scrollbarStyle = { width: '100%', height: '350px' };
    }
  }

  return (
    <section styleName="ContactsAboutSection" id="contacts">
      <ContentWrapper>
        <SectionHeading text={data.contactsHeading} />

        <div styleName="wrapper">
          <div styleName="text-wrapper">
            <Scrollbar
              style={scrollbarStyle}
              // styleName="scrollbar"
              noScrollX
              noDefaultStyles
            >
              {shops}
            </Scrollbar>
            {/* <h3 styleName="subheading">{data.contactsSubheading}</h3>
            <ul styleName="contacts-list">
              <li styleName="list-item">
                <div styleName="icon-wrapper">
                  <img src={phoneIcon} alt="Телефон" styleName="icon" />
                </div>
                <p styleName="info">{data.contactsPhone}</p>
              </li>
              <li styleName="list-item">
                <div styleName="icon-wrapper">
                  <img src={pinIcon} alt="Адрес" styleName="icon" />
                </div>
                <p styleName="info">{data.contactsAddress}</p>
              </li>
              <li styleName="list-item">
                <div styleName="icon-wrapper">
                  <img src={mailIcon} alt="Email" styleName="icon" />
                </div>
                <p styleName="info">{data.contactsEmail}</p>
              </li>
            </ul> */}

            {/* <div styleName="line" />

            <ul styleName="contacts-list">
              <li styleName="list-item">
                <a href={data.contactsOferta} styleName="link">
                  <div styleName="icon-wrapper">
                    <img src={pdfIcon} alt="PDF" styleName="icon" />
                  </div>
                  <p styleName="info">Оферта</p>
                </a>
              </li>
              <li styleName="list-item">
                <a href={data.contactsAgreement} styleName="link">
                  <div styleName="icon-wrapper">
                    <img src={pdfIcon} alt="PDF" styleName="icon" />
                  </div>
                  <p styleName="info">Пользовательское соглашение</p>
                </a>
              </li>
            </ul> */}
          </div>
          <div styleName="map-wrapper">
            {maps}
            {/* <iframe
              title="Карта"
              width="100%"
              height="473"
              frameBorder="0"
              style={{ border: 0 }}
              src={data.contactsMap}
              allowFullScreen
            /> */}
          </div>
        </div>

        <section styleName="info-wrapper">
          <ul styleName="info-list">
            <li styleName="info-list-item">
              <div styleName="icon-wrapper">
                <img src={phoneIcon} alt="Телефон" styleName="icon" />
              </div>
              <p styleName="info">{data.contactsPhone}</p>
            </li>
            <li styleName="separator" />
            <li styleName="info-list-item">
              <div styleName="icon-wrapper">
                <img src={mailIcon} alt="Email" styleName="icon" />
              </div>
              <p styleName="info">{data.contactsEmail}</p>
            </li>
            <li styleName="separator" />
            <li styleName="info-list-item">
              <a href={data.contactsOferta} styleName="link">
                <div styleName="icon-wrapper">
                  <img src={pdfIcon} alt="PDF" styleName="icon" />
                </div>
                <p styleName="info">Оферта</p>
              </a>
            </li>
            <li styleName="separator" />
            <li styleName="info-list-item">
              <a href={data.contactsAgreement} styleName="link">
                <div styleName="icon-wrapper">
                  <img src={pdfIcon} alt="PDF" styleName="icon" />
                </div>
                <p styleName="info">Пользовательское соглашение</p>
              </a>
            </li>
          </ul>
        </section>
      </ContentWrapper>
    </section>
  );
}

ContactsAboutSection.propTypes = {
  data: PropTypes.shape({
    contactsHeading: PropTypes.string,
    contactsSubheading: PropTypes.string,
    contactsAddress: PropTypes.string,
    contactsAgreement: PropTypes.string,
    contactsEmail: PropTypes.string,
    contactsOferta: PropTypes.string,
    contactsPhone: PropTypes.string,
    contactsMap: PropTypes.string,
    contactsShops: PropTypes.shape({
      address1: PropTypes.string,
      workingHours1: PropTypes.string,
      map1: PropTypes.string,
      address2: PropTypes.string,
      workingHours2: PropTypes.string,
      map2: PropTypes.string,
      address3: PropTypes.string,
      workingHours3: PropTypes.string,
      map3: PropTypes.string,
      address4: PropTypes.string,
      workingHours4: PropTypes.string,
      map4: PropTypes.string,
      address5: PropTypes.string,
      workingHours5: PropTypes.string,
      map5: PropTypes.string,
    }),
  }).isRequired,
};

export default ContactsAboutSection;
