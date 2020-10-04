import React, { useEffect, useState } from "react";
import { Button, Layout, Typography } from "antd";
import styles from "./ViewNote.module.css";
import { ArrowLeftOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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
    votes: [1, 2, 1, 3, 4, 2, 1, 2]
};

function ViewNote() {

    const { classId, lectureId, noteId } = useParams();

    const [lecture, setLecture] = useState();
    const [note, setNote] = useState({sections: [], content: [], votes: []});

    async function vote(idx, type) {
        await axios.post('http://localhost:9000/updateVote', {
            classID: classId,
            lectureID: lectureId,
            noteID: noteId,
            sectionID: idx.toString(),
            type: type
        })

        let currVotes = note.votes.slice()
        currVotes[idx] += type;

        setNote({
            ...note,
            votes: currVotes
        })
    }

    async function getNote() {
        const result = await axios.get(`http://localhost:9000/getNotes?class=${classId}&lecture=${lectureId}`)
        setNote(result.data.notes[noteId])
        setLecture(result.data.title)
    }

    useEffect(() => {
        getNote();
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "auto", width: "1200px" }}>
                <Title className={styles.title}>{lecture}</Title>
                <Title
                    level={3}
                    className={styles.author}
                    style={{ fontWeight: "normal" }}
                >
                    {note.author}
                </Title>
                <Link to={`/class/${classId}/${lectureId}`}><ArrowLeftOutlined /> Back to {lecture}</Link>
                <div className={styles.noteContent}>
                    {note.sections.map((section, i) => (
                        <div key={i}>
                            <span style={{ float: "right" }}>
                                <span className={styles.votes}>
                                    {note.votes[i]}
                                </span>
                                <Button
                                    shape="circle"
                                    icon={<UpOutlined />}
                                    onClick={() => vote(i, 1)}
                                ></Button>
                                <Button
                                    shape="circle"
                                    icon={<DownOutlined />}
                                    onClick={() => vote(i, -1)}
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
