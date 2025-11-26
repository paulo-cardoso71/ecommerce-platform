import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToDatabase from "./lib/db";
import User from "./models/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Aqui acontece a mágica do login
      authorize: async (credentials) => {
        try {
          await connectToDatabase();
          
          // 1. Busca o usuário pelo email e pede para INCLUIR a senha (select: '+password')
          const user = await User.findOne({ email: credentials.email }).select("+password");

          if (!user) {
            console.log("Usuário não encontrado");
            return null; // Retornar null significa login falhou
          }

          // 2. Verifica a senha
          // Se a senha no banco não estiver hashada (ex: criada manualmente), use comparação direta
          // Mas o ideal é usar o bcrypt:
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log("Senha incorreta");
            return null;
          }

          // 3. Se deu tudo certo, retorna o objeto do usuário (sem a senha)
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            role: user.role,
            image: user.image
          };

        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Esse callback roda assim que o login dá certo.
    // O objetivo é colocar o ROLE dentro do token JWT.
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // Esse callback roda quando o client-side pede os dados da sessão
    // O objetivo é passar o ROLE do token para a sessão visível
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Se algo der errado ou tentar acessar rota protegida, vai pra cá
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, // Não esqueça de ter isso no .env
});