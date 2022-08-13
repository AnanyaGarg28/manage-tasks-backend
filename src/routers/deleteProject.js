import { getDbConnection } from "../db";
import { ObjectId } from 'mongodb';

export const deleteProject = {
    path: '/api/delete-project/:taskid',
    method: 'post',
    handler: async(req, res) => {
        const { taskid } = req.params;
        
        try {
            const db = getDbConnection('react-auth-db');
            const response = await db.collection('projects').deleteOne({'_id': ObjectId(taskid)});
            res.send(response);
        } catch (error) {
            res.status(500).send("Oops, Something went wrong!");
        }
        
        
    }
}