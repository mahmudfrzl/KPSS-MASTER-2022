import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const { Option } = Select;

const UpdateCevap = () => {
  const [form] = useForm();
  const updatedData = [{ key: "answerSection", label: "Cevap" }];

  useEffect(() => {
    form.setFieldsValue({
      deleted: GeneralStore.cevap.deleted,
      correctNess: GeneralStore.cevap.correctNess,
      answerSection: GeneralStore.cevap.answerSection,
      questionID: GeneralStore.cevap.questionID,
      status: GeneralStore.cevap.status,
    });
  }, [GeneralStore.cevap_update]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.cevap_update = !GeneralStore.cevap_update)
          )
        }
        visible={GeneralStore.cevap_update}
      >
        <Form onFinish={GeneralStore.updateCevaplar} form={form}>
          <label htmlFor="questionID">Soru</label>
          <Form.Item name="questionID">
            <Select>
              {GeneralStore.sorular.map((d) => {
                return (
                  <Option value={d.answerID} key={d.questionID}>
                    {d.questionID} -{" "}
                    <div
                      style={{ width: 200 }}
                      suppressContentEditableWarning={true}
                      dangerouslySetInnerHTML={{ __html: d.description }}
                    ></div>
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
                    data={GeneralStore.cevap.answerSection}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(data);
                      return runInAction(
                        () => (GeneralStore.answerSection = data)
                      );
                    }}
                  />
                </Form.Item>
              </div>
            );
          })}
          <label htmlFor="correctNess">Durum</label>
          <Form.Item name="correctNess">
            <Select>
              <Option value="true">Doğru</Option>
              <Option value="false">Yanlış</Option>
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

export default observer(UpdateCevap);
