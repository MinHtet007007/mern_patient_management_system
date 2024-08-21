import VolunteerModel from "../Models/VolunteerModel.js";

export const all = async (req, res) => {
  const volunteers = await VolunteerModel.find({},"-password").where("role","volunteer")

  res.json({
    volunteers,
  });
};

// export const store = async (req, res) => {
//   const { name, volunteer_id } = req.body;
//   // const { authUser } = req;

//   //store article
//   await PatientModel.create({
//     name,
//     volunteer_id,
//   });

//   res.json("success");
// };

// export const edit = async (req, res) => {
//   const patient = await PatientModel.findOne({ _id: req.params.id }); //[]
//   res.json(patient);
// };

// export const update = async (req, res) => {
//   const { files, body, params } = req;

//   // const dbData = await ArticleModel.findOne({ _id: params.id });

//   const patient = await PatientModel.findByIdAndUpdate(
//     params.id,
//     {
//       name: body.name,
//       volunteer_id: body.volunteer_id,
//     },
//     { new: true }
//   );
//   res.json(patient);
// };

// export const destroy = async (req, res) => {
//   await PatientModel.deleteOne({ _id: req.params.id });
//   res.json("Delete success");
// };
