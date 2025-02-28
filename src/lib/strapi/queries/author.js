export const getAllAuthorsQuery = ({ page, pageSize, sort, search }) => {
    return {
        fields: ["username", "email", "first_name", "last_name", "country", "createdAt", "author_status"],
        filters: {
            author_status: { $eq: 1 },
            ...(search ? { email: { $contains: search } } : {}), // Add search filter if provided
        },
        pagination: { page, pageSize },
        ...(sort ? { sort: Array.isArray(sort) ? sort : [sort] } : {}) // Ensure sort is always an array
    }
}