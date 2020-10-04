import {
    ArrowLeftOutlined,
    CloudDownloadOutlined,
    EyeOutlined,
    StarTwoTone,
} from "@ant-design/icons";
import { Card, Col, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotesCard from "./NotesCard";
import axios from "axios";

const { Content } = Layout;

function Lecture() {

    const { classId, lectureId } = useParams();

    const [lecture, setLecture] = useState({notes: []})

    useEffect(() => {
        async function getData() {
            const result = await axios.get(`http://localhost:9000/getNotes?class=${classId}&lecture=${lectureId}`)
            setLecture(result.data)
        }

        getData();
    }, [classId, lectureId])

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "24px" }}>
                <Link to={`/class/${classId}`}>
                    <ArrowLeftOutlined /> Back to {lecture.course}
                </Link>
                <h1>
                    {lecture.title} - {lecture.course}
                </h1>
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
                            />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default Lecture;
