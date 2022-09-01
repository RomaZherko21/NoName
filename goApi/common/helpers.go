package common

import (
	"fmt"
	"os"
)

func MustGetEnv(envVariable string) string {
	res := os.Getenv(envVariable)
	if res == "" {
		panic(fmt.Sprintf("can't read env %s", envVariable))
	}
	return res
}
