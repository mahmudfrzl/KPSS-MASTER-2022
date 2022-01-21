import { Col, Popconfirm, Row, Table, Image } from "antd";
import { Button } from "antd/lib/radio";
import axios from "axios";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralStore from "../../../store/GeneralStore";
import CreateKonu from "./CreateKonu";
import UpdateKonular from "./UpdateKonular";

const Subjects = () => {
  useEffect(() => {
    GeneralStore.getDersler();
    GeneralStore.getKonu();
  }, []);

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
                          {record.notes.map((d: any, i: number) => {
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
                      {/* <hr /> */}
                    </Col>
                    <Col xs={12}>
                      <div style={{ paddingLeft: "5px" }}>
                        <Link
                          to={(location) => ({
                            ...location,
                            pathname: "/testler",
                          })}
                        >
                          <h2>Testler</h2>
                          {record.tests.map((d: any, i: number) => {
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
