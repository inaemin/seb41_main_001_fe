import styled from 'styled-components';
import axios from 'axios';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Tag from '../components/Tag';
// import KakaoMap from '../components/KakaoMap';
import useCurrentLocation from '../utils/useCurrentLocation';
import NewPassword from '../components/NewPassword';
// import AutoCompleteForArray from '../components/AutoCompleteForArray';
import EditAuto from '../components/EditAuto';
// import KakaoMapAdd from '../components/KakaoMapAdd';
import AddMap from '../components/AddMap';
// declare global {
//   interface Window {
//     kakao: any;
//   }
//   const kakao: any;
// }

const EditContainer = styled.form`
  background-color: var(--gray);
  color: white;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 10rem;
`;

const Container = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  > div:first-child {
    text-shadow: white 0 0 3px;
    font-size: 24px;
    margin: 20px;
    text-align: center;
  }
  > span {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const WarnSet = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    color: var(--neon-red);
    font-size: 10px;
    padding: 0.5rem 0;
    margin-left: 1.2rem;
    > i {
      margin-right: 0.3rem;
    }
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const PersonalInfo = styled.div`
  /* border: 2px solid white; */
  margin: 10px 0 10px 10px;
  border-radius: 20px;
  padding: 40px 50px 40px 20px;
  input {
    /* width: 7.5rem; */
    width: 7.5rem;
  }
  .input {
    background-color: var(--gray);
    padding: 5px;
    font-size: 16px;
    border: 1px solid grey;
    width: 18.5rem;
    outline: none;
    color: white;
    &:focus-within {
      border: 1px solid white;
      transition: 0.2s ease-in-out;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0 20px var(--gray) inset;
      -webkit-text-fill-color: white;
      color: white;
    }
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 8px;
  > label:first-child {
    width: 120px;
    display: flex;
    align-items: flex-start;
    text-shadow: white 0 0 5px;
    margin-right: 30px;
    margin-top: 5px;
    margin-left: 20px;
  }
  > button {
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    padding: 0 0.5rem;
    background-color: var(--gray);
    margin: 0 1rem;
    &:hover:enabled {
      transition: 0.2s ease-in-out;
      text-shadow: white 0 0 5px;
      background-color: var(--neon-yellow);
      color: black;
      border: 1px solid var(--neon-yellow);
      cursor: pointer;
    }
  }
  #map {
    width: 18.5rem;
    height: 23rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    margin-left: 0.1rem;
    margin-right: 5rem;
    > button {
      margin-top: 1rem;
      border: 1px solid white;
      border-radius: 15px;
      cursor: pointer;
      color: white;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
      margin: 5px 5px 0px 0;
      font-size: 15px;
      display: flex;
      justify-content: flex-start;
      i {
        color: white;
        font-size: 16px;
        margin-left: 15px;
        &:hover:enabled {
          color: var(--neon-red);
          text-shadow: white 0 0 2px;
          transition: 0.2s ease-in-out;
          cursor: pointer;
        }
      }
    }
  }
`;

// const Pfp = styled.img<PreviewPfp>`
//   width: 150px;
//   height: 150px;
//   border: 2px solid white;
//   border-radius: 100px;
//   margin: 0 10px;
// `;

const Button = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  padding: 15px;
  margin: 15px 30px;
  font-size: 20px;
  height: 50px;
  text-align: center;
  display: flex;
  text-decoration: none;
  color: white;
  justify-content: center;
  background-color: var(--gray);
  cursor: pointer;
  i {
    padding-right: 10px;
  }
  &:hover:enabled {
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
  }
  &:disabled {
    color: grey;
    border: 1px solid grey;
  }
`;

const TempButton = styled(Link)`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  padding: 15px;
  margin: 15px 30px;
  font-size: 20px;
  height: 50px;
  text-align: center;
  display: flex;
  text-decoration: none;
  color: white;
  justify-content: center;
  i {
    padding-right: 10px;
  }
  &:hover {
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
  }
`; // ?????? ??????, ????????? ?????? ????????? navigate ?????? Button?????? ????????????

const NoLinkButton = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  align-items: center;
  margin: 3px 0px 15px 0px;
  font-size: 14px;
  text-align: center;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 35px;
  background-color: var(--gray);
  padding: 5px 10px;
  i {
    padding-right: 5px;
  }
  &:hover:enabled {
    transition: 0.2s ease-in-out;
    text-shadow: white 0 0 5px;
    background-color: var(--neon-yellow);
    color: black;
    border: 1px solid var(--neon-yellow);
    cursor: pointer;
  }
  &:disabled {
    color: grey;
    border: 1px solid grey;
  }
`;

// const InputButton = styled.label`
//   border: 1px solid white;
//   border-radius: 10px;
//   align-items: center;
//   margin: 3px 0px 15px 20px;
//   font-size: 14px;
//   height: 35px;
//   text-align: center;
//   display: flex;
//   color: white;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   background-color: var(--gray);
//   padding: 5px 10px;
//   cursor: pointer;
//   > input {
//     display: none;
//   }
//   i {
//     padding-right: 5px;
//   }
//   &:hover {
//     transition: 0.2s ease-in-out;
//     text-shadow: white 0 0 5px;
//     background-color: var(--neon-yellow);
//     color: black;
//     border: 1px solid var(--neon-yellow);
//     cursor: pointer;
//   }
// `;

// const TagContainer = styled.div`
//   fieldset {
//     display: flex;
//     flex-direction: row;
//     width: 25rem;
//     flex-wrap: wrap;
//     border: none;
//     padding-left: 0;
//     margin-left: 0;
//   }
// `;
const TagList = styled.div`
  width: 10rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem;
`;

// interface PreviewPfp {
//   src: string;
// }

// interface Location {
//   coords: any;
//   timestamp: any;
// }

// interface Coordinates {
//   latitude: number;
//   longitude: number;
//   timestamp: number;
// }
interface UserFormInput {
  nickname: string;
  curPassword: string;
  newPassword: string;
  // newPasswordCheck: string;
  phone: string;
  location: string;
  lat: number;
  lon: number;
  // locations: string[];
  // memberTags: {
  //   tagId: number;
  //   tagName: string;
  // }[];
  memberTags: {
    tagId: number;
    tagName: string;
    emoji: string;
  }[];
  // memberTags: string[];
}

// interface location {
//   longitude: number;
//   latitude: number;
// }

const EditUser = () => {
  // const { memberId } = useParams();
  const navigate = useNavigate();
  const { location: currentLocation } = useCurrentLocation();
  // default, changed, done
  const [nickCheck, setNickCheck] = useState('default');
  const [phoneCheck, setPhoneCheck] = useState('default');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordChange, setPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [locationString, setLocationString] = useState('');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const [oneUser, setOneUsers] = useState({
    memberId: 1,
    name: '',
    birth: '',
    nickname: '',
    email: '',
    phone: '',
    location: '',
    memberTags: [
      {
        tagId: 1,
        tagName: '',
      },
    ],
  });
  useEffect(() => {
    const getOneUser = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/members/my-page`, {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        })
        .then((res: any) => {
          console.log(res);
          setOneUsers(res.data);
          setLocationString(res.data.location);
          // setIsLoading(false);
        })
        .catch((err: any) => console.log(err));
    };
    getOneUser();
  }, []);
  // const [img, setImg] = useState<string>(
  //   'https://cdn.discordapp.com/attachments/1030817860047618119/1030866099694211203/BackgroundEraser_20221016_002309876.png',
  // );
  const doesMatch = () => {
    setPasswordMatch(true);
  };
  const doesNotMatch = () => {
    setPasswordMatch(false);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInput>();
  const onSubmitHandler: SubmitHandler<UserFormInput> = (data) => {
    const check = {
      ...data,
      newPassword,
      location: locationString,
      lat,
      lon,
      // ?????? ????????? ????????? ????????? string?????? ?????????
    };
    console.log(check);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/members/my-page`,
        {
          ...data,
          newPassword,
          location: locationString,
          lat,
          lon,
          // ?????? ????????? ????????? ????????? string?????? ?????????
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('AccessToken')}`,
            Refresh: `${localStorage.getItem('RefreshToken')}`,
          },
        },
      )
      .then((res) => {
        // console.log(res);
        alert(res);
        navigate(`/members/mypage`);
      })
      .catch((err) => {
        console.log(err);
        console.log(
          JSON.stringify({
            data,
          }),
        );
      });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'memberTags',
    rules: {
      validate: {
        moreThanOneTag: (values) =>
          values.length > 0 ? true : '????????? 1??? ?????? ???????????? ?????????',
      },
    },
  });
  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('change', event.target.value);
  // };
  // const [location, setLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // } | null>(null);

  const TAG_DATA = [
    { tagId: 1, tagName: '??????/??????', emoji: '??????' },
    { tagId: 2, tagName: '??????', emoji: '????' },
    { tagId: 3, tagName: '??????', emoji: '??????' },
    { tagId: 4, tagName: '??????', emoji: '????' },
    { tagId: 5, tagName: '??????', emoji: '????' },
    { tagId: 6, tagName: '??????', emoji: '????' },
    { tagId: 7, tagName: '????????????', emoji: '????' },
    { tagId: 8, tagName: '?????????/?????????', emoji: '????' },
    { tagId: 9, tagName: '?????????/??????', emoji: '????' },
    { tagId: 10, tagName: '??????', emoji: '??????' },
    { tagId: 11, tagName: '??????/?????????', emoji: '????' },
    { tagId: 12, tagName: '??????', emoji: '??????' },
    { tagId: 13, tagName: '??????', emoji: '????' },
    { tagId: 14, tagName: '?????????', emoji: '????' },
    { tagId: 15, tagName: '??????', emoji: '???????' },
    { tagId: 16, tagName: '????????????', emoji: '?????????????' },
    { tagId: 17, tagName: '??????', emoji: '?????????????' },
    { tagId: 18, tagName: '??????', emoji: '??????' },
    { tagId: 19, tagName: '??????/????????????', emoji: '????' },
    { tagId: 20, tagName: '??????/????????????', emoji: '???????' },
    { tagId: 21, tagName: '????????????/?????????', emoji: '??????' },
  ];
  // useCurrentLocation().then((res) => {
  //   if (res === undefined) return;
  //   setLocation(res);
  // });

  // const imgRef = useRef<any>();
  // function readImage(input: any) {
  //   // ?????? ????????? ????????? ?????? ??????
  //   if (input.files && input.files[0]) {
  //     // FileReader ???????????? ??????
  //     const reader = new FileReader();

  //     // ???????????? ????????? ??? ??????
  //     reader.onload = (e: any) => {
  //       const previewImage = document.getElementById(
  //         'preview-image',
  //       ) as PreviewPfp & HTMLImageElement;
  //       previewImage.src = e.target.result;
  //     };

  //     // reader??? ????????? ????????? ??????
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  // // input file??? change ????????? ??????
  // const saveImgFile = () => {
  //   const file = (imgRef:any).(current:any).files[0];
  //   const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //         setImg(reader.result);
  //      };
  // };
  // ????????? ????????? ?????? ?????? ??????
  // const changeImg = () => {
  //   const inputImage = document.getElementById(
  //     'changeFile',
  //   ) as HTMLInputElement;
  //   setImg(inputImage.value);
  //   console.log(img);
  // };
  // const deleteImg = () => {
  //   setImg(
  //     'https://cdn.discordapp.com/attachments/1030817860047618119/1030866099694211203/BackgroundEraser_20221016_002309876.png',
  //   );
  // };
  // const locationAdd = () => {
  //   if (locationString === '') {
  //     alert(
  //       `?????? : ${currentLocation?.latitude}, ?????? : ${currentLocation?.longitude}`,
  //     );
  //   } else {
  //     alert('????????? ????????? ????????? ??? ????????????');
  //   }
  // };
  // const locationRemove = () => {
  //   setLocationString('');
  // };
  // const locationAdd = () => {
  //   alert(`?????? : ${location?.latitude}, ?????? : ${location?.longitude}`);
  // };
  // inputImage.addEventListener('change', (e) => {
  //   readImage(e.target);
  // });
  const changePassword = () => {
    setPasswordChange(!passwordChange);
    doesMatch();
    setNewPassword('');
  };
  const nicknameCheck = () => {
    const name = (document.getElementById('nickname') as HTMLInputElement)
      .value;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/members/signup/check-nickname/${name}`,
      )
      .then((res: any) => {
        console.log(res);
        if (res.data === true) {
          alert('?????? ???????????? ??????????????????!');
        } else {
          setNickCheck('done');
        }
      })
      .catch((err: any) => console.log(err));
  };
  const phoneNumCheck = () => {
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const phoneTest = /^(010)-[0-9]{3,4}-[0-9]{4}$/;
    if (phoneTest.test(phone)) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/members/signup/check-phone/${phone}`,
        )
        .then((res: any) => {
          console.log(res);
          if (res.data === true) {
            alert('?????? ???????????? ????????? ???????????????!');
          } else {
            setPhoneCheck('done');
          }
        })
        .catch((err: any) => console.log(err));
    } else {
      alert('010-0000-0000 ????????? ???????????????.');
    }
  };
  return (
    <EditContainer onSubmit={handleSubmit(onSubmitHandler)}>
      <Container>
        <div>???????????? ??????</div>
        <PersonalInfo>
          {/* <InfoBlock>
            <label htmlFor="pfp">????????? ??????</label>
            <div>
              <Pfp id="preview-image" src={img} />
            </div>
            <div>
              <InputButton htmlFor="changeFile" onClick={changeImg}>
                <i className="fa-solid fa-arrows-rotate" />
                ??????
                <input
                  type="file"
                  name="changeFile"
                  id="changeFile"
                  accept="image/jpeg,image/jpg, image/png, image/svg"
                />
              </InputButton>
              <NoLinkButton onClick={deleteImg}>
                <i className="fa-solid fa-trash" />
                ??????
              </NoLinkButton>
            </div>
          </InfoBlock> */}
          <InfoBlock>
            <label htmlFor="nickname">?????????</label>
            <WarnSet>
              <input
                // id="nickname"
                type="text"
                defaultValue={oneUser.nickname}
                className="input"
                autoComplete="off"
                disabled={nickCheck === 'done'}
                // onChange={setNickCheck(false)}
                {...register('nickname', {
                  required: true,
                  onChange: (e) => {
                    if (e.target.value !== oneUser.nickname)
                      setNickCheck('changed');
                    else setNickCheck('default');
                  },
                })}
              />
              {errors.nickname && (
                <span>
                  <i className="fa-solid fa-circle-exclamation" />
                  ???????????? ??????????????????
                </span>
              )}
            </WarnSet>
            <NoLinkButton
              type="button"
              onClick={nicknameCheck}
              disabled={nickCheck === 'done'}
            >
              {nickCheck !== 'changed' ? '?????? ??????' : '?????? ??????'}
            </NoLinkButton>
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="curPassword">?????? ????????????</label>
            <WarnSet>
              <input
                id="curPassword"
                type="password"
                className="input"
                {...register('curPassword', { required: true })}
              />
              {errors.curPassword && (
                <span>
                  <i className="fa-solid fa-circle-exclamation" />
                  ?????? ??????????????? ??????????????????
                </span>
              )}
            </WarnSet>
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="askNewPass">???????????? ??????</label>
            {passwordChange ? (
              <NoLinkButton type="button" onClick={changePassword}>
                ?????? ??????
              </NoLinkButton>
            ) : (
              <NoLinkButton type="button" onClick={changePassword}>
                ???????????? ??????
              </NoLinkButton>
            )}
          </InfoBlock>
          {passwordChange ? (
            <NewPassword
              passwordMatch={passwordMatch}
              doesMatch={doesMatch}
              doesNotMatch={doesNotMatch}
              newPass={newPassword}
              setNewPass={setNewPassword}
            />
          ) : (
            ''
          )}
          {/* <InfoBlock>
            <label htmlFor="newPassword">??? ????????????</label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword')}
            />
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="newPasswordCheck">??? ???????????? ??????</label>
            <input
              id="newPasswordCheck"
              type="password"
              {...register('newPasswordCheck')}
            />
          </InfoBlock> */}
          <InfoBlock>
            <label htmlFor="phone">????????? ??????</label>
            <WarnSet>
              <input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                className="input"
                defaultValue={oneUser.phone}
                disabled={phoneCheck === 'done'}
                {...register('phone', {
                  required: '????????? ????????? ????????? ?????????',
                  pattern: {
                    value: /^(010)-[0-9]{3,4}-[0-9]{4}$/,
                    message: '010-0000-0000 ????????? ???????????????.',
                  },
                  onChange: () => setPhoneCheck('changed'),
                })}
              />
              {errors.phone && (
                <span>
                  <i className="fa-solid fa-circle-exclamation" />
                  {errors.phone.message}
                </span>
              )}
            </WarnSet>
            <NoLinkButton
              type="button"
              onClick={phoneNumCheck}
              disabled={phoneCheck === 'done'}
            >
              {phoneCheck !== 'changed' ? '?????? ??????' : '?????? ??????'}
            </NoLinkButton>
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="location">?????? ?????? ??????</label>
            <div>
              <div id="map">
                {currentLocation && (
                  <AddMap
                    latitude={currentLocation.latitude}
                    longitude={currentLocation.longitude}
                    locationString={locationString}
                    setLocationString={setLocationString}
                    setLat={setLat}
                    setLon={setLon}
                  />
                )}
                {/* <button type="button" id="locationButton" onClick={locationAdd}>
                  ?????? ?????? ??????
                </button> */}
              </div>
              {/* <div>
                {locationString === ''
                  ? '????????? ????????? ????????????'
                  : locationString}
                <div
                  role="button"
                  onClick={locationRemove}
                  onKeyDown={locationRemove}
                  tabIndex={0}
                >
                  {locationString === '' ? (
                    ''
                  ) : (
                    <i className="fa-solid fa-xmark" />
                  )}
                </div>
              </div> */}
              {/* <div>
                ?????????
                <i className="fa-solid fa-xmark" />
              </div> */}
            </div>
          </InfoBlock>
          <InfoBlock>
            <label htmlFor="memberTags">?????? ?????? ??????</label>
            <div>
              <TagList>
                <EditAuto
                  fields={fields}
                  append={append}
                  remove={remove}
                  // register={register}
                  control={control}
                  data={TAG_DATA}
                  tagLength={3}
                />
              </TagList>
            </div>
          </InfoBlock>
        </PersonalInfo>
        <span>
          <Button
            type="submit"
            disabled={
              !(
                nickCheck !== 'changed' &&
                phoneCheck !== 'changed' &&
                passwordMatch
              )
            }
          >
            <i className="fa-solid fa-square-check" />
            ????????????
          </Button>
          <TempButton to="/members/mypage">
            <i className="fa-solid fa-xmark" />
            ????????????
          </TempButton>
        </span>
      </Container>
    </EditContainer>
  );
};

export default EditUser;
