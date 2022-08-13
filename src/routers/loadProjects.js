import { getDbConnection } from "../db";
import { ObjectId } from "mongodb";

export const loadProjects = {
    path: '/api/projects',
    method: 'get',
    handler: async (req,res)=>{
        try {
            const db = getDbConnection('react-auth-db');
            const projects = await db.collection('projects').find().toArray();
            for(let i = 0; i < projects.length; i++) {
                const response = await db.collection('users').findOne({
                    '_id': ObjectId(projects[i].author)
                });
                projects[i].authorInfo = {
                    name: response.userInfo.name,
                    email: response.email,
                    profilePic: response.userInfo.profileImage,
                };
            }
            res.status(200).json(projects);
        } catch (e) {
            console.log(e);
            res.status(500).send("Oops Something Went Wrong!")
        }
    }
}