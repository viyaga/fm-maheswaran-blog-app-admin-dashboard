import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import axios from 'axios';
import { errResponse } from './lib/utils';

async function getUser(identifier, password) {
    const SERVER_ONE = process.env.SERVER_ONE

    try {
        const res = await axios.post(SERVER_ONE + '/auth/local', { identifier, password })
        const jwt = res?.data?.jwt

        const res2 = await axios.get(SERVER_ONE + '/users/me?fields=username,email,first_name,last_name&populate=role', { headers: { Authorization: 'Bearer ' + jwt } })
        const user = res2?.data

        if (user?.role?.name === "Admin") return user

        return null
    } catch (error) {
        return { error: errResponse(error) };
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
                token.email = user.email;
                token.name = user.first_name + " " + user.last_name;
                token.role = user.role.name
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
