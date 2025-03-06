import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateTokenAndSetCookie = (userId, res) => {
    const token = sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS attacks
        sameSite: "strict", // CSRF protection
        secure: process.env.NODE_ENV === "production", // Enable secure cookies only in production
    });

    return token;
};

export default generateTokenAndSetCookie;
