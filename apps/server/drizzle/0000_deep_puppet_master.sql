CREATE TABLE IF NOT EXISTS "sum_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_number" integer NOT NULL,
	"second_number" integer NOT NULL,
	"steps" jsonb DEFAULT '{}' NOT NULL
);
