import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate'
import { required, min, max, alpha_spaces as alphaSpaces, min_value as minValue, max_value as maxValue, confirmed, not_one_of as excluded } from '@vee-validate/rules'

export default {
    install(app) {  // we can add options for configuring plugins...
        app.component("VeeForm", VeeForm)
        app.component("VeeField", VeeField)
        app.component("ErrorMessage", ErrorMessage)

        defineRule('required', required)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('alpha_spaces', alphaSpaces)
        defineRule('min_value', minValue)
        defineRule('max_value', maxValue)
        defineRule('confirmed', confirmed)
        defineRule('excluded',excluded )

    }
}
