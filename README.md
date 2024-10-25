Please list the link to your app's video demonstration here
Note: Be sure the video url begins with "https" and is listed as public to ensure the judges can view it. Submissions without demonstration videos will not be considered.

https://drive.google.com/file/d/1sAfKz_ZF0LVqOShn4Pt-jUp5VGQjxQ7F/view?usp=sharing  
Please briefly describe what your app does?
Our app provides integrated AI-powered solutions for users to easily handle groceries and meal planning while tracking nutrition for clearly stated dieting goals. This application will help users keep a tab on the pantry through autopopulation every time they shop via receipt scanning or via barcode recognition. Shopping lists can be created through NLP, manually and automatically, while users will be able to search items online within stores. The app also features an AI-powered chef to suggest recipes, track missing ingredients, and create meal plans according to pantry stock. Additionally, the app provides extremely detailed micro and macro nutritional insights, thus helping users make healthier and more informed choices about their meals and overall diet.
 
What inspired you to create this app?
Sports dieting is crucial for many athletes, but pursuing these nutritional goals can present several challenges. Poor grocery management often results in food waste, while organizing shopping lists and creating personalized meal plans can be time-consuming. Additionally, adhering to cultural dietary restrictions can make these goals even more difficult to achieve.
Busy teenagers and adults often struggle to keep track of pantries, causing unnecessary purchases and poor meal preparation. We have experienced this first handedly. As we have grown older, and have been grown more and more in charge of our nutrition, we often find ourselves in situations when we don't have what we need or have an unreasonable surplus of some items. Without a streamlined approach, individuals may find themselves navigating through disorganized lists, leading to unnecessary food waste and monetary loss while grocery shopping. Moreover, it is extremely difficult to keep track of nutritional values and calories consumed in a complex meal where several ingredients are blended together. People often struggle to make personalized recipes that align with their dietary preferences, nutritional goals, and cultural preferences. Another important factor we considered was the tendency for current nutrition apps to overlook micronutritional information. When aiming to hit a macronutritional number, it is very easy to overlook other factors. For example, in order to hit a 120 gram protein benchmark, an athlete can accomplish this by eating 5 big macs, drinking 4 bottled protein shakes, or eating 6 protein bars. These approaches fail to account for the equally, if not more important side of micronutrients, which play key parts in governing how you feel and function. Additionally, these products, while being macronutritionally attractive, more often than not contain several undesirable sweeteners, dyes, or gums that have negative associations. We want you to be in full control of what is in your pantry. These challenges inspired us to develop a comprehensive solution that addresses the intricacies of modern dietary needs.
 
What technical difficulties did you face programming your app?
When developing the application, we faced a few technical challenges:
Version Compatibility: Managing conflicting library versions was a major hurdle. React Native evolves quickly, and libraries often lag in updating compatibility. Expo, while simplifying development, had limitations with native module support, forcing us to balance compatibility across platforms.
UI Design: Due to the design having gone through multiple iterations, this complicated the implementation of the layout. Using React Native's Flexbox for responsive designs across different screen sizes required adjustments to animations and complex layouts.
Learning Expo and React Native: While Expo simplified development, its limitations in supporting some libraries forced us to partially eject and handle native code. Learning React Native’s mobile-specific optimizations and debugging added to the complexity.
Together, these helped fine-tune the application and further improved our skills in cross-platform development.  
What improvements would you make if you were to create a 2.0 version of your app?
Key enhancements for version 2.0 of the Grocery AI Demo have a main focus on AI-powered features and core functionality.

1. Shopping Lists (NLP-Powered)
Shopping Lists-NLP Generated: Users can create shopping lists with the help of NLP, manually or automatically. They can add custom or predefined items such as milk or eggs.
Integrating Online Store: The user will be able to search for grocery items from selected stores and add them directly into their shopping lists using API or iFrame integration.
2. AI Chef
Meal Recipe Search: Searching for recipes using NLP and fetching ingredients, steps, and nutritional information. The user can make a shopping list from the missing ingredients or even match them with pantry stock.
Meal Planning: This page allows for a calendar view in which meal planning can be created and tracked weekly or monthly, while integrating the shopping list and pantry.
3. OCR & Barcode Recognition
Receipt Recognition: The model utilizes Hugging Face's Donut model to scan receipts and auto-populate the pantry with the items purchased.
Scanning Barcodes: Using the barcode scanner, users can fetch item details and compare alternatives, then add items to their pantries or shopping lists.
4. AI-Powered Food Recognition
Food Recognition: Camera-based food detection via MobileNet or any other model, which automatically identifies food items and allows the user to add them into their pantry or shopping list.
5. Micronutrition AI
Health Insights: Generative AI will offer nutritional and health-related details about food to help users make informed choices.
These would update the app's AI, streamline shopping and meal planning, and create an overall better user experience.  
