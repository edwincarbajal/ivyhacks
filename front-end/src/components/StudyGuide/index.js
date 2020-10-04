import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BackTop, Button, Layout, Typography } from "antd";
import styles from "../ViewNote/ViewNote.module.css";
import { ArrowLeftOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

function StudyGuide() {
  const { classId, lectureId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:9000/getMain?classID=${classId}&lectureID=${lectureId}`,
    }).then((response) => {
      console.log(response);
      setData(response.data);
    });
  }, [classId, lectureId]);

  const {
    class: classTitle,
    authors,
    content,
    lecture,
    sections,
    title: lectureTitle,
  } = data;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "auto", width: "1200px" }}>
        <Title className={styles.title}>Study Guide: {classTitle}</Title>
        <Link to={`/class/${classId}/${lectureId}`}>
          <ArrowLeftOutlined /> Back to {lectureTitle}
        </Link>
        <div className={styles.noteContent}>
          {sections?.map((section, i) => (
            <div key={i}>
              <div>
                <h1 style={{ display: "inline-block", marginRight: 10 }}>
                  {section}
                </h1>
                <Text type="secondary">{authors[i]}</Text>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content[i],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <BackTop />
      </Content>
    </Layout>
  );
}

export default StudyGuide;
