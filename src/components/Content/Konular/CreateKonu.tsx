import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;
const UpdateKonular = () => {
  const [form] = useForm();
  const updatedData = [{ key: "name", label: "İsim" }];

  useEffect(() => {
    form.setFieldsValue({
      deleted: "",
      lessonID: "",
      name: "",
      status: "",
      isPremium:""
    });
  }, [GeneralStore.konu_create]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Olusturma"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.konu_create = !GeneralStore.konu_create)
          )
        }
        visible={GeneralStore.konu_create}
      >
        <Form onFinish={GeneralStore.postKonu} form={form}>
          <label htmlFor="lessonID">Ders</label>
          <Form.Item name="lessonID">
            <Select>
              {GeneralStore.dersler.map((d) => {
                return (
                  <Option value={d.subjectID} key={d.lessonID}>
                    {d.lessonID} - {d.name}
                  </Option>
                );
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
          <label htmlFor="isPremium">Premium mu?</label>
          <Form.Item name="isPremium">
            <Select>
              <Option value="true">Aktiv</Option>
              <Option value="false">Deaktiv</Option>
            </Select>
          </Form.Item>
          <label htmlFor="image">Resim yukle:</label>
          <Form.Item name="pictureURL">
            <Input
              onChange={(e: any) =>
                runInAction(() => (GeneralStore.image = e.target.files[0]))
              }
              type="file"
            />
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

export default observer(UpdateKonular);
