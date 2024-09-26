const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  FbookingId: { type: String, unique: true },
  tripType: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  infants: { type: Number, default: 0 },
  class: { type: String, required: true, enum: ['economy', 'premium economy', 'business class', 'first class'] },
  specialInstructions: { type: String }
});

flightSchema.pre('save', async function(next) {
  if (!this.FbookingId) {
    try {
      const user = await mongoose.model('User').findById(this.user);
      if (!user) throw new Error('User not found');

      const userPrefix = user.name.slice(0, 3).toUpperCase();
      const fromPrefix = this.from.slice(0, 3).toUpperCase();
      const toPrefix = this.to.slice(0, 3).toUpperCase();
      const departureDate = this.departureDate.toISOString().split('T')[0];
      const returnDate = this.returnDate ? `-${this.returnDate.toISOString().split('T')[0]}` : '';

      const bookingCount = await this.constructor.countDocuments() + 1;
      const bookingNumber = bookingCount.toString().padStart(4, '0');

      this.FbookingId = `FB:INQ${bookingNumber}/${userPrefix}/${fromPrefix}-${toPrefix}/${departureDate}${returnDate}`;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Flight', flightSchema);