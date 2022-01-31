import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const { Option } = Select;

const CreateNote = () => {
  const [form] = useForm();
  const updatedData = [
    { key: "noteDescription", label: "Not" }
  ]; 

  useEffect(() => {
    form.setFieldsValue({
      subjectID: GeneralStore.not.subjectID,
      noteDescription: GeneralStore.not.noteDescription,
      hasPicture:GeneralStore.not.hasPicture
    });
  }, [GeneralStore.create_note]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Ekle"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.create_note = !GeneralStore.create_note)
          )
        }
        visible={GeneralStore.create_note}
      >
        <Form onFinish={GeneralStore.postNote} form={form}>
          <label htmlFor="subjectID">Konu</label>
          <Form.Item name="subjectID">
            <Select>
              {GeneralStore.konular.map((d) => {
                return (
                  <Option value={d.noteID} key={d.subjectID}>
                    {d.subjectID} - {d.name}
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
              
                  <CKEditor
                    editor={ClassicEditor}

                    onChange={(event, editor) => {
                      const data = editor.getData();
                      return runInAction(() => (GeneralStore.noteDescription =data ));
                    }} 

                  />
                </Form.Item>
              </div>
            );
          })}
          <label htmlFor="hasPicture">Resimlimi?</label>
          <Form.Item name="hasPicture">
            <Select>
              <Option value="true">Resimli</Option>
              <Option value="false">Resimsiz</Option>
            </Select>
          </Form.Item>
          <label htmlFor="image">Resim yukle:</label>
            <Form.Item name='pictureURL'>
              <Input onChange={(e)=>runInAction(()=>GeneralStore.image_note=e.target.files[0])} type='file' />
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

export default observer(CreateNote);
