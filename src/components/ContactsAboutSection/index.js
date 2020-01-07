import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import SectionHeading from '../SectionHeading';

import './ContactsAboutSection.module.css';
import phoneIcon from '../../images/icons/phone.svg';
import pinIcon from '../../images/icons/pin.svg';
import mailIcon from '../../images/icons/mail.svg';
import pdfIcon from '../../images/icons/pdf.svg';

function ContactsAboutSection({ data }) {
  return (
    <section styleName="ContactsAboutSection" id="contacts">
      <ContentWrapper>
        <SectionHeading text={data.contactsHeading} />

        <div styleName="wrapper">
          <div styleName="text-wrapper">
            <h3 styleName="subheading">{data.contactsSubheading}</h3>
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
            </ul>

            <div styleName="line" />

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
            </ul>
          </div>
          <div styleName="map-wrapper">
            <iframe
              title="Карта"
              width="100%"
              height="473"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed/v1/place?q=%D0%B3.%20%D0%A3%D1%84%D0%B0%2C%20%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%20%D0%91%D0%B0%D1%88%D0%BA%D0%BE%D1%80%D1%82%D0%BE%D1%81%D1%82%D0%B0%D0%BD%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B0%D1%8F%2037&key=AIzaSyC39Q2apuV-arhQet2L9zc1n6-O-84EVT0"
              allowFullScreen
            />
          </div>
        </div>
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
  }).isRequired,
};

export default ContactsAboutSection;
