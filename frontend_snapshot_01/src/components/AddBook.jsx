import { Button, Form, Select, Input, InputNumber } from 'antd';

export default function AddBook(props) {
  const categories = [
    { label: 'Fiction', value: 'fiction' },
    { label: 'Non-Fiction', value: 'non-fiction' },
  ]

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15)
  }

  return(
    <Form layout="inline" onFinish={values => {props.onBookAdded({...values, id: generateId()})}}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: true }]}>
        <InputNumber/>
      </Form.Item>
      <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
        <InputNumber/>
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select allowClear style={{width:"150px"}} options={categories}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">New Book</Button>
      </Form.Item>
    </Form>
  )
}