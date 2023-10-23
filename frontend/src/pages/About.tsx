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
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus, ducimus! Quia odit dolore numquam, amet earum ab ipsam assumenda unde sapiente voluptates in laborum quisquam eos illum nulla. Commodi iure nihil natus quisquam ut mollitia alias ullam maiores illo iusto eligendi delectus voluptate in illum, eveniet beatae animi? Atque minima dolore impedit quod dolorem deleniti, ipsa id asperiores officiis deserunt reprehenderit possimus cumque soluta, explicabo voluptatibus natus. Deleniti, similique ex!
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laudantium suscipit ducimus fugit mollitia dolore voluptatum saepe, rem excepturi recusandae tenetur provident facere, dicta vitae accusantium, nulla deleniti quod aperiam.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, unde tenetur! Officiis asperiores quae nemo. Doloremque quam quis, voluptas sit vitae deserunt porro, tempore perferendis maxime doloribus, nobis odit asperiores laudantium illo! Deleniti iure blanditiis magnam eveniet dolor nesciunt dolorem, tempora adipisci in. Rem labore error quidem, incidunt numquam laborum!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae fuga consequuntur placeat nemo ad ipsa asperiores quasi, similique voluptate tempora inventore impedit temporibus sit incidunt dignissimos, numquam modi itaque eveniet.
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