import { Button, Form, Select, Input, InputNumber, Modal } from 'antd';
import { useEffect } from 'react';

export default function EditBook(props) {
    const [form] = Form.useForm();


    const handleFormSubmit = async () => {
    try {
        const formData = await form.validateFields();

    const dataToSave = {
        ...formData,
        id: props.item.id 
};

    props.onSave(dataToSave);

    props.onCancel(); 
    } catch (errorInfo) {
    console.log('Validate Failed:', errorInfo);
    }
};


    useEffect(() => {
        if (props.isOpen && props.item) {
            form.setFieldsValue({
                ...props.item,
                categoryId: props.item.category.id 
        });
    }
        if (!props.isOpen) {
            form.resetFields();
    }
}, [props.isOpen, props.item, form]);

    return(
    <Modal
    title="Edit Book"
    open={props.isOpen}
    onOk={handleFormSubmit} 
    onCancel={props.onCancel} 
    okText="Save Changes"
    cancelText="Cancel"
    >
        
        <Form form={form} layout="vertical" initialValues={{ price: 0, stock: 0 }}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input/>
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item name="isbn" label="ISBN">
            <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
            <Input.TextArea />
        </Form.Item>
        <Form.Item name="categoryId" label="Category" rules={[{required: true}]}>
            <Select allowClear style={{width:"100%"}} options={props.categories}/>
        </Form.Item>
        </Form>
    </Modal>
    );
}