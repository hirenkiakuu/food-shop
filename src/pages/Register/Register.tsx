import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target;
    const { email, password, name } = target as typeof e.target & RegisterForm;

    await sendRegister(email.value, password.value, name.value);
  };

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const sendRegister = async (
    email: string,
    password: string,
    name: string,
  ) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <>
      <div className={styles['register']}>
        {registerErrorMessage && (
          <div className={styles['error']}>{registerErrorMessage}</div>
        )}
        <Headling className={styles['form-header']}>Регистрация</Headling>
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
            <div className={styles['field']}>
              <label htmlFor="Password">Ваше имя</label>
              <Input id="name" name="name" placeholder="Имя" />
            </div>
          </div>
          <Button appearance="big">Зарегистрироваться</Button>
          <div className={styles['links']}>
            <div>Есть аккаунт?</div>
            <div>
              <Link to="/auth/login">Войти</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
