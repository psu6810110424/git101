import { Table, Button, Space, Popconfirm, Tag } from 'antd';


export default function BookList(props) {

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => (
        <Tag color="blue">{text}</Tag>
      ),
    },
    {
      title: 'Liked',
      dataIndex: 'likeCount',
      key: 'likeCount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
      <Space>
        <Button type="primary" onClick={() => props.onLiked(record.id)}>Like</Button>
        <Popconfirm title="Are you sure you want to delete this book?" onConfirm={() => props.onDeleted(record.id)}>
          <Button danger type="dashed">Delete</Button>
        </Popconfirm>
      </Space>
    ),
    }
  ]

  return (
    <Table 
      rowKey="id" 
      dataSource={props.data} 
      columns={columns} 
      rowClassName={(record, index) => {
        if(record.stock < 30) {
          return "red-row";
        }
      }}/>
  )
}
