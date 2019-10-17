export const getKeynoteByHash = (req, res) => {
    try {
        res.status(200).json({ data: {} });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteKeynoteByHash = (req, res) => {
    try {
        return res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
