from app.models import db, Recipe, environment, SCHEMA

def seed_recipes():
    recipe1 = Recipe(
        creator_id = 1,
        name = "Grandma's Spaghetti and Meatballs",
        description = "There’s little more comforting on a weeknight — or any night — than spaghetti, tossed in marinara sauce and paired with savory meatballs. This hearty recipe features three kinds of meat — ground pork shoulder, veal and beef chuck, along with minced bacon — rolled into small balls, which are then browned in a sauté pan, and baked until cooked through. Serve the whole thing with a bowl of grated Parmesan, ready to be heaped on.",
        cuisine = "Italian",
        difficulty = 3,
        prep_time = 120,
        preview_img = "https://static01.nyt.com/images/2015/09/25/dining/drop-meatballs/drop-meatballs-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: Make the meatballs. In a large bowl, combine bread crumbs and cream. Let it sit for 5 minutes, then mash the mixture with a fork. Mix in the oregano, pepper flakes, black pepper, salt and bacon. Gently work in the pork, veal and beef. Be careful not to knead it into oblivion, or the meatballs will be tough little pebbles. Fry a little of the mixture in some butter and oil in a skillet and taste, adjusting seasonings. Roll into small meatballs, about an inch across. (If you have a kitchen scale, measure an ounce apiece.) Step 2: Heat the oven to 375 degrees. In a large sauté pan, warm the butter and olive oil over medium-high heat. Brown the meatballs, turning every couple of minutes. (Work in batches if they won’t all fit in the pan.) Transfer them to a roasting pan big enough to hold them all. Pour 2 cups of cold water into the pan and transfer it to the oven to bake for 20 to 30 minutes or so, until the meatballs are cooked through. Transfer to a plate and cover with aluminum foil to keep warm. Step 3: Boil the spaghetti in a large pot of salted water, and heat the marinara sauce in a pot. When the spaghetti is tender, toss it with the sauce. Season to taste. Put the cheese in a bowl and set it on the table. Make sure to ask your family if they want their meatballs on top of the spaghetti or on the side.",
        ingredients = """
1 loaf fresh ciabatta, crusts removed, whirred in a blender or food processor to make crumbs (about 2 cups).
⅓ cup heavy cream.
1 teaspoon fresh oregano leaves, chopped.
¼ teaspoon red-pepper flakes.
1 teaspoon black pepper.
2 teaspoons salt.
½ cup minced bacon about 3 slices.
½ pound ground pork shoulder.
½ pound ground veal.
½ pound ground beef chuck.
2 tablespoons butter.
2 tablespoons olive oil.
1 pound spaghetti.
2 cups marinara sauce.
Grated Parmesan cheese, for serving.""",
        servings = 6,
        created_at = "2023-01-10",
        updated_at = "2023-01-10"
    )
    recipe2 = Recipe(
        creator_id = 2,
        name = "Brown Butter Poundcake",
        description = "This rich and nutty loaf is deeply flavorful and incredibly tender owing to plenty of brown butter and toasty hazelnuts. A thin layer of crackly lemon icing lightens and brightens it. Enjoy this cake with a cup of tea in the afternoon, or top it with cream and berries for a delicious dessert. Either way, you may find yourself sneaking a little slice every time you walk by the plate.",
        cuisine = "American",
        difficulty = 4,
        prep_time = 80,
        preview_img = "https://static01.nyt.com/images/2021/02/24/dining/ya-browned-butter-lemon-loaf-cake/ya-browned-butter-lemon-loaf-cake-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: Brown the butter. Melt the butter in a small skillet set over medium heat. (Use a skillet with a light interior so you can easily see the milk solids change color.) Cook the butter, stirring occasionally and scraping the milk solids off the bottom and sides of the pan as needed, until the milk solids turn golden brown and smell toasty, about 2 minutes. Transfer the butter to a small bowl and refrigerate until slightly firm and creamy looking but not totally hardened, about 30 to 60 minutes. (It should be the texture of a softened stick of butter.) Step 2: Heat oven to 350 degrees with a rack set in the center. Butter an 8-by-4-inch loaf pan and line it with a strip of parchment paper that hangs over the two long sides. Step 3: Add the hazelnuts to the bowl of a food processor and pulse until finely ground. Add the flour and baking powder, and pulse to combine. Step 4: Combine the chilled browned butter, sugar, lemon zest and salt in the bowl of a stand mixer fitted with the paddle attachment, or use a large bowl and electric hand mixer. Mix on medium-high speed until light and fluffy, stopping the mixer once or twice to scrape down the sides of the bowl and paddle, about 5 minutes. Step 5: Add the eggs one at time, completely mixing each egg in before adding the next. Step 6: With the mixer on low, add the flour mixture in three additions, alternating with the milk, beginning and ending with the flour. Stop the mixer occasionally to scrape the bottom and sides of the bowl to ensure the batter is evenly mixed. Step 7: Spoon the batter into the prepared pan, smooth the top, and bake until golden and a cake tester inserted into the center comes out clean, 55 to 65 minutes. Let the cake cool in the pan for about 15 minutes, then use the parchment paper to lift it out of the pan and onto a rack to cool completely. Step 8: When the cake is cool, make the glaze: Whisk the confectioners’ sugar and 2 tablespoons lemon juice until smooth. Add a bit more juice if necessary to make a pourable but opaque glaze. Drizzle the glaze over the cooled loaf and let it set for about 15 minutes before slicing. Store the cake covered, at room temperature, for about 4 days.",
        ingredients = """
¾ cup or 170 grams unsalted butter (1½ sticks), plus more for greasing.
1 cup or 140 grams toasted, cooled, peeled hazelnuts.
1 cup or 130 grams all-purpose flour.
½ teaspoon baking powder.
1 cup or 200 grams granulated sugar.
1 tablespoon fresh lemon zest and 2 tablespoons lemon juice, plus more juice as needed (from 1 large lemon).
¾ teaspoon kosher salt.
3 large eggs, at room temperature.
½ cup or 120 milliliters whole milk, at room temperature.
1 cup or 100 grams confectioners’ sugar.
        """,
        servings = 10,
        created_at = "2023-01-15",
        updated_at = "2023-01-15"
    )
    recipe3 = Recipe(
        creator_id = 3,
        name = "Chicken Enchiladas",
        description = "You could poach chicken breasts for these enchiladas, as Amanda Hesser did when she first published this recipe in The Times in 2002, or you could use store-bought rotisserie chicken. After reading several comments from readers who felt the sauce needed to be doubled, we retested the recipe and agreed. We've updated the amounts accordingly.",
        cuisine = "Mexican",
        difficulty = 3,
        prep_time = 120,
        preview_img = "https://static01.nyt.com/images/2017/04/06/dining/06COOKING-ENCHILADAS1/06COOKING-ENCHILADAS1-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: Bring a pan of salted water to a simmer and poach the chicken over low heat until just cooked through, about 9 minutes. Remove to a bowl. Let cool. With your fingers, finely shred the chicken. Lightly season with salt, toss to mix and set aside. Step 2: Meanwhile, make the sauce. Cut the tomatillos in half. Heat the oil in a skillet large enough to fit the tomatillos in 1 layer. When the oil shimmers, add the chopped onion and jalapeño and sauté until the onion is softened at the edges. Add the tomatillos, season with salt and continue cooking until wilted. Turn off the heat and let cool for a few minutes. Step 3: Pour the tomatillos into a food processor or blender and blend until smooth. Add the cilantro. Adjust the seasoning. Pour the sauce into a shallow bowl. Step 4: Preheat the oven to 350 degrees. Grease a 2-quart baking dish and spread a little sauce on the bottom. Working with 1 tortilla at a time, soften each in a dry, hot skillet for about 8 seconds per side, then coat lightly with sauce. Lay each tortilla on a plate and sprinkle about ⅓ cup of shredded chicken in the middle and roll into a cylinder. Repeat, lining up tortillas tightly in the dish. Step 5: Spread the rest of the sauce over the tortillas and sprinkle with queso añejo. Cover the dish with aluminum foil and place in the oven. Bake until heated through, about 15 minutes. Remove the foil and bake 10 minutes longer, until the queso añejo is melted. Dollop with crema, garnish with onion rings and serve with additional crema.",
        ingredients = """
Sea salt or kosher salt.
4 skinless, boneless chicken breasts.
2 pounds tomatillos, papery skin removed.
2 tablespoons vegetable oil.
2 large white onions, peeled, 1 chopped, the other sliced into rings.
2 tablespoons minced jalapeño.
3 tablespoons chopped cilantro.
12 corn tortillas.
8 ounces queso añejo or cotija, crumbled.
Mexican crema or crème fraîche for serving.
        """,
        servings = 4,
        created_at = "2023-01-05",
        updated_at = "2023-01-05"
    )
    recipe4 = Recipe(
        creator_id = 4,
        name = "One-Ingredient Banana Ice Cream",
        description = "This outrageously easy \"ice cream\" is just the sort of dessert to please everyone at the table – the vegans, the lactose-intolerant, the paleo enthusiasts, the picky children. Just toss four frozen bananas into a blender and give it a good whirl. If you like soft-serve consistency, eat it right away (and adding a few tablespoons of milk to the blender wouldn't hurt, but it's not necessary). For more traditional scoops, freeze it in an airtight container, and dole out as you would the Ben & Jerry's. Consider adding a spoonful of peanut butter, Nutella or honey; a handful of chocolate chips or almonds; or a ½ teaspoon of powdered ginger, cardamom or cinnamon.",
        cuisine = "American",
        difficulty = 4,
        prep_time = 150,
        preview_img = "https://static01.nyt.com/images/2016/05/24/dining/24COOKING-BANANA-ICE-CREAM1/24COOKING-BANANA-ICE-CREAM1-articleLarge-v2.jpg?w=1280&q=75",
        instructions = "Step 1: Peel the bananas, cut them in 2- to 3-inch chunks and place them in a freezer bag in the freezer for at least 6 hours. Remove and blend in a blender until smooth. Serve immediately, or freeze in an airtight container for at least 2 hours. Scoop and serve.",
        ingredients = """
4 ripe bananas.
        """,
        servings = 4,
        created_at = "2023-01-03",
        updated_at = "2023-01-03"
    )
    recipe5 = Recipe(
        creator_id = 5,
        name = "Spicy Sesame Noodles With Chicken and Peanuts",
        description = "In this quick and spicy weeknight noodle dish, sizzling hot oil is poured over red-pepper flakes, orange peel, crunchy peanuts, soy sauce and sesame oil. While you brown the ground chicken, the mixture sits, and the flavors become more pronounced and fiery. Tossed with soft noodles and browned chicken, the bright chile-peanut oil shines. If you crave something green, throw in a quick-cooking green vegetable when you break up the chicken in Step 3. You can also swap the chicken with ground pork or beef, or crumbled tofu.",
        cuisine = "Chinese",
        difficulty = 3,
        prep_time = 100,
        preview_img = "https://static01.nyt.com/images/2019/12/18/dining/as-sesame-noodles/merlin_165769617_7f8cc187-825d-4114-ba1a-34c342286a07-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: In a medium heatproof bowl, stir together the red-pepper flakes, soy sauce and sesame oil. Set next to the stovetop. Step 2: Bring a large pot of salted water to boil. Meanwhile, in a large (12-inch) skillet over medium heat, cook the ½ cup oil, peanuts and orange rind, shaking the pan occasionally, until the peanuts are golden and bubbling, 3 to 5 minutes. Immediately pour the contents of the skillet over the red-pepper mixture (be careful of splattering!) and set aside. Step 3: Meanwhile, in the same skillet, heat the remaining tablespoon oil over medium-high. Add the chicken and press it down with a wooden spoon into a thin layer. Season with salt and a generous amount of black pepper and cook, without stirring, occasionally pressing the layer of chicken down, until the bottom is browned, 5 to 7 minutes. Break the chicken up into small pieces and cook, stirring occasionally, until cooked through, 1 to 2 minutes more. Step 4: While the chicken cooks, cook the noodles according to package directions, until chewy but not soft. Drain and toss with a bit of sesame oil. Step 5: Remove and discard the orange rind from the chile oil. Off the heat, add enough chile oil to coat the chicken and stir, scraping up any browned bits from the pan. Add the noodles and toss, adding more chile oil to fully coat the noodles and chicken. (If you don't use all of the chile oil, you can store it in the refrigerator for 2 weeks in an airtight container.) Top with chives and serve at once.",
        ingredients = f"""
1½ tablespoons red-pepper flakes.
1½ tablespoons low-sodium soy sauce.
1½ teaspoons toasted sesame oil, plus more as needed.
Kosher salt and black pepper.
½ cup plus 1 tablespoon neutral oil, like grapeseed or vegetable.
6 tablespoons roasted, salted peanuts, coarsely chopped.
Rind of ½ orange, peeled into 2- to 3-inch strips.
1 pound ground chicken.
10 to 12 ounces ramen or udon noodles, preferably fresh.
3 tablespoons finely chopped chives.
        """,
        servings = 4,
        created_at = "2023-01-13",
        updated_at = "2023-01-13"
    )
    recipe6 = Recipe(
        creator_id = 1,
        name = "Yaki Onigiri (Grilled Japanese Rice Balls) With Pickled Shiitakes",
        description = "Onigiri, also known as omusube, are portable snacks, often sold in Japanese convenience stores, which are traditionally stuffed with salty, tangy fillings, then wrapped in seaweed. When grilled, glazed or cooked, they become yaki onigiri. In this version, adapted from “Vegan JapanEasy: Classic and Modern Vegan Japanese Recipes to Cook at Home” by Tim Anderson (Hardie Grant, 2020), a little bit of the pickled shiitake filling goes a long way. (The recipe makes extra, which you can keep refrigerated to add to stir-fries, ramen or even omelets.) You could also stuff these with finely chopped kimchi, Japanese pickles, sautéed greens or nothing at all. Available online or at most Japanese supermarkets, an onigiri mold makes for sleek shaping, but, with a little practice, you could also form the shape by hand, or simply roll the rice between your palms into balls. For hot yaki onigiri, brush them with the miso glaze, which will form a delightful crackly, caramelized crust when broiled.",
        cuisine = "Japanese",
        difficulty = 5,
        prep_time = 120,
        preview_img = "https://static01.nyt.com/images/2020/04/22/dining/22Cookbook-Onigiri/22Cookbook-Onigiri-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: Prepare the filling if using shiitakes. Add the shiitakes to a medium saucepan and top with cold water by a couple of inches. Stir to combine. Heat over medium-low just until bubbles start to break the surface. Cover and set aside to rehydrate for about 30 minutes. Once the mushrooms are tender, transfer them to a cutting board and thinly slice. (Save the mushroom stock for another use.) Toss sliced mushrooms with chile flakes, then transfer to a jar or lidded container. Top with soy sauce, mirin and rice vinegar. Cover and refrigerate. Let pickle at least 2 hours to develop flavor. They’re even better after a few days and will keep refrigerated for up to 6 months. Step 2: After the mushrooms have pickled (if using), prepare the rice. Add the rice to a medium saucepan with a tight-fitting lid. Rinse the grains to remove any excess starch, and cover rice with cold water by 1 or 2 inches. Swish them around with outstretched fingers, then drain the rice, repeating the process three or four times until the water goes from milky to just slightly cloudy. Step 3: Pour 1¾ cups/420 milliliters water into the rinsed, drained rice, and give the rice a stir to distribute evenly. If time permits, let the rice soak for 15 to 30 minutes, which will help the grains cook even more evenly. Step 4: Heat the rice over high and bring to a boil, stirring occasionally, about 5 minutes. Once the mixture comes to a boil, cover it with the lid and reduce the heat to low or medium-low. You want a low heat that is still high enough to hear the rice bubbling. You should be able to see some steam escaping from the lid; turn the heat up slightly if necessary. Set a timer for 15 minutes and let it cook, undisturbed. (No peeking, or you’ll lose precious moisture!) Step 5: After 15 minutes, turn off the heat and gently fluff the rice using chopsticks or a fork. Put the lid back on and let sit for another 5 to 10 minutes to finish cooking in the residual heat. Tip the rice onto a baking sheet to cool slightly. Step 6: While the rice cooks, prepare the miso sauce, if making hot, glazed yaki onigiri. In a small bowl, whisk together the miso, sesame oil, mirin, sugar, sake and rice vinegar until smooth and sugar has dissolved. Step 7: Once the rice has cooled enough to be handled comfortably, brush a baking sheet lightly with neutral oil, so the onigiri don’t stick, and prepare a bowl of water for rinsing your hand to prevent the rice from sticking. Form your onigiri. If using Japanese onigiri mold, press about ⅓ cup cooked rice in the bottom, press an indentation in the center to stuff with about 2 teaspoons of finely chopped filling, then top with another ⅓ cup layer of rice, pressing down with the top piece of your rice mold. Transfer onigiri to the greased baking sheet. Step 8: If working by hand, you’ll want to grab a large handful of rice, compress the rice into a ball in the palm of your hand, then press the sides to form a triangular shape, flattening it into a triangular patty. (This shaping process requires some finesse, but you can also form rounded balls and simply compress them into pucks.) Transfer to the prepared baking sheet, rinsing your hands as needed. Step 9: If stuffing with mushrooms or other fillings, you’ll need only 1 to 3 teaspoons per onigiri, depending on the size of your rice rolls. Compress the first handful of rice in your palm. Add the filling to the center and fold the rice up the sides. (You want to make sure the filling is just in the center portion. If the rice doesn’t create a seal, the onigiri will fall apart.) Top with another layer of rice and compress on all sides to form onigiri in the desired shape. Step 10: Garnish with sesame seeds and wrap with a small rectangle of nori, if using, and serve immediately. (Onigiri can be prepared 1 day in advance, wrapped in plastic and refrigerated, but should come to room temperature before being consumed.) Step 11: If making yaki onigiri, brush the top of the onigiri with miso sauce. Transfer to the oven and broil until the glaze forms a crust that is golden and lightly browned in spots, rotating if necessary, about 5 minutes. Carefully slip a flat spatula underneath to flip yaki onigiri; brush on the other side and broil until glazed on the second side, another 5 minutes. Garnish as you would onigiri.",
        ingredients = """
24 dried shiitake mushrooms.
½ teaspoon Japanese chile flakes, or a pinch of cayenne or red-pepper flakes.
¾ cup tamari or soy sauce (preferably low sodium).
½ cup mirin.
3 tablespoons rice vinegar.
1½ cups sushi rice (Japanese short-grain rice).
Neutral oil, for brushing.
Sesame seeds, for garnish (optional).
1 sheet of nori, cut into small rectangles (optional).
        """,
        servings = 4,
        created_at = "2023-01-22",
        updated_at = "2023-01-22"
    )
    recipe7 = Recipe(
        creator_id = 2,
        name = "Vegan Twice-Baked Potatoes",
        description = "The best of both worlds, twice-baked potatoes give you the creaminess of mashed potatoes and the crispy skin of baked potatoes. Vegan butter and milk give this dairy-free version a silky texture, nutritional yeast and jammy-soft onions make it rich in flavor, while vinegar and chives lift and brighten. You could add grated vegan cheese to the filling, but these potatoes are chock-full of exciting bites as they are. Eat alongside a big green salad, BBQ tofu, tomato soup, vegan sausages or mushroom bourguignon.",
        cuisine = "American",
        difficulty = 2,
        prep_time = 90,
        preview_img = "https://static01.nyt.com/images/2023/02/17/multimedia/as-vegan-twice-baked-potatoes-fmcv/as-vegan-twice-baked-potatoes-fmcv-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: Heat the oven to 400 degrees. In an oven-safe skillet or baking dish large enough to hold the potatoes, toss together the chopped onions, 1 tablespoon oil, 1 tablespoon water and pinches of salt and pepper. Using a fork, poke holes all over the potatoes. In a large bowl, toss the potatoes with the remaining 1 tablespoon oil and a pinch of salt. Step 2: Place the onions on the bottom rack of the oven and the potatoes directly on the top rack above the onions. (This way, any drips from the potatoes will land on the onions instead of the bottom of your oven.) Reserve the bowl. Roast, stirring the onions halfway through, until the onions are softened and browned in spots, 30 to 40 minutes, and the potatoes offer no resistance when a knife is inserted in their centers, 1 hour to 1 hour 15 minutes. Remove from the oven when each is finished and let the potatoes sit until cool enough to handle. (If your potatoes are dripping, place a piece of aluminum foil on the lower rack to catch any drips once the onions below have been removed.) Leave the oven on. Step 3: While the potatoes and onions roast, stir the vinegar into the milk. Step 4: When the potatoes are cool enough to handle, slice the top third lengthwise off the potatoes. Scoop out most of the flesh, leaving a ¼-inch border of flesh on the skin, and transfer the flesh to the reserved bowl. Scrape the potato tops of all flesh and add the flesh to the bowl. Snack on, compost or discard the top skins. Step 5: Season the potato filling generously with salt and pepper, then add the butter and nutritional yeast. Mash with a fork or potato masher until smooth, but don’t overwork. Add the onions and milk mixture; stir to combine. (Reserve the skillet.) If the mixture is stiff or dry, add more milk; season to taste with salt and pepper. Step 6: Mound each potato boat with the filling, then transfer to the reserved skillet, filling side up. Bake the potatoes until warmed through and dry to the touch, 10 to 15 minutes. Sprinkle with chives, if using.",
        ingredients = """
1 yellow onion, coarsely chopped.
2 tablespoons neutral oil.
Salt and pepper.
4 large russet potatoes.
1½ tablespoons white vinegar.
½ cup nondairy milk, plus more as needed.
¼ cup vegan butter.
2 tablespoons nutritional yeast.
Chopped chives (optional), for serving.
        """,
        servings = 4,
        created_at = "2023-01-10",
        updated_at = "2023-01-10"
    )
    recipe8 = Recipe(
        creator_id = 3,
        name = "Easiest Chicken Noodle Soup",
        description = "The majority of shortcut chicken soup recipes use rotisserie chicken. It’s a convenient hack, but cooked chicken doesn’t absorb flavors very well. On the other hand, sautéing ground chicken in olive oil with garlic, coriander and celery seeds (or fennel seeds and rosemary, or herbes de Provence) creates a deeply complex base. Add the vegetables, then the stock and the noodles for a complete meal that cooks in 30 minutes. You can use egg noodles, cavatelli or alphabet noodles, but you may want to adjust the amount of stock to taste, since they’ll each absorb a different amount of liquid.",
        cuisine = "American",
        difficulty = 2,
        prep_time = 100,
        preview_img = "https://static01.nyt.com/images/2019/12/23/dining/aw-easiest-chicken-noodle-soup/aw-easiest-chicken-noodle-soup-articleLarge-v2.jpg?w=1280&q=75",
        instructions = "Step 1: In a large pot, heat 3 tablespoons oil over medium-high. Add the chicken, season generously with salt and pepper, and cook, breaking up with a wooden spoon, until starting to crumble, about 3 minutes. Add the garlic, coriander and celery seeds (if using), and cook, stirring frequently, until chicken is cooked through, about 2 minutes. Using a slotted spoon, scoop the chicken into a small lidded bowl (to retain moisture); cover and set aside. Step 2: Add the celery, carrot, shallot, thyme and the remaining 2 tablespoons oil to the pot, season with salt and pepper, and cook, stirring, until slicked with fat, 3 minutes. Add the stock (7 cups for a stewlike soup or up to 8 cups for a brothy soup) and bring to a boil over high. Step 3: Add noodles and cook over medium-high until al dente according to package directions. (If the noodles absorb a lot of liquid, add more broth according to taste.) Add the reserved chicken and any accumulated juices and heat until warmed, then season to taste with salt and pepper. Divide among bowls; top with a spoonful of crème fraîche, a fistful of torn herbs and lemon zest.",
        ingredients = """
5 tablespoons extra-virgin olive oil.
1 pound ground chicken.
Salt and black pepper.
4 garlic cloves, roughly chopped.
1½ teaspoons ground coriander.
½ teaspoon celery seeds (optional).
2 celery stalks, halved lengthwise, then sliced ½-inch thick.
1 large carrot, peeled and cut into ½-inch cubes.
1 large shallot, finely chopped.
1 tablespoon fresh thyme leaves (or 1 teaspoon dried thyme leaves).
7 to 8 cups chicken stock, plus more as needed.
8 ounces dried egg noodles, cavatelli or other small shaped pasta.
Crème fraîche, chopped fresh parsley and dill, and lemon zest, for garnish.
        """,
        servings = 4,
        created_at = "2023-01-20",
        updated_at = "2023-01-20"
    )
    recipe9 = Recipe(
        creator_id = 4,
        name = "Margherita Pizza",
        description = "Here is the archetype of a thin-crust pizza pie, a pizza margherita adorned simply in the colors of the Italian flag: green from basil, white from mozzarella, red from tomato sauce. This pizza is adapted from the recipe used by the staff at Roberta’s restaurant in Brooklyn, who make their tomato sauce simply by whizzing together canned tomatoes, a drizzle of olive oil and a pinch of salt. The ingredients offer in their proportions what appears to be a kind of austerity — not even 3 ounces of cheese! But the result is home-cooked pizza to beat the band, exactly the sort of recipe to start a career in home pizza-making, and to return to again and again.",
        cuisine = "Italian",
        difficulty = 4,
        prep_time = 130,
        preview_img = "https://static01.nyt.com/images/2014/04/09/dining/09JPPIZZA2/09JPPIZZA2-articleLarge-v3.jpg?w=1280&q=75",
        instructions = "Step 1: Place a pizza stone or tiles on the middle rack of your oven and turn heat to its highest setting. Let it heat for at least an hour. Step 2: Put the sauce in the center of the stretched dough and use the back of a spoon to spread it evenly across the surface, stopping approximately ½ inch from the edges. Step 3: Drizzle a little olive oil over the pie. Break the cheese into large pieces and place these gently on the sauce. Scatter basil leaves over the top. Step 4: Using a pizza peel, pick up the pie and slide it onto the heated stone or tiles in the oven. Bake until the crust is golden brown and the cheese is bubbling, approximately 4 to 8 minutes.",
        ingredients = """
1 12-inch round of pizza dough, stretched.
3 tablespoons tomato sauce.
Extra-virgin olive oil.
2¾ ounces fresh mozzarella.
4 to 5 basil leaves, roughly torn.
        """,
        servings = 2,
        created_at = "2023-01-11",
        updated_at = "2023-01-11"
    )
    recipe10 = Recipe(
        creator_id = 5,
        name = "Guacamole",
        description = "This guacamole is the definitive recipe, adapted from Josefina Howard, the chef at the original Rosa Mexicano restaurant in Manhattan. It is dead simple and easily scaled to serve a crowd, which is good, because you'll need a lot of it — even if you're the only one partaking.",
        cuisine = "Mexican",
        difficulty = 1,
        prep_time = 30,
        preview_img = "https://static01.nyt.com/images/2020/01/28/dining/guacamole/guacamole-articleLarge.jpg?w=1280&q=75",
        instructions = "Step 1: In a medium-size bowl, mortar or a Mexican molcajete (lava stone mortar), thoroughly mash 1 tablespoon of the onion with the chili, ½ teaspoon cilantro and the salt to make a paste. Step 2: Cut the tomato in half horizontally, squeeze out the juice and seeds and discard. Chop pulp, and add it to the bowl. Step 3: Cut the avocado in half lengthwise, cutting around the pit. Gently twist the top half of the avocado off to separate the halves. Carefully rap the pit with the edge of a sharp knife and twist it out. Using a paring knife slice the avocado flesh of both halves lengthwise, then crosswise, cutting down to the skin, to form a grid. Scoop the avocado into the bowl with a spoon. Step 4: Add the remaining onion and cilantro, and gently fold all the ingredients together. Season with more chili and salt if desired. Serve at once with tortilla chips.",
        ingredients = """
3 tablespoons chopped onion.
½ teaspoon minced Serrano chili, or more, to taste.
1½ teaspoons finely chopped cilantro leaves.
½ teaspoon salt, or more, to taste.
1 small vine-ripened tomato.
1 ripe Hass avocado.
Tortilla chips for serving.
        """,
        servings = 2,
        created_at = "2023-01-10",
        updated_at = "2023-01-10"
    )

    all_recipes = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8, recipe9, recipe10]
    add_recipes = [db.session.add(recipe) for recipe in all_recipes]
    db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipes")

    db.session.commit()
