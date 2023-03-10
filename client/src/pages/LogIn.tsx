import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ButtonLink from '../components/ButtonLink';
import Button from '../components/Button';

const LogInContainer = styled.main`
  width: 100%;
  height: 100vh;
  padding-top: 100px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
`;

const LogInForm = styled.form`
  margin: 40px 0px 20px 0px;
  width: 500px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 20px;
  font-size: 16px;
  table {
    border-spacing: 5px 30px;
    tr {
      td:nth-child(1) {
        width: 100px;
        white-space: nowrap;
      }
      td:nth-child(2) {
        width: 200px;
        position: relative;
      }
    }
  }

  input {
    width: 100%;
    padding: 5px;
    outline: none;
    border: none;
    background-color: rgba(1, 1, 1, 0);
    border-bottom: 0.1rem solid grey;
    color: white;
    &:focus-within {
      border-bottom: 0.1rem solid white;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0 20px var(--gray) inset;
      -webkit-text-fill-color: white;
      color: white;
    }
  }
  > button {
    height: 100px;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-left: 10px;
  }
`;

interface LoginProps {
  email: string;
  password: string;
}

const LogIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/members/login`, data)
      .then((res) => {
        console.log(res);
        localStorage.setItem('AccessToken', res.headers.authorization!);
        localStorage.setItem('RefreshToken', res.headers.refresh!);
        localStorage.setItem('memberId', res.headers['member-id']!);
        localStorage.setItem('birth', res.headers.birth!);
        localStorage.setItem('heart', res.headers.heart!);
        localStorage.setItem('sex', res.headers.sex!);
        navigate('/recruits');
        window.location.reload();
      })
      .catch((err) => {
        const errMsg = err.response.data.message;

        if (errMsg === '???????????? ?????? ??????') {
          setError('email', {
            type: 'server',
            message: '????????? ???????????? ????????????',
          });
        }
        if (errMsg === '????????? ???????????? ??????') {
          setError('password', {
            type: 'server',
            message: '??????????????? ???????????? ????????????',
          });
        }
      });
  };

  return (
    <LogInContainer>
      <h1>?????????</h1>
      <LogInForm onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="email">?????????</label>
              </td>
              <td>
                <input
                  id="email"
                  {...register('email', { required: '???????????? ???????????????' })}
                />
                <ErrorMessage>{errors?.email?.message}</ErrorMessage>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">????????????</label>
              </td>
              <td>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: '??????????????? ???????????????',
                    maxLength: 10,
                  })}
                />
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit" onClick={handleSubmit(onSubmit)} value="?????????" />
      </LogInForm>
      <ButtonContainer>
        <ButtonLink value="???????????? ??????" to="/search-password" />
        <ButtonLink value="????????????" to="/signup" />
      </ButtonContainer>
    </LogInContainer>
  );
};
export default LogIn;
