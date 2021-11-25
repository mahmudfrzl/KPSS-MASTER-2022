import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateNote from "./UpdateNote";
const Note = () => {
  useEffect(() => {
    GeneralStore.getNotlar();
  }, []);
  console.log(toJS(GeneralStore.type));
  return (
    <div>
      <h1>Notlar</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.note_update = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.notlar && GeneralStore.notlar.length > 0 && (
        
        <Table 
          dataSource={GeneralStore.notlar}
          rowKey={(d) => d}
          columns={[
            { title: "ID", dataIndex: "noteID" },

            { title: "Not", dataIndex: "noteDescription" },
            { title: "KonuID", dataIndex: "subjectID" },
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
                  <Button onClick={()=>{
                      runInAction(()=>
                      {
                          GeneralStore.not=d
                          GeneralStore.note_update=!GeneralStore.note_update
                        }
                      )
                 
                 }} style={{ backgroundColor: "green", color: "#fff" }}>
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
                    onConfirm={async()=>{
                        await axios.delete(`http://localhost:8080/api/notes/delete?noteID=${d.noteID}`)
                        GeneralStore.getNotlar()
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
                    <Col xs={24}>
                    {record.pictures.map(d=>{
                        return <Image key={d.pictureID} src={d.url} />
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
      <UpdateNote/>
    </div>
  );
};

export default observer(Note);
