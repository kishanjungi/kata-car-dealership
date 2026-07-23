const authService = require("../services/auth.service");

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const result = await authService.registerUser({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            },
        });

    } catch (error) {
    const status =
        error.message === "Email already exists" ? 409 : 400;

    res.status(status).json({
        success: false,
        message: error.message,
    });
}

};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser({
            email,
            password,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            },
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    register,login
};