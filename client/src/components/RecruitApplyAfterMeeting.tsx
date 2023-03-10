/* eslint-disable react/no-array-index-key */
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import classifyingStatus from '../utils/classifyingStatus';
import maskingNickname from '../utils/maskingNickname';
import Button from './Button';
import RecruitReviewModal from './RecruitReviewModal';

const SelectContainer = styled.div`
  display: flex;
  > div:nth-child(2) {
    margin: 0px 20px;
  }
  margin-bottom: 40px;
`;

const SelectBox = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid white;
  border-radius: 20px;
  > h3 {
    margin-top: -10px;
    text-align: center;
    width: 100%;
    > span {
      background-color: var(--gray);
      padding: 20px;
    }
  }
  ul {
    padding-right: 20px;
    line-height: 130%;
    font-size: 100%;
    li {
      margin-bottom: 10px;
    }
  }
`;

const ApplicantsBox = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-top: 0px;
  > div:nth-child(1) {
    font-size: 120%;
    font-weight: bold;
    i {
      margin-right: 10px;
    }
  }
  > h2 {
    margin-bottom: 10px;
    span {
      font-size: 1rem;
      margin-left: 10px;
      font-weight: normal;
    }
  }
  > div:last-child {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileImg = styled.div`
  position: relative;
  img {
    border-radius: 50%;
    &:hover {
      + div {
        display: block;
      }
    }
  }
`;

const Bubble = styled.div`
  display: none;
  position: absolute;
  top: -140%;
  left: 50%;
  transform: translate(-50%, 0%);
  .bubble {
    position: relative;
    background: #ffffff;
    color: #000000;
    font-family: Arial;
    font-size: 14px;
    box-shadow: 0px 0px 20px 10px rgba(163, 163, 163, 0.42);
    text-align: center;
    border-radius: 5px;
    padding: 5px 7px;
  }
  .bubble:after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    z-index: 1;
    border-style: solid;
    border-color: #ffffff transparent;
    border-width: 5px 5px 0;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
  }
`;

const ApplyBox = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 20px;
  padding-top: 0px;
  > div {
    font-size: 120%;
    word-break: keep-all;
    line-height: 150%;
  }
  > button {
    font-size: 150%;
    font-weight: bold;
  }
`;

const ReviewBox = styled.div`
  .fa-star {
    color: #ffc107;
  }
  height: 170px;
  padding: 0px 20px 20px 20px;
  overflow: auto;
  > div:nth-child(1) {
    margin-bottom: 12px;
    i {
      margin-right: 3px;
    }
    > span:nth-child(2) {
      font-weight: bold;
    }
    > span:nth-child(3) {
      margin-left: 7px;
      font-size: 14px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      font-size: 12px;
      a {
        text-decoration: none;
        color: white;
        display: flex;
        > img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        > div {
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-bottom: 7px;

          > div:first-child {
            > span:nth-child(1) {
              margin-right: 5px;
            }
            > span:nth-child(2) {
              color: var(--neon-red);
              font-size: 12px;
              i {
                margin-right: 2px;
              }
            }
          }
        }
      }
    }
  }
`;

interface ReviewConditionProps {
  recruitStatus: '?????????' | '??????????????????' | '????????????' | '????????????';
  applies: { memberId: number; nickname: string; heart: number }[];
  minRequire: number;
  require: number;
  applicantsId: number[];
  creatorId: number;
  reviews: {
    reviewId: number;
    memberId: number;
    nickname: string;
    heart: number;
    body: string;
    star: number;
  }[];
  creatorNickname: string;
  setData: any;
}

