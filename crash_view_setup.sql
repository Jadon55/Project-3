-- This schema creates views used in the crash_queries schema for common queries relating to the investigation questions

-- drop views if already exist
DROP VIEW IF EXISTS 
totalCrashCount, 
crashesByYear, total2018, total2019, total2020, total2021, total2022,
fatalCrashesYear, fatalCrashes2018,fatalCrashes2019,fatalCrashes2020,fatalCrashes2021,fatalCrashes2022,
deathsByYear, deaths2018, deaths2019, deaths2020, deaths2021, deaths2022,
holidayFatalCrashes
;

-- create view of overall crash count
CREATE VIEW totalCrashCount
AS
SELECT COUNT(*)
FROM "Crashes";

-- create view of each year's crash count
CREATE VIEW total2018
AS
SELECT COUNT(*) crashes2018
FROM "Crashes"
WHERE "crashYear" = 2018;

CREATE VIEW total2019
AS
SELECT COUNT(*) AS crashes2019
FROM "Crashes"
WHERE "crashYear" = 2019;

CREATE VIEW total2020
AS
SELECT COUNT(*) AS crashes2020
FROM "Crashes"
WHERE "crashYear" = 2020;

CREATE VIEW total2021
AS
SELECT COUNT(*) AS crashes2021
FROM "Crashes"
WHERE "crashYear" = 2021;

CREATE VIEW total2022
AS
SELECT COUNT(*) AS crashes2022
FROM "Crashes"
WHERE "crashYear" = 2022
GROUP BY "crashYear";

-- create a view with each year on one result
CREATE VIEW crashesByYear
AS
SELECT *
FROM total2018, total2019, total2020, total2021, total2022;

-- create view for each year's fatal crash count
CREATE VIEW fatalCrashes2018
AS
SELECT COUNT(*) AS fatalCrashes2018
FROM "Crashes"
WHERE "crashYear" = 2018 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW fatalCrashes2019
AS
SELECT COUNT(*) AS fatalCrashes2019
FROM "Crashes"
WHERE "crashYear" = 2019 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW fatalCrashes2020
AS
SELECT COUNT(*) AS fatalCrashes2020
FROM "Crashes"
WHERE "crashYear" = 2020 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW fatalCrashes2021
AS
SELECT COUNT(*) AS fatalCrashes2021
FROM "Crashes"
WHERE "crashYear" = 2021 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW fatalCrashes2022
AS
SELECT COUNT(*) AS fatalCrashes2022
FROM "Crashes"
WHERE "crashYear" = 2022 AND "crashSeverity" = 'Fatal Crash';

-- create view with each year's fatal crash count on one result
CREATE VIEW fatalCrashesYear
AS
SELECT *
FROM fatalCrashes2018, fatalCrashes2019, fatalCrashes2020, fatalCrashes2021, fatalCrashes2022;

-- Deaths by year
CREATE VIEW deaths2018
AS
SELECT SUM("fatalInjuries") AS deaths2018
FROM "Crashes"
WHERE "crashYear" = 2018 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW deaths2019
AS
SELECT SUM("fatalInjuries") AS deaths2019
FROM "Crashes"
WHERE "crashYear" = 2019 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW deaths2020
AS
SELECT SUM("fatalInjuries") AS deaths2020
FROM "Crashes"
WHERE "crashYear" = 2020 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW deaths2021
AS
SELECT SUM("fatalInjuries") AS deaths2021
FROM "Crashes"
WHERE "crashYear" = 2021 AND "crashSeverity" = 'Fatal Crash';

CREATE VIEW deaths2022
AS
SELECT SUM("fatalInjuries") AS deaths2022
FROM "Crashes"
WHERE "crashYear" = 2022 AND "crashSeverity" = 'Fatal Crash';

-- deaths by each year in one result
CREATE VIEW deathsByYear
AS
SELECT * 
FROM deaths2018, deaths2019, deaths2020, deaths2021, deaths2022;

-- Most dangerous holiday period
CREATE VIEW holidayFatalCrashes
AS
SELECT holiday, COUNT(holiday) AS fatalCrashes
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash'
GROUP BY holiday;








