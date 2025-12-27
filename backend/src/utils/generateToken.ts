import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    const secret = process.env.JWT_SECRET || 'secret';
    return jwt.sign({ id }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    } as jwt.SignOptions);
};

export default generateToken;
