import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $et: req.body },
            { new: true }
        )
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async(req, res, next)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been deleted');

    } catch (error) {
        next(error);
    }
}