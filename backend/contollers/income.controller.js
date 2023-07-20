import Income from '../model/income.model.js';

class incomeController {
  async getIncome(req, res) {
    try {
      const income = await Income.find().sort({ dayNumber: 'asc' });
      return res.status(200).send(income);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Income error' })
    }
  }

  async createIncome(req, res) {
    try {
      const { day, dayNumber, month, hours } = req.body;
      const income = new Income({ day, dayNumber, month, hours });
      await income.save();
      return res.status(201).send(income);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Income error' })
    }
  }

  async deleteIncome(req, res) {
    try {
      const { _id } = req.body
      const income = await Income.findByIdAndDelete(_id);
      return res.status(200).send(income);
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }
}

export default new incomeController();
