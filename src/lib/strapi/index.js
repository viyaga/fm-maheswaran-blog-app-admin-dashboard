import qs from 'qs';
import { getAllAuthorsQuery } from './queries/author';

const endpoint = process.env.STRAPI_API_ENDPOINT;
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_TOKEN}`
};

export async function strapiFetch({ path, query, method = 'GET', body, tags, revalidateTime = 60 * 60 * 24 * 365 }) {

    try {
        const url = `${endpoint}${path}${query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : ''}`; console.log({ url, query });
        const result = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            ...(tags && { next: { tags, revalidate: revalidateTime } })
        });

        const responseBody = await result.json();

        if (!result.ok) {
            throw responseBody;
        }

        return {
            status: result.status,
            body: responseBody
        };
    } catch (e) {
        throw {
            error: e,
            path
        };
    }
}

export async function getAllAuthors({ page, pageSize, sort, search }) {

    const query = getAllAuthorsQuery({ page, pageSize, sort, search })

    const res = await strapiFetch({ path: `/authors`, query, tags: ['authors'], });
    return res.body;
}