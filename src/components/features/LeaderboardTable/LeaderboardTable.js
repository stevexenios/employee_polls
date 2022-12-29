import './LeaderboardTable.css';
import { useEffect, useState } from 'react';
import { selectUsers, selectTotalUsers } from '../../../redux/users';
import { useSelector } from 'react-redux';
import { Table, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;

const testUsers = [
  {
    key: '0',
    firstName: 'John',
    lastName: 'Brown',
    userId: 'jbrown',
    userPic: null || <UserOutlined />,
    qAsked: 2,
    qAnswered: 3,
    tags: ['a1', 'a2'],
  },
  {
    key: '1',
    firstName: 'Jim',
    lastName: 'Green',
    userId: 'jgreen',
    userPic: null || <UserOutlined />,
    qAsked: 4,
    qAnswered: 4,
    tags: ['b1', 'b2', 'b3', 'b4'],
  },
  {
    key: '2',
    firstName: 'Joe',
    lastName: 'Black',
    userId: 'jblack',
    userPic: null || <UserOutlined />,
    qAsked: 5,
    qAnswered: 20,
    tags: ['c1', 'c2', 'c3', 'c4', 'c5'],
  },
];

const LeaderboardTable = () => {
  const allUsers = useSelector(selectUsers);
  const [actualUsers, setActualUsers] = useState(testUsers);

  useEffect(() => {
    const updatedUsers = Object.values(allUsers).map((eachUser) => {
      const [firstName, lastName] = eachUser.name.split(' ');
      return ({
        key: eachUser.id,
        firstName,
        lastName,
        userId: eachUser.id,
        userPic: eachUser.avatarURL || <UserOutlined />,
        qAsked: eachUser.questions.length,
        qAnswered: Object.keys(eachUser.answers).length,
        tags: [...Object.keys(eachUser.answers)],
        sortWeight: eachUser.questions.length + eachUser.answers.length
      });
    });

    const sortedUsers = updatedUsers.sort((a, b) => {
        if (a.sortWeight === b.sortWeight) return 0;
        return a.sortWeight > b.sortWeight ? -1 : 1;
      }).map((a, i) => {
        a.position = i + 1;
        return a;
      });
    setActualUsers(sortedUsers);
  }, [allUsers]);

  return (
    <Table dataSource={actualUsers}>
      <Column title="Position" dataIndex="position" key="position" />
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="User ID" dataIndex="userId" key="userId" />
      </ColumnGroup>
      <Column title="Profile Picture" dataIndex="userPic" key="userPic" />
      <Column title="Questions Asked" dataIndex="qAsked" key="qAsked" />
      <Column
        title="Questions Answered"
        dataIndex="qAnswered"
        key="qAnswered"
      />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
    </Table>
  );
};

export default LeaderboardTable;
