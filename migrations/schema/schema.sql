CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar,
  "displayname" varchar,
  "email" varchar,
  "password" varchar,
  "userToken" varchar,
  "created_at" timestamp
);

CREATE TABLE "problems" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "createdByUser" integer,
  "creatorNote" varchar,
  "routePath" varchar,
  "weight" integer,
  "created_at" timestamp,
  "update_at" timestamp
);

-- CREATE TABLE "sends" (
--   "problem" integer,
--   "sentBy" integer,
--   "averageRating" integer,
--   "grade" varchar,
--   "note" varchar,
--   "created_at" timestamp
-- );

-- CREATE TABLE "followers" (
--   "user" integer,
--   "followingUser" integer,
--   "created_at" timestamp
-- );

-- CREATE TABLE "enums" (
--   "grades" varchar
-- );

-- CREATE TABLE "favorites" (
--   "userId" integer,
--   "problemId" integer
-- );

ALTER TABLE "problems" ADD FOREIGN KEY ("createdByUser") REFERENCES "users" ("id");

-- ALTER TABLE "sends" ADD FOREIGN KEY ("problem") REFERENCES "problems" ("id");

-- ALTER TABLE "sends" ADD FOREIGN KEY ("sentBy") REFERENCES "users" ("id");

-- ALTER TABLE "followers" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

-- ALTER TABLE "followers" ADD FOREIGN KEY ("followingUser") REFERENCES "users" ("id");

-- ALTER TABLE "favorites" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

-- ALTER TABLE "favorites" ADD FOREIGN KEY ("problemId") REFERENCES "problems" ("id");
