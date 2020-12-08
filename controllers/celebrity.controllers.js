const Celebrity = require("../models/celebrity.model");

const deleteFormOptions = (celebrityId) => ({
  action: `/celebrity/${celebrityId}`,
  btnText: "delete celebrity",
  method: "POST",
  restMethod: "DELETE",
});

function celebrityWithDeleteOptions(celebrity) {
  const deleteOptions = deleteFormOptions(celebrity._id);
  return {
    ...celebrity,
    ...deleteOptions,
  };
}

const getCelebrities = async (req, res) => {
  try {
    const celebrities = await Celebrity.find().lean();
    const celebritiesWithOptions = celebrities.map(celebrityWithDeleteOptions);
    res.render("celebrity", { celebrities: celebritiesWithOptions });
  } catch (err) {
    console.error(err);
  }
};

const editFormOptions = (celebrityId) => ({
  action: `/celebrity/${celebrityId}`,
  btnText: "edit celebrity",
  method: "POST",
  restMethod: "PATCH",
});

const getCelebrity = async (req, res) => {
  try {
    const { celebrityId } = req.params;
    const celebrity = await Celebrity.findById(celebrityId).lean();
    res.render("celebrity-detail", {
      ...editFormOptions(celebrityId),
      ...celebrity,
    });
  } catch (err) {
    console.error(err);
  }
};

const createCelebrity = async (req, res) => {
  try {
    const { name, ocupation, catchPhrase } = req.body;
    const celebrity = await Celebrity.create({ name, ocupation, catchPhrase });
    console.log("celebrity", celebrity);
    res.redirect("/celebrity");
  } catch (err) {
    console.error(err);
  }
};

const updateCelebrity = async (req, res) => {
  try {
    const { celebrityId } = req.params;
    const { name, ocupation, catchPhrase } = req.body;
    const updatedCelebrity = await Celebrity.findByIdAndUpdate(celebrityId, {
      name,
      ocupation,
      catchPhrase,
    });
    res.redirect(`/celebrity/${celebrityId}`);
  } catch (err) {
    console.log(err);
  }
};

const deleteCelebrity = async (req, res) => {
  try {
    const { celebrityId } = req.params;
    const deletedCelebrity = await Celebrity.findByIdAndDelete(celebrityId);
    console.log("deleted celebrity", deletedCelebrity);
    res.redirect("/celebrity");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCelebrities,
  getCelebrity,
  createCelebrity,
  updateCelebrity,
  deleteCelebrity,
};
