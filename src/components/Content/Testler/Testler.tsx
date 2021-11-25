import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateTest from "./UpdateTest";
const Testler = () => {
  useEffect(() => {
    GeneralStore.getTestler();
    
  }, []);
  console.log(toJS(GeneralStore.testler));
  return (
    <div>
      <h1>Testler</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.type = false;
              GeneralStore.test_update = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.testler && GeneralStore.testler.length > 0 && (
        
        <Table 
          dataSource={GeneralStore.testler}
          rowKey={(d) => d}
          columns={[
            { title: "ID", dataIndex: "testID" },

            { title: "İsim", dataIndex: "name" },

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
                          GeneralStore.test=d
                          GeneralStore.test_update=!GeneralStore.test_update
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
                        await axios.delete(`http://localhost:8080/api/test/delete?testID=${d.testID}`)
                        GeneralStore.getTestler()
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
                      {record.questions.map((d: any) => {
                        return (
                          <div key={d.questionID}>
                            {" "}
                            <Button style={{ width: "100%" }}>
                              {d.questionID}
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
      <UpdateTest/>
    </div>
  );
};

export default observer(Testler);
