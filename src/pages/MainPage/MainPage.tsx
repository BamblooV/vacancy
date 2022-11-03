import React from 'react'
import { Cards } from '../../components/Cards'
import { Controls } from '../../components/Controls'
import Form from '../../components/Form/Form'
import { useAppSelector } from '../../store/store'

export const MainPage = () => {

  const { } = useAppSelector(state => state.vacancyReducer)

  return (
    <div className="container">
      <section className="wrapper vacancies">
        <h1 className="section-title">List of vacancies</h1>

        <Controls />
        <Cards />

      </section>
      <section className="wrapper">
        <h2 className="section-title">Leave a request</h2>
        <div className="feedback__wrapper">
          <Form />
          <footer className="footer">
            <h3 className="footer__title">
              We will advise you and help you start a new project
            </h3>
            <p className="footer_contacts">
              <a href="tel:+74993916669">+7 499 391-66-69</a>
              <a href="mailto:mail@greensight.ru">mail@greensight.ru</a>
            </p>
            <p className="footer__location">
              Moscow, Zelenograd, Central Ave.,<br />
              bldg. 305, 3rd floor <br />
              <a href="https://yandex.ru/maps/org/grinsayt/212047314188/?ll=37.214414%2C55.996374&z=18.57" target="_blank" rel="noreferrer noopener"
              >How to get there?</a
              >
            </p>
          </footer>
        </div>
      </section>
    </div>
  )
}
