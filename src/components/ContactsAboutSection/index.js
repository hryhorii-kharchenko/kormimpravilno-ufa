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
              src="https://www.google.com/maps/embed/v1/place?q=place_id:EjtLcmVtZW5jaHVnc2theWEgVWxpdHNhLCAyMSwgU2Fua3QtUGV0ZXJidXJnLCBSdXNzaWEsIDE5MTE2NyIwEi4KFAoSCUtNPDPIMZZGEcbsOnVGBkmaEBUqFAoSCQ0Yey7IMZZGES6cHjunpVNe&key=AIzaSyCCY8rnlUPqE6_GszGd3lRbLOMf9-nR-So"
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
