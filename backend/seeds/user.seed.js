import { config } from "dotenv";
import EstalishConnectionToDB from "../utils/connectToDB.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users
    {
        email: "emma.thompson@example.com",
        fullName: "Emma Thompson",
        username: "Emma Thompson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
        gender: "female",
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Olivia Miller",
        username: "Olivia Miller",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        gender: "female",
    },
    {
        email: "sophia.davis@example.com",
        fullName: "Sophia Davis",
        username: "Sophia Davis",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
        gender: "female",
    },
    {
        email: "ava.wilson@example.com",
        fullName: "Ava Wilson",
        username: "Ava Wilson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
        gender: "female",
    },
    {
        email: "isabella.brown@example.com",
        fullName: "Isabella Brown",
        username: "Isabella Brown",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
        gender: "male",
    },
    {
        email: "mia.johnson@example.com",
        fullName: "Mia Johnson",
        username: "Mia Johnson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
        gender: "male",
    },
    {
        email: "charlotte.williams@example.com",
        fullName: "Charlotte Williams",
        username: "Charlotte Williams",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
        gender: "female",
    },
    {
        email: "amelia.garcia@example.com",
        fullName: "Amelia Garcia",
        username: "Amelia Garcia",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
        gender: "female",
    },

    // Male Users
    {
        email: "james.anderson@example.com",
        fullName: "James Anderson",
        username: "James Anderson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        gender: "male",
    },
    {
        email: "william.clark@example.com",
        fullName: "William Clark",
        username: "William Clark",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
        gender: "male",
    },
    {
        email: "benjamin.taylor@example.com",
        fullName: "Benjamin Taylor",
        username: "Benjamin Taylor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
        gender: "male",
    },
    {
        email: "lucas.moore@example.com",
        fullName: "Lucas Moore",
        username: "Lucas Moore",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
        gender: "male",
    },
    {
        email: "henry.jackson@example.com",
        fullName: "Henry Jackson",
        username: "Henry Jackson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
        gender: "male",
    },
    {
        email: "alexander.martin@example.com",
        fullName: "Alexander Martin",
        username: "Alexander Martin",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
        gender: "male",
    },
    {
        email: "daniel.rodriguez@example.com",
        fullName: "Daniel Rodriguez",
        username: "Daniel Rodriguez",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
        gender: "male",
    },
];

const seedDatabase = async () => {
    try {
        await EstalishConnectionToDB(process.env.MONGO_URI);

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();