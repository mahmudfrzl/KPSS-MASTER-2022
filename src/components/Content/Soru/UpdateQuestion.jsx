import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;
const UpdateQuestion = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "testID", label: "TestID" },
    { key: "description", label: "Soru Başlığı" }

];

  useEffect(() => {
    form.setFieldsValue({
      deleted: GeneralStore.soru.deleted,
      testID: GeneralStore.soru.testID,
      isClosed: GeneralStore.soru.isClosed,
      status: GeneralStore.soru.status,
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
              <Option value="true">true</Option>
              <Option value="false">false</Option>
            </Select>
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

export default observer(UpdateQuestion);
