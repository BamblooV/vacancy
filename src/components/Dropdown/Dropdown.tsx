import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react'

export type Option = {
  key: string,
  value: string
}

export type MultiDropdownProps = {
  options: Option[],
  value: string;
  disabled?: boolean,
  onClick: (value: string, key: string) => void,
};

export const Dropdown: React.FC<MultiDropdownProps> = ({ options, value, disabled = false, onClick }) => {

  const [isOpened, setIsOpened] = useState(true);

  useEffect(() => {
    setIsOpened(false)
  }, [disabled]);

  const toggleOpen = useCallback(
    () => {
      if (disabled) return
      setIsOpened(prevState => !prevState)
    },
    [disabled, setIsOpened],
  );

  return (
    <div className="control__item">
      <div className="control__label">Form</div>
      <div className="dropdown">
        <button
          className="btn dropdown__btn"
          onClick={toggleOpen}
        >
          {Boolean(value) ? value : <span className="dropdown__placeholder">Not selected</span>}
          <span className={classNames('icon-dropdown', { 'mirrored': isOpened })}></span></button>
        {isOpened && (
          <ul className="dropdown__options">
            {options.map(item => {
              return (
                <li
                  className="dropdown__option"
                  key={item.key}
                  onClick={() => {
                    onClick(item.value, item.key);
                    setIsOpened(false);
                  }}
                >
                  {item.value}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
