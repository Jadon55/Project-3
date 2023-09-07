-- This schema contains queries that help provide answers to our 6 investigation questions

-- 1. How many crashes were logged over the 5 year period?
-- 2. Are the number of crashes per year increasing or decreasing?
-- 3. Which public holiday is the most dangerous for drivers?
-- 4. Do any common geographical accident zones stand out?
-- 5. Which region has the most fatalities on the road?
-- 6. What are the most common factors leading to crashes?


-- count the number of crashes over the 5 year period
SELECT *
FROM totalCrashCount;

-- 170259 crashes from 2018 - 2022



-- the number of crashes by each year
SELECT *
FROM crashesByYear;

-- 2018: 39469 crashes - 1st
-- 2019: 36919 crashes - 2nd
-- 2020: 32808 crashes - 4th
-- 2021: 34080 crashes - 3rd
-- 2022: 27982 crashes - 5th



-- Fatal Crashes each year
SELECT *
FROM fatalCrashesYear;

-- 2018: 332 fatal crashes - 2nd
-- 2019: 298 fatal crashes - 3rd
-- 2020: 292 fatal crashes - 4th
-- 2021: 285 fatal crashes - 5th
-- 2022: 338 fatal crashes - 1st



-- number of deaths each year
SELECT *
FROM deathsByYear;

-- 2018: 378 deaths - 1st
-- 2019: 350 deaths - 3rd
-- 2020: 318 deaths - 4th=
-- 2021: 318 deaths - 4th=
-- 2022: 375 deaths - 2nd

-- Most deadly holiday Period by fatal Crashes
SELECT *
FROM holidayFatalCrashes
ORDER BY fatalCrashes DESC;




