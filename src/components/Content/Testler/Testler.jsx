import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image,  Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateTest from "./UpdateTest";
import CreateTest from "./CreateTest";
import { Button, Drawer, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { Option } from "antd/lib/mentions";
import { useForm } from "antd/lib/form/Form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const Testler = () => {
  const [form] = useForm();
  const img_num = 0;
  const updatedData = [{ key: "description", label: "Soru Başlığı" }];
  useEffect(() => {
    GeneralStore.getKonu();
    GeneralStore.getTestler();
  },  [GeneralStore.create_soru]);

  return (
    <div>
      <h1>Testler</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.test_create = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.testler && GeneralStore.testler.length > 0 && (
        <Table
          dataSource={GeneralStore.testler}
          rowKey={(d) => d.testID}
          columns={[
            { title: "ID", dataIndex: "testID" },

            { title: "İsim", dataIndex: "name" },

            { title: "KonuID", dataIndex: "subjectID" },

            {
              title: "Silindi",
              render: (d) => <div>{d.deleted ? "Aktiv" : "Deaktiv"}</div>,
            },
            {
              title: "Kapalı mı?",
              render: (d) => (
                <div>{d.forIsClosedQuestions ? "Kapalı" : "Açık"}</div>
              ),
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
                        GeneralStore.test = d;
                        GeneralStore.test_update = !GeneralStore.test_update;
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
                        `http://37.148.211.32:8080/api/test/delete?testID=${d.testID}`
                      );
                      GeneralStore.getTestler();
                      GeneralStore.getSorular();
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
              return (
                <div className="super_content" key={record.id}>
                  <Row>
                    <Col xs={8}>
                      <Image src={record?.pictureURL} />
                    </Col>

                    <Col xs={16}>
                      <div style={{ paddingLeft: "5px" }}>
                        <Link
                          to={(location) => ({
                            ...location,
                            pathname: "/sorular",
                          })}
                        >
                          <h2>Sorular</h2>
                          {record.questions &&
                            record.questions.map((d, i) => {
                              return (
                                <div key={i}>
                                  <Button style={{ width: "100%" }}>
                                    {d.questionID}: {d.description}
                                  </Button>
                                </div>
                              );
                            })}
                        </Link>
                        <Form onFinish={GeneralStore.postSorular} form={form}>
                          <label htmlFor="testID">Test</label>
                          <Form.Item name="testID">
                            <Input/>
                          </Form.Item>
                          {updatedData.map((d, i) => {
                            return (
                              <div key={i}>
                                <label htmlFor={d.key}>{d.label}:</label>
                                <Form.Item name={d.key}>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      // const setData = <div contentEditable='true' setInnerHTML={{_html:data}}></div>;
                                      console.log(data);
                                      console.log(editor);
                                      runInAction(
                                        () => (GeneralStore.description = data)
                                      );
                                    }}
                                    // onChange={(event, editor) => {
                                    //   const data = editor.getData();
                                    //   setDescription(data);
                                    // }}
                                  />
                                </Form.Item>
                              </div>
                            );
                          })}
                          <label htmlFor="isClosed">Kapalı</label>
                          <Form.Item name="isClosed">
                            <Select>
                              <Option value="true">Kapalı</Option>
                              <Option value="false">Açık</Option>
                            </Select>
                          </Form.Item>
                          <label htmlFor="image_question">Resim yukle:</label>
                          <Form.Item name="pictureURL">
                            <Input
                              onChange={(e) =>
                                
                                runInAction(
                                  () =>
                                    (GeneralStore.image_question = e.target.files[GeneralStore.img_question_id],GeneralStore.img_question_id++)
                                    
                                )
                              }
                              type="file"
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              id="submit"
                              htmlType="submit"
                              type="primary"
                            >
                              Gonder
                            </Button>
                          </Form.Item>
                        </Form> 
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
      <CreateTest />
      <UpdateTest />
    </div>
  );
};

export default observer(Testler);
