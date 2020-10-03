import { CloudDownloadOutlined, DownOutlined, EyeFilled, EyeOutlined, UpOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row, Avatar } from "antd";
import React from "react";
import CourseCard from "./CourseCard";
import LectureCard from "./LectureCard";
import NotesCard from "./NotesCard";

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
            "An overview of how great novels and stories have shaped modern though and historical significance",
    },
    {
        title: "Introduction to Economics",
        description: "Psychology at a large scale, introductory micro and macro economic material"
    },
    {
        title: "Introduction to Economics",
        description: "Psychology at a large scale, introductory micro and macro economic material"
    },
    {
        title: "Introduction to Economics",
        description: "Psychology at a large scale, introductory micro and macro economic material"
    },
];

function Dashboard() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <h1>Dashboard</h1>

                <Row gutter={24}>
                    <Col span={18}>
                        <Row gutter={[24, 16]}>
                            {classes.map((c) => (
                                <Col span={8}>
                                    <CourseCard title={c.title} description={c.description} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col span={6}>Test</Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default Dashboard;
