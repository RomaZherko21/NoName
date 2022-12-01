package repository

import (
	"database/sql"
	"fmt"

	"github.com/RomaZherko21/goApi/common"
	"github.com/sirupsen/logrus"
)

func InitDB() *sql.DB {
	db, err := sql.Open(
		"mysql",
		fmt.Sprintf("%s:%s@tcp(mysql_db:%s)/%s",
			common.MustGetEnv("MYSQL_USERNAME"),
			common.MustGetEnv("MYSQL_PASSWORD"),
			common.MustGetEnv("MYSQL_PORT_OUTER"),
			common.MustGetEnv("MYSQL_DATABASE")),
	)

	if err != nil {
		logrus.Fatalf("Error occured while connecting to DB: %s", err.Error())
	}

	err = db.Ping()

	if err != nil {
		logrus.Fatalf("Error occured while ping on DB: %s", err.Error())
	}

	return db
}
