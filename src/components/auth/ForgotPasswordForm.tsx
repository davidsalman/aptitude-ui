import React from 'react';
import * as Yup from 'yup';
import { ReCaptcha } from 'react-recaptcha-v3';
import recaptchaConfig from '../../configs/recaptcha';
import routes from '../../configs/routes';
import { openNotification } from '../common/Notifcation';
import { useHistory } from 'react-router-dom';
import { ExtendedFirebaseInstance, useFirebase } from 'react-redux-firebase';
import { Formik, FormikHelpers } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

type ForgotPasswordFormValues = {
  email: string;
  recaptcha_verification: string;
};

type ForgotPasswordFormValidation =
  Yup.ObjectSchema<Yup.Shape<undefined | object, ForgotPasswordFormValues>, object>;

const ForgotPasswordForm = () => {
  const history = useHistory();
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const initialValues: ForgotPasswordFormValues = {
    email: '',
    recaptcha_verification: ''
  };
  const validationSchema: ForgotPasswordFormValidation = Yup.object().shape({
    email: Yup.string()
      .email('Invalid e-mail input.')
      .required('E-mail required.'),
    recaptcha_verification: Yup.string()
      .required('Human verification required.')
  });
  const handleSubmit = async (values: ForgotPasswordFormValues, actions: FormikHelpers<ForgotPasswordFormValues>) => {
    try {
      const { email } = values;
      await firebase.resetPassword(email);
      history.push(routes.default.SIGN_IN);
      openNotification({
        message: 'Reset Password Email Sent!',
        description: 'Reset password email sent to e-mail, re-directing to the sign-in page.',
        icon: <CheckCircleTwoTone />
      });
      actions.setSubmitting(true);
      actions.resetForm();
    } catch (error) {
      openNotification({
        message: 'Reset Password Request Failed: ' + error.code,
        description: 'Reset password request failed. ' + error.message,
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
          <FormItem name='email' label='E-mail' required hasFeedback showValidateSuccess>
            <Input name='email' placeholder='user@domain.com' />
          </FormItem>
          <SubmitButton className="sumbit-form-button">
            Send Email
          </SubmitButton>
          <FormItem name='recaptcha_verification'>
            <ReCaptcha
              className="recaptcha-input"
              action="PASSWORD_RESET"
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

export default ForgotPasswordForm;