export const postExpel = (req, res) => {
    try {
        return res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
