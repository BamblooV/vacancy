import classNames from 'classnames'
import React, { useCallback } from 'react'

export type ControlUnitProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string;
  error: string;
  onChange: (value: string) => void;
}



export const ControlUnit: React.FC<ControlUnitProps> = React.memo(({ id, placeholder, value, type, autoComplete = "off", label, error = '', onChange, ...attributes }) => {

  const onChangeHandler = useCallback(
    (evet: React.ChangeEvent<HTMLInputElement>) => {
      onChange(evet.currentTarget.value)
    },
    [onChange],
  )

  return (
    <div className="control__item">
      <label className="control__label" htmlFor={id}>{label}</label>
      <input
        className={classNames("control__input", { "control__input_invalid": Boolean(error) })}
        value={value}
        placeholder={placeholder}
        id={id}
        type={type}
        autoComplete={autoComplete}
        {...attributes}
        onChange={onChangeHandler}
      />
      {Boolean(error) && <p className="error-message">{error}</p>}
    </div >
  )
}
)