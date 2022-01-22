import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateDersler from "./UpdateDersler";
import CreateDers from "./CreateDers";
import { Link } from "react-router-dom";

const Dersler = () => {
  useEffect(() => {
    GeneralStore.getDersler();
  }, []);
  return (
    <div>
      <h1>Dersler</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.ders_create = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.dersler && GeneralStore.dersler.length > 0 && (
        <Table
          dataSource={GeneralStore.dersler}
          rowKey={(d) => d.lessonID}
          columns={[
            { title: "ID", dataIndex: "lessonID" },

            { title: "İsim", dataIndex: "name" },
            { title: "Hakkında", dataIndex: "description" },
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
                        GeneralStore.ders = d;
                        GeneralStore.ders_update = !GeneralStore.ders_update;
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
                        `http://37.148.211.32:8080/api/lessons/delete?lessonID=${d.lessonID}`
                      );
                      GeneralStore.getDersler();
                      GeneralStore.getKonu();
                      GeneralStore.getTestler();
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
                  <Row >
                    <Col style={{paddingBottom:5}} xs={8}>
                      <Image src={record.pictureURL} />
                    </Col>
                    <Col xs={16}>
                      <div style={{ paddingLeft: "5px" }}>
                        <h2>Konular</h2>
                        {record.subjects.map((d: any) => {
                          return (
                            <div key={d.subjectID}>
                              <Link
                                to={(location) => ({
                                  ...location,
                                  pathname: "/konular",
                                })}
                              >{" "}
                              <Button style={{ width: "100%" }}>
                                {d.subjectID}: {d.name}
                              </Button>{" "}
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
      <UpdateDersler />
      <CreateDers />
    </div>
  );
};

export default observer(Dersler);
