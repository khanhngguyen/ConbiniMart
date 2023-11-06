import React from 'react'

import partner1 from "../styles/assets/partner-1.png";
import partner2 from "../styles/assets/partner-2.png";
import partner3 from "../styles/assets/partner-3.png";
import partner4 from "../styles/assets/partner-4.png";
import partner5 from "../styles/assets/partner-5.png";

const About = () => {
  return (
    <div className='about'>
      <div className='about__title'>
        <h2>About us</h2>
      </div>
      <div className='about__content'>
        <p><strong>ConbiniMart</strong> is a full-stack project that marks the end of back-end module in my study program with Integrify Academy.
          The project consists of two parts: front-end & back-end.
          <br /><br />
          The front-end acts as an E-commerce themed inteface, where users can interact & make actions such as: browsing products, search or filter & sort products, log in or register, etc.
          The back-end serves as an API endpoints which connects to a database to store data, where front-end can do fetch & do CRUD actions to database.
          <br /><br />
          Technologies used in this project:<br/>
          <strong>- Backend:</strong>- C#, using ASP .Net Core with Entity Framework; PostgreSQL for database.<br />
          <strong>- Frontend:</strong> TypeScipt with React & Redux Toolkit; SASS & MUI for stylings.
        </p>
        <p>
          More details about this project can be found at:<br />
          - Github repository: <a href='https://github.com/khanhngguyen/Fullstack-fs15'>https://github.com/khanhngguyen/Fullstack-fs15</a><br />
          Back-end Swagger documentation: <br />
          <a href='https://fs15kim-ecommerce-backend.azurewebsites.net/swagger/index.html'>https://fs15kim-ecommerce-backend.azurewebsites.net/swagger/index.html</a>
          <br /><br />
          <strong>TMI:</strong> Conbini, or Konbini, is a Japanese word borrowed from English. Conbini is abbreviation of コンビニエンスストア (konbiniensu sutoa), meaning convenience store. <a href='https://www.wordsense.eu/konbini/'>(source)</a>
          <br /><br />
          Disclaimer: some pages' UI are from <a href='https://github.com/codewithsadee'>@codewithsadee</a>, with modifications.
        </p>
      </div>
      <section className='about__partners'>
        <div className='about__partners__container'>
          <h2>Our partners</h2>
          <ul>
            <li>
              <img src={partner1} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
            <li>
              <img src={partner2} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
            <li>
              <img src={partner3} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
            <li>
              <img src={partner4} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
            <li>
              <img src={partner5} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
            <li>
              <img src={partner1} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
            <li>
              <img src={partner2} width='132' height='134' loading='lazy' alt='partners logo' />
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default About