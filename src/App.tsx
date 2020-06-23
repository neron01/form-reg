import React, {useState} from 'react';
import './App.css';

type SubForm = {
  email: string,
  password: string,
  rePassword: string,
  city: string,
  gender: string,
  agree: boolean,
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [agree, setAgree] = useState(false);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail('');
    setPassword('');
    setRePassword('');
    setCity('');
    setGender('');
    setAgree(false)
    console.log('submit')
  }
  const changeHandlerEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const changeHandlerPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const changeHandlerRePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(event.target.value);
  }
  const changeHandlerCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  }
  const changeHandlerGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  }
  const changeHandlerAgree = () => {
    setAgree(!agree);
  }

  const subForm: SubForm = {
    email,
    password,
    rePassword,
    city,
    gender,
    agree,
  }
  const activeButton = Object.values(subForm)
    .filter(e => e === false || e === '')
    .length === 0
  //
  const regexpEmail = /^[\w-.]{2,}@[\w-]{2,}\.[\w]{2,}$/
  const emailControl = regexpEmail.test(email)
  const alertEmail = 'неверный формат';

  const passControlLength = password.length >= 8

  const regexpPass1 = /[0-9]/;
  const regexpPass2 = /[A-Z]/;
  const regexpPass3 = /[a-z]/;
  const passControl1 = regexpPass1.test(password);
  const passControl2 = regexpPass2.test(password);
  const passControl3 = regexpPass3.test(password);
  const passControl = passControl1 && passControl2 && passControl3 && passControlLength;
  const alertPass = passControlLength ? (passControl ? 'ок' : 'цифры, заглавные и строчные лат. буквы') : 'слишком короткий пароль';

  const rePassControl = (password === rePassword)
  const alertRePass = 'пароль не совпадает';

  console.log(subForm)
  console.log(activeButton)

  return (
    <form onSubmit={submitHandler} className="app">
      <div className='row_1'>
        <legend><h3>Регистрация</h3></legend>
      </div>
      <div className='col_1'>
        <label>E-mail</label>
        <label>Пароль</label>
        <label>Пароль еще раз</label>
        <label>Город</label>
        <label>Пол</label>
      </div>
      <div className='col_2'>
        <div>
          <input
            type='email'
            value={email}
            className='width'
            onChange={changeHandlerEmail}
          />
          <i className={emailControl ? 'hidden alert' : 'alert'}>{alertEmail}</i>
        </div>
        <div>
          <input
            type='password'
            value={password}
            className='width'
            placeholder='не менее 8 символов'
            onChange={changeHandlerPassword}
          />
          <i className={passControl ? 'hidden alert' : 'alert'}>{alertPass}</i>
        </div>
        <div>
          <input
            type='password'
            value={rePassword}
            className='width'
            placeholder='повторите пароль'
            onChange={changeHandlerRePassword}
          />
          <i className={rePassControl ? 'hidden alert' : 'alert'}>{alertRePass}</i>
        </div>
        <select
          value={city}
          className='width'
          onChange={changeHandlerCity}
        >
          <option defaultValue='' hidden>
            выбрать
          </option>
          <option value='Тверь'>
            Тверь
          </option>
          <option value='Москва'>
            Москва
          </option>
          <option value='Санкт-Петербург'>
            Санкт-Петербург
          </option>
        </select>
        <span>
          <label>
            <input
              type='radio'
              value='мужской'
              name='gender'
              onChange={changeHandlerGender}
            />
            мужской
          </label>
          <label>
            <input
              type='radio'
              value='женский'
              name='gender'
              onChange={changeHandlerGender}
            />
            женский
          </label>
        </span>
      </div>
      <div className='row_3'>
        <span>
          <input
            type='checkbox'
            className='checkbox'
            checked={agree}
            onChange={changeHandlerAgree}
          />
          <label>Согласие на обработку персональных данных</label>
        </span>
        <button
          type='submit'
          disabled={!activeButton}
          className={activeButton ? 'button' : 'button_hidden button'}
        >
          Подтвердить
        </button>
      </div>
    </form>
  )
}

export default App;