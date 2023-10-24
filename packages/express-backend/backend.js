import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());


const removeUser = (id) => {
    userServices.findUserByIdAndRemove(id).then(
        (result) => {return result;}
    ).catch(
        (error) => {
            console.log(error);
            return false;
        }
    )
    return true;//we successfully deleted the user
}


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    userServices.getUsers(name, job).then(
            (users) => {
                console.log(users);
                res.send(users);
            }
        ).catch((error) => console.log(error));
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    userServices.findUserById(id).then((result) => 
    {
        res.send(result);
    }).catch((error) => 
    {
        res.status(404).send('Resource not found');
    });

});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd).then((user) => {
        console.log(user);
        res.status(201).send(user);
    }).catch((error) => res.status(400).send('Failed to create'));
})

app.delete('/users/:id', (req, res) => {
    if (removeUser(req.params['id'])) {
        //we succeeded
        res.status(204).send();
    }
    else {
        //we couldn't find and delete the user
        res.status(404).send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});