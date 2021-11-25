import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import GeneralStore from "../../../store/GeneralStore";
import { Table, Image, Button, Row, Col, Popconfirm } from "antd";
import axios from "axios";
import UpdateCevap from "./UpdateCevap";

const Cevaplar = () => {
  useEffect(() => {
    GeneralStore.getCevaplar();
  }, []);
  console.log(toJS(GeneralStore.type));
  return (
    <div>
      <h1>Cevaplar</h1>
      <div style={{ float: "right", marginBottom: 10, marginRight: 10 }}>
        <Button
          onClick={() =>
            runInAction(() => {
              GeneralStore.cevap_update = true;
            })
          }
        >
          Ekle &nbsp;&nbsp; <i className="fas fa-plus"></i>{" "}
        </Button>
      </div>
      {GeneralStore.cevaplar && GeneralStore.cevaplar.length > 0 && (
        <Table
          dataSource={GeneralStore.cevaplar}
          rowKey={(d) => d}
          columns={[
            { title: "ID", dataIndex: "answerID" },

            { title: "Cevap", dataIndex: "answerSection" },
            { title: "SoruID", dataIndex: "questionID" },
            {
                title: "Durum",
                render: (d) => <div>{d.correctNess.toString()}</div>,
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
                        GeneralStore.cevap = d;
                        GeneralStore.cevap_update = !GeneralStore.cevap_update;
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
                        `http://localhost:8080/api/answers/delete?answerID=${d.answerID}`
                      );
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
        //   expandable={{
        //     expandedRowRender: (record) => {
        //       return (
        //         <div className="super_content" key={record.id}>
        //           <Row>
        //             <Col xs={12}>
        //               <Image src={record.pictureURL} />
        //             </Col>
        //             <Col xs={12}>
        //               {record.subjects.map((d ) => {
        //                 return (
        //                   <div key={d.subjectID}>
        //                     {" "}
        //                     <Button style={{ width: "100%" }}>
        //                       {d.subjectID}: {d.name}
        //                     </Button>{" "}
        //                   </div>
        //                 );
        //               })}
        //             </Col>
        //           </Row>
        //         </div>
        //       );
        //     },
        //     rowExpandable: (record) => record.id !== "Expandable",
        //   }}
        />
      )}
      <UpdateCevap/>
    </div>
  );
};

export default observer(Cevaplar);
