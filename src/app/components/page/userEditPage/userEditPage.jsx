import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useProfessions } from '../../../hooks/useProfession';
import { useQualities } from '../../../hooks/useQuality';
import { useUsers } from '../../../hooks/useUsers';
import { validator } from '../../../utils/validator';
import BackHistoryButton from '../../common/backButton';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import SelectField from '../../common/form/selectField';
import TextField from '../../common/form/textField';

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  });
  const [errors, setErrors] = useState({});
  const { updateUser } = useAuth();
  const { getUserById } = useUsers();
  const { professions, isLoading: professionsLoading, getProfessionById } = useProfessions();
  const { qualities, isLoading: qualitiesLoading, getQualityById } = useQualities();

  const handleChange = (target) => {
    setErrors({});
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const transformData = (data) => {
    if (!data) return;
    return data.map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
  };

  const getUserData = (userId) => {
    const user = getUserById(userId);
    const profession = getProfessionById(user.profession);
    const qualities = user.qualities.map((q) => getQualityById(q));

    return { user, profession, qualities };
  };

  useEffect(() => {
    setIsLoading(true);
    if (!qualitiesLoading && !professionsLoading) {
      const { user, profession, qualities } = getUserData(userId);
      setData((prevState) => ({
        ...prevState,
        ...user,
        qualities: transformData(qualities),
        profession: profession._id
      }));
      setIsLoading(false);
    }
  }, [qualitiesLoading, professionsLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(isValid);
    if (!isValid) return;

    const { qualities } = data;
    updateUser({ ...data, qualities: qualities ? qualities.map((q) => q.value) : [] }).then(() => {
      history.push(`/users/${data._id}`);
    });
    console.log(history);
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
                defaultValue={data.qualities || []}
                options={transformData(qualities)}
                onChange={handleChange}
                values
                name="qualities"
                label="Выберите ваши качества"
                error={errors.qualities}
              />
              <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
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

export default EditUserPage;
