from duckling import (load_time_zones, parse_ref_time, parse_lang, default_locale_lang, parse_locale, parse_dimensions, parse, Context)
import pendulum

def prediction(utterance):
    # Load reference time for time parsing
    time_zones = load_time_zones("/usr/share/zoneinfo")
    bog_now = pendulum.now('Asia/Calcutta').replace(microsecond=0)
    ref_time = parse_ref_time(time_zones, 'Asia/Calcutta', bog_now.int_timestamp)
    # Load language/locale information
    lang_es = parse_lang("en")
    default_locale = default_locale_lang(lang_es)
    locale = parse_locale('en_IN', default_locale)
    # Create parsing context with time and language information
    context = Context(ref_time, locale)
    # Define dimensions to look-up for
    valid_dimensions = ["amount-of-money", "credit-card-number", "distance", "duration", "email", "number", "ordinal", "phone-number", "quantity", "temperature", "time", "time-grain", "url", "volume"]
    # Parse dimensions to use
    output_dims = parse_dimensions(valid_dimensions)
    # Parse a phrase
    prediction = parse(utterance, context, output_dims, False)
    return prediction
