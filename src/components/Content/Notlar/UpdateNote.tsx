import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;
const UpdateNote = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "noteDescription", label: "Not" }
  ];

  useEffect(() => {
    form.setFieldsValue({
      deleted: GeneralStore.not.deleted,
      subjectID: GeneralStore.not.subjectID,
      noteDescription: GeneralStore.not.noteDescription,
      status: GeneralStore.not.status,
    });
  }, [GeneralStore.note_update]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.note_update = !GeneralStore.note_update)
          )
        }
        visible={GeneralStore.note_update}
      >
        <Form onFinish={GeneralStore.updateNot} form={form}>
        <label htmlFor="subjectID">Konu</label>
        <Form.Item name='subjectID'>
            <Select>
              {GeneralStore.konular.map(d=>{
              return <Option value={d.noteID} key={d.subjectID}>{d.subjectID} - {d.name}</Option>
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

export default observer(UpdateNote);
