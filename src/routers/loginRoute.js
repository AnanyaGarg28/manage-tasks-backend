import { getDbConnection } from "../db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRoute = {
    path:'/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({email});

        if(!user) {
            return res.sendStatus(404);
        }

        const { _id, passwordHash, userInfo } = user;
        const isCorrect = await bcrypt.compare(password, passwordHash);

        if(isCorrect) {
            jwt.sign({
                email, _id, userInfo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d',
            },
            (err, token) => {
                if(err) {
                    res.status(500).json(err);
                }
                res.status(200).json({ token });
            })
        }
        else {
            res.sendStatus(401);
        }
    }
}