// import { useState } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form'; // Controller, useFieldArray
import styled from 'styled-components';
// import AutoCompleteForArray from '../components/AutoCompleteForArray';
import useCurrentLocation from '../utils/useCurrentLocation';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';
import RecruitDataProps from '../interfaces/RecruitDataProps';
import Loading from './Loading';

const RecruitFormContainer = styled.main`
  margin-top: 100px;
  width: 700px;
  color: white;
  font-size: 16px;

  #kakao-map {
    width: 100%;
    height: 400px;
  }
`;

const RecruitForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > button:last-child {
    margin-bottom: 50px;
  }

  table {
    margin: 20px 0px;
    border-spacing: 20px 30px;
    tr {
      > td:nth-child(1) {
        white-space: nowrap;
        width: 160px;
      }
      > td:nth-child(2) {
        width: 100%;
        position: relative;
      }
    }
    tr:nth-child(1),
    tr:nth-child(2),
    tr:nth-child(3),
    tr:nth-child(4),
    tr:nth-child(5),
    tr:nth-child(6),
    tr:nth-child(7) {
      input,
      textarea {
        padding: 5px;
        font-size: 16px;
        width: 100%;
        border: none;
        outline: 1px solid rgb(120, 120, 120);
        background-color: rgba(255, 255, 255, 0);
        color: white;
        &:focus {
          outline: 1px solid rgb(170, 170, 170);
        }
        &::placeholder {
          font-style: italic;
          font-size: 14px;
        }
        &:disabled {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
      textarea {
        height: 200px;
      }
    }
    tr:nth-child(4),
    tr:nth-child(5) {
      input {
        width: 100px;
        margin-right: 10px;
      }
    }
    tr:nth-child(8),
    tr:nth-child(9) {
      label {
        margin-right: 10px;
      }
    }
    tr:nth-child(11) {
      input {
        width: 300px;
        margin-right: 10px;
      }
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  font-size: 12px;
`;

interface RecruitFormInput {
  recruitTagDtos: { tagId: number; tagName: string; emoji: string }[];
  title: string;
  body: string;
  date: string;
  require: number;
  minRequire: number;
  location: string;
  lat: number;
  lon: number;
  sex: 'Both' | 'Male' | 'Female';
  ages: number[];
  heart: number;
  image: string;
  tagSearch: string;
}

const KakaoMapForClick = ({
  control,
  setValue,
  currentLat,
  currentLon,
}: any) => {
  const lat = useWatch({
    control,
    name: 'lat',
    defaultValue: currentLat,
  });
  const lon = useWatch({
    control,
    name: 'lon',
    defaultValue: currentLon,
  });
  return <KakaoMapClick latitude={lat} longitude={lon} setValue={setValue} />;
};

const EditRecruit = () => {
  const [recruitData, setRecruitData] = useState<RecruitDataProps | null>();
  const { recruitId } = useParams();
  // const token = localStorage.getItem('AccessToken');
  // const memberId = localStorage.getItem('memberId');
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`)
      .then((res) => {
        console.log(res);
        setRecruitData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RecruitFormInput>({
    // defaultValues: {
    //   recruitTagDtos: recruitData?.recruitTags,
    //   title: recruitData?.title,
    //   body: recruitData?.body,
    //   date: recruitData?.date,
    //   require: recruitData?.require,
    //   minRequire: recruitData?.minRequire,
    //   ages: recruitData?.ageGroup,
    //   sex: recruitData?.sex,
    //   heart: recruitData?.heartLimit,
    //   lat: recruitData?.lat,
    //   lon: recruitData?.lon,
    // },
  });
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'recruitTagDtos',
  //   rules: {
  //     validate: {
  //       moreThanOneTag: (values) =>
  //         values.length > 0 ? true : '????????? 1??? ?????? ???????????? ?????????',
  //     },
  //   },
  // });

  const onSubmit = (data: RecruitFormInput) => {
    // console.log(data);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/recruits/${recruitId}`, {
        ...data,
        memberId: Number(localStorage.getItem('memberId')),
        headers: {
          Authorization: `${localStorage.getItem('AccessToken')}`,
          Refresh: `${localStorage.getItem('RefreshToken')}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { location } = useCurrentLocation();

  // const TAG_DATA = [
  //   { tagId: 1, tagName: '??????/??????', emoji: '??????' },
  //   { tagId: 2, tagName: '??????', emoji: '????' },
  //   { tagId: 3, tagName: '??????', emoji: '??????' },
  //   { tagId: 4, tagName: '??????', emoji: '????' },
  //   { tagId: 5, tagName: '??????', emoji: '????' },
  //   { tagId: 6, tagName: '??????', emoji: '????' },
  //   { tagId: 7, tagName: '????????????', emoji: '????' },
  //   { tagId: 8, tagName: '?????????/?????????', emoji: '????' },
  //   { tagId: 9, tagName: '?????????/??????', emoji: '????' },
  //   { tagId: 10, tagName: '??????', emoji: '??????' },
  //   { tagId: 11, tagName: '??????/?????????', emoji: '????' },
  //   { tagId: 12, tagName: '??????', emoji: '??????' },
  //   { tagId: 13, tagName: '??????', emoji: '????' },
  //   { tagId: 14, tagName: '?????????', emoji: '????' },
  //   { tagId: 15, tagName: '??????', emoji: '???????' },
  //   { tagId: 16, tagName: '????????????', emoji: '?????????????' },
  //   { tagId: 17, tagName: '??????', emoji: '?????????????' },
  //   { tagId: 18, tagName: '??????', emoji: '??????' },
  //   { tagId: 19, tagName: '??????/????????????', emoji: '????' },
  //   { tagId: 20, tagName: '??????/????????????', emoji: '???????' },
  //   { tagId: 21, tagName: '????????????/?????????', emoji: '??????' },
  // ];

  // useCurrentLocation().then((res) => {
  //   if (res === undefined) return;
  //   setLatLon(res);
  // });
  console.log('render');

  return (
    <RecruitFormContainer>
      <h1>?????? ????????? ????????????</h1>
      <span>???????????? ??????????????????!</span>
      {recruitData ? (
        <RecruitForm onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tbody>
              {/* <tr>
                <td>??????</td>
                <td>
                  <AutoCompleteForArray
                    fields={fields}
                    append={append}
                    remove={remove}
                    register={register}
                    control={control}
                    data={TAG_DATA}
                    tagLength={1}
                  />
                  <ErrorMessage>
                    {errors?.recruitTagDtos?.root?.message}
                  </ErrorMessage>
                </td>
              </tr> */}
              <tr>
                <td>
                  <label htmlFor="title">??????</label>
                </td>
                <td>
                  <input
                    id="title"
                    type="text"
                    defaultValue={recruitData.title}
                    {...register('title', {
                      required: '????????? ?????????????????????',
                    })}
                  />
                  <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="body">??????</label>
                </td>
                <td>
                  <textarea
                    id="body"
                    defaultValue={recruitData.body}
                    {...register('body', { required: '????????? ?????????????????????' })}
                  />
                  <ErrorMessage>{errors?.body?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="date">?????? ??????</label>
                </td>
                <td>
                  <input
                    id="date"
                    type="datetime-local"
                    defaultValue={recruitData.date}
                    disabled={recruitData.applies.length > 0}
                    {...register('date', {
                      required: '?????? ????????? ?????????????????????',
                    })}
                  />
                  <ErrorMessage>{errors?.date?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="require">??? ?????? ??????</label>
                </td>
                <td>
                  <input
                    id="require"
                    type="number"
                    defaultValue={recruitData.require}
                    disabled={recruitData.applies.length > 0}
                    {...register('require', {
                      required: '??? ?????? ????????? ?????????????????????',
                      valueAsNumber: true,
                    })}
                  />
                  ???<ErrorMessage>{errors?.require?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="minRequire">????????? ??????????????????</label>
                </td>
                <td>
                  <input
                    id="minRequire"
                    type="number"
                    defaultValue={recruitData.minRequire}
                    disabled={recruitData.applies.length > 0}
                    {...register('minRequire', {
                      required: '????????????????????? ?????????????????????',
                      valueAsNumber: true,
                      validate: {
                        smallerThanRequire: (value) =>
                          value > getValues().require
                            ? '????????????????????? ??? ???????????? ???????????? ?????????'
                            : true,
                      },
                    })}
                  />
                  ???<ErrorMessage>{errors?.minRequire?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="location">?????? ??????</label>
                </td>
                <td>
                  <input
                    id="location"
                    type="text"
                    defaultValue={recruitData.location}
                    disabled={recruitData.applies.length > 0}
                    // placeholder="???) 000??????, 00??? ?????? ??? ?????? ??????????????? ???"
                    {...register('location', {
                      required: '?????? ????????? ?????????????????????',
                    })}
                  />
                  <ErrorMessage>{errors?.location?.message}</ErrorMessage>
                </td>
              </tr>
              {recruitData.applies.length === 0 && (
                <tr className="mapCon">
                  <td>
                    <label htmlFor="latlon">?????? ??????</label>
                  </td>
                  <td>
                    {/* <div className="mapClick">
                    <KakaoMapClick
                    latitude={recruitData?.lat}
                    longitude={recruitData?.lon}
                    />
                  </div> */}
                    {location && (
                      <KakaoMapForClick
                        control={control}
                        setValue={setValue}
                        currentLat={location.latitude}
                        currentLon={location.longitude}
                        // disabled={recruitData.applies.length > 0}
                      />
                    )}
                  </td>
                </tr>
              )}
              {/* <tr>
              <td>?????? ??????</td>
                <td>
                  {['Both', 'Male', 'Female'].map((item) => (
                    <label key={item} htmlFor={`field-${item}`}>
                      <input
                        defaultValue={recruitData.sex}
                        {...register('sex', {
                          required: '?????? ????????? ?????????????????????',
                        })}
                        type="radio"
                        value={item}
                        id={`field-${item}`}
                        name="sex"
                      />
                      {item === 'Both' ? '????????????' : ''}
                      {item === 'Male' ? '?????????' : ''}
                      {item === 'Female' ? '?????????' : ''}
                    </label>
                  ))}
                  <ErrorMessage>{errors?.sex?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>????????? ??????</td>
                <td>
                  {[10, 20, 30, 40, 50, 60, 70].map((el) => (
                    <label>
                      <input
                        defaultValue={recruitData.ageGroup[el]}
                        key={el}
                        type="checkbox"
                        value={el}
                        {...register('ages', {
                          required: '????????? ????????? ?????????????????????',
                        })}
                      />
                      {`${el}???`}
                    </label>
                  ))}
                  <ErrorMessage>{errors?.ages?.message}</ErrorMessage>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="heart">????????? ??????</label>
                </td>
                <td>
                  <Controller
                    control={control}
                    name="heart"
                    // defaultValue={50}
                    defaultValue={recruitData?.heartLimit}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <input
                          id="heart"
                          type="range"
                          min={0}
                          max={200}
                          step={10}
                          value={value}
                          {...register('heart', {
                            required: true,
                            valueAsNumber: true,
                          })}
                          onChange={onChange}
                        />
                        <span className="result">?????? ????????? ?????? {value}</span>
                      </>
                    )}
                  />
                </td>
              </tr> */}
              {/* <tr>
                <td>
                  <label htmlFor="image">?????????</label>
                </td>
                <td>
                  <input id="image" type="file" {...register('image')} />
                </td>
              </tr> */}
            </tbody>
          </table>
          <Button
            value="??? ????????????"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          />
        </RecruitForm>
      ) : (
        <Loading />
      )}
    </RecruitFormContainer>
  );
};

export default EditRecruit;
