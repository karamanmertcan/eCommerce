import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //database teki  sifreyle kullanicinin girdigi sifreyi karsilastiriyor
  return await bcrypt.compare(enteredPassword, this.password);
};

//pre save olmasinin sebebi kullanici kaydedilmeden once bu islemi yapmak istememiz
userSchema.pre('save', async function (next) {
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified('password')) {
    next();
  }

  //sifreleme
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
