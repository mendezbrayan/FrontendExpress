import { useEffect, useState } from "react";
import { Table, Row, Col, Modal, Button, Form, Input, Popconfirm } from "antd";
import axios from "axios";

const Clientes = () => {
  const [datoCliente, setDatosCliente] = useState([]);
  const [isUpdateCliente, setIsUpdateCliente] = useState(false);
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModalCliente = () => {
    console.log("hola");
    setIsModalOpen(true);
    setIsUpdateCliente(false);
  };

  const handleOkCliente = () => {
    setIsModalOpen(false);
  };

  const handleCancelCliente = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const cargarCliente = async () => {
    let response = await axios.get("http://localhost:3000/Clientes");
    setDatosCliente(response.data);
    //   setDatosCliente(response.data.map(item => {
    //     item.key = item.id
    //     return item
    //   }))
  };

  useEffect(() => {
    cargarCliente();
  }, []);

  const editarHandlerCliente = async (id) => {
    setIsModalOpen(true);
    setIsUpdateCliente(true);
    let response = await axios.get(`http://localhost:3000/clientes/${id}`);
    form.setFieldsValue(response.data);
    console.log(response.data);
  };

  const confirm = async (id) => {
    await axios.delete(`http://localhost:3000/clientes/${id}`);
    cargarCliente();
  };

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
      title: "address",
      dataIndex: "address",
      key: "address",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => {
        return text ? "Corporativo" : "Normal";
      },
    },
    {
      title: "Created_in",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return text.slice(0, 10);
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, row) => {
        return (
          <>
            <div className="d-flex gap-2">
              <Button
                onClick={() => editarHandlerCliente(row.id)}
                className="btn btn-info"
              >
                editar
              </Button>

              <Popconfirm
                title="Delete the User"
                description="Are you sure to delete this clientes?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => confirm(row.id)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const idCliente = values.id;
    const { id, ...dataCliente } = values;
    console.log(id, "hola");
    if (isUpdateCliente) {
      await axios.put(
        `http://localhost:3000/Clientes/${idCliente}`,
        dataCliente
      );
    } else {
      await axios.post("http://localhost:3000/Clientes", values);
    }
    cargarCliente();
    form.resetFields();
    handleCancelCliente();
  };

  return (
    <>
      <div className="d-flex justify-content-end pe-5 pt-4">
        <Button type="primary" onClick={showModalCliente}>
          Create Cliente
        </Button>
        <Modal
    title="Crear Cliente"
    open={isModalOpen}
    onOk={handleOkCliente}
    onCancel={handleCancelCliente}
    footer={""}
        >
    <Form form={form} onFinish={onFinish}>
            <Form.Item
    name="name"
    rules={[
                {
    required: true,
    message: "Please input your Clientname!",
    },
    ]}
            >
            <Input placeholder="Clientname" />
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
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input type="text" placeholder="Address" />
            </Form.Item>

            <Form.Item name={"id"} hidden>
              <Input type="text" />
            </Form.Item>

            <Form.Item>
              {isUpdateCliente ? (
                <Button block type="primary" htmlType="submit">
                  Update
                </Button>
              ) : (
                <Button block type="primary" htmlType="submit">
                  Create Cliente
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Row>
        <Col md={24} style={{ display: "flex", justifyContent: "center" }}>
          <Table rowKey={"id"} dataSource={datoCliente} columns={columns} />
        </Col>
      </Row>
    </>
  );
};

export default Clientes;
