import { CalendarTwoTone } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function LectureCard({ title, date, id, classId }) {
    const history = useHistory();

    function showDate(date) {
        let obj = new Date(parseInt(date) * 1000);
        return obj.toLocaleDateString();
    }

    return (
        <Card hoverable onClick={() => history.push(`/class/${classId}/${id}`)}>
            <Card.Meta
                title={title}
                description={showDate(date)}
                avatar={<CalendarTwoTone />}
            ></Card.Meta>
        </Card>
    );
}

export default LectureCard;
