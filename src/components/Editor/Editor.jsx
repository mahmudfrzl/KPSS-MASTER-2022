import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { runInAction } from "mobx";
import GeneralStore from "../../store/GeneralStore";
const Editor = () => {
  const [desc, setDesc] = useState("")
  
  return (
    <div style={{ width: "410px" }}>
      <h2>Editor</h2>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          runInAction(
            () => (GeneralStore.description = editor.getData())
          )
          console.log({ event, editor, data });
          setDesc(data)
        }}
      />
    </div>
  );
};

export default Editor;
