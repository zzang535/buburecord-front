const Health = require("../../models").health;

export async function list(req, res) {
  const { id } = req.token;
  console.log(id);
  try {
    const result = await Health.findAll({
      where: { user_id: id },
      order: [["date", "DESC"]],
    });
    const data = result;
    res.status(200).send({ message: "get health list success", data });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "get health list fail" });
  }
}

export async function create(req, res) {
  const { id } = req.token;
  const { date, title, content } = req.body;
  console.log(req.body);
  console.log(id);
  try {
    const createData = {
      date: date,
      title: title,
      content: content,
      user_id: id,
    };
    await Health.create(createData);
    return res.status(200).send({ message: "create health success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "create health fail" });
  }
}

export async function update(req, res) {
  const { id, date, title, content } = req.body;
  try {
    const updateData = {
      date: date,
      title: title,
      content: content,
    };
    await Health.update(updateData, {
      where: { id },
    });
    return res.status(200).send({ message: "update health success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "update health fail" });
  }
}
