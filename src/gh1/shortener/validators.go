package shortener

import "github.com/asaskevich/govalidator"

type Validator struct{}

func (v Validator) IsUrl(s string) bool {
    return govalidator.IsURL(s)
}
