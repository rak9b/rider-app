import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    const secret = process.env.JWT_SECRET || 'rider_app_super_secure_jwt_secret_key_prod_2026';
    return jwt.sign({ id }, secret, {
        expiresIn: (process.env.JWT_EXPIRES_IN || '30d') as jwt.SignOptions['expiresIn'],
    });
};

export default generateToken;
