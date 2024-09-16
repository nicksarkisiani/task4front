import React, {useState} from 'react';
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";


const columns: TableColumnsType<IUser> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'isBlocked',
        dataIndex: 'isBlocked',
    },
    {
        title: 'Registration date',
        dataIndex: "registration_date"
    },
    {
        title: 'Last login date',
        dataIndex: "last_updated"
    }
];

// const data: IUser[] = [
//     {
//         name: 'John Brown',
//         email: "123",
//         isBlocked: true,
//         _id: "123",
//         last_updated: "123",
//         registration_date: "123"
//     },
//     {
//         name: 'John Brown',
//         email: "123",
//         isBlocked: true,
//         _id: "1234",
//         last_updated: "123",
//         registration_date: "123"
//     },
// ];


interface UsersListProps {
    blockHandler : Function
    deleteHandler: Function
    users: IUser[]
}

const UsersList: React.FC<UsersListProps> = ({blockHandler, deleteHandler, users}) => {
    const selectionType = 'checkbox'

    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IUser[]) => {
            setSelectedRows(selectedRows.map(row => row._id));
        },
    };
    return (
        <div>
            <div>
                <button onClick={() => blockHandler(selectedRows)}>block</button>
                <button onClick={() => UserService.unblockMany(selectedRows)}>Unblock</button>
                <button onClick={() => deleteHandler(selectedRows)}>delete</button>
            </div>

            <Divider/>

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={users.map((item) => {
                    return {...item,
                        key: item._id
                    }
                })}
            />
        </div>
    );
};

export default UsersList;