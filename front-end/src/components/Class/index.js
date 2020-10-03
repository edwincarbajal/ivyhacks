import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Button, Modal, Form, Input, DatePicker, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LectureCard from "./LectureCard";
import axios from "axios";

const { Content } = Layout;

function Class() {
    const [info, setInfo] = useState({lectures: []});
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    let { classId } = useParams();

    async function getClass() {
        const result = await axios.get(`http://localhost:9000/getLectures?class=${classId}`)
        setInfo(result.data);
    }

    useEffect(() => {
        getClass();
    }, [classId])

    async function createLecture(values) {
        await axios.post('http://localhost:9000/addLecture', {
            lecTitle: values.name,
            lecDate: values.date.unix(),
            classID: classId,
        })
        message.success("Lecture created!")
        getClass();
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <Link to="/"><ArrowLeftOutlined /> Back to Dashboard</Link>

                <h1>{info.name}</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    style={{ marginBottom: "30px" }}
                    onClick={() => setVisible(true)}
                >
                    Create Lecture
                </Button>
                <Modal
                    title="Create Lecture"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onOk={() => {
                        form.validateFields().then(values => {
                            createLecture(values);
                            setVisible(false);
                        }).catch(err => console.log(err))
                    }}
                    destroyOnClose
                >
                    <Form form={form} preserve={false}>
                        <Form.Item label="Name" name="name" rules={[{required: true, message: "Please set the lecture name"}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Date" name="date" rules={[{required: true, message: "Please set the lecture date"}]}>
                            <DatePicker />
                        </Form.Item>
                    </Form>
                </Modal>
                <Row gutter={[24, 16]}>
                    {info.lectures.map((lecture) => (
                        <Col key={lecture.id} span={8}>
                            <LectureCard
                                title={lecture.title}
                                date={lecture.date}
                                id={lecture.id}
                                classId={classId}
                            />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default Class;