const RecruitApplyAfterMeeting = ({
  recruitStatus,
  applies,
  minRequire,
  require,
  applicantsId,
  creatorId,
  reviews,
  creatorNickname,
  setData,
}: ReviewConditionProps) => {
  const { recruitId } = useParams();
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const LOGIN_ID = Number(localStorage.getItem('memberId')) || -1;
  const REVIEW_STAR_NUM = reviews.reduce((res: number[], ele) => {
    res.push(ele.star);
    return res;
  }, []);

  const REVIEW_STAR_AVER = (
    REVIEW_STAR_NUM.reduce((r, e) => r + e, 0) / REVIEW_STAR_NUM.length
  ).toFixed(2);

  const REVIEW_ID = reviews.reduce((res: number[], ele) => {
    res.push(ele.memberId);
    return res;
  }, []);

  return (
    <SelectContainer>
      {reviewModal ? (
        <RecruitReviewModal
          creatorId={creatorId}
          creatorNickname={creatorNickname}
          applies={applies}
          setReviewModal={setReviewModal}
          setData={setData}
        />
      ) : (
        ''
      )}
      <SelectBox>
        <h3>
          <span>????????????</span>
        </h3>
        <ApplicantsBox>
          <div style={{ color: classifyingStatus(recruitStatus).color }}>
            <i className={classifyingStatus(recruitStatus).icon} />
            {recruitStatus}
          </div>
          <h2>
            {`${applies.length}`}
            <span>{`/${require}???`}</span>
          </h2>
          <div>{`(???????????? ${minRequire}???)`}</div>
          <div>
            {applies.map((el) => (
              <ProfileImg key={el.memberId}>
                <img
                  src={`https://picsum.photos/seed/${el.memberId}/20/20.webp`}
                  alt={`avatar of ${maskingNickname(el.nickname)}`}
                />
                <Bubble>
                  <div className="bubble">{maskingNickname(el.nickname)}</div>
                </Bubble>
              </ProfileImg>
            ))}
          </div>
        </ApplicantsBox>
        <div />
      </SelectBox>
      {[...applicantsId, creatorId].includes(LOGIN_ID) &&
      recruitStatus !== '?????????' ? (
        <SelectBox>
          {['??????????????????', '????????????'].includes(recruitStatus) ? (
            <>
              <h3>
                <span>??????????????????</span>
              </h3>
              <ApplyBox>
                <div>????????? ???????????????????</div>
                <Button
                  value="?????? ??????"
                  onClick={() => {
                    console.log(`PATCH /recruits/${recruitId}/status`);
                    axios
                      .patch(
                        `${process.env.REACT_APP_API_URL}/recruits/${recruitId}/status`,
                        {},
                        {
                          headers: {
                            Authorization: localStorage.getItem('AccessToken'),
                            Refresh: localStorage.getItem('RefreshToken'),
                          },
                        },
                      )
                      .then((res) => {
                        console.log(res.data.data);
                        setData(res.data.data);
                      })
                      .catch((err) => console.log(err));
                  }}
                />
              </ApplyBox>
            </>
          ) : (
            <>
              <h3>
                <span>????????????</span>
              </h3>
              <ApplyBox>
                {!REVIEW_ID.includes(LOGIN_ID) ? (
                  <>
                    <div>????????? ?????????????????????????</div>
                    <Button
                      value="?????? ??????"
                      onClick={() => setReviewModal(true)}
                    />
                  </>
                ) : (
                  <>
                    <div>?????? ????????? ?????????????????????</div>
                    <Button value="?????? ??????" disabled onClick={() => {}} />
                  </>
                )}
              </ApplyBox>
            </>
          )}
        </SelectBox>
      ) : (
        <SelectBox>
          <h3>
            <span>????????????</span>
          </h3>
          <ApplyBox>
            <div>????????? ?????????????????????</div>
            <Button value="?????? ??????" disabled onClick={() => {}} />
          </ApplyBox>
        </SelectBox>
      )}
      {recruitStatus === '????????????' ? (
        <SelectBox>
          <h3>
            <span>????????????</span>
          </h3>
          <ReviewBox>
            <div>
              {reviews.length ? (
                <>
                  <i className="fa-solid fa-star" />
                  <span>{`${REVIEW_STAR_AVER}`}</span>
                  <span>{`??? ${reviews.length}?????? ??????`}</span>
                </>
              ) : (
                <span>?????? ????????? ???????????? ???????????????</span>
              )}
            </div>
            <ul>
              {reviews.map((el) => (
                <li key={el.reviewId}>
                  <Link to={`/members/${el.memberId}`}>
                    <img
                      src={`https://picsum.photos/seed/${el.memberId}/50/50.webp`}
                      alt={`avatar of ${el.nickname}`}
                    />
                    <div>
                      <div>
                        <span>{el.nickname}</span>
                        <span>
                          <i className="fa-solid fa-heart" />
                          {el.heart}
                        </span>
                      </div>
                      <div>
                        {[...Array(el.star)].map((e, i) => (
                          <i className="fa-solid fa-star" key={i + 1} />
                        ))}
                      </div>
                    </div>
                  </Link>
                  {el.body}
                </li>
              ))}
            </ul>
          </ReviewBox>
        </SelectBox>
      ) : (
        <SelectBox>
          <h3>
            <span>????????????</span>
          </h3>
          <div>
            <ul>
              <li>????????? ???????????? ????????? ????????? ???????????????</li>
              <li>????????? ????????? ????????? ?????? ???????????? ????????? ???????????????</li>
              <li>????????? ?????? ?????? ??????????????????!</li>
            </ul>
          </div>
        </SelectBox>
      )}
    </SelectContainer>
  );
};

export default RecruitApplyAfterMeeting;

// ????????? ????????? ????????? ??? ??? ?????? ???. ??????????????????????????? ?????? ??????(??????????????? ???????????? ??????????????????????????? => ????????? ?????????????????? ??????), ????????? ?????? ??????.
// ???????????? ??? => ????????? ??????X: ??????????????? ???????????? ????????????????????? ??????????????? "????????????" ??????O :
