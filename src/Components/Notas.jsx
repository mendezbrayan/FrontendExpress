import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Card,
  Col,
  Row,
  Form,
  Select,
  Popconfirm,
  
} from "antd";
import axios from "axios";
import { DeleteOutlined, EditFilled, EditOutlined } from "@ant-design/icons";
const Notas = () => {
  const [notas, setNotas] = useState([]);
  const [userNota, setUserNota] = useState([]);
  const [form] = Form.useForm();

  const cargarNotas = async () => {
    const response = await axios.get("http://localhost:3000/notas");
    const response2 = await axios.get("http://localhost:3000/users");

    setUserNota(response2.data);
    setNotas(response.data);
  };

  useEffect(() => {
    cargarNotas();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const showModal = () => {
    form.resetFields();

    setIsUpdate(false);
    setOpen(true);
  };

  const editarHandlerNota = async (id) => {
    setIsUpdate(true);
    setOpen(true);
    let response = await axios.get(`http://localhost:3000/notas/${id}`);
    const obj = {
      nota: response.data.nota,
      id: response.data.id,
      idUser: response.data.User.id,
    };
    form.setFieldsValue(obj);
  };

  const onFinish = async (values) => {
    const idNota = values.id;
    const { id, ...data } = values;

    if (isUpdate) {
      await axios.put(`http://localhost:3000/notas/${idNota}`, data);
    } else {
      await axios.post("http://localhost:3000/notas", values);
    }

    cargarNotas();
    form.resetFields();
    setOpen(false);
  };
  const confirm = async (id) => {
    await axios.delete(`http://localhost:3000/notas/${id}`);
    cargarNotas();
  };
  return (
    <>
      <div className="d-flex  justify-content-end pe-4 pt-5 mb-3">
        <Button type="primary" onClick={showModal}>
          Crear Nota
        </Button>
      </div>

      <Modal
        title={<p>Notas</p>}
        footer={
          <Button type="primary" onClick={showModal}>
            Reload
          </Button>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="nota"
            rules={[
              {
                required: true,
                message: "Please input your Nota!",
              },
            ]}
          >
            <Input placeholder="nota" />
          </Form.Item>

          <Form.Item  name="idUser">
            <Select
              className="mb-2"
              showSearch
              placeholder="Select a person"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userNota.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item name="id" hidden>
            <Input type="text" />
          </Form.Item>

          <Form.Item>
            {isUpdate ? (
              <Button block type="primary" htmlType="submit">
                Update
              </Button>
            ) : (
              <Button block type="primary" htmlType="submit">
                Create
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <div className="container">
        <Row gutter={16}>
          {notas.map((item, index) => (
            <Col className="mb-3" span={6} key={item.id}>
              <Card className="shadow shadow-lg" bordered={false}>
                <div className="d-flex gap-4">
                  <h4>
                    <i>
                      <b>Nota</b> {item.id}
                    </i>{" "}
                  </h4>

                  <Popconfirm
                    title="Delete the User"
                    description="Are you sure to delete this users?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => confirm(item.id)}
                  >
                    <DeleteOutlined style={{ fontSize: 20, color: "red" }} /> 
                  </Popconfirm>

                  <EditFilled
                    style={{ fontSize: 20, color: "lightblue" }}
                    onClick={() => editarHandlerNota(item.id)}
                  />
                </div>
                {item.createdAt.slice(0, 10)}
                <hr />
                <b>Name:</b> {notas[index].User.name} <br />
                <b>LastName:</b> {notas[index].User.lastname} <br />
                <p>
                  <b>Nota:</b> {item.nota} <br />
                  <b>UpdatedAt:</b> {item.updatedAt.slice(0, 10)}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
export default Notas;
