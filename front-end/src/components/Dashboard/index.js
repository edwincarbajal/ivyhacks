import styles from "./Dashboard.module.css";

import { Button, Card, Col, Layout, Row, Form, Modal, Input } from "antd";
import React, { useState } from "react";
import CourseCard from "./CourseCard";
import Avatar from "antd/lib/avatar/avatar";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;

const classes = [
    {
        title: "Calculus I",
        description: "Fundamental of derivatives, integrals, and limits",
    },
    {
        title: "Introduction to Computer Science",
        description:
            "Introduction to programming in Python. Topics covered: Functions, loops, arrays, variables, objects",
    },
    {
        title: "Literature in Modern History",
        description:
            "An overview of how great novels and stories have shaped modern thought and historical significance",
    },
    {
        title: "Introduction to Economics",
        description:
            "Psychology at a large scale, introductory micro and macro economic material",
    },
];

function Dashboard() {
    let [visible, setVisible] = useState(false);
    let [form] = Form.useForm();

    function createClass(values) {
        console.log(values);
        setVisible(false);
    }

    function onLogout() {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            icon: <LogoutOutlined />,
            onOk() {
                console.log("logging out");
            },
            onCancel() {
                console.log("cancelled logout");
            }
        })
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <h1>Dashboard</h1>

                <Row gutter={24}>
                    <Col span={18}>
                        {/* TODO: Add breadcrumbs navigation information */}
                        <Row gutter={[24, 16]}>
                            {classes.map((c) => (
                                <Col key={c.title} span={8}>
                                    <CourseCard
                                        title={c.title}
                                        description={c.description}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Card className={styles.profileCard}>
                            <Avatar size={80}>IH</Avatar>
                            <h1 className={styles.profileName}>Ivy Hacks</h1>
                            <h3>University of Hacks</h3>
                            <h3>ivy@hacks.edu</h3>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setVisible(true)}
                            >
                                Create Class
                            </Button>
                            <Modal
                                title="Create Class"
                                visible={visible}
                                onCancel={() => setVisible(false)}
                                onOk={() => {
                                    form.validateFields()
                                        .then((values) => {
                                            form.resetFields();
                                            createClass(values);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                                destroyOnClose
                            >
                                <Form preserve={false} form={form}>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter the class name",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Description"
                                        name="description"
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <br />
                            <Button danger onClick={onLogout}>Logout</Button>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Dashboard;
