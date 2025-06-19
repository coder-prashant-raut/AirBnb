import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User is logged in",
      user,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: `getCurrentUser error: ${error.message}` });
  }
};
