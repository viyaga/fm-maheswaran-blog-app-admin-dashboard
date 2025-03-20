"use server"

import qs from 'qs';
import bcrypt from 'bcryptjs'
import { getAllAuthorsQuery, getAllAuthorsUsernameQuery, getAuthorQuery, getExistiongAuthorByUsernameQuery } from './queries/authorQuery';
import { errResponse } from '../utils';
import { revalidateTag } from 'next/cache';
import { generateUsername } from './actions/common';
import { getAllCommentsQuery, getCommentQuery } from './queries/commentQuery';

const endpoint = process.env.STRAPI_API_ENDPOINT;
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
}

export async function strapiFetch({ path, query, method = 'GET', body, tags, revalidateTime = 60 * 60 * 24 * 365 }) {

    try {
        const url = `${endpoint}${path}${query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : ''}`; console.log({ url, query });
        const result = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            ...(tags && { next: { tags, revalidate: revalidateTime } })
        });

        let responseBody = null
        if (method !== 'DELETE') responseBody = await result.json();

        if (!result.ok) {
            throw responseBody;
        }

        return {
            status: result.status,
            body: responseBody
        };
    } catch (e) {
        // throw {
        //     error: errResponse(e),
        //     path
        // };
        console.log({ error: e });

        return { error: errResponse(e) }
    }
}

export async function getAllAuthors({ page, pageSize, sort, search }) {

    const query = getAllAuthorsQuery({ page, pageSize, sort, search })

    const res = await strapiFetch({ path: `/authors`, query, tags: ['authors'] });
    if (res.error) return { error: res.error }

    return { data: res.body.data, count: res.body.meta.pagination.total }
}

export async function getAllAuthorsUsername() {

    const query = getAllAuthorsUsernameQuery()

    const res = await strapiFetch({ path: `/authors`, query, tags: ['authors'] });
    if (res.error) return { error: res.error }

    return { data: res.body.data }
}

export async function getAuthorById({ documentId }) {
    if (!documentId) return { error: "Author ID is required." };

    const query = getAuthorQuery()

    const res = await strapiFetch({ path: `/authors/${documentId}`, query, tags: ['authors'] });
    if (res.error) return { error: res.error }

    if (res.body.data.author_status === 0) throw new Error("Author Not Found");

    return res.body.data;
}

export async function generateAuthorUsername({ first_name, last_name, attempt = 0 }) {

    if (!first_name || !last_name) throw new Error("Give the required field");

    const normalizedFirstName = first_name.toLowerCase();
    const normalizedLastName = last_name.toLowerCase();

    const baseUsername = `${normalizedFirstName}${normalizedLastName}`;
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newUsername = `${baseUsername}${randomNumber}`;

    const query = getExistiongAuthorByUsernameQuery(newUsername)

    const res = await strapiFetch({ path: '/authors', query })
    console.log({ res });

    if (res.error) return { error: res.error }

    const existingUser = res.body.data

    if (existingUser.length > 0) {
        if (attempt >= 10) {
            throw new Error("Unable to generate a unique username after 10 attempts");
        }
        return generateUsername({ first_name, last_name, attempt: attempt + 1 });
    }

    return newUsername;

}

export async function addAuthor(authorData) {

    const { first_name, last_name, password } = authorData;

    const saltRounds = 10;
    authorData.password = await bcrypt.hash(password, saltRounds);

    authorData.username = await generateAuthorUsername({ first_name, last_name });

    const res = await strapiFetch({ path: '/authors', method: 'POST', body: { data: authorData } })
    if (res.error) return { error: res.error }

    revalidateTag("authors");

    return {
        success: true,
        message: "Author added successfully",
    };
}

export async function updateAuthor({ documentId, updatedFields }) {
    if (!documentId) return { error: "Author ID is required" };

    const { password } = updatedFields;

    if (password?.length > 0) {
        if (password?.length < 6) {
            return { error: "Password must be at least 6 characters." };
        }

        const saltRounds = 10;
        updatedFields.password = await bcrypt.hash(password, saltRounds);
    }

    const res = await strapiFetch({ path: `/authors/${documentId}`, method: 'PUT', body: { data: updatedFields } })
    if (res.error) return { error: res.error }

    revalidateTag("authors");

    return {
        success: true,
        message: "Author updated successfully",
    };
}

export async function deleteAuthor(documentId) {
    if (!documentId) {
        return { error: "Author ID is required" };
    }

    const res = await strapiFetch({ path: `/authors/${documentId}`, method: 'DELETE' })

    if (res.error) return { error: res.error }

    revalidateTag("authors");

    return {
        success: true,
        message: "Author deleted successfully",
    };
}

export async function getAllComments({ page, pageSize, sort, search }) {
    const query = getAllCommentsQuery({ page, pageSize, sort, search });

    const res = await strapiFetch({ path: `/comments`, query, revalidateTime: 60 * 60, tags: ['comments'] });
    if (res.error) return { error: res.error };

    return { data: res.body.data, count: res.body.meta.pagination.total };
}

export async function getCommentById({ documentId }) {
    if (!documentId) return { error: "Comment ID is required." };

    const query = getCommentQuery();
    const res = await strapiFetch({ path: `/comments/${documentId}`, query, tags: ['comments'] });
    if (res.error) return { error: res.error };

    return res.body.data;
}

export async function addComment(commentData) {
    if (!commentData.content || !commentData.blog || !commentData.website_user) {
        return { error: "Content, blog ID, and website user ID are required." };
    }

    const res = await strapiFetch({ path: '/comments', method: 'POST', body: { data: commentData } });
    if (res.error) return { error: res.error };

    revalidateTag("comments");

    return {
        success: true,
        message: "Comment added successfully",
    };
}

export async function updateComment({ documentId, updatedFields }) {
    if (!documentId) return { error: "Comment ID is required" };

    const res = await strapiFetch({ path: `/comments/${documentId}`, method: 'PUT', body: { data: updatedFields } });
    if (res.error) return { error: res.error };

    revalidateTag("comments");

    return {
        success: true,
        message: "Comment updated successfully",
    };
}

export async function deleteComment(documentId) {
    if (!documentId) {
        return { error: "Comment ID is required" };
    }

    const res = await strapiFetch({ path: `/comments/${documentId}`, method: 'DELETE' });
    if (res.error) return { error: res.error };

    revalidateTag("comments");

    return {
        success: true,
        message: "Comment deleted successfully",
    };
}
