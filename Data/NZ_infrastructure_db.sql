-- Created databases to 

CREATE TABLE "public_transport" (
    "Region" varchar   NOT NULL,
    "cost_2017_18" decimal   NOT NULL,
    "cost_2018_19" decimal   NOT NULL,
    "cost_2019_20" decimal   NOT NULL,
    "cost_2020_21" decimal   NOT NULL,
    "cost_2021_22" decimal   NOT NULL,
    CONSTRAINT "pk_public_transport" PRIMARY KEY (
        "Region"
     )
);

