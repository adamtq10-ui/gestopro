import express from 'express';
import 'dotenv/config';


const app = express();
app.use(express.json());

let project = [
    {id: 1, nom: 'site vitrine', termine: false},
    {id: 2, nom: 'app mobile', termine: false}
];

app.get('/', (req, res) => {
  res.json({ message: 'gestopro v1' });
});


app.get('/projects', (req, res) => {
    res.status(200).json(project);
});


app.post('/projects', (req, res) => {
    const { nom } = req.body;
    if (!nom) res.status(400).json({ message: 'invalid data' });
    const newproject = { id: project.length + 1, nom, termine: false };
    project.push(newproject);
    res.status(201).json(newproject);
});


app.get('/projects/:id', (req, res) => {
    const{id} = req.params;
    const projets = project.find(p => p.id === Number(id));
    if (!projets) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(projets);
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const index = project.findIndex(p => p.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(204).json({ message: 'Project deleted' });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up on port 7777`);
});