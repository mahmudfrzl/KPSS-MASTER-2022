import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;

const CreateDers = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "description", label: "Hakkinda" },
    { key: "name", label: "İsim" },
  ];
                         //form UserForm istifade ele fieldsValue set zad
  useEffect(() => {
    form.setFieldsValue({
      lessonID: "",
      name: "",
    });
  }, [GeneralStore.ders_create]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Olusturma"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.ders_create = !GeneralStore.ders_create)
          )
        }
        visible={GeneralStore.ders_create}
      > 
        <Form onFinish={GeneralStore.postDers} form={form}>
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

export default observer(CreateDers);
