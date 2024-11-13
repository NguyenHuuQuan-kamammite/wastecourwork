const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {

  const { name, email, password } = req.body;

  try {
      // Kiểm tra xem email đã tồn tại chưa
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Mã hóa mật khẩu và tạo người dùng mới
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
          name,
          email,
          password: hashedPassword,
      });

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
      console.error("Error in registration:", err); // Thêm log để kiểm tra lỗi
      res.status(500).json({ message: "Error in registration" });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Tìm người dùng theo email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Kiểm tra mật khẩu
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Tạo JWT token để xác thực phiên đăng nhập
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
      });

      res.status(200).json({
          message: "User logged in successfully",
          token, // Trả về token cho client lưu trữ
      });
  } catch (err) {
      res.status(500).json({ message: "Error in login" });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
      const user = await User.findById(req.params.id).select('-password'); // Không trả về mật khẩu
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving user" });
  }
};



// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation (basic example)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password }, // In a real application, hash the password before saving
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAllUsers = async (req, res) => {
  
};