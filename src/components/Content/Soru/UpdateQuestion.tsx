import React, { useEffect, useState } from "react";
import { Button, Drawer,Image, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;


const UpdateQuestion = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "description", label: "Soru Başlığı" }

];

  useEffect(() => {
    form.setFieldsValue({
      deleted: GeneralStore.soru.deleted,
      testID: GeneralStore.soru.testID,
      isClosed: GeneralStore.soru.isClosed,
      status: GeneralStore.soru.status,
      description: GeneralStore.soru.description,
    });
  }, [GeneralStore.question_update]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.question_update = !GeneralStore.question_update)
          )
        }
        visible={GeneralStore.question_update}
      >
        <Form onFinish={GeneralStore.updateSorular} form={form}>
        <label htmlFor="testID">Test</label>
        <Form.Item name='testID'>
            <Select>
              {GeneralStore.testler.map(d=>{
              return <Option value={d.questionID} key={d.testID}>{d.testID} - {d.name}</Option>
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
          <label htmlFor="isClosed">Kapalı</label>
          <Form.Item name="isClosed">
            <Select>
              <Option value="true">Kapalı</Option>
              <Option value="false">Açık</Option>
            </Select>
          </Form.Item>
          <label htmlFor="status">Status</label>
          <Form.Item name="status">
            <Select>
              <Option value="true">Aktiv</Option>
              <Option value="false">Deaktiv</Option>
            </Select>
          </Form.Item>
          <label htmlFor="deleted">Silindi</label>
          <Form.Item name="deleted">
            <Select>
              <Option value="true">Aktiv</Option>
              <Option value="false">Deaktiv </Option>
            </Select>
          </Form.Item>
          <label htmlFor="">Guncellenecek resim:</label>
          <Form.Item name="pictureURL">
            <Select>
              {
                GeneralStore.soru.pictures && 
                GeneralStore.soru.pictures.map((a:any)=>{
                  return (
                    <Select.Option value={a.pictureID}>
                        <div onClick={()=> runInAction(() =>(
                          GeneralStore.img_question_id = a.pictureID
                        ))}>
                        <Image
                          preview={false}
                          src={a.url}
                        /> <br />
                        <label htmlFor="image_question">Resim yukle:</label>
                        <Input
                          onChange={(e: any) =>
                            runInAction(
                              () => (GeneralStore.image_question = e.target.files[0])
                            )
                          }
                          type="file"
                        />
                      </div>
                    </Select.Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Guncelle
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default observer(UpdateQuestion);
