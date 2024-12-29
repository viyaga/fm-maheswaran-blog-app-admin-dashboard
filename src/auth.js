import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
// import { User } from './lib/models';
// import { connectDB } from './lib/functions';

async function getUser(email) {
    try {
        return { email, password: 12345 }
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(4) })
                    .safeParse(credentials);

                if (parsedCredentials?.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                console.log({ parseError: 'Invalid credentials' });
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.img = user.profileImg;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.email = token.username;
                session.user.img = token.img;
            }
            return session;
        },
    },
});