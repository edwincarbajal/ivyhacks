import React from "react";
import { Card, message } from "antd";
import {
    ArrowRightOutlined,
    BookTwoTone,
    CloseOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function CourseCard({ title, description }) {
    const history = useHistory();

    function navigate() {
        history.push('/class/32489')
    }

    return (
        <Card
            hoverable
            actions={[
                <CloseOutlined />,
                <LinkOutlined onClick={() => {
                    navigator.clipboard.writeText("https://google.com/")
                    message.info('Join link copied!')
                }} />,
                <ArrowRightOutlined onClick={navigate} />,
            ]}
        >
            <Card.Meta
                title={title}
                description={description}
                avatar={<BookTwoTone />}
            ></Card.Meta>
        </Card>
    );
}

export default CourseCard;
