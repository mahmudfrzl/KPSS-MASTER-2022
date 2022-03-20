import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select } from "antd";
import GeneralStore from "../../../store/GeneralStore";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/lib/form/Form";
import { runInAction } from "mobx";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { setInterval } from "timers";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

// const editorConfiguration = {
//   fontColor: {
//     colors: [
//         {
//             color: 'hsl(0, 0%, 0%)',
//             label: 'Black'
//         },
//         {
//             color: 'hsl(0, 0%, 30%)',
//             label: 'Dim grey'
//         },
//         {
//             color: 'hsl(0, 0%, 60%)',
//             label: 'Grey'
//         },
//         {
//             color: 'hsl(0, 0%, 90%)',
//             label: 'Light grey'
//         },
//         {
//             color: 'hsl(0, 0%, 100%)',
//             label: 'White',
//             hasBorder: true
//         },

//         // ...
//     ]
// },
// fontBackgroundColor: {
//     colors: [
//         {
//             color: 'hsl(0, 75%, 60%)',
//             label: 'Red'
//         },
//         {
//             color: 'hsl(30, 75%, 60%)',
//             label: 'Orange'
//         },
//         {
//             color: 'hsl(60, 75%, 60%)',
//             label: 'Yellow'
//         },
//         {
//             color: 'hsl(90, 75%, 60%)',
//             label: 'Light green'
//         },
//         {
//             color: 'hsl(120, 75%, 60%)',
//             label: 'Green'
//         },

//         // ...
//     ]
// },
// toolbar: [
//     'heading', 'bulletedList', 'numberedList', 'fontColor', 'fontBackgroundColor', 'undo', 'redo'
// ]
// };

const CreateNote = () => {
  const [form] = useForm();
  const updatedData = [{ key: "noteDescription", label: "Not" }];
  // const [loadings , setState] = useState();

  // const enterLoading = (index) => {
  //   setState(({ loadings }) => {
  //     const newLoadings = [...loadings];
  //     newLoadings[index] = true;

  //     return {
  //       loadings: newLoadings,
  //     };
  //   });
  //   setTimeout(() => {
  //     setState(({ loadings }) => {
  //       const newLoadings = [...loadings];
  //       newLoadings[index] = false;

  //       return {
  //         loadings: newLoadings,
  //       };
  //     });
  //   }, 6000);
  // };
  // const postData = () => {
  //   setLoading({ loading: true });

  //   setTimeout(() => {
  //     setLoading({ loading: false });
  //   }, 2000);
  // };

  useEffect(() => {
    form.setFieldsValue({
      subjectID: "",
      noteDescription: "",
      hasPicture: "",
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
                    //    config={editorConfiguration}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      return runInAction(
                        () => (GeneralStore.noteDescription = data)
                      );
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
          <Form.Item name="pictureURL">
            <Input
              onChange={(e) =>
                runInAction(() => (GeneralStore.image_note = e.target.files[0]))
              }
              type="file"
            />
          </Form.Item>
          <Form.Item>
            {/* <Spin spinning={loading}  indicator={antIcon}> */}
            {/* {GeneralStore.loading === true ? <Spin /> : ""} */}
            <Button
              // loading={loadings[0]}
              // onClick={() => enterLoading(0)}
              htmlType="submit"
              type="primary"
            >
              Gonder
            </Button>

            {/* </Spin> */}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default observer(CreateNote);
