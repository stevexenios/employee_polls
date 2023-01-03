/* eslint-disable react-hooks/exhaustive-deps */
import './LeaderboardTable.css';
import { useEffect, useState } from 'react';
import { selectUsers, fetchUsers } from '../../../redux/users';
import { fetchQuestions } from '../../../redux/questions';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const _ = require('lodash');

const { Column, ColumnGroup } = Table;

const LeaderboardTable = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector(selectUsers);
  const [actualUsers, setActualUsers] = useState([]);  

  useEffect(() => {
    dispatch(fetchQuestions());
    dispatch(fetchUsers());
  }, []);

  const mapAndSortUsers = () => {
    const updatedUsers = Object.values(allUsers).map((eachUser) => {
      const [firstName, lastName] = eachUser.name.split(' ');
      return ({
        key: eachUser.id + '_' + Date.now(),
        firstName,
        lastName,
        userId: eachUser.id,
        userPic: eachUser.avatarURL || <UserOutlined />,
        qAsked: eachUser.questions.length,
        qAnswered: Object.keys(eachUser.answers).length,
        tags: [...Object.keys(eachUser.answers)],
        sortWeight: eachUser.questions.length + Object.keys(eachUser.answers).length
      });
    });

    const sortedUsers = updatedUsers.sort((a, b) => {
      if (a.sortWeight === b.sortWeight) return 0;
      return a.sortWeight > b.sortWeight ? -1 : 1;
    }).map((a, i) => {
      a.position = i + 1;
      return a;
    });
    return sortedUsers;
  };

  useEffect(() => {
    const sortedUsers = mapAndSortUsers();
    setActualUsers(sortedUsers);
  }, []);
  
  return (
    <Table dataSource={_.cloneDeep(actualUsers)}>
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
        title="Answered Question IDs"
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
