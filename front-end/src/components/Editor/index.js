import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor() {
  const [editorData, setEditorData] = useState("");
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onInit={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <button
        type="button"
        value="Save"
        onClick={() => {
          /* TODO: POST API end point here */
        }}
      >
        Save
      </button>
    </>
  );
}

export default Editor;
