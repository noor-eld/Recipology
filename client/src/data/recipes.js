export const recipesByCategory = {
    breakfast: [
      {
        id: 'b1',
        title: 'Fluffy Pancakes',
        image: '/images/breakfast/pancakes.jpg',
        time: '20 min',
        difficulty: 'Easy',
        chef: 'Chef Emma',
        description: 'Light and fluffy pancakes served with maple syrup and fresh berries',
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
        ]
      },
      {
        id: 'b2',
        title: 'Avocado Toast',
        image: '/images/breakfast/avocado-toast.jpg',
        time: '15 min',
        difficulty: 'Easy',
        chef: 'Chef Michael',
        description: 'Creamy avocado spread on toasted sourdough with poached eggs',
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
        ]
      },
      {
        id: 'b3',
        title: 'Breakfast Burrito',
        image: '/images/breakfast/burrito.jpg',
        time: '25 min',
        difficulty: 'Medium',
        chef: 'Chef Carlos',
        description: 'Hearty breakfast burrito filled with eggs, cheese, and vegetables',
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
        ]
      }
    ],
    lunch: [
      {
        id: 'l1',
        title: 'Chicken Caesar Salad',
        image: '/images/lunch/chicken-caesar-salad.jpg',
        time: '30 min',
        difficulty: 'Medium',
        chef: 'Chef Julia',
        description: 'Classic Caesar salad with grilled chicken and homemade dressing',
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
        ]
      },
      {
        id: 'l2',
        title: 'Caprese Sandwich',
        image: '/images/lunch/caprese-sandwich.jpg',
        time: '15 min',
        difficulty: 'Easy',
        chef: 'Chef Isabella',
        description: 'Fresh mozzarella, tomato, and basil on crusty bread',
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
        ]
      },
      {
        id: 'l3',
        title: 'Thai Noodle Bowl',
        image: '/images/lunch/thai-noodle.jpg',
        time: '35 min',
        difficulty: 'Medium',
        chef: 'Chef Sasha',
        description: 'Rice noodles with vegetables in spicy peanut sauce',
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
        ]
      }
    ],
    dinner: [
      {
        id: 'd1',
        title: 'Beef Stir-Fry',
        image: '/images/dinner/beef-stirfry.jpg',
        time: '40 min',
        difficulty: 'Medium',
        chef: 'Chef Lee',
        description: 'Quick beef stir-fry with colorful vegetables',
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
        ]
      },
      {
        id: 'd2',
        title: 'Grilled Salmon',
        image: '/images/dinner/salmon.jpg',
        time: '25 min',
        difficulty: 'Medium',
        chef: 'Chef David',
        description: 'Grilled salmon with lemon herb butter',
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
        ]
      },
      {
        id: 'd3',
        title: 'Vegetable Lasagna',
        image: '/images/dinner/Vegetable-Lasagna.jpg',
        time: '90 min',
        difficulty: 'Hard',
        chef: 'Chef Maria',
        description: 'Layered pasta with vegetables and ricotta',
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
        ]
      }
    ],
    desserts: [
        {
          id: 'ds1',
          title: 'New York Cheesecake',
          image: '/images/desserts/newyork-cheesecake.jpg',
          time: '80 min',
          difficulty: 'Medium',
          chef: 'Chef Anna',
          description: 'Classic creamy New York style cheesecake with graham cracker crust',
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
          ]
        },
        {
          id: 'ds2',
          title: 'Apple Pie',
          image: '/images/desserts/apple-pie.jpg',
          time: '75 min',
          difficulty: 'Hard',
          chef: 'Chef Lisa',
          description: 'Traditional apple pie with flaky butter crust',
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
          ]
        },
        {
          id: 'ds3',
          title: 'Tiramisu',
          image: '/images/desserts/tiramisu.jpg',
          time: '40 min',
          difficulty: 'Medium',
          chef: 'Chef Marco',
          description: 'Italian coffee-flavored dessert with layers of mascarpone cream',
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
          ]
        }
      ],
      vegetarian: [
        {
          id: 'v1',
          title: 'Mushroom Risotto',
          image: '/images/vegetarian/mushroom-risotto.jpg',
          time: '45 min',
          difficulty: 'Medium',
          chef: 'Chef Paolo',
          description: 'Creamy Italian rice dish with mushrooms and parmesan',
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
          ]
        },
        {
          id: 'v2',
          title: 'Buddha Bowl',
          image: '/images/vegetarian/buddha-bowl.jpg',
          time: '30 min',
          difficulty: 'Easy',
          chef: 'Chef Maya',
          description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
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
          ]
        },
        {
          id: 'v3',
          title: 'Eggplant Parmesan',
          image: '/images/vegetarian/eggplant-parmesan.jpg',
          time: '60 min',
          difficulty: 'Medium',
          chef: 'Chef Sofia',
          description: 'Layers of breaded eggplant with tomato sauce and cheese',
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
          ]
        }
      ],
      quick: [
        {
          id: 'q1',
          title: '15-Minute Pasta',
          image: '/images/quick/quick-pasta.jpg',
          time: '15 min',
          difficulty: 'Easy',
          chef: 'Chef Tom',
          description: 'Quick and delicious pasta with cherry tomatoes and garlic',
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
          ]
        },
        {
          id: 'q2',
          title: 'Quick Quesadillas',
          image: '/images/quick/quesadillas.jpg',
          time: '20 min',
          difficulty: 'Easy',
          chef: 'Chef Luis',
          description: 'Crispy quesadillas filled with cheese and vegetables',
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
          ]
        },
        {
          id: 'q3',
          title: '5-Minute Smoothie Bowl',
          image: '/images/quick/smoothie-bowl.jpg',
          time: '5 min',
          difficulty: 'Easy',
          chef: 'Chef Nina',
          description: 'Healthy smoothie bowl topped with fresh fruits and granola',
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
          ]
        }
      ]
  };

  export const featuredRecipes = [
    {
      id: 'f1',
      title: 'Classic Spaghetti Carbonara',
      image: '/images/featured/spaghetti-carbonara.jpg',
      time: '30 min',
      difficulty: 'Medium',
      chef: 'Chef Maria',
      description: 'Traditional Italian pasta with eggs, cheese, and pancetta',
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
      ]
    },
    {
        id: 'f2',
        title: "Homemade Pizza Margherita",
        image: "/images/featured/pizza-margherita.jpg",
        time: "45 min",
        difficulty: "Easy",
        chef: "Chef John",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
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
        ]
      },
      {
        id: 'f3',
        title: "Chocolate Lava Cake",
        image: "/images/featured/lava-cake.jpg",
        time: "25 min",
        difficulty: "Medium",
        chef: "Chef Sarah",
        description: "Decadent chocolate cake with molten center",
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
        ]
      }
    ];