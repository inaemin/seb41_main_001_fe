// import { useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import AutoCompleteForArray from '../components/AutoCompleteForArray';
import useCurrentLocation from '../utils/useCurrentLocation';
import KakaoMapClick from '../components/KakaoMapClick';
import Button from '../components/Button';

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
      }
      textarea {
        height: 200px;
      }
    }
    tr:nth-child(5),
    tr:nth-child(6) {
      input {
        width: 100px;
        margin-right: 10px;
      }
    }
    tr:nth-child(9),
    tr:nth-child(10) {
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
  heartLimit: number;
  // image: string;
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
  console.log(lat, lon);
  return <KakaoMapClick latitude={lat} longitude={lon} setValue={setValue} />;
};

const CreateRecruit = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<RecruitFormInput>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recruitTagDtos',
    rules: {
      validate: {
        moreThanOneTag: (values) =>
          values.length > 0 ? true : '????????? 1??? ?????? ???????????? ?????????',
      },
    },
  });

  const onSubmit = (data: RecruitFormInput) => {
    // tagSearch??? postBody?????? ?????????.
    const { tagSearch, ...postBody } = data;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/recruits`,
        {
          memberId: localStorage.getItem('memberId'),
          ...postBody,
        },
        {
          headers: {
            Authorization: localStorage.getItem('AccessToken'),
            Refresh: localStorage.getItem('RefreshToken'),
          },
        },
      )
      .then((res) => {
        console.log(res);
        navigate(`/recruits`);
      })
      .catch((err) => console.log(err));
  };
  const { location } = useCurrentLocation();
  console.log(location);
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

  return (
    <RecruitFormContainer>
      <h1>?????? ????????? ????????????</h1>
      <span>?????? ????????? ????????? ?????????!</span>

      <RecruitForm onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tbody>
            <tr>
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
            </tr>
            <tr>
              <td>
                <label htmlFor="title">??????</label>
              </td>
              <td>
                <input
                  id="title"
                  type="text"
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
                  placeholder="???) 000??????, 00??? ?????? ??? ?????? ??????????????? ???"
                  {...register('location', {
                    required: '?????? ????????? ?????????????????????',
                  })}
                />
                <ErrorMessage>{errors?.location?.message}</ErrorMessage>
              </td>
            </tr>
            <tr className="mapCon">
              <td>
                <label htmlFor="latlon">????????????</label>
              </td>
              <td>
                {/* <div className="mapClick">
                  <KakaoMapClick
                    latitude={latlon.latitude}
                    longitude={latlon.longitude}
                  />
                </div> */}
                {location && (
                  <KakaoMapForClick
                    control={control}
                    setValue={setValue}
                    currentLat={location.latitude}
                    currentLon={location.longitude}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>?????? ??????</td>
              <td>
                {['Both', 'Male', 'Female'].map((item) => (
                  <label key={item} htmlFor={`field-${item}`}>
                    <input
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
                <label htmlFor="heartLimit">????????? ??????</label>
              </td>
              <td>
                <Controller
                  control={control}
                  name="heartLimit"
                  defaultValue={50}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <input
                        id="heartLimit"
                        type="range"
                        min={0}
                        max={200}
                        step={10}
                        value={value}
                        {...register('heartLimit', {
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
            </tr>
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
    </RecruitFormContainer>
  );
};

export default CreateRecruit;
