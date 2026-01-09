import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../lib/prisma";

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

const createUser = async (payload: Record<string, unknown>) => {
    const { name, role, email, password } = payload;

    const hashedPassword = await bcrypt.hash(password as string, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name as string,
            role: role as Role,
            email: email as string,
            password: hashedPassword as string,
        },
    });

    const { password: _, ...safeUser } = newUser;

    return safeUser;
};

const loginUser = async (email: string, password: string) => {
    // Implementation for user login will go here
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid Credential");
    }

    const token = jwt.sign(
        { name: user.name, email: user.email, role: user.role },
        config.jwtSecret as string,
        { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user;

    return { token, user: safeUser };
};

export const authService = {
    createUser,
    loginUser,
};
