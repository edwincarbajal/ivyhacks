import React from "react";
import { Card } from "antd";
import {
    ArrowRightOutlined,
    BookTwoTone,
    CloseOutlined,
    LinkOutlined,
} from "@ant-design/icons";

function CourseCard({ title, description }) {
    return (
        <Card
            hoverable
            actions={[
                <CloseOutlined />,
                <LinkOutlined />,
                <ArrowRightOutlined />,
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
