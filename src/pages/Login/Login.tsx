import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

const Login = () => {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    console.log(email.value);
    console.log(password.value);
    setError(null);
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password,
      });
      console.log(data);
      dispatch(userActions.addJwt(data.access_token));
      navigate('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className={styles['login']}>
        {error && <div className={styles['error']}>{error}</div>}
        <Headling className={styles['form-header']}>Вход</Headling>
        <form onSubmit={submit}>
          <div className={styles['form-container-inner']}>
            <div className={styles['field']}>
              <label htmlFor="email">Ваш Email</label>
              <Input id="email" name="email" placeholder="Email" />
            </div>
            <div className={styles['field']}>
              <label htmlFor="Password">Ваш пароль</label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
              />
            </div>
          </div>
          <Button appearance="big">Вход</Button>
          <div className={styles['links']}>
            <div>Нет аккаунта?</div>
            <div>
              <Link to="/auth/register">Зарегистрироваться</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
