const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    country: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, default: '' }, // Optional field
    relationshipPreference: { type: String, required: true },
    religion: { type: String, required: true },
    keywords: { type: String, default: '' }, // Array of strings
    image: { type: String, default: '' }, // Can be a URL or file path
    password: { type: String, required: true },
    hairColor: { type: String, default: '' },
    eyeColor: { type: String, default: '' },
    height: { type: String, default: '' },
    weight: { type: String, default: '' },
    appearance: { type: String, default: '' },
    bodyStyle: { type: String, default: '' },
    drink: { type: String, default: '' },
    smoke: { type: String, default: '' },
    maritalStatus: { type: String, default: '' },
    employmentStatus: { type: String, default: '' },
    numberOfChildren: { type: String, default: '' },
    annualIncome: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
