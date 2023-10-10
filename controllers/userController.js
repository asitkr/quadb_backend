const User = require('../modal/userModal');
const { hashPassword } = require('../middleware/middleware');

console.log('controller is loaded');

// create user details
const createUserController = async (req, res) => {
    const { user_name, user_email, user_password, user_image, total_orders } = req.body;

    // validate
    if (!user_name || !user_email || !user_password) {
        return res.status(400).send({
            success: false,
            message: 'user_name, user_email, and user_password are required fields'
        });
    }

    try {

        // password hashing
        const hashedPassword = await hashPassword(user_password);

        const newUser = await User.create({
            user_name,
            user_email,
            user_password: hashedPassword,
            user_image,
            total_orders
        });

        // console.log('newUser:', newUser);

        await newUser.save();

        res.status(201).send({
            success: true,
            message: 'User created successfully',
            newUser
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating new user',
            error
        })
    }
}

// get specific user details
const getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const userDetails = await User.findOne({ id });

        if (!userDetails) {
            return res.status(404).send({
                success: false,
                message: 'User details not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Getting successfully details',
            userDetails
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'While getting error in details',
            error: error.message
        })
    }
}

// get specific user image
const getImageController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ id });

        const userImage = user.user_image;

        if(!user  || !userImage) {
            return res.status(404).send({
                success: false,
                message: 'User image not found'
            });
        }

        res.status(200).send({
            success: true,
            message: 'Getting successfully image',
            userImage
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'While getting error in image',
            error: error.message
        })
    }
}

// update specific user details
const updateUserController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { user_name, user_email, user_password, user_image, total_orders } = req.body;

        // finding the existing data based on the primary key (i.e user_id)
        const existingUser = await User.findByPk(user_id);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // password hashing
        const hashedPassword = await hashPassword(user_password);

        const updatedUser = await existingUser.update({
            user_name,
            user_email,
            user_password: hashedPassword,
            user_image,
            total_orders
        })

        res.status(201).send({
            success: true,
            message: 'User details updated successfully',
            updatedUser
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'While getting error in update user details',
            error: error.message
        })
    }
}

// delete
const deleteUserController = async (req, res) => {
    try {
        const { user_id } = req.params;

        // finding the existing user
        const existingUser = await User.findByPk(user_id);

        // validation
        if(!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        await existingUser.destroy();

        res.status(201).send({
            success: true,
            message: 'User details deleted successfully'
        })
    } 
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'While getting error in deletion',
            error: error.message
        })
    }
}

module.exports = { createUserController, deleteUserController, getUserDetails, getImageController, updateUserController };