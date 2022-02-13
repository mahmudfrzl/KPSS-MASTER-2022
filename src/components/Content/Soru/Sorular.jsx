import { Col, Popconfirm, Row, Table, Image, Button } from "antd";
import axios from "axios";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralStore from "../../../store/GeneralStore";
import PostSorular from "./PostSorular";
import UpdateQuestion from "./UpdateQuestion";
import { Drawer, Form, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useForm } from "antd/lib/form/Form";
import PostCevap from "../Cevaplar/PostCevap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const Sorular = () => {
  const [form] = useForm();
  const updatedData = [{ key: "answerSection", label: "Cevap" }];

  useEffect(() => {
    form.setFieldsValue({
      correctNess: "",
      answerSection: "",
      questionID: GeneralStore.cevap.questionID,
      isClosed: "",
    });
    GeneralStore.getTestler();
    GeneralStore.getSorular();
    GeneralStore.getCevaplar();
  }, []);

  return (
    <div>
      <h1>Sorular</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.create_soru = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.sorular && GeneralStore.sorular.length > 0 && (
        <Table
          dataSource={GeneralStore.sorular}
          rowKey={(d) => d.questionID}
          columns={[
            { title: "ID", dataIndex: "questionID" },
            { title: "TestID", dataIndex: "testID" },
            {
              title: "Soru Başlığı",
              render: (d) => (
                <div
                  style={{ width: 300 }}
                  suppressContentEditableWarning={true}
                  dangerouslySetInnerHTML={{ __html: d.description }}
                ></div>
              ),
            },
            {
              title: "Kapalı",
              render: (d) => <div>{d.isClosed ? "Kapalı" : "Açık"}</div>,
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
                        GeneralStore.soru = d;
                        GeneralStore.question_update =
                          !GeneralStore.question_update;
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
                        `http://37.148.211.32:8080/api/questions/delete?questionID=${d.questionID}`
                      );
                      GeneralStore.getSorular();
                      GeneralStore.getCevaplar();
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
              form.setFieldsValue({ questionID: record.questionID }); 
              return (
                <div className="super_content" key={record.id}>
                  <Row>
                    <Col xs={8}>
                      {record?.pictures &&
                        record?.pictures.map((d) => {
                          return <Image key={d?.pictureID} src={d?.url} />;
                        })}
                    </Col>
                    <Col xs={16}>
                      <div style={{ paddingLeft: "5px" }}>
                        <h2>Cevaplar</h2>
                        {record.answers && record.answers.length >= 5 ? (
                          ""
                        ) : (
                          <Form onFinish={GeneralStore.postCevap} form={form}>
                            <label htmlFor="questionID">Soru ID</label>

                            <Form.Item name="questionID" key={record.id}>
                              <Input />
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
                                        console.log(data);
                                        return runInAction(
                                          () =>
                                            (GeneralStore.answerSection = data)
                                        );
                                      }}
                                    />
                                  </Form.Item>
                                </div>
                              );
                            })}
                            <label htmlFor="correctNess">Durum</label>
                            <Form.Item name="correctNess">
                              <Select>
                                <Option value="true">Doğru</Option>
                                <Option value="false">Yanlış</Option>
                              </Select>
                            </Form.Item>
                            <label htmlFor="isClosed">Kapalımı</label>
                            <Form.Item name="isClosed">
                              <Select>
                                <Option value="true">Kapalı</Option>
                                <Option value="false">Açık</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item>
                              <Button htmlType="submit" type="primary">
                                Ekle
                              </Button>
                            </Form.Item>
                          </Form>
                        )}
                        {record.answers &&
                          record.answers.map((d, i) => {
                            return (
                              <div key={i}>
                                <Link
                                  to={(location) => ({
                                    ...location,
                                    pathname: "/cevaplar",
                                  })}
                                >
                                  <Button
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      whiteSpace: "normal",
                                    }}
                                  >
                                    <div
                                      suppressContentEditableWarning={true}
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          d.answerID +
                                          ":" +
                                          d.answerSection +
                                          ":" +
                                          (d.correctNess === true
                                            ? "Doğru"
                                            : "Yanlış"),
                                      }}
                                    ></div>
                                    {/* {d.answerID}: {d.answerSection} -{" "}
                                    {d.correctNess === true ? "true" : "false"} */}
                                  </Button>
                                </Link>
                              </div>
                            );
                          })}
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
      <UpdateQuestion />
      <PostSorular />
      <PostCevap />
    </div>
  );
};

export default observer(Sorular);
