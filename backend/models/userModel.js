import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	// compare plain text to encrypted password
	return await bcrypt.compare(enteredPassword, this.password);
};

// middleware
userSchema.pre("save", async function (next) {
	// before saving, run the async function
	if (!this.isModified("password")) {
		// mongoose stuff-> .isModified

		next(); // move on
	}

	// encrypt password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema); // creating a model from this schema

export default User;
