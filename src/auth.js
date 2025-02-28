import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import axios from 'axios';
import { errResponse } from './lib/utils';
import { removeAuthToken } from './lib/strapi/actions/common';

async function getUser(identifier, password) {
    const STRAPI_API_ENDPOINT = process.env.STRAPI_API_ENDPOINT

    try {
        removeAuthToken()
        const res = await axios.post(STRAPI_API_ENDPOINT + '/auth/local', { identifier, password })

        const jwt = res?.data?.jwt
        const user = res?.data?.user

        if (!jwt || !user) return null

        const res2 = await axios.get(
            STRAPI_API_ENDPOINT + '/users/me?fields=id&populate[role][fields]=name', // get user role only for strapi user permissions plugin
            { headers: { Authorization: 'Bearer ' + jwt } }
        )

        const role = res2?.data?.role
        if (!role?.name === "Authenticated") return null

        user.role = role

        return user

    } catch (error) {
        return null;
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email, password);

                    if (!user) return null;
                    return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email || '';
                token.name = user.first_name + " " + user.last_name || '';
                token.role = user.role?.name || ''
                // Add other user properties as needed
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.email = token.email;
                session.user.name = token.name
                session.user.role = token.role
                // Add other session properties as needed
            }
            return session;
        },
    },
});
