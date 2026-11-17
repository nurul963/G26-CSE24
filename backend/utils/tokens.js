import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from "./env.js";
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role:user.role,
            type: "access"
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY,
            algorithm: "HS256"
        }
    );
};
export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role:user.role,
            type: "refresh",
            jti: crypto.randomUUID()
        },
        REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
            algorithm: "HS256"
        });
};
export const hashToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};
export const verifyRefreshToken = (token) => {
    const payload = jwt.verify(
        token,
        REFRESH_TOKEN_SECRET,
        { algorithms: ["HS256"] });
    if (
        payload.type !== "refresh" ||
        !payload.sub ||
        !payload.jti
    ) {
        throw new Error("Invalid refresh token");
    }
    return payload;
};
export const getRefreshExpiry = (token) => {
    const decoded = jwt.decode(token);
    return new Date(decoded.exp * 1000);
};
