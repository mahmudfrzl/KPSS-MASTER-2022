import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm, Select } from "antd";
import axios from "axios";
import UpdateNote from "./UpdateNote";
import CreateNote from "./CreateNote";
const Note = () => {
  useEffect(() => {
    GeneralStore.getKonu();
    GeneralStore.getNotlar();
  }, []);
  return (
    <div>
      <h1>Notlar</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.create_note = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.notlar && GeneralStore.notlar.length > 0 && (
        <Table
          dataSource={GeneralStore.notlar}
          rowKey={(d) => d.noteID}
          columns={[
            { title: "ID", dataIndex: "noteID" },

            {
              title: "Not",
              render: (d) => (
                <div
                  style={{ width: 400 }}
                  suppressContentEditableWarning={true}
                  dangerouslySetInnerHTML={{ __html: d.noteDescription }}
                ></div>
              ),
            },
            { title: "KonuID", dataIndex: "subjectID" },
            {
              title: "Şekilli",
              render: (d) => <div>{d.hasPicture ? "Şekilli" : "Şekilsiz"}</div>,
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
                        GeneralStore.not = d;
                        GeneralStore.note_update = !GeneralStore.note_update;
                      });
                      console.log(toJS(d));
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
                        `http://37.148.211.32:8080/api/notes/delete?noteID=${d.noteID}`
                      );
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
                    <Col xs={12}>
                      {record?.pictures &&
                        record?.pictures.map((d: any) => {
                          return <Image key={d?.pictureID} src={d?.url} />;
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
      <UpdateNote />
      <CreateNote />
    </div>
  );
};

export default observer(Note);
