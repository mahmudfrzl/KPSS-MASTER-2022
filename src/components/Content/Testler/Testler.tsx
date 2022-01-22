import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateTest from "./UpdateTest";
import CreateTest from "./CreateTest";
import { Link } from "react-router-dom";
const Testler = () => {
  useEffect(() => {
    GeneralStore.getKonu();
    GeneralStore.getTestler();
  }, []);

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
                          {record.questions&&record.questions.map((d: any, i: number) => {
                            return (
                              <div key={i}>
                                <Button style={{ width: "100%" }}>
                                  {d.questionID}: {d.description}
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
      <CreateTest />
      <UpdateTest />
    </div>
  );
};

export default observer(Testler);
