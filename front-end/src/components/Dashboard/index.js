import styles from "./Dashboard.module.css";
import axios from "axios";
import { Button, Card, Col, Layout, Row, Form, Modal, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import fire from "../../firebase";
import Avatar from "antd/lib/avatar/avatar";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;

function Dashboard() {
    const [classes, setClasses] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    async function getClasses() {
        const result = await axios.get("http://localhost:9000/getClasses");
        setClasses(result.data);
    }

    useEffect(() => {
        getClasses();
    }, []);

    async function createClass(values) {
        await axios.post("http://localhost:9000/addClass", {
            classID: values.id,
            className: values.name,
            classDesc: values.description,
        });
        getClasses();
        message.success("Class created!")
        setVisible(false);
    }

    function onLogout() {
        Modal.confirm({
            title: "Are you sure you want to logout?",
            icon: <LogoutOutlined />,
            onOk() {
                fire.auth().signOut();
                window.location.href = "/login";
            },
            onCancel() {
                console.log("cancelled logout");
            },
        });
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
                                <Col key={c.id} span={8}>
                                    <CourseCard
                                        title={c.name}
                                        description={c.desc}
                                        id={c.id}
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
                                        label="Course ID"
                                        name="id"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please enter the class ID",
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
                            <Button danger onClick={onLogout}>
                                Logout
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Dashboard;
