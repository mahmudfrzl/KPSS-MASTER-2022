import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;
const UpdateKonular = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "name", label: "İsim" },
  ];

  useEffect(() => {

      form.setFieldsValue({
        deleted: GeneralStore.test.deleted,
        subjectID: GeneralStore.test.subjectID,
        name: GeneralStore.test.name,
        testID: GeneralStore.test.testID,
      });

    
  }, [GeneralStore.test_update]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Gencelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.test_update = !GeneralStore.test_update)
          )
        }
        visible={GeneralStore.test_update}
      >
        <Form onFinish={GeneralStore.updateTest} form={form}>
        <label htmlFor="subjectID">Konu</label>
        <Form.Item name='subjectID'>
            <Select>
              {GeneralStore.konular.map(d=>{
              return <Option value={d.testID} key={d.subjectID}>{d.subjectID} - {d.name}</Option>
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
          <label htmlFor="image">Resim yukle:</label>
            <Form.Item name='pictureURL'>
              <Input onChange={(e:any)=>runInAction(()=>GeneralStore.image=e.target.files[0])} type='file' />
            </Form.Item>
          <label htmlFor="status">Status</label>
          <Form.Item name="status">
            <Select>
              <Option value="true">true</Option>
              <Option value="false">false</Option>
            </Select>
          </Form.Item>
          <label htmlFor="deleted">Silindi</label>
          <Form.Item name="deleted">
            <Select>
              <Option value="true">true</Option>
              <Option value="false">false</Option>
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

export default observer(UpdateKonular);
