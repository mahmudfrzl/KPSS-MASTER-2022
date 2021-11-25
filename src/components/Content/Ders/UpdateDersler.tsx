import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;

const UpdateDersler = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "description", label: "Hakkında" },
    { key: "name", label: "İsim" }
  ];

  useEffect(() => {

      form.setFieldsValue({
        deleted: GeneralStore.ders.deleted,
        description: GeneralStore.ders.description,
        name: GeneralStore.ders.name,
        status: GeneralStore.ders.status,
      });

  }, [GeneralStore.ders_update]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() => ( runInAction(()=>GeneralStore.ders_update = !GeneralStore.ders_update) )}
        visible={GeneralStore.ders_update}
      >
        <Form onFinish={GeneralStore.updateDers} form={form}>
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

export default observer(UpdateDersler);
