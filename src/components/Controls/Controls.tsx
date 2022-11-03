import React, { useCallback, useState } from 'react'
import { useAppDispatch } from '../../store/store';
import { ControlUnit } from '../ControlUnit';
import { Dropdown, Option } from '../Dropdown'
import { clearSotring, filterVacancies } from '../../store/reducers/VacancySlice';
import { fetchVacancies } from '../../store/reducers/ActionCreator';

const options: Option[] = [
  { key: 'fullDay', value: 'Полный день' },
  { key: 'shift', value: 'Сменный график' },
  { key: 'flexible', value: 'Гибкий график' },
  { key: 'remote', value: 'Удаленная работа' },
  { key: 'flyInFlyOut', value: 'Вахтовый метод' },
]
export const Controls = () => {

  const dispatch = useAppDispatch();

  const [dropdownValue, setdropdownValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const onFilterClick = useCallback((value: string, key: string) => {
    setdropdownValue(value);
    dispatch(filterVacancies(key));
  }, [setdropdownValue, dispatch, filterVacancies]
  )

  const onClearSortingClick = useCallback(() => {
    setdropdownValue('');
    setSearchValue('');
    dispatch(clearSotring());
  }, [setdropdownValue, setSearchValue, dispatch, clearSotring])

  return (
    <div className="control">
      <Dropdown
        value={dropdownValue}
        onClick={onFilterClick}
        options={options}
      />
      <ControlUnit
        label="Position"
        error={''}
        placeholder="Unspecified"
        id="position"
        type="search"
        value={searchValue}
        onChange={setSearchValue}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.code === 'Enter') {
            dispatch(fetchVacancies(event.currentTarget.value))
          }
        }}
      />
      <button
        className="btn btn-clear"
        onClick={onClearSortingClick}
        disabled={!Boolean(dropdownValue) && !Boolean(searchValue)}
      >
        Clear sorting <span className="icon-cross"></span>
      </button>
    </div>
  )
}
