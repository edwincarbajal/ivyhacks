import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Avatar } from "antd";
import React from "react";

function NotesCard() {
    return (
        <Card hoverable actions={[<CloudDownloadOutlined />, <EyeOutlined />]}>
            <Card.Meta
                title="Jinay Jain"
                description="9/23/20"
                avatar={<Avatar>JJ</Avatar>}
            ></Card.Meta>
        </Card>
    );
}

export default NotesCard;