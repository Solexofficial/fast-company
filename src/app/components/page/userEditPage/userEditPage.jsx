import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import TextField from '../../common/form/textField';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';
import { validator } from '../../../utils/validator';
import { useHistory, useParams } from 'react-router';
import BackHistoryButton from '../../common/backButton';

const UserEditPage = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let isIgnoreResponse = false;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const user = await api.users.getById(userId);
        const qualities = await api.qualities.fetchAll();
        const professions = await api.professions.fetchAll();
        if (!isIgnoreResponse) {
          setUser(user);
          setQualities(qualities);
          setProfessions(professions);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isIgnoreResponse = true;
    };
  }, [userId]);

  const handleChange = (target) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    // valid profession for render
    for (const profession in professions) {
      if (professions[profession]._id === user.profession) {
        user.profession = professions[profession];
      }
    }

    // valid qualities for render
    user.qualities = Object.values(qualities).filter((quality) =>
      user.qualities.map((quality) => quality.value || quality._id).includes(quality._id)
    );

    api.users.update(userId, user).then((data) => history.push(`/users/${data._id}`));
  };

  const validate = () => {
    const errors = validator(user, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    name: {
      isRequired: { message: 'Имя обязательно для заполнения' }
    },
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: {
        message: 'email введен некорректно'
      }
    }
  };
  useEffect(() => validate(), [user]);

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                placeholder="Введите Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                placeholder="Введите электронную почту"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />

              <SelectField
                label="Выберите вашу профессию"
                value={user.profession._id}
                error={errors.professions}
                name="profession"
                defaultOption="Choose..."
                options={professions}
                onChange={handleChange}
              />

              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={user.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />

              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
                defaultValue={user.qualities.map((quality) => ({
                  label: quality.name,
                  value: quality._id
                }))}
              />
              <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                Обновить
              </button>
            </form>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

UserEditPage.propTypes = {
  userId: PropTypes.string
};

export default UserEditPage;
