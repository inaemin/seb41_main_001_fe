/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FreeBoardList from '../components/FreeBoardList';
import FreeDataProps from '../interfaces/FreeDataProps';
import ButtonLink from '../components/ButtonLink';

const FBLContainer = styled.main`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  height: 100%;

  h1 {
    width: 35rem;
    margin-left: 1rem;
    /* margin-top: 1rem; */
    padding-top: 1rem;
  }

  span {
    height: 1.5rem;
    margin-left: 1rem;
  }

  .btn {
    width: 3rem;
    height: 1.5rem;
    margin-left: 29rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
    a {
      text-decoration: none;
      color: white;
    }
  }

  .scrollBtn {
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--neon-yellow);
    position: sticky;
    top: 44rem;
    margin-bottom: 1rem;
  }
`;

const FiltContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21rem;
  height: 3rem;
  border: 0.05rem solid white;
  border-radius: 1rem;
  margin-left: 8rem;
  margin-top: 1rem;
  /* margin-bottom: 1rem; */

  > a {
    text-decoration: none;
    color: white;
  }
`;

const CategoryLink = styled(Link)<{ color: string; currentcolor: string }>`
  :hover {
    > div {
      color: black;
      border: none;
      background-color: ${(props) => props.color};
    }
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 2rem;
    /* border: 0.05rem solid white; */
    border-radius: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.2rem;
    background-color: ${(props) => props.currentcolor || '#484848'};
  }
`;

const FreeBoards = () => {
  const [data, setData] = useState<FreeDataProps[]>([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [keywordValue, setKeywordValue] = useState<string>();
  const [typeValue, setTypeValue] = useState<string>();
  const location = useLocation();
  console.log(location);
  // const params = new URLSearchParams(location.search);

  // ???????????? ??? ??????
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/freeboards?page=1&size=10&type=${keywordValue}&keyword=${typeValue}`,
      )
      .then((res) => {
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [keywordValue, typeValue]);

  return (
    <FBLContainer>
      <div>
        <h1>???????????????</h1>
        <span>???????????? ?????? ???????????????!</span>
        <FiltContainer>
          <i className="fa-solid fa-bars" />
          <CategoryLink
            color="#5aa1f1"
            to="/freeboards?category=??????"
            onClick={() => {
              setFilterCategory('??????');
              setKeywordValue('category');
              setTypeValue('??????');
            }}
            currentcolor={filterCategory === '??????' ? '#5aa1f1' : '#484848'}
          >
            <div>
              <i className="fa-solid fa-dumbbell" />
              ??????
            </div>
          </CategoryLink>
          <CategoryLink
            color="#ee8834"
            to="/freeboards?category=??????"
            onClick={() => {
              setFilterCategory('??????');
              setKeywordValue('category');
              setTypeValue('??????');
            }}
            currentcolor={filterCategory === '??????' ? '#ee8834' : '#484848'}
          >
            <div>
              <i className="fa-solid fa-bullhorn" />
              ??????
            </div>
          </CategoryLink>
          <CategoryLink
            color="#3fb950"
            to="/freeboards?category=??????"
            onClick={() => {
              setFilterCategory('??????');
              setKeywordValue('category');
              setTypeValue('??????');
            }}
            currentcolor={filterCategory === '??????' ? '#3fb950' : '#484848'}
          >
            <div>
              <i className="fa-regular fa-comments" />
              ??????
            </div>
          </CategoryLink>
          <CategoryLink
            color="#7dede1"
            to="/freeboards?category=??????"
            onClick={() => {
              setFilterCategory('??????');
              setKeywordValue('category');
              setTypeValue('??????');
            }}
            currentcolor={filterCategory === '??????' ? '#7dede1' : '#484848'}
          >
            <div>
              <i className="fa-solid fa-hand-holding-heart" />
              ??????
            </div>
          </CategoryLink>
        </FiltContainer>
        <div className="btn">
          <ButtonLink value="????????????" to="/freeboard/new" />
        </div>
        <ul>
          {data &&
            data.map((el) => (
              <FreeBoardList
                data={el}
                key={el.freeId}
                setFilterCategory={setFilterCategory}
                setKeywordValue={setKeywordValue}
                setTypeValue={setTypeValue}
              />
            ))}
        </ul>
      </div>
      <button className="scrollBtn" type="button" onClick={handleClick}>
        <i className="fa-solid fa-arrow-up-long" />
      </button>
    </FBLContainer>
  );
};

export default FreeBoards;
