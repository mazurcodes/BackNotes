const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Markdown = require('../models/markdown');

// @route     GET /markdown
// @desc      Get all user files from DB
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    const foundDocuments = await Markdown.find({ user: req.user.id })
      .sort({ date: -1 })
      .select('-__v -user -text');
    res.status(200).json(foundDocuments);
  } catch (err) {
    console.log(err);
    res.status(400);
    // process.exit();
  }
});

// @route     GET /markdown
// @desc      Get user file with :id from DB
// @access    Private

router.get('/:id', auth, async (req, res) => {
  try {
    // check if curret user is the owner of the file
    const foundDocument = await Markdown.findById(req.params.id);
    if (!foundDocument)
      return res.status(401).json({ error: 'No documents found' });
    if (foundDocument.user.toString() !== req.user.id)
      return res.status(401).json({ error: 'Not authorized' });

    // if yes then send document
    res.status(200).json(foundDocument);
  } catch (err) {
    console.log(err);
    res.status(400);
    // process.exit();
  }
});

// @route     POST /markdown
// @desc      Post user markdwon file to DB and return new file's id
// @access    Private

router.post('/', auth, async (req, res) => {
  const { name, text } = req.body;
  try {
    const newMD = new Markdown({
      user: req.user.id,
      name,
      text
    });
    await newMD.save();
    res.status(200).json(newMD.id);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

// @route     PUT /markdown
// @desc      Modify users markdown file
// @access    Private

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { name, text } = req.body;

  const updateFields = {};
  if (name) updateFields.name = name;
  if (text) updateFields.text = text;

  try {
    // check if current user is the owner of the markdown file
    const mdFile = await Markdown.findById(id);
    if (!mdFile)
      return res.status(401).json({ error: 'No documents found' });
    if (mdFile.user.toString() !== userId)
      return res.status(401).json({ error: 'Not authorized' });

    // if yes then update
    const modMD = await Markdown.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).send('updated');
  } catch (err) {
    console.log(err);
    res.status(400);
    // process.exit();
  }
});

// @route     DELETE /markdown
// @desc      Delete user markdown from DB
// @access    Private

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    // check if current user is the owner of the file
    const mdFile = await Markdown.findById(id);
    if (!mdFile)
      return res.status(401).json({ error: 'No documents found' });
    if (mdFile.user.toString() !== userId)
      return res.status(401).json({ error: 'Not authorized' });

    //if yes then delete
    const delMd = await Markdown.findByIdAndDelete(id);
    res.status(200).send('deleted');
  } catch (err) {
    console.log(err);
    res.status(400);
    // process.exit();
  }
});

module.exports = router;
