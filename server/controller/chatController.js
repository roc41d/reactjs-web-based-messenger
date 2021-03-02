const ChatRoom = required("../models/chatRoom");
const ChatMessage = required("../models/chatMessage")

const initiate = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
};