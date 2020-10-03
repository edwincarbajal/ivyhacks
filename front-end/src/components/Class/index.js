import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Layout, Row, Col, Button, Modal, Form, Input, DatePicker } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LectureCard from "./LectureCard";

const { Content } = Layout;

let courseInfo = {
    title: "Introduction to Computer Science",
    description:
        "Introduction to programming in Python. Topics covered: Functions, loops, arrays, variables, objects",
    lectures: [
        {
            id: 1,
            title: "Python Basics",
            date: "9/15/20",
        },
        {
            id: 2,
            title: "Variables, Loops, Functions",
            date: "9/15/20",
        },
        {
            id: 3,
            title: "Object Oriented Python",
            date: "9/15/20",
        },
        {
            id: 3,
            title: "Object Oriented Python",
            date: "9/15/20",
        },
        {
            id: 3,
            title: "Object Oriented Python",
            date: "9/15/20",
        },
    ],
};

function Class() {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <Link to="/"><ArrowLeftOutlined /> Back to Dashboard</Link>

                <h1>{courseInfo.title}</h1>
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
                            console.log(values);
                            setVisible(false);
                        }).catch(err => console.log(err))
                    }}
                    destroyOnClose
                >
                    <Form form={form} preserve={false}>
                        <Form.Item label="Name" name="name" rules={[{required: true, message: "Please set the lecture name"}]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Select date" name="date" rules={[{required: true, message: "Please set the lecture date"}]}>
                            <DatePicker />
                        </Form.Item>
                    </Form>
                </Modal>
                <Row gutter={[24, 16]}>
                    {courseInfo.lectures.map((lecture) => (
                        <Col key={lecture.id} span={8}>
                            <LectureCard
                                title={lecture.title}
                                date={lecture.date}
                            />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default Class;
