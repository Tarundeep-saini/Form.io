const CategoryModel = require("../Schema/Category");
const ClozeModel = require("../Schema/Cloze");
const ComprehensionModel = require("../Schema/comprehension");
const User = require("../Schema/user");
const UserModel = require("../Schema/user");
const _ = require("lodash");

const GetUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ users, isError: false });
  } catch (error) {
    res.json({ message: "Error Fetching the Forms", isError: true });
  }
};

const GetQuestions = async (req, res) => {
  let { creator } = req.params;

  const questions = [];
  try {
    const user = await User.findOne({ creator });
    if (user === null) {
      throw { message: "User Not Found" };
    }
    let a = 0;
    user.allquestions.forEach(async (_id) => {
      const comprehensionQuestion = await ComprehensionModel.findById(_id);
      if (comprehensionQuestion) {
        const NewComprehensionQuestion = {
          _id: comprehensionQuestion._id,
          type: comprehensionQuestion.type,
          passage: comprehensionQuestion.passage,
          questions: comprehensionQuestion.questions.map((question) => {
            question.options = question.options.map((opt) => ({
              ...opt,
              isTrue: false,
            }));
            return question;
          }),
        };

        questions.push(NewComprehensionQuestion);
      }
      const categoryQuestion = await CategoryModel.findById(_id);
      if (categoryQuestion) {
        categoryQuestion.items.forEach((item) => {
          if (item.cat) {
            item.cat = false;
          }
        });

        questions.push(categoryQuestion);
      }
      const clozeQuestion = await ClozeModel.findById(_id);
      if (clozeQuestion) {
        const { _id, preview, type, words } = clozeQuestion;
        showPreview = preview;
        const ques = { _id, preview, showPreview, type, words };
        questions.push(ques);
      }
      a++;
      if (user.allquestions.length === a) {
        res.json(questions);
      }
    });
  } catch (error) {
    res.json({
      message: error.message || "Error Occured Fetching Form Questions",
      isError: true,
    });
  }
};

const CreateForm = async (req, res) => {
  const { creator, allQuestions } = req.body;
  try {
    const user = new UserModel();
    user.creator = creator;

    for (const question of allQuestions) {
      if (question.type === "comprehension") {
        const comprehension = new ComprehensionModel({
          passage: question.passage,
          questions: question.questions,
          type: question.type,
        });
        user.allquestions.push(comprehension._id);
        await comprehension.save();
      }

      if (question.type === "Cloze") {
        const cloze = new ClozeModel({
          preview: question.preview,
          text: question.text,
          type: question.type,
          words: question.words,
        });

        user.allquestions.push(cloze._id);
        await cloze.save();
      }

      if (question.type === "Category") {
        const category = new CategoryModel({
          categories: question.categories,
          items: question.items,
          type: question.type,
        });
        user.allquestions.push(category._id);
        await category.save();
      }
    }
    await user.save();
    res.status(201).json({
      message: "Form Successfully Saved.",
      isError: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occured While Saving the Form.",
      isError: true,
    });
  }
};

const CheckForm = async (req, res) => {
  const answers = req.body;
  if (answers.length === 0) {
    return;
  }
  try {
    const answerCheckList = await Promise.all(
      answers.map(async (answer, index) => {
        if (!answer || !answer.type) {
          return null;
        }
        if (answer.type === "Cloze") {
          const ClozeQuestion = await ClozeModel.findById(answer._id);
          ClozeQuestion.text = ClozeQuestion.text.trim();
          answer.preview = answer.preview.trim();
          if (ClozeQuestion.text === answer.preview) {
            return true;
          } else {
            return false;
          }
        }
        if (answer.type === "comprehension") {
          const comprehensionQuestion = await ComprehensionModel.findById(
            answer._id
          );
          const checkList = await Promise.all(
            comprehensionQuestion.questions.map(async (question, quesIndex) => {
              const optionList = await Promise.all(
                question.options.map(async (opt, optIndex) => {
                  const answerIsTrue =
                    answer.questions[quesIndex].options[optIndex].isTrue;
                  return _.isEqual(answerIsTrue, opt.isTrue);
                })
              );
              return optionList.every((item) => item === true);
            })
          );
          return checkList;
        }
        if (answer.type === "Category") {
          const CategoryQuestion = await CategoryModel.findById(answer._id);
          const checkList = CategoryQuestion.items.map((item, index) => {
            const cate = answer.items[index].cat;
            return cate === item.cat;
          });
          return checkList;
        }
      })
    );
    res.json(answerCheckList);
  } catch {
    res.json({ message: "Error Checking The Answers", isError: true });
  }
};

module.exports.CreateForm = CreateForm;
module.exports.GetUsers = GetUsers;
module.exports.CheckForm = CheckForm;
module.exports.GetQuestions = GetQuestions;
