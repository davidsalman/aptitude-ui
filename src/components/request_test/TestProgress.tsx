import React from 'react';
import { useFirebaseConnect, useFirestore, isEmpty, isLoaded } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import { IGame } from '../../redux/types';
import { Badge, Button, Card, Col, Descriptions, Layout, Empty, Row, Spin, Statistic, Tag, Typography, Progress } from 'antd';
import { ApiTwoTone, AppstoreTwoTone, CalendarTwoTone, CheckCircleOutlined, CheckSquareTwoTone, ClockCircleTwoTone, CloseCircleOutlined, CloseSquareTwoTone, FlagTwoTone, FundTwoTone, HourglassTwoTone, LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import routes from '../../configs/routes';
import './RequestTest.scss';

const { Countdown } = Statistic;
const { Item } = Descriptions;

interface ITestProgress {
  setNextStepHandler: () => void;
  setResultHandler: (resultID: string) => void;
  sessionId: string;
}

const TestProgress = ({ setNextStepHandler, setResultHandler, sessionId }: ITestProgress) => {
  useFirebaseConnect([
    { path: `sessions/${sessionId}` },
    { path: 'games' }
  ]);
  const session = useSelector((state: AppState) => state.firebase.ordered.sessions.find(_session => _session.key === sessionId));
  const games = useSelector((state: AppState) => state.firebase.ordered.games);
  const history = useHistory();
  const firestore = useFirestore();
  const switchStatusBadge = (status: string) => {
    switch (status) {
      case 'Initializing':
      case 'Ready':
        return <Tag icon={<ClockCircleTwoTone />} color="default">waiting</Tag>;
      case 'Playing':
        return <Tag icon={<SyncOutlined spin />} color="processing">playing</Tag>;
      case 'Finished':
        return <Tag icon={<CheckCircleOutlined />} color="success">finished</Tag>;
      default:
        return <Tag icon={<CloseCircleOutlined />} color="error">error</Tag>;
    }
  }
  const switchTitleAliveStatus = (title: string, active: boolean) => {
    if (active)
      return <Badge status="success">{title}</Badge>;
    else
      return <Badge status="error">{title}</Badge>;
  }
  const submitTest = (results: { key: string, value: IGame }[]) => {
    firestore.collection('results').add({

    }).then(
      (reference) => {
        setResultHandler(reference.id);
        setNextStepHandler();
      },
      (reason) => {

      });
  }
  if (!isLoaded(games)) {
    return (
      <Spin
        className="loading-request-test-content"
        tip="Loading games, please wait ..."
        size="large"
        indicator={
          <LoadingOutlined style={{ fontSize: 36 }} spin />
        }
      />
    );
  }
  if (isEmpty(games)) {
    return (
      <Layout className="request-test-content">
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <Typography.Title level={3}>
              "No Games Found! Please wait till one becomes available."
            </Typography.Title>
          }>
          <Button type="primary" onClick={() => history.push(routes.app.DASHBOARD)}>
            Go to Dashboard
          </Button>
        </Empty>
      </Layout>
    );
  }
  if (games.filter(game => game.value.completed_at !== 0).length === games.length) {
    submitTest(games);
  }
  return (
    <Layout className="request-test-content">
      <Row gutter={[32, 32]} className="test-progress-session-grid">
        <Col offset={2} span={6} key="session_id">
          <Statistic title="Session ID" value={session?.key} prefix={<ApiTwoTone />} />
        </Col>
        <Col span={5} key="box_id">
          <Statistic title="Box ID" value={session?.value.box_id} prefix={<AppstoreTwoTone />} />
        </Col>
        <Col span={6} key="started_at">
          <Statistic title="Started At" prefix={<CalendarTwoTone />}
            value={new Date(session?.value.started_at || new Date().getTime()).toLocaleString()}
          />
        </Col>
        <Col span={5} key="session_timeout">
          <Countdown title="Ending In" prefix={<HourglassTwoTone />} onFinish={() => submitTest(games)}
            value={new Date(session?.value.started_at || new Date().getTime()).getTime() + 1000 * 60 * 20}
          />
        </Col>
        <Col offset={2} span={6} key="total_score">
          <Statistic title="Total Score" prefix={<FundTwoTone twoToneColor={["green", "white"]} />}
            value={`${games.map(game => game.value.score).reduce((prev, next) => prev + next)}
              / ${games.map(game => game.value.max_score).reduce((prev, next) => prev + next)}`}
          />
        </Col>
        <Col span={5} key="total_strikes">
          <Statistic title="Total Strike" prefix={<CloseSquareTwoTone twoToneColor="red" />}
            value={`${games.map(game => game.value.strikes).reduce((prev, next) => prev + next)}
              / ${games.map(game => game.value.max_strikes).reduce((prev, next) => prev + next)}`}
          />
        </Col>
        <Col span={6} key="total_struckout">
          <Statistic title="Strike Outs" prefix={<FlagTwoTone twoToneColor="red" />}
            value={`${games.filter(game => game.value.strikes === game.value.max_strikes).length}/${games.length}`}
          />
        </Col>
        <Col span={5} key="session_timeout">
          <Statistic title="Completed" prefix={<CheckSquareTwoTone twoToneColor={["green", "white"]} />}
            value={`${games.filter(game => game.value.completed_at !== 0).length}/${games.length}`}
          />
        </Col>
      </Row>
      <Row gutter={[10, 10]} justify="space-between" className="test-progress-game-grid">
        {games.filter(game => game.value.box_id === session?.value.box_id).map((game, index) => {
          const { key, value } = game;
          const { alive, completed_at, max_score, max_strikes, name, score, started_at, status, strikes } = value;
          return (
            <Col flex="1 2 350px" span={6} key={key}>
              <Card title={switchTitleAliveStatus(name, alive)} extra={switchStatusBadge(status)}>
                <Progress className="progress-circle" type="circle" percent={(score / max_score) * 100} />
                <Progress className="progress-circle" type="circle" percent={(strikes / max_strikes) * 100} status="exception" />
                <Descriptions layout="vertical" bordered={true}>
                  <Item label="Score" span={2}>{score} / {max_score}</Item>
                  <Item label="Strikes">{strikes} / {max_strikes}</Item>
                  <Item label="Started At">{started_at === 0 ? 'N/A' : new Date(started_at).toLocaleString()}</Item>
                  <Item label="Completed At">{completed_at === 0 ? 'N/A' : new Date(completed_at).toLocaleString()}</Item>
                </Descriptions>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Layout>
  );
}

export default TestProgress;