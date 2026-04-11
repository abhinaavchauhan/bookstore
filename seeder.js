const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Book = require('./src/models/Book');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Book.deleteMany();

        console.log('Data Destroyed...');

        const createdUsers = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin'
            },
            {
                name: 'Abhinav',
                email: 'abhinavsirt@gmail.com',
                password: 'password123',
                role: 'admin'
            },
            {
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password123',
                role: 'user'
            }
        ]);

        const adminUser = createdUsers[0]._id;

        const books = [
            {
                title: 'The Design of Everyday Things',
                author: 'Don Norman',
                description: 'The Design of Everyday Things shows that good, usable design is possible. The rules are simple: make things visible, exploit natural relationships that couple function and control, and make intelligent use of constraints.',
                price: 24.99,
                category: 'Technology',
                stock: 15,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780465067107-L.jpg'
            },
            {
                title: 'Dune',
                author: 'Frank Herbert',
                description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.',
                price: 18.50,
                category: 'Fiction',
                stock: 30,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg'
            },
            {
                title: 'Cosmos',
                author: 'Carl Sagan',
                description: 'Cosmos is one of the bestselling science books of all time. In clear-eyed prose, Sagan reveals a jewel-like blue world inhabited by a life form that is just beginning to discover its own identity and to venture into the vast ocean of space.',
                price: 22.00,
                category: 'Science',
                stock: 12,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780345539434-L.jpg'
            },
            {
                title: 'Steve Jobs',
                author: 'Walter Isaacson',
                description: 'Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues.',
                price: 28.00,
                category: 'Non-Fiction',
                stock: 25,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg'
            },
            {
                title: 'Clean Code',
                author: 'Robert C. Martin',
                description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.',
                price: 32.50,
                category: 'Technology',
                stock: 10,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg'
            },
            {
                title: 'Atomic Habits',
                author: 'James Clear',
                description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits.',
                price: 19.99,
                category: 'Non-Fiction',
                stock: 50,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'
            },
            {
                title: 'Project Hail Mary',
                author: 'Andy Weir',
                description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn\'t know that. He can\'t even remember his own name.',
                price: 21.00,
                category: 'Fiction',
                stock: 40,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg'
            },
            {
                title: 'A Brief History of Time',
                author: 'Stephen Hawking',
                description: 'A landmark volume in science writing by one of the great minds of our time, Stephen Hawking’s book explores such profound questions as: How did the universe begin—and what made its start possible?',
                price: 16.99,
                category: 'Science',
                stock: 18,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg'
            },
            {
                title: 'The Pragmatic Programmer',
                author: 'Andrew Hunt & David Thomas',
                description: 'The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users.',
                price: 35.00,
                category: 'Technology',
                stock: 8,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg'
            },
            {
                title: 'Sapiens: A Brief History of Humankind',
                author: 'Yuval Noah Harari',
                description: 'From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be "human."',
                price: 23.50,
                category: 'Non-Fiction',
                stock: 100,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg'
            },
            {
                title: 'Neuromancer',
                author: 'William Gibson',
                description: 'The Matrix is a world within the world, a global consensus-hallucination, the representation of every byte of data in cyberspace... Henry Dorsett Case was the sharpest data-thief in the business, until vengeful former employees crippled his nervous system.',
                price: 14.99,
                category: 'Fiction',
                stock: 22,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780441007462-L.jpg'
            },
            {
                title: 'Thinking, Fast and Slow',
                author: 'Daniel Kahneman',
                description: 'The major New York Times bestseller that changes the way we think about thinking. Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind.',
                price: 17.50,
                category: 'Science',
                stock: 14,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg'
            },
            {
                title: 'Zero to One',
                author: 'Peter Thiel',
                description: '#1 NEW YORK TIMES BESTSELLER If you want to build a better future, you must believe in secrets. The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create.',
                price: 26.00,
                category: 'Technology',
                stock: 11,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg'
            },
            {
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                description: 'Paulo Coelho\'s enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert.',
                price: 12.99,
                category: 'Fiction',
                stock: 60,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg'
            },
            {
                title: 'Astrophysics for People in a Hurry',
                author: 'Neil deGrasse Tyson',
                description: 'What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There is no better guide through these mind-expanding questions than acclaimed astrophysicist Neil deGrasse Tyson.',
                price: 18.00,
                category: 'Science',
                stock: 35,
                coverImage: 'https://covers.openlibrary.org/b/isbn/9780393609394-L.jpg'
            }
        ];

        await Book.create(books);

        console.log('✅ Data Imported with Premium Content!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
