package shortener

import (
    "math"
    "os"
    "strconv"
    "strings"
    "time"
)

func GetEnv(key string, df string) string {
    result := os.Getenv(key)
    if result == "" {
        return df
    }
    return result
}

func StrToInt(s string, alternative int) int {
    n, err := strconv.Atoi(s)
    if err != nil {
        return alternative
    }
    return n
}

func GetHttpError(err error) (string, int) {
    if err.Error() == "No results found" {
        return "No results found", 404
    }
    return err.Error(), 500
}

func GenerateCode() string {
    t := time.Now().Format("20150102150405")
    i, _ := strconv.ParseFloat(t, 64)
    digits := "0123456789abcdefghijklmnopqrstuvwxyz"
    factor := float64(0)

    for {
        factor += 1
        result := math.Pow(float64(36), factor)
        if i < result {
            factor -= 1
            break
        }
    }
    base36 := make([]string, 100)
    for factor >= 0 {
        j := math.Pow(36, factor)
        index := i / j
        elemento := digits[int(index)]
        base36 = append(base36, string(elemento))
        rest := int(i) % int(j)
        i = float64(rest)
        factor -= 1
    }
    code := strings.Join(base36, "")
    return code[5:]
}
