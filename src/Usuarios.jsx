import { useEffect, useState } from "react";
import { Table, Row, Col, Modal, Button, Form, Input, Popconfirm } from "antd";
import axios from "axios";

const Usuarios = () => {
  const [datos, setDatos] = useState([]);
  const [isUpdate,setIsUpdate] = useState(false)
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setIsUpdate(false)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
  form.resetFields()
    setIsModalOpen(false);
  };

  const cargarUser = async () => {
    let response = await axios.get("http://localhost:3000/users");
        setDatos(response.data);
  }

  useEffect(() => {
    cargarUser();
  }, []);

 

  const editarHandler = async (id) => {
  setIsModalOpen(true)
  setIsUpdate(true)
  let response = await axios.get(`http://localhost:3000/users/${id}`)
  form.setFieldsValue(response.data)

  }
  
const confirm = async(id) => {
  await axios.delete(`http://localhost:3000/users/${id}`)
  cargarUser()
   
}
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return text ? "Activo" : "Inactivo";
      },
    },
    {
      title: "Created_in",
      dataIndex: "createdAt" ,
      key: "createdAt",
      render:(text) => {
        return text.slice(0,10)
      }
    },
    {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (text,row) => {
            return  <>
            <div className="d-flex gap-2">

            <Button onClick={() => editarHandler(row.id)} className="btn btn-info">editar</Button>
            
             <Popconfirm
      title="Delete the User"
      description="Are you sure to delete this users?"
      okText = "Yes"
      cancelText = "No"
      onConfirm={() => confirm(row.id)}
    >
      <Button danger >Delete</Button>
    </Popconfirm>
              
             
            </div>
           
            </>
       
          },
    }
  ]

  const onFinish = async (values) => {
    const idUser = values.id
    const {id,...data} = values

    if(isUpdate){
    await axios.put(`http://localhost:3000/users/${idUser}`,data)
      
    }else{
     await axios.post("http://localhost:3000/users",values)

    }
    cargarUser()
  form.resetFields()
    handleCancel()
  }

  return (
    <>

      <div className="d-flex justify-content-end pe-5 pt-4">
        <Button type="primary" onClick={showModal}>
          Create Users
        </Button>
        <Modal
          title="Crear Usuario"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={''}
        >
          <Form
          form={form}
          onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your LastName!",
                },
              ]}
            >
              <Input type="text" placeholder="LastName" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input type="text" placeholder="Password" />
            </Form.Item>
            <Form.Item
            name={'id'}
            hidden
          
            >
              <Input type="text"/>
            </Form.Item>

            <Form.Item>
              {isUpdate ?
              <Button block type="primary" htmlType="submit">
          Update
        </Button> :  <Button block type="primary" htmlType="submit">
          Create
        </Button> }
      
        
       
      </Form.Item>

          </Form>
        </Modal>
      </div>
      <Row>
        <Col  md={24} style={{ display: "flex", justifyContent: "center" }}>
          <Table rowKey={"id"} dataSource={datos} columns={columns} />
        </Col>
      </Row>

    </>
  );
};

export default Usuarios;
