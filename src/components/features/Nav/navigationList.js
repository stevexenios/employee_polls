import {
  HomeOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import LeaderboardSvg from '../../../assets/svg/LeaderboardSvg';
import './Nav.css';

const customStyle = { color: 'var(--mwangiColor3Text)', fontSize: '20px' };
const customStyleDisabled = {
  ...customStyle,
  color: 'var(--mwangiColor2Background)',
};

export const navigationList = [
  {
    key: 'Home',
    toPath: '/',
    disabled: false,
    icon: <HomeOutlined style={customStyle} />,
    label: <h3>Home</h3>,
  },
  {
    key: 'New',
    toPath: '/add',
    disabled: false,
    icon: <PlusCircleOutlined style={customStyle} />,
    label: <h3>New</h3>,
  },
  {
    key: 'Leaderboard',
    toPath: '/leaderboard',
    disabled: false,
    icon: <LeaderboardSvg style={customStyle} />,
    label: <h3>Leaderboard</h3>,
  },
  {
    key: 'Settings',
    toPath: '/settings',
    disabled: true,
    icon: <SettingOutlined style={customStyleDisabled} />,
    label: <h3 style={{ color: 'var(--mwangiColor2Background)' }}>Settings</h3>,
  },
];
