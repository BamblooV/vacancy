import React, { useCallback, useState } from 'react'
import { useControl } from '../../userHooks/useControlHook';
import { ControlUnit } from '../ControlUnit'
import { RectangularButton } from '../RectangularButton';

const Form = () => {
  const [name, setName, setNameError] = useControl();
  const [mail, setMail, setMailError] = useControl();
  const [tel, setTel, setTelError] = useControl();

  const [text, setText] = useState("");

  const nameValidator = useCallback(
    (value: string) => {

      if (value.length === 0) {
        setNameError("Поле обязательно к заполнению");
        return
      }

      if (value.length > 3) {
        setNameError("");
      } else {
        setNameError("Слишком короткое имя");
      }
    },
    []
  );
  const emailValidator = useCallback(
    (value: string) => {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (value.length === 0) {
        setMailError("Поле обязательно к заполнению");
        return
      }

      if (value.toLowerCase().match(re)) {
        setMailError("");
      } else {
        setMailError("Нужно ввести почту");
      }
    },
    []
  );
  const phoneValidator = useCallback(
    (value: string) => {
      const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

      if (value.length === 0) {
        setTelError("Поле обязательно к заполнению");
        return
      }

      if (value.match(re)) {
        setTelError("");
      } else {
        setTelError("Нужно вводить номер телефона");
      }

    },
    []
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('event handler')
    const isAllValid = [name.error, mail.error, tel.error].every(item => item === "");
    const isAllFilled = [name.value, mail.value, tel.value].every(item => item.length > 0)
    if (isAllValid && isAllFilled) {
      alert(`
        Имя соискателя: ${name.value}
        Почта соискателя: ${mail.value}
        Телефон соискателя: ${tel.value}
        Сообщение: ${text}
        `)
    }
  }

  return (
    <form className="form" action="" onSubmit={submitHandler}>
      <ControlUnit
        label="Your name"
        error={name.error}
        placeholder="Please introduce yourself"
        id="name"
        type="text"
        value={name.value}
        onChange={setName}
        onBlur={() => nameValidator(name.value)}
        onFocus={() => setNameError("")}
      />
      <ControlUnit
        label="Email"
        error={mail.error}
        placeholder="ivanov@mail.ru"
        id="email"
        type="email"
        value={mail.value}
        onChange={setMail}
        onBlur={() => emailValidator(mail.value)}
        onFocus={() => setMailError("")}
      />
      <ControlUnit
        label="Phone number"
        error={tel.error}
        placeholder="+7 (999) 123-45-78"
        id="tel"
        type="tel"
        value={tel.value}
        onChange={setTel}
        onBlur={() => phoneValidator(tel.value)}
        onFocus={() => setTelError("")}
      />
      <ControlUnit
        label="Comment"
        error={''}
        placeholder="Message text"
        id="text"
        type="text"
        value={text}
        onChange={setText}
      />
      <RectangularButton type="submit" onClick={submitHandler} text={'Send'} />
      <p className="agreement">
        By clicking "Send" you confirm your consent to the
        <a href="#">processing of personal data</a>
      </p>
    </form>
  )
}

export default Form