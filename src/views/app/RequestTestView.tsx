import React, { useEffect, useState } from 'react';
import { useFirebaseConnect, isEmpty, isLoaded, FirebaseReducer } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import { Layout, Steps, Divider, message } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CodeSandboxOutlined, InfoCircleOutlined } from '@ant-design/icons';
import SelectBox from '../../components/request_test/SelectBox';
import StartTest from '../../components/request_test/StartTest';
import TestProgress from '../../components/request_test/TestProgress';
import TestResult from '../../components/request_test/TestResult';
import './AppViews.scss';

const { Step } = Steps;

const RequestTestView = () => {

  // Event listeners
  useFirebaseConnect([
    { path: 'sessions' }
  ]);

  // Firebase state
  const sessions = useSelector((state: AppState) => state.firebase.ordered.sessions);
  const auth: FirebaseReducer.AuthState = useSelector((state: AppState) => state.firebase.auth);

  // View state
  const [currentStep, setCurrentStep] = useState(0);
  const [boxID, setBoxID] = useState("");
  const [sessionID, setSessionID] = useState("");

  // View function
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  }
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  }

  // View effects
  useEffect(() => {
    if (!isLoaded(sessions)) {
      message.loading('Checking for previous session ...');
    }
    if (!isEmpty(sessions)) {
      const session = sessions.find(_session => _session.value.user_id === auth.uid && _session.value.active === true);
      if (session !== undefined) {
        setBoxID(session.value.box_id);
        setSessionID(session.key);
        setCurrentStep(2);
      }
    }
  }, [sessions, auth.uid]);

  return (
    <Layout className="content-layout">
      <Steps type="navigation" current={currentStep}>
        <Step title="Select Box" description="Pick a Box" icon={<CodeSandboxOutlined />} />
        <Step title="Start Test" description="Instructions" icon={<InfoCircleOutlined />} />
        <Step title="Test Progress" description="See Score and Strikes" icon={<ClockCircleOutlined />} />
        <Step title="Test Result" description="Examination Report" icon={<CheckCircleOutlined />} />
      </Steps>
      <Divider />
      {(() => {
        switch (currentStep) {
          case 0: return <SelectBox setNextStepHandler={nextStep} setBoxHandler={setBoxID} />;
          case 1: return <StartTest setNextStepHandler={nextStep} setPrevStepHandler={prevStep} setSessionHandler={setSessionID} boxId={boxID} />;
          case 2: return <TestProgress setNextStepHandler={nextStep} sessionId={sessionID} />;
          case 3: return <TestResult sessionId={sessionID} />
          default: return null;
        }
      })()}
    </Layout>
  );
}

export default RequestTestView;