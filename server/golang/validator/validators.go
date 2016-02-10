package validator

import "gh1/Godeps/_workspace/src/github.com/asaskevich/govalidator"

type Validator struct{}

func (v Validator) IsUrl(s string) bool {
    return govalidator.IsURL(s)
}
