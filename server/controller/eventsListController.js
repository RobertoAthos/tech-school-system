const Event = require("../models/eventsList");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });

    try {
      res.status(200).json({
        message: "Tarefas carregadas com Sucesso.",
        events: events,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAevent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const events = await Event.findOne({ _id: eventId });

    if (!events) {
      return res.status(404).json({ msg: `No task with id: ${eventId}` });
    } else {
      res.status(200).json({
        message: "Tarefa carregada com sucesso.",
        events: events,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save((err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: "Tarefa criada com sucesso",
      });
    }
  });
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id: eventId } = req.params;
    const events = await Event.findByIdAndDelete(eventId);

    if (!events) {
      return res.status(404).json({ msg: `No ta with id: ${eventId}` });
    } else {
      res.status(200).json({
        message: `Tarefa id: ${eventId} excluída com sucesso.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};