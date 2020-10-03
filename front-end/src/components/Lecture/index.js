import {
    ArrowLeftOutlined,
    CloudDownloadOutlined,
    EyeOutlined,
    StarTwoTone,
} from "@ant-design/icons";
import { Card, Col, Layout, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import NotesCard from "../Dashboard/NotesCard";

const { Content } = Layout;

const lectureInfo = {
    title: "Python Basics",
    course: "Introduction to Computer Science",
    notes: [
        {
            id: 1,
            author: "Jinay Jain",
        },
        {
            id: 2,
            author: "Jinay Jain",
        },
        {
            id: 3,
            author: "Jinay Jain",
        },
        {
            id: 4,
            author: "Jinay Jain",
        },
    ],
};

function Lecture() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <Link to="/">
                    <ArrowLeftOutlined /> Back to {lectureInfo.course}
                </Link>
                <h1>{lectureInfo.title}</h1>
                <h3>{lectureInfo.course}</h3>
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
                                description="9/23/20"
                            ></Card.Meta>
                        </Card>
                    </Col>
                    {lectureInfo.notes.map((note) => (
                        <Col key={note.id} span={8}>
                            <NotesCard />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default Lecture;
