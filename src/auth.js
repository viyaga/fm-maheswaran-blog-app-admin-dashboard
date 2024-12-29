import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

async function getUser(email) {
    return { email, password: '123456' };
    try {
        
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
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

                    console.log({parsedCredentials:parsedCredentials?.error, credentials});
                    
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);
                    if (!user) return null;
                    console.log({user});
                    

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (true) return user;
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
                // Add other user properties as needed
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.email = token.email;
                // Add other session properties as needed
            }
            return session;
        },
    },
});
