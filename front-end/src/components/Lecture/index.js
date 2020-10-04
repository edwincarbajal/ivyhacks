import {
    ArrowLeftOutlined,
    CloudDownloadOutlined,
    EyeOutlined,
    PlusOutlined,
    StarTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Layout, Row, Modal, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import axios from "axios";

const { Content } = Layout;

function Lecture() {
    const { classId, lectureId } = useParams();
    const history = useHistory();

    const [lecture, setLecture] = useState({ notes: [] });
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    async function createNote(values) {
        await axios.post("http://localhost:9000/addNote", {
            author: values.author,
            classID: classId,
            lectureID: lectureId
        })

        const idx = lecture.notes.length;

        history.push(`/edit/${classId}/${lectureId}/${idx}`)
    }

    async function getData() {
        const result = await axios.get(
            `http://localhost:9000/getNotes?class=${classId}&lecture=${lectureId}`
        );
        setLecture(result.data);
    }


    useEffect(() => {
        getData();
    }, [classId, lectureId]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <Link to={`/class/${classId}`}>
                    <ArrowLeftOutlined /> Back to {lecture.course}
                </Link>
                <h1>
                    {lecture.title} - {lecture.course}
                </h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    style={{ marginBottom: "30px" }}
                    onClick={() => setVisible(true)}
                >
                    Create Note
                </Button>
                <Modal
                    title="Create Note"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onOk={() => {
                        form.validateFields()
                            .then((values) => {
                                createNote(values);
                                setVisible(false);
                            })
                            .catch((err) => console.log(err));
                    }}
                    destroyOnClose
                >
                    <Form form={form} preserve={false}>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: "Please set the author name",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Row gutter={[24, 16]}>
                    <Col span={8}>
                        <Card
                            hoverable
                            actions={[
                                <CloudDownloadOutlined />,
                                <EyeOutlined />,
                            ]}
                        >
                            <Card.Meta
                                title="Study Guide"
                                avatar={<StarTwoTone twoToneColor="#bfbf2c" />}
                                description="Combined notes from the entire class"
                            ></Card.Meta>
                        </Card>
                    </Col>
                    {lecture.notes.map((note, i) => (
                        <Col key={i} span={8}>
                            <NotesCard
                                author={note.author}
                                date="Student"
                                classId={classId}
                                lectureId={lectureId}
                                id={i}
                                tags={note.tags}
                            />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default Lecture;
