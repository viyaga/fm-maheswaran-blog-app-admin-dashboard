export const getAllCommentsQuery = ({ page, pageSize, sort, search }) => {
    return {
        fields: ["content", "comment_status", "createdAt"],
        filters: {
            ...(search ? { content: { $contains: search } } : {}), // Add search filter if provided
        },
        pagination: { page, pageSize },
        populate: {
            blog: { fields: ["title"] },
            website_user: { fields: ["username"] }
        },
        ...(sort ? { sort: Array.isArray(sort) ? sort : [sort] } : {}) // Ensure sort is always an array
    }
}

export const getCommentQuery = () => {
    return {
        fields: ["content", "comment_status", "createdAt"],
        populate: {
            blog: { fields: ["title"] },
            website_user: { fields: ["username"] }
        }
    }
}
