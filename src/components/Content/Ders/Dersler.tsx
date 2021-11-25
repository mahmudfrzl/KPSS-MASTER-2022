import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateDersler from "./UpdateDersler";

const Dersler = () => {
  useEffect(() => {
    GeneralStore.getDersler();
  }, []);
  console.log(toJS(GeneralStore.type));
  return (
    <div>
      <h1>Dersler</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.ders_update = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.dersler && GeneralStore.dersler.length > 0 && (
        <Table
          dataSource={GeneralStore.dersler}
          rowKey={(d) => d}
          columns={[
            { title: "ID", dataIndex: "lessonID" },

            { title: "İsim", dataIndex: "name" },
            { title: "Hakkında", dataIndex: "description" },
            {
              title: "Silindi",
              render: (d) => <div>{d.deleted.toString()}</div>,
            },
            {
              title: "Statüs",
              render: (d) => <div>{d.status.toString()}</div>,
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
                        `http://localhost:8080/api/lessons/delete?lessonID=${d.lessonID}`
                      );
                      GeneralStore.getDersler();
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
                    <Col xs={12}>
                      <Image src={record.pictureURL} />
                    </Col>
                    <Col xs={12}>
                      {record.subjects.map((d: any) => {
                        return (
                          <div key={d.subjectID}>
                            {" "}
                            <Button style={{ width: "100%" }}>
                              {d.subjectID}: {d.name}
                            </Button>{" "}
                          </div>
                        );
                      })}
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
    </div>
  );
};

export default observer(Dersler);
