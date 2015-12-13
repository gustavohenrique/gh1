package logger

import (
    "fmt"
    "time"
)

type Logger struct{}

var Log Logger = Logger{}

func (l Logger) Error(args ...interface{}) (int, error) {
    // s := fmt.Sprint(args...)
    return fmt.Println(now(), "[ERROR]", args)
}

func now() string {
    t := time.Now()
    return t.Format("2006-01-02 15:04:05")
}
