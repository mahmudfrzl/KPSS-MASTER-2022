import React, { useEffect, useState } from "react";
import { Button, Drawer, Image, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction, toJS } from "mobx";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const { Option } = Select;

const UpdateQuestion = () => {
  const [form] = useForm();
  const updatedData = [{ key: "description", label: "Soru Başlığı" }];
  const [description, setDescription] = useState({});

  useEffect(() => {
    form.setFieldsValue({
      deleted: GeneralStore.soru.deleted,
      testID: GeneralStore.soru.testID,
      isClosed: GeneralStore.soru.isClosed,
      status: GeneralStore.soru.status,
    });
  }, [GeneralStore.question_update]);
  console.log(toJS(GeneralStore.soru.pictures));
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
          <label htmlFor="testID">Test</label>
          <Form.Item name="testID">
            <Select>
              {GeneralStore.testler.map((d) => {
                return (
                  <Option value={d.questionID} key={d.testID}>
                    {d.testID} - {d.name}
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
                    data={GeneralStore.soru.description}
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      return runInAction(
                        () => (GeneralStore.description = data)
                      );
                    }}
                  />
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
          <label htmlFor="">Guncellenecek resim:</label>
          <Form.Item name="pictureURL">
            <Select>
              {GeneralStore.soru.pictures &&
              GeneralStore.soru.pictures.length > 0 ? (
                GeneralStore.soru.pictures.map((a) => {
                  return (
                    <Select.Option value={a.pictureID}>
                      <div
                        onClick={() =>
                          runInAction(
                            () => (GeneralStore.img_question_id = a.pictureID)
                          )
                        }
                      >
                        <Image preview={false} src={a.url} /> <br />
                        <Input
                          onChange={(e) => {
                            runInAction(
                              () =>
                                (GeneralStore.image_question =
                                  e.target.files[0])
                            );
                          }}
                          type="file"
                        />
                      </div>
                    </Select.Option>
                  );
                })
              ) : (
                <Select.Option value={1}>
                  <div>
                    <label htmlFor="image_question">Resim guncelle:</label>
                    <Input
                      onChange={async (e) => {
                        const url = `http://37.148.211.32:8080/api/pictures/upload-photo-question?questionID=${GeneralStore.soru.questionID}`;
                        const fd = new FormData();
                        fd.append("pictureURL", e.target.files[0]);
                        await axios.post(url, fd);
                        GeneralStore.getSorular();
                        runInAction(() => {});
                      }}
                      type="file"
                    />
                  </div>
                </Select.Option>
              )}
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
