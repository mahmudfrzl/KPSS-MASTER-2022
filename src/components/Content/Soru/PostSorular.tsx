import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;


const PostSorular = () => {
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
    });
  }, [GeneralStore.create_soru]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.create_soru = !GeneralStore.create_soru)
          )
        }
        visible={GeneralStore.create_soru}
      >
        <Form onFinish={GeneralStore.postSorular} form={form}>
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
          <label htmlFor="image_question">Resim yukle:</label>
            <Form.Item name='pictureURL'>
              <Input onChange={(e:any)=>runInAction(()=>GeneralStore.image_question=e.target.files[0])} type='file' />
            </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Gonder
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default observer(PostSorular);
