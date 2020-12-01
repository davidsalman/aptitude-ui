import { ReactNode } from 'react';
import { notification } from 'antd';

interface INotificationProps {
  message: string,
  description?: string,
  icon?: ReactNode
}

export const openNotification = ({ message, description, icon } : INotificationProps) => {
  notification.open({
    message,
    description,
    icon
  });
};