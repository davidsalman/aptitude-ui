import React from 'react';
import * as Yup from 'yup';
import { ReCaptcha } from 'react-recaptcha-v3';
import recaptchaConfig from '../../configs/recaptcha';
import routes from '../../configs/routes';
import { openNotification } from '../common/Notifcation';
import { useHistory } from 'react-router-dom';
import { Credentials, ExtendedFirebaseInstance, useFirebase } from 'react-redux-firebase';
import { Formik, FormikHelpers } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

type RegisterFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  recaptcha_verification: string;
};

type RegisterFormValidation =
  Yup.ObjectSchema<Yup.Shape<undefined | object, RegisterFormValues>, object>;

const RegisterForm = () => {
  const history = useHistory();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const initialValues: RegisterFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    recaptcha_verification: ''
  };
  const validationSchema: RegisterFormValidation = Yup.object().shape({
    first_name: Yup.string()
      .max(32, 'First name too long.')
      .required('First name required.'),
    last_name: Yup.string()
      .max(32, 'Last name too long.')
      .required('Last name required.'),
    email: Yup.string()
      .email('Invalid e-mail input.')
      .required('E-mail required.'),
    password: Yup.string()
      .min(8, 'Password is too short.')
      .matches(/[a-zA-Z0-9!@#$%^&*-={}()<>:;"',.]+/, 'Password must only contain letters, numbers and symbols.')
      .required('Password required.'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords don\'t must match.')
      .required('Confirm password required.'),
    recaptcha_verification: Yup.string()
      .required('Human verification required.')
  });
  const handleSubmit = async (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
    try {
      const { first_name, last_name, email, password } = values;
      const userCredentials: Credentials = { email, password };
      await firebase.createUser(userCredentials, { first_name, last_name, email, role: 'user' });
      history.push(routes.app.DASHBOARD);
      openNotification({
        message: 'User Registration Success',
        description: 'User creation is successful, re-directing to the user dashboard page.',
        icon: <CheckCircleTwoTone />
      });
      actions.setSubmitting(true);
      actions.resetForm();
    } catch (error) {
      openNotification({
        message: 'User Registration Failed: ' + error.code,
        description: 'User registration failed. ' + error.message,
        icon: <CloseCircleTwoTone />
      });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      render={({ setFieldValue }) => (
        <Form className="auth-form">
          <FormItem name='first_name' label='First Name' required hasFeedback showValidateSuccess>
            <Input name='first_name' placeholder='John' />
          </FormItem>
          <FormItem name='last_name' label='Last Name' required hasFeedback showValidateSuccess>
            <Input name='last_name' placeholder='Smith' />
          </FormItem>
          <FormItem name='email' label='E-mail' required hasFeedback showValidateSuccess>
            <Input name='email' placeholder='john.smith@domain.com' />
          </FormItem>
          <FormItem name='password' label='Password' required hasFeedback showValidateSuccess>
            <Input.Password name='password' placeholder='' />
          </FormItem>
          <FormItem name='confirm_password' label='Confirm Password' required hasFeedback showValidateSuccess>
            <Input.Password name='confirm_password' placeholder='' />
          </FormItem>
          <SubmitButton className="sumbit-form-button">
            Register
          </SubmitButton>
          <FormItem name='recaptcha_verification'>
            <ReCaptcha
              className="recaptcha-input"
              action="REGISTER"
              sitekey={recaptchaConfig.siteKey || ''}
              render='explicit'
              theme='light'
              verifyCallback={(response) => { setFieldValue('recaptcha_verification', response); }}
            />
          </FormItem>
        </Form>
      )}
    />
  );
}

export default RegisterForm;