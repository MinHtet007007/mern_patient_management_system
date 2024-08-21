import PatientModel from "../Models/PatientModel.js";

export const all = async (req, res) => {
  const { volunteer_id } = req.query;
  console.log(req.query);
  let patients;
  if (volunteer_id) {
    patients = await PatientModel.find({ volunteer_id }).populate(
      "volunteer_id",
      "-password"
    );
  } else {
    patients = await PatientModel.find().populate("volunteer_id", "-password");
  }

  res.json({
    patients,
  });
};

export const store = async (req, res) => {
  const { name, volunteer_id } = req.body;
  // const { authUser } = req;

  //store article
  await PatientModel.create({
    name,
    volunteer_id,
  });

  res.json("success");
};

export const edit = async (req, res) => {
  const patient = await PatientModel.findOne({ _id: req.params.id }); //[]
  res.json(patient);
};

export const update = async (req, res) => {
  const { files, body, params } = req;

  // const dbData = await ArticleModel.findOne({ _id: params.id });

  const patient = await PatientModel.findByIdAndUpdate(
    params.id,
    {
      name: body.name,
      volunteer_id: body.volunteer_id,
    },
    { new: true }
  );
  res.json(patient);
};

export const destroy = async (req, res) => {
  await PatientModel.deleteOne({ _id: req.params.id });
  res.json("Delete success");
};
