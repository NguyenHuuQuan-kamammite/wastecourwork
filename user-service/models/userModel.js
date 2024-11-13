const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // If password isn't modified, skip hashing
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next(); // Continue saving the user
  } catch (err) {
    next(err); // Handle any errors during hashing
  }
});

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password); // Compare candidate password with stored hashed password
};

// Create and export the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
