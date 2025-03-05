export const getAllAuthorsQuery = ({ page, pageSize, sort, search }) => {
    return {
        fields: ["username", "email", "first_name", "last_name", "country", "createdAt", "author_status"],
        filters: {
            ...(search ? { email: { $contains: search } } : {}), // Add search filter if provided
        },
        pagination: { page, pageSize },
        ...(sort ? { sort: Array.isArray(sort) ? sort : [sort] } : {}) // Ensure sort is always an array
    }
}

export const getAllAuthorsUsernameQuery = () => {
    return {
        fields: ["username"],
        sort: ['username:asc']
    }
}

export const getAuthorQuery = () => {
    return {
        fields: ["username", "email", "first_name", "last_name", "country", "author_status"]
    }
}

export const getExistiongAuthorByUsernameQuery = (username) => {
    return {
        fields: ["username"],
        filters: {
            username: {
                $eq: username
            }
        }
    }
}