import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Avatar } from "antd";
import React from "react";

function NotesCard({ author, date }) {

    let getInitials = (name) => name.split(" ").map(x => x[0].toUpperCase());

    return (
        <Card hoverable actions={[<CloudDownloadOutlined />, <EyeOutlined />]}>
            <Card.Meta
                title={author}
                description={date}
                avatar={<Avatar>{getInitials(author)}</Avatar>}
            ></Card.Meta>
        </Card>
    );
}

export default NotesCard;