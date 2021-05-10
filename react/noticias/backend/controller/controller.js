const Post = require('../model/noticiasModel')
require('../config/db')

module.exports.list = async function (req, res) {
  try {
    const post = await Post.find({});
    res.send(post)
  } catch (error) {
    res.send({ message: error })
  }
};
module.exports.page = async function (req, res) {
  const page = parseInt(req.query.page);
  try {
    const post = await Post.find({}).skip(page).limit(10);
    res.send(post)
  } catch (error) {
    res.send({ message: error })
  }
};
module.exports.listaId = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();
    res.send(post)
  } catch (error) {
    res.send({ message: error })
  }
};

module.exports.insert = async function (req, res) {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const postSave = await post.save();
    res.status(201).send(postSave)
  } catch (error) {
    res.status(404).send({ message: error })
  }
};

module.exports.update = async function (req, res) {
  try {
    await Post.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        description: req.body.description
      }
    });
    res.status(200).send({ message: 'Atualizadom com sucesso!' })
  } catch (error) {
    res.send({ message: error })
  }
};
module.exports.delete = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post) {
      const postRemove = await Post.deleteOne({ _id: req.params.id });
      res.status(200).send(postRemove)
    } else {
      res.status(404).send({ message: 'Id não exister!' });
    }

  } catch (error) {
    res.send({ message: error })
  }
};
