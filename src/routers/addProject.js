import { getDbConnection } from "../db";

export const addProject = {
    path: '/api/add-project',
    method: 'post',
    handler: async(req, res) => {
        const { title, description, author, status } = req.body;
        const project = { title, description, author, status };
        try {
            const db = getDbConnection('react-auth-db');
            db.collection("projects").insertOne(project, function(err, response) {
                if(err) throw err;
                res.status(200).json(response);
            });
        } catch(e) {
            console.log(e);
            res.status(500).send("Oops. Something went wrong!");
        }   
    }
}