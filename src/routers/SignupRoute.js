import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signupRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async(req, res) => {
        const { name, email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({email});

        if(user) {
            res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const userInfo = {
            name,
        }

        const result = await db.collection('users').insertOne({
            email, passwordHash, userInfo, isVerified: false
        })

        const { insertedId } = result;

        jwt.sign({
            email,
            userInfo,
            id:insertedId,
            isVerified: false
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if(err) {
                return res.sendStatus(500).send(err);
            }
            return res.status(200).json({ token });
        });

        
    }
}
