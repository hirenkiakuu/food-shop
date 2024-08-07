import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm;
    dispatch(userActions.clearLoginError());
    const { email, password } = target;
    console.log(email.value);
    console.log(password.value);
    // setError(null);
    await sendLogin(email.value, password.value);
  };

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <>
      <div className={styles['login']}>
        {loginErrorMessage && (
          <div className={styles['error']}>{loginErrorMessage}</div>
        )}
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
