import express from 'express';
import 'dotenv/config';
import projectsRouter from './routes/projects.js';


const app = express();
app.use(express.json());
app.use('/projects', projectsRouter);

let project = [
    {id: 1, nom: 'site vitrine', termine: false},
    {id: 2, nom: 'app mobile', termine: false}
];
app.get('/projects/:id', (req, res) => {
    const{id} = req.params;
    const projets = project.find(p => p.id === Number(id));
    if (!projets) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(projets);
});

router.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    const index = project.findIndex(p => p.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Project not found' });
    }
    if (!nom) {
        return res.status(400).json({ message: 'invalid data' });
    }
    project[index].nom = nom;
    res.status(200).json(project[index]);
});

router.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const index = project.findIndex(p => p.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ message: 'Project not found' });
    }
    project.splice(index, 1);
    res.status(204).json({ message: 'Project deleted' });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is up on port 7777`);
});