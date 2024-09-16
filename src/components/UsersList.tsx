import React, {useState} from 'react';
import {Button, Divider, Table} from 'antd';
import type { TableColumnsType } from 'antd';
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";
import {DeleteOutlined, LockOutlined, UnlockOutlined} from "@ant-design/icons";


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
                <Button type="primary" onClick={() => blockHandler(selectedRows)}><LockOutlined /> Block</Button>
                <Button type="primary" onClick={() => UserService.unblockMany(selectedRows)}><UnlockOutlined /></Button>
                <Button type="primary" onClick={() => deleteHandler(selectedRows)}><DeleteOutlined color="red"/></Button>
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