import { getUserProfile} from "../models/userModel.js";

export const profile = async (req, res) => {
  const { id } = req.user;
  try {
    const userProfile = await getUserProfile(id);
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }
    return res.status(200).json(userProfile );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
