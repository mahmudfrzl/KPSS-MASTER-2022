import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Image, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
import axios from "axios";
const { Option } = Select;
const UpdateNote = () => {
  const [form] = useForm();
  const updatedData = [{ key: "noteDescription", label: "Not" }];
 
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
                  <Input />
                </Form.Item>
              </div>
            );
          })}
      
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
          
          {GeneralStore.not.hasPicture ? ( <Form.Item name="pictureURL">
          {<label htmlFor="">Guncellenecek resim:</label>}  
            <Select>
              {
                GeneralStore.not.pictures &&  GeneralStore.not.pictures.length>0 ?(

                GeneralStore.not.pictures.map((a: any) => {
                  return (
                    <Select.Option value={a.pictureID}>
                      <div
                        onClick={() =>
                          runInAction(() => (GeneralStore.img_id = a.pictureID))
                        }
                      >
                        <Image
                          preview={false}
                          src={a.url}
                          /> <br />
                        <Input
                          onChange={(e: any) =>
                            runInAction(
                              () => (GeneralStore.image = e.target.files[0])
                              )
                            }
                            type="file"
                            />
                      </div>
                    </Select.Option>
                  );
                })
                ):(
                  <Select.Option value={1}>
                  <div>

                  <Input
                    onChange  ={async(e: any) => {
                      //http://37.148.211.32:8080/api/pictures/upload-photo-note?noteID=1
                      const url=`http://37.148.211.32:8080/api/pictures/upload-photo-note?noteID=${GeneralStore.not.noteID}`
                      const fd=new FormData();
                      fd.append('pictureURL',e.target.files[0])
                      await axios.post(url,fd)
                      GeneralStore.getNotlar()
                      runInAction(()=>{})
                    }}
                    type="file"
                  />
                  </div>
                </Select.Option>
                )
            
              }

            </Select>
          </Form.Item>):""
          }
          
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
