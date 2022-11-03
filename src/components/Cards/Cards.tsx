import React, { useCallback, useEffect } from 'react'
import { fetchVacancies } from '../../store/reducers/ActionCreator'
import { showMoreVacancies } from '../../store/reducers/VacancySlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Card } from '../Card/Card'
import { RectangularButton } from '../RectangularButton'

export const Cards = () => {

  const dispatch = useAppDispatch();

  const { error, filteredVacancies, isLoading, numberToRendered } = useAppSelector(state => state.vacancyReducer)

  const showMore = useCallback(() => {
    dispatch(showMoreVacancies());
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchVacancies(''))
  }, [])


  if (error) {
    return (
      <h3>Ошибка, не удалось загрузить вакансии с API</h3>
    )
  }

  if (isLoading) {
    return (
      <h3>Идет загрузка данных...</h3>
    )
  }

  if (filteredVacancies.length === 0) {
    return (
      <h3>Таких вакансий не нашлось, попробуй еще!</h3>
    )
  }

  return (
    <>
      {filteredVacancies.slice(0, numberToRendered).map(item => (
        <Card logo={item.logo?.original} form={item.schedule.name} company={item.company} linkToSite={item.linkToSite} address={item.address} jobName={item.jobName} description={item.description} />
      ))}

      {filteredVacancies.length > numberToRendered && <RectangularButton onClick={showMore} text='Показать еще вакансии' />}
    </>
  )
}