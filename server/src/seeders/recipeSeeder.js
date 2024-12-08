const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
require('dotenv').config();

// Prefilled recipes data structure modified for database format
const recipesToSeed = [
    // Breakfast Recipes
    {
      title: 'Fluffy Pancakes',
      description: 'Light and fluffy pancakes served with maple syrup and fresh berries',
      category: 'breakfast',
      prepTime: 10,
      cookTime: 10,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        '2 cups all-purpose flour',
        '2 eggs',
        '1½ cups milk',
        '¼ cup melted butter',
        '2 tbsp sugar',
        '2 tsp baking powder',
        '½ tsp salt',
        '1 tsp vanilla extract'
      ],
      instructions: [
        'Mix dry ingredients in a large bowl',
        'Whisk wet ingredients in another bowl',
        'Combine wet and dry ingredients until just mixed',
        'Cook on a preheated griddle until bubbles form',
        'Flip and cook until golden brown'
      ],
      image: '/images/breakfast/pancakes.jpg'
    },
    {
      title: 'Avocado Toast',
      description: 'Creamy avocado spread on toasted sourdough with poached eggs',
      category: 'breakfast',
      prepTime: 10,
      cookTime: 5,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        '2 slices sourdough bread',
        '1 ripe avocado',
        '2 eggs',
        'Salt and pepper',
        'Red pepper flakes',
        'Olive oil'
      ],
      instructions: [
        'Toast the bread until golden',
        'Mash avocado with salt and pepper',
        'Poach eggs in simmering water',
        'Spread avocado on toast',
        'Top with poached eggs and seasonings'
      ],
      image: '/images/breakfast/avocado-toast.jpg'
    },
    {
      title: 'Breakfast Burrito',
      description: 'Hearty breakfast burrito filled with eggs, cheese, and vegetables',
      category: 'breakfast',
      prepTime: 15,
      cookTime: 10,
      servings: 2,
      difficulty: 'Medium',
      ingredients: [
        'Large flour tortillas',
        'Scrambled eggs',
        'Black beans',
        'Cheddar cheese',
        'Diced tomatoes',
        'Avocado',
        'Hot sauce'
      ],
      instructions: [
        'Scramble eggs with seasonings',
        'Warm tortillas slightly',
        'Layer ingredients in tortilla',
        'Roll burrito tightly',
        'Toast in pan until golden'
      ],
      image: '/images/breakfast/burrito.jpg'
    },
  
    // Lunch Recipes
    {
      title: 'Chicken Caesar Salad',
      description: 'Classic Caesar salad with grilled chicken and homemade dressing',
      category: 'lunch',
      prepTime: 20,
      cookTime: 10,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        'Romaine lettuce',
        'Grilled chicken breast',
        'Parmesan cheese',
        'Croutons',
        'Caesar dressing',
        'Black pepper'
      ],
      instructions: [
        'Grill chicken until cooked through',
        'Chop lettuce into bite-size pieces',
        'Make dressing with egg, garlic, and anchovies',
        'Combine ingredients and toss',
        'Top with extra parmesan'
      ],
      image: '/images/lunch/chicken-caesar-salad.jpg'
    },
    {
      title: 'Caprese Sandwich',
      description: 'Fresh mozzarella, tomato, and basil on crusty bread',
      category: 'lunch',
      prepTime: 10,
      cookTime: 5,
      servings: 1,
      difficulty: 'Easy',
      ingredients: [
        'Ciabatta bread',
        'Fresh mozzarella',
        'Ripe tomatoes',
        'Fresh basil',
        'Balsamic glaze',
        'Olive oil'
      ],
      instructions: [
        'Slice bread and toast lightly',
        'Layer mozzarella and tomatoes',
        'Add fresh basil leaves',
        'Drizzle with oil and balsamic',
        'Season with salt and pepper'
      ],
      image: '/images/lunch/caprese-sandwich.jpg'
    },
    {
      title: 'Thai Noodle Bowl',
      description: 'Rice noodles with vegetables in spicy peanut sauce',
      category: 'lunch',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        'Rice noodles',
        'Mixed vegetables',
        'Peanut sauce',
        'Bean sprouts',
        'Lime',
        'Cilantro'
      ],
      instructions: [
        'Cook noodles according to package',
        'Prepare peanut sauce',
        'Stir-fry vegetables',
        'Combine noodles and sauce',
        'Garnish with fresh herbs'
      ],
      image: '/images/lunch/thai-noodle.jpg'
    },
  
    // Dinner Recipes
    {
      title: 'Beef Stir-Fry',
      description: 'Quick beef stir-fry with colorful vegetables',
      category: 'dinner',
      prepTime: 20,
      cookTime: 20,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        'Sliced beef',
        'Mixed vegetables',
        'Soy sauce',
        'Ginger',
        'Garlic',
        'Rice'
      ],
      instructions: [
        'Marinate beef in soy sauce',
        'Cook rice',
        'Stir-fry vegetables',
        'Add beef and sauce',
        'Serve over rice'
      ],
      image: '/images/dinner/beef-stirfry.jpg'
    },
    {
      title: 'Grilled Salmon',
      description: 'Grilled salmon with lemon herb butter',
      category: 'dinner',
      prepTime: 10,
      cookTime: 15,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        'Salmon fillets',
        'Lemon',
        'Butter',
        'Fresh herbs',
        'Garlic',
        'Salt and pepper'
      ],
      instructions: [
        'Make herb butter',
        'Season salmon',
        'Grill until flaky',
        'Top with herb butter',
        'Garnish with lemon'
      ],
      image: '/images/dinner/salmon.jpg'
    },
    {
      title: 'Vegetable Lasagna',
      description: 'Layered pasta with vegetables and ricotta',
      category: 'dinner',
      prepTime: 30,
      cookTime: 60,
      servings: 8,
      difficulty: 'Hard',
      ingredients: [
        'Lasagna noodles',
        'Mixed vegetables',
        'Ricotta cheese',
        'Marinara sauce',
        'Mozzarella',
        'Herbs'
      ],
      instructions: [
        'Prepare vegetables',
        'Layer noodles and filling',
        'Add cheese and sauce',
        'Bake until bubbly',
        'Let rest before serving'
      ],
      image: '/images/dinner/Vegetable-Lasagna.jpg'
    },
  
    // Dessert Recipes
    {
      title: 'New York Cheesecake',
      description: 'Classic creamy New York style cheesecake with graham cracker crust',
      category: 'desserts',
      prepTime: 30,
      cookTime: 50,
      servings: 12,
      difficulty: 'Medium',
      ingredients: [
        'Cream cheese',
        'Graham crackers',
        'Sugar',
        'Eggs',
        'Vanilla extract',
        'Sour cream'
      ],
      instructions: [
        'Make graham cracker crust',
        'Beat cream cheese mixture',
        'Add eggs one at a time',
        'Bake in water bath',
        'Cool and chill overnight'
      ],
      image: '/images/desserts/newyork-cheesecake.jpg'
    },
    {
      title: 'Apple Pie',
      description: 'Traditional apple pie with flaky butter crust',
      category: 'desserts',
      prepTime: 45,
      cookTime: 30,
      servings: 8,
      difficulty: 'Hard',
      ingredients: [
        'Apples',
        'Butter',
        'Flour',
        'Sugar',
        'Cinnamon',
        'Lemon juice'
      ],
      instructions: [
        'Make pie crust',
        'Prepare apple filling',
        'Assemble pie',
        'Bake until golden',
        'Cool before serving'
      ],
      image: '/images/desserts/apple-pie.jpg'
    },
    {
      title: 'Tiramisu',
      description: 'Italian coffee-flavored dessert with layers of mascarpone cream',
      category: 'desserts',
      prepTime: 30,
      cookTime: 10,
      servings: 8,
      difficulty: 'Medium',
      ingredients: [
        'Ladyfingers',
        'Mascarpone',
        'Coffee',
        'Eggs',
        'Cocoa powder',
        'Marsala wine'
      ],
      instructions: [
        'Prepare coffee mixture',
        'Make mascarpone filling',
        'Layer soaked ladyfingers',
        'Chill overnight',
        'Dust with cocoa'
      ],
      image: '/images/desserts/tiramisu.jpg'
    },
  
    // Vegetarian Recipes
    {
      title: 'Mushroom Risotto',
      description: 'Creamy Italian rice dish with mushrooms and parmesan',
      category: 'vegetarian',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        'Arborio rice',
        'Mixed mushrooms',
        'Vegetable broth',
        'White wine',
        'Parmesan',
        'Onion'
      ],
      instructions: [
        'Sauté mushrooms',
        'Toast rice',
        'Add wine and broth gradually',
        'Stir until creamy',
        'Finish with parmesan'
      ],
      image: '/images/vegetarian/mushroom-risotto.jpg'
    },
    {
      title: 'Buddha Bowl',
      description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
      category: 'vegetarian',
      prepTime: 20,
      cookTime: 10,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        'Quinoa',
        'Sweet potato',
        'Chickpeas',
        'Kale',
        'Avocado',
        'Tahini'
      ],
      instructions: [
        'Cook quinoa',
        'Roast vegetables',
        'Prepare tahini sauce',
        'Assemble bowl',
        'Add toppings'
      ],
      image: '/images/vegetarian/buddha-bowl.jpg'
    },
    {
      title: 'Eggplant Parmesan',
      description: 'Layers of breaded eggplant with tomato sauce and cheese',
      category: 'vegetarian',
      prepTime: 30,
      cookTime: 30,
      servings: 6,
      difficulty: 'Medium',
      ingredients: [
        'Eggplant',
        'Breadcrumbs',
        'Marinara sauce',
        'Mozzarella',
        'Parmesan',
        'Basil'
      ],
      instructions: [
        'Bread eggplant slices',
        'Fry until golden',
        'Layer with sauce and cheese',
        'Bake until bubbly',
        'Garnish with basil'
      ],
      image: '/images/vegetarian/eggplant-parmesan.jpg'
    },
  
    // Quick Recipes
    {
      title: '15-Minute Pasta',
      description: 'Quick and delicious pasta with cherry tomatoes and garlic',
      category: 'quick',
      prepTime: 5,
      cookTime: 10,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        'Spaghetti',
        'Cherry tomatoes',
        'Garlic',
        'Olive oil',
        'Basil',
        'Parmesan'
      ],
      instructions: [
        'Boil pasta',
        'Sauté garlic and tomatoes',
        'Toss with pasta',
        'Add fresh basil',
        'Top with cheese'
      ],
      image: '/images/quick/quick-pasta.jpg'
    },
    {
      title: 'Quick Quesadillas',
      description: 'Crispy quesadillas filled with cheese and vegetables',
      category: 'quick',
      prepTime: 10,
      cookTime: 10,
      servings: 2,
      difficulty: 'Easy',
      ingredients: [
        'Tortillas',
        'Cheese',
        'Bell peppers',
        'Onion',
        'Salsa',
        'Sour cream'
      ],
      instructions: [
        'Prep vegetables',
        'Assemble quesadillas',
        'Cook until crispy',
        'Cut into wedges',
        'Serve with toppings'
      ],
      image: '/images/quick/quesadillas.jpg'
    },
    {
      title: '5-Minute Smoothie Bowl',
      description: 'Healthy smoothie bowl topped with fresh fruits and granola',
      category: 'quick',
      prepTime: 5,
      cookTime: 0,
      servings: 1,
      difficulty: 'Easy',
      ingredients: [
        'Frozen berries',
        'Banana',
        'Yogurt',
        'Honey',
        'Granola',
        'Chia seeds'
      ],
      instructions: [
        'Blend frozen fruits',
        'Add yogurt and honey',
        'Pour into bowl',
        'Add toppings',
        'Serve immediately'
      ],
      image: '/images/quick/smoothie-bowl.jpg'
    },
  
    // Featured Recipes
    {
      title: 'Classic Spaghetti Carbonara',
      description: 'Traditional Italian pasta with eggs, cheese, and pancetta',
      category: 'featured',
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      difficulty: 'Medium',
      ingredients: [
        'Spaghetti',
        'Eggs',
        'Pecorino Romano',
        'Pancetta',
        'Black pepper',
        'Salt'
      ],
      instructions: [
        'Cook pasta al dente',
        'Crisp pancetta',
        'Mix eggs and cheese',
        'Combine all ingredients',
        'Serve immediately'
      ],
      image: '/images/featured/spaghetti-carbonara.jpg'
    },
    {
      title: 'Homemade Pizza Margherita',
      description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
      category: 'featured',
      prepTime: 25,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      ingredients: [
        'Pizza dough',
        'San Marzano tomatoes',
        'Fresh mozzarella',
        'Fresh basil',
        'Olive oil',
        'Salt'
      ],
      instructions: [
        'Stretch dough into circle',
        'Spread crushed tomatoes',
        'Add torn mozzarella',
        'Bake at high heat',
        'Garnish with basil'
      ],
      image: '/images/featured/pizza-margherita.jpg'
    },
    {
      title: 'Chocolate Lava Cake',
      description: 'Decadent chocolate cake with molten center',
      category: 'featured', 
      prepTime: 15,
      cookTime: 10,
      servings: 2,
      difficulty: 'Medium',
      ingredients: [
        'Dark chocolate',
        'Butter',
        'Eggs',
        'Sugar', 
        'Flour',
        'Vanilla'
      ],
      instructions: [
        'Melt chocolate and butter',
        'Mix wet and dry ingredients',
        'Pour into ramekins',
        'Bake until edges set',
        'Serve immediately'
      ],
      image: '/images/featured/lava-cake.jpg'
    }
   ];
   

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // Create a default admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@recipology.com' });
    if (!adminUser) {
      adminUser = await User.create({
        username: 'admin',
        email: 'admin@recipology.com',
        password: 'admin123'  // Change this to a secure password
      });
      console.log('Created admin user');
    }

    // Add admin user reference to all recipes
    const recipesWithAuthor = recipesToSeed.map(recipe => ({
      ...recipe,
      author: adminUser._id
    }));

    // Insert recipes
    await Recipe.insertMany(recipesWithAuthor);
    console.log('Seeded recipes successfully');

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();