import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Avatar, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

function NotesCard({ author, date, classId, lectureId, id, tags}) {
    const history = useHistory();
    let getInitials = (name) => name.split(" ").map((x) => x[0].toUpperCase());

    return (
        <Card
            hoverable
            actions={[
                <CloudDownloadOutlined />,
                <EyeOutlined
                    onClick={() => {
                        history.push(`/note/${classId}/${lectureId}/${id}`);
                    }}
                />,
            ]}
        >
            <Card.Meta
                title={author}
                description={date}
                avatar={
                    <Avatar style={{ backgroundColor: "#3e61de" }}>
                        {getInitials(author)}
                    </Avatar>
                }
            ></Card.Meta>
            <br />

            {tags && tags.map((tag, i) => (
                <Tag color="volcano" key={i}>
                    {tag.toLowerCase()}
                </Tag>
            ))}
        </Card>
    );
}

export default NotesCard;
