import { CalendarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

function LectureCard({ title, date }) {
    return (
        <Card hoverable onClick={() => alert(1)}>
            <Card.Meta
                title={title}
                description={date}
                avatar={<CalendarOutlined />}
            ></Card.Meta>
        </Card>
    );
}

export default LectureCard;