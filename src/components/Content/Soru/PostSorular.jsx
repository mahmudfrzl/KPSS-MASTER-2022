import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ReactHtmlParser from 'react-html-parser';
const { Option } = Select;

const PostSorular = () => {
  const [form] = useForm();
  const updatedData = [{ key: "description", label: "Soru Başlığı" }];
  const [description, setDescription] = useState({});
  

  console.log(description);
  useEffect(() => {
    form.setFieldsValue({
      deleted: GeneralStore.soru.deleted,
      testID: GeneralStore.soru.testID,
      isClosed: GeneralStore.soru.isClosed,
      status: GeneralStore.soru.status,
    });
  }, [GeneralStore.create_soru]);
  return (
    <div>
      <Drawer
        width={window.innerWidth / 3}
        title={"Güncelleme"}
        placement="right"
        onClose={() =>
          runInAction(
            () => (GeneralStore.create_soru = !GeneralStore.create_soru)
          )
        }
        visible={GeneralStore.create_soru}
      >
        <Form onFinish={GeneralStore.postSorular} form={form}>
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
                    editor={ClassicEditor}

                    onChange={(event, editor) => {
                      const data = editor.getData();
                      // const setData = <div dangerouslySetInnerHTML={{__html:data}}></div>;
                      // <div dangerouslySetInnerHTML={{ __html: data }} />
                      console.log(ReactHtmlParser("<div>HTML strings</div>"));
                      console.log(ReactHtmlParser(data));
                      console.log(data);
                      console.log(editor);
                      return runInAction(() => (GeneralStore.description =data ));
                      
                      
                    }}
                    // onChange={(event, editor) => {
                    //   const data = editor.getData();
                    //   setDescription(data);
                    // }}
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
          <label htmlFor="image_question">Resim yukle:</label>
          <Form.Item name="pictureURL">
            <Input
              onChange={(e) =>
                runInAction(
                  () => (GeneralStore.image_question = e.target.files[0])
                )
              }
              type="file"
            />
          </Form.Item>
          <Form.Item>
            <Button id="submit" htmlType="submit" type="primary">
              Gonder
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default observer(PostSorular);
