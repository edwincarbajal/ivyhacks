import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { BackTop, Button, Layout, message, Typography } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const { Title } = Typography;

const { Content } = Layout;

const note = {
    title: "Lecture 1",
    class: "Introduction to Psychology",
};

function Editor() {
    const [editorData, setEditorData] = useState("");

    function saveNotes() {
        console.log(editorData);
        message.success("Saved notes.")
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "auto", width: "1200px" }}>
                <Title style={{ marginTop: "40px" }} level={2}>
                    <EditOutlined /> Notes Editor
                </Title>
                <Title level={3} style={{ fontWeight: "normal" }}>
                    <b>{note.class}</b> - {note.title}
                </Title>
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
                        setEditorData(data);
                    }}
                    onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
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
