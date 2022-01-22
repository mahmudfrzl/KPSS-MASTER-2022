import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Image, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
const { Option } = Select;
const UpdateKonular = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "name", label: "İsim" }
  ];

  useEffect(() => {

      form.setFieldsValue({
        deleted: GeneralStore.konu.deleted,
        lessonID: GeneralStore.konu.lessonID,
        name: GeneralStore.konu.name,
        status: GeneralStore.konu.status,
        isPremium:GeneralStore.konu.isPremium
      });

    
  }, [GeneralStore.konu_update]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.konu_update = !GeneralStore.konu_update)
          )
        }
        visible={GeneralStore.konu_update}
      >
        <Form onFinish={GeneralStore.updateKonu} form={form}>
        <label htmlFor="lessonID">Ders</label>
        <Form.Item name='lessonID'>
            <Select>
            {GeneralStore.dersler.map(d=>{
              return <Option value={d.subjectID} key={d.lessonID}>{d.lessonID} - {d.name}</Option>
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
            <Image style={{width:200,height:200,objectFit:"contain"}} src={GeneralStore.konu.pictureURL} alt="" />
              <Input onChange={(e:any)=>runInAction(()=>GeneralStore.image=e.target.files[0])} type='file' />
            </Form.Item>
            <label htmlFor="isPremium">Premium mu?</label>
          <Form.Item name="isPremium">
            <Select>
              <Option value="true">Aktiv</Option>
              <Option value="false">Deaktiv</Option>
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
