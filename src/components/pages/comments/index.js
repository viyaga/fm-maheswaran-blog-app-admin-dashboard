"use client"

import { useEffect, useState } from "react";

const CommentsPage = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments from an API or database
        fetch('/api/comments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, []);

    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default CommentsPage;