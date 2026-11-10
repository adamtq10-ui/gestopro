import express from 'express';

const router = express.Router();

let project = [
  { id: 1, nom: 'site vitrine', termine: false },
  { id: 2, nom: 'app mobile', termine: false }
];

router.get('/', (req, res) => {
  res.status(200).json(project);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const projet = project.find(p => p.id === Number(id));
  if (!projet) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.status(200).json(projet);
});

router.post('/', (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res.status(400).json({ message: 'invalid data' });
  }
  const newproject = {
    id: project.length ? Math.max(...project.map(p => p.id)) + 1 : 1,
    nom,
    termine: false
  };
  project.push(newproject);
  res.status(201).json(newproject);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = project.findIndex(p => p.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }
  project.splice(index, 1);
  res.status(204).send();
});

export default router;