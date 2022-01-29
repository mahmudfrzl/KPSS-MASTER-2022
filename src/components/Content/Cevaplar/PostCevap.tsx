import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;

const PostCevaplar = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "answerSection", label: "Cevap" },
  ];

  useEffect(() => {
    form.setFieldsValue({
      correctNess: GeneralStore.cevap.correctNess,
      answerSection: GeneralStore.cevap.answerSection,
      questionID: GeneralStore.cevap.questionID,
      isClosed: GeneralStore.cevap.isClosed,
    
    });
  }, [GeneralStore.cevap_create]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Ekle"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.cevap_create = !GeneralStore.cevap_create)
          )
        }
        visible={GeneralStore.cevap_create}
      >
        <div style={{textAlign: "center"}}>
        <label style={{fontSize: 20}}>Kapalı Soru</label>
        </div>
        <Form onFinish={ GeneralStore.postCevap} form={form}>
        <label htmlFor="questionID">Soru</label>
        <Form.Item name='questionID'>
            <Select>
            {GeneralStore.sorular.map(d=>{
              return <Option value={d.answerID} key={d.questionID}>{d.questionID} - {d.description}</Option>
            })}

            </Select>
          </Form.Item>
          {updatedData.map((d, i) => {
            return (
              <div key={i}>
                <label htmlFor={d.key}>{d.label}:</label>
                <Form.Item name={d.key}>
                  <Input />
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

      </Drawer>
    </div>
  );
};

export default observer(PostCevaplar);
