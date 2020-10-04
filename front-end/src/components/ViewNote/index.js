import React from "react";
import { Button, Layout, Typography } from "antd";
import styles from "./ViewNote.module.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

let note = {
    title: "Binary Search",
    author: "Jinay Jain",
    sections: ["What it does", "Complexity", "Algorithm", "Related Topics"],
    content: [
        "<p>Given a sorted array arr[] of n elements, write a function to search a given element x in arr[].</p>",
        "<p>Usually, linear search will take O(n) time, but worse case binary search is still O(log(n)). Each step in the search divides the search space in half, making the base of the log, 2. We write logs base 2 as lg(n) since they appear often in computer science.</p>",
        `<p>
            We have a number x and an array arr[]
            <ol>
                <li>Compare x with the middle element.</li>
                <li>If x matches with middle element, we return the mid index. </li>
                <li>Else If x is greater than the mid element, then x can only lie in right half subarray after the mid element. So we recur for right half. </li>
                <li>Else (x is smaller) recur for the left half.</li>
            </ol>
        </p>`,
        `
        <p>
            <ul>
                <li>Binary search trees</li>
                <li>Median finding</li>
                <li>Fenwick Trees</li>
            </ul>
        </p>
        `

    ],
};

function ViewNote() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "auto", width: "1200px" }}>
                <Title className={styles.title}>{note.title}</Title>
                <Title
                    level={3}
                    className={styles.author}
                    style={{ fontWeight: "normal" }}
                >
                    {note.author}
                </Title>
                <div className={styles.noteContent}>
                    {note.sections.map((section, i) => (
                        <div>
                            <span style={{ float: "right" }}>
                                <span className={styles.votes}>5</span>
                                <Button
                                    shape="circle"
                                    icon={<UpOutlined />}
                                ></Button>
                                <Button
                                    shape="circle"
                                    icon={<DownOutlined />}
                                ></Button>
                            </span>
                            <h1>{section}</h1>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: note.content[i],
                                }}
                            />
                        </div>
                    ))}
                </div>
            </Content>
        </Layout>
    );
}

export default ViewNote;
