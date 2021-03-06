const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'Tag_name'],
    include: [
      {
        model: [Product, ProductTag],
        attributes: ['id']
      }
    ]
  }).then(dbTagData =>  res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });  

router.get('/:id', (req, res) => {
  // find a single tag by its `id`  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'Tag_name'],
    include: [
      {
        model: [Product, ProductTag],
        attributes: ['id']
      }
    ]
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'This Tag does not exist!'});
      return;
    }
   res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
 }); 

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id: req.body.id,
    Tag_name: req.body.Tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    id: req.body.id
  },
  {
    where: {
      id: req.params.id
    }
  }
)
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No Tag found with this id' });
    return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete one tag by its `id` value
  Tag.destroy({
    where: {
    id: req.params.id
    }
})
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No Tag found with this id'});
    return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;
