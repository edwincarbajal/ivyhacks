import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import { BackTop, Button, Layout, message, Typography } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

function Editor() {
  const { classId, lectureId, noteId } = useParams();
  const [content, setContent] = useState("");
  const [courseName, setCourseName] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:9000/getNotes?class=${classId}&lecture=${lectureId}`,
    }).then((response) => {
      const { course: courseName, title: lectureTitle } = response.data;
      setCourseName(courseName);
      setLectureTitle(lectureTitle);
    });
  }, [classId, lectureId, noteId]);

  function saveNotes() {
    console.log(content);
    axios({
      method: "POST",
      url: "http://localhost:9000/addContent",
      data: {
        classID: classId,
        lectureID: lectureId,
        noteID: noteId,
        content: content,
      },
    }).then((response) => {
      console.log(response);
      if (response.data) {
        message.success("Saved notes.");
      }
    });
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "auto", width: "1200px" }}>
        <Title style={{ marginTop: "40px" }} level={2}>
          <EditOutlined /> Notes Editor
        </Title>
        <Title level={3} style={{ fontWeight: "normal" }}>
          <b>{courseName}</b> - {lectureTitle}
        </Title>
        <div id="editor-wrapper" style={{ background: "white" }}>
          <CKEditor
            editor={DecoupledEditor}
            data=""
            onInit={(editor) => {
              console.log("Editor is ready to use!", editor);
              editor.ui
                .getEditableElement()
                .parentElement.insertBefore(
                  editor.ui.view.toolbar.element,
                  editor.ui.getEditableElement()
                );
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
        <br />
        <Button
          type="primary"
          shape="round"
          icon={<SaveOutlined />}
          onClick={saveNotes}
          size="large"
        >
          Save
        </Button>
        <BackTop />
      </Content>
    </Layout>
  );
}

export default Editor;
