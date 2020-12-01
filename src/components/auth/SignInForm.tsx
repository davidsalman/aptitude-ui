import React from 'react';
import * as Yup from 'yup';
import routes from '../../configs/routes';
import { openNotification } from '../common/Notifcation';
import { useHistory, Link } from 'react-router-dom';
import { Credentials, ExtendedFirebaseInstance, useFirebase } from 'react-redux-firebase';
import { Formik, FormikHelpers } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import './Forms.scss';

type SignInFormValues = {
  email: string;
  password: string;
};

type SignInFormValidation =
  Yup.ObjectSchema<Yup.Shape<undefined | object, SignInFormValues>, object>;

const SignInForm = () => {
  const history = useHistory();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const initialValues: SignInFormValues = {
    email: '',
    password: ''
  };
  const validationSchema: SignInFormValidation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid e-mail input.')
      .required('E-mail required.'),
    password: Yup.string()
      .min(8, 'Password is too short.')
      .matches(/[a-zA-Z0-9!@#$%^&*-={}()<>:;"',.]+/, 'Password must only contain letters, numbers and symbols.')
      .required('Password required.')
  });
  const handleSubmit = async (values: SignInFormValues, actions: FormikHelpers<SignInFormValues>) => {
    try {
      const { email, password } = values;
      const userCredentials: Credentials = { email, password };
      await firebase.login(userCredentials);
      history.push(routes.app.DASHBOARD);
      openNotification({
        message: 'User Authentication Success',
        description: 'User credentials are valid, re-directing to the user dashboard page.',
        icon: <CheckCircleTwoTone />
      });
      actions.setSubmitting(true);
      actions.resetForm();
    } catch (error) {
      openNotification({
        message: 'User Authentication Failed: ' + error.code,
        description: 'User credentials are in-valid. ' + error.message,
        icon: <CloseCircleTwoTone />
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={() => (
        <Form className="auth-form">
          <FormItem name='email' label='E-mail' required hasFeedback showValidateSuccess>
            <Input name='email' placeholder='user@domain.com' />
          </FormItem>
          <FormItem name='password' label='Password' required hasFeedback showValidateSuccess>
            <Input.Password name='password' placeholder='' />
          </FormItem>
          <Link to={routes.default.FORGOT_PASSWORD} className="forget-password-link">
            Forgot password, click here.
          </Link>
          <SubmitButton className="sumbit-form-button">
            Sign-in
          </SubmitButton>
        </Form>
      )}
    />
  );
}

export default SignInForm;