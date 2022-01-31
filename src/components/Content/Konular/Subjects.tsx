import { Col, Popconfirm, Row, Table, Image } from "antd";
import axios from "axios";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralStore from "../../../store/GeneralStore";
import CreateKonu from "./CreateKonu";
import UpdateKonular from "./UpdateKonular";

import { Button, Drawer, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useForm } from "antd/lib/form/Form";

const Subjects = () => {
  const [form] = useForm();
  const updatedDataNote = [{ key: "noteDescription", label: "Not" }];
  const updatedDataTest = [{ key: "name", label: "İsim" }];
  useEffect(() => {
    GeneralStore.getDersler();
    GeneralStore.getKonu();
    form.setFieldsValue({
      subjectID: GeneralStore.konu.subjectID,
      status: "", 
      deleted: "",
      name:"",

    });
  }, [GeneralStore.test_create]);

  return (
    <div>
      <h1>Konular</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.konu_create = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.konular && GeneralStore.konular.length > 0 && (
        <Table
          dataSource={GeneralStore.konular}
          rowKey={(d) => d.subjectID}
          columns={[
            { title: "ID", dataIndex: "subjectID" },
            { title: "Ismi", dataIndex: "name" },
            { title: "DersID", dataIndex: "lessonID" },
            {
              title: "Premium mu?",
              render: (d) => <div>{d.isPremium ? "Aktiv" : "Deaktiv"}</div>,
            },
            {
              title: "Silindi",
              render: (d) => <div>{d.deleted ? "Aktiv" : "Deaktiv"}</div>,
            },
            {
              title: "Statüs",
              render: (d) => <div>{d.status ? "Aktiv" : "Deaktiv"}</div>,
            },
            {
              title: "Güncelle",
              render: (d) => (
                <div>
                  <Button
                    onClick={() => {
                      runInAction(() => {
                        GeneralStore.konu = d;
                        GeneralStore.konu_update = !GeneralStore.konu_update;
                      });
                    }}
                    style={{ backgroundColor: "green", color: "#fff" }}
                  >
                    Güncelle
                  </Button>
                </div>
              ),
            },
            {
              title: "Sil",
              render: (d) => (
                <div>
                  <Popconfirm
                    title="Silmek istediğinizden emin misiniz?"
                    onConfirm={async () => {
                      await axios.delete(
                        `http://37.148.211.32:8080/api/subjects/delete?subjectID=${d.subjectID}`
                      );
                      GeneralStore.getKonu();
                      GeneralStore.getTestler();
                      GeneralStore.getNotlar();
                    }}
                  >
                    <Button style={{ backgroundColor: "red", color: "#fff" }}>
                      Sil
                    </Button>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          expandable={{
            expandedRowRender: (record) => {
              form.setFieldsValue({subjectID:record.subjectID})
              return (
                <div className="super_content" key={record.id}>
                  <Row>
                    <Col xs={6}>
                      <Image src={record?.pictureURL} />
                    </Col>
                    <Col xs={6}>
                      <div style={{ paddingLeft: "5px" }}>
                        <Link
                          to={(location) => ({
                            ...location,
                            pathname: "/notlar",
                          })}
                        >
                          <h2>Notlar</h2>
                          {record.notes &&
                            record.notes.map((d: any, i: number) => {
                              return (
                                <div key={i}>
                                  <Button style={{ width: "100%" }}>
                                    {d.noteID}: {d.name}
                                  </Button>
                                </div>
                              );
                            })}
                        </Link>
                      </div>
                    </Col>
                    <Col xs={12}>
                    <h2>Testler</h2>
                      <div style={{ paddingLeft: "5px" }}>
                      <Form onFinish={GeneralStore.postTest} form={form}>
                            <label htmlFor="subjectID">Konu</label>
                            <Form.Item name="subjectID">
                              <Input />
                            </Form.Item>
                            {updatedDataTest.map((d, i) => {
                              return (
                                <div key={i}>
                                  <label htmlFor={d.key}>{d.label}:</label>
                                  <Form.Item name={d.key}>
                                    <Input />
                                  </Form.Item>
                                </div>
                              );
                            })}
                            <label htmlFor="forIsClosedQuestions">
                              Kapalımı?
                            </label>
                            <Form.Item name="forIsClosedQuestions">
                              <Select>
                                <Option value="true">Kapalı</Option>
                                <Option value="false">Açık</Option>
                              </Select>
                            </Form.Item>
                            <label htmlFor="pictureURL">
                              Resim
                            </label>
                            <Form.Item name="pictureURL">
                              <Input
                                onChange={(e: any) =>
                                  runInAction(
                                    () =>
                                      (GeneralStore.image = e.target.files[0])
                                  )
                                }
                                type="file"
                              />
                            </Form.Item>

                            <Form.Item>
                              <Button htmlType="submit" type="primary">
                                Gonder
                              </Button>
                            </Form.Item>
                          </Form>
                        <Link
                          to={(location) => ({
                            ...location,
                            pathname: "/testler",
                          })}
                        >
                  
                          
                       
                          {record.tests &&
                            record.tests.map((d: any, i: number) => {
                              return (
                                <div key={i}>
                                  <Button style={{ width: "100%" }}>
                                    {d.testID}: {d.name}
                                  </Button>
                                </div>
                              );
                            })}
                        </Link>
                        
                          
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            },
            rowExpandable: (record) => record.id !== "Expandable",
          }}
        />
      )}
      <UpdateKonular />
      <CreateKonu />
    </div>
  );
};

export default observer(Subjects);
