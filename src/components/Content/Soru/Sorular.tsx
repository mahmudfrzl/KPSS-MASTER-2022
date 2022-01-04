import { Col, Popconfirm, Row, Table, Image } from "antd";
import { Button } from "antd/lib/radio";
import axios from "axios";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import PostSorular from "./PostSorular";
import UpdateQuestion from "./UpdateQuestion";


const Sorular = () => {

  useEffect(() => {
    GeneralStore.getSorular();
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
            { title: "Soru Başlığı", dataIndex: "description" },
            {
                title: "Kapalı",
                render: (d) => <div>{d.isClosed.toString()}</div>,
              },
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
                        GeneralStore.soru = d;
                        GeneralStore.question_update = !GeneralStore.question_update;
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
                        `http://localhost:8080/api/questions/delete?questionID=${d.questionID}`
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
              return (
                <div className="super_content" key={record.id}>
                  <Row>
                  <Col xs={24}>
                    {record?.pictures&&record?.pictures.map((d:any)=>{
                        return <Image key={d?.pictureID} src={d?.url} />
                    })}    

                    </Col>
                    {/* <Col xs={12}>
                      <h2>Cevaplar</h2>
                      {record.answers.map((d:any, i:number) => {
                        return (
                          <div key={i}>
                            <Button style={{ width: "100%" }}>
                              {d.answerID}: {d.correctNess ===true ? "true" :"false"}
                            </Button>
                          </div>
                        );
                      })}
                      <hr />
                    </Col> */}
                  </Row>
                </div>
              );
            },
            rowExpandable: (record) => record.id !== "Expandable",
          }}
        />
      )}
      <UpdateQuestion/>
      <PostSorular/>
    </div>
  );
};

export default observer(Sorular);
