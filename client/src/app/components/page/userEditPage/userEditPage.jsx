import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions';
import {
  getQualities,
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../../store/qualities';
import { getCurrentUserData, updateUserData } from '../../../store/users';
import { validator } from '../../../utils/validator';
import BackHistoryButton from '../../common/backButton';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import SelectField from '../../common/form/selectField';
import TextField from '../../common/form/textField';

const UserEditPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const currentUser = useSelector(getCurrentUserData());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const userQualities = useSelector(getQualitiesByIds(currentUser.qualities));
  const dispatch = useDispatch();

  const handleChange = (target) => {
    setErrors({});
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const transformData = (data) => {
    return data.map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
  };

  useEffect(() => {
    if (!qualitiesLoading && !professionsLoading) {
      setData({
        ...currentUser,
        qualities: transformData(userQualities)
      });
    }
  }, [qualitiesLoading, professionsLoading]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const { qualities } = data;
    dispatch(
      updateUserData({ ...data, qualities: qualities.map((q) => q.value) })
    );
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    },
    qualities: {
      min: {
        message: 'Выберите не меньше одного качества',
        value: 1
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                placeholder="Введите Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                placeholder="Введите электронную почту"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                name="profession"
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                defaultValue={data.qualities}
                options={transformData(qualities)}
                onChange={handleChange}
                values
                name="qualities"
                label="Выберите ваши качества"
                error={errors.qualities}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto">
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
