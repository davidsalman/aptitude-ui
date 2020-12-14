import React, { useState } from 'react';
import { Result, Button, Typography, Layout } from 'antd';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import {
  ExtendedFirebaseInstance,
  FirebaseReducer,
  useFirebase,
  useFirebaseConnect
} from 'react-redux-firebase';
import { openNotification } from '../common/Notifcation'
import { AppState } from '../../redux';
import { ISession } from '../../redux/types';
import { useSelector } from 'react-redux';
import './RequestTest.scss';

const { Text } = Typography;

interface IStartTest {
  setNextStepHandler: () => void;
  setPrevStepHandler: () => void;
  setSessionHandler: (sessionID: string) => void;
  boxId: string;
}

const StartTest = ({ setNextStepHandler, setPrevStepHandler, setSessionHandler, boxId }: IStartTest) => {
  useFirebaseConnect([
    { path: `boxes/${boxId}` }
  ]);
  const box = useSelector((state: AppState) => state.firebase.ordered.boxes.find(_box => _box.key === boxId));
  const auth: FirebaseReducer.AuthState = useSelector((state: AppState) => state.firebase.auth);
  const firebase: ExtendedFirebaseInstance = useFirebase();
  const [understood, setUnderstood] = useState(false);
  const startTest = async () => {
    try {
      await firebase.update(`boxes/${boxId}`, { taken: true });
      const newSession: ISession = {
        active: true,
        box_id: boxId,
        completed_at: 0,
        user_id: auth.uid,
        started_at: new Date().getTime()
      };
      const session = await firebase.push('sessions', newSession);
      if (session.key !== null) {
        openNotification({
          message: "Test Session Created!",
          description: "Test will commence soon. Get ready ...",
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" />
        });
        setSessionHandler(session.key);
        setNextStepHandler();
      } else {
        throw new Error(
          'Invalid Session ID Error. Firebase push function returned an invalid key type of null.'
        );
      }
    } catch (error) {
      openNotification({
        message: error.code,
        description: error.message,
        icon: <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      });
    }
  }
  return (
    <Layout className="request-test-content">
      <Result
        className="start-test-info"
        title={`You have selected ${box?.value.company}'s ${box?.value.name} located at ${box?.value.location}. Before you begin ...`}
        extra={<>
          <Text>
            1) Please ensure that the skill testing box (a.k.a Aptitude Box) with the name of {box?.value.name} is in front of you.<br />
            2) To start each test, an audio queue will prompt you to press a colored button found at the top face of the box.<br />
            3) You may move freely around the Aptitude Box however you cannot move the Aptitude Box itself.<br />
            <br />
            Press "I Understand" below to acknowledge that you've read the rules and agree to comply.<br />
            <br />
          </Text>
          <Button type="primary" disabled={understood} onClick={() => setUnderstood(true)}>
            I Understand
          </Button>
        </>}
      />
      <Layout className="start-test-options">
        <Button
          type="primary"
          className="start-test-prev-step-button"
          onClick={() => setPrevStepHandler()}>
          Go Back
        </Button>
        <Button
          type="primary"
          className="start-test-start-test-button"
          disabled={!understood}
          onClick={startTest}>
          Start Test
        </Button>
      </Layout>
    </Layout>
  );
}

export default StartTest;