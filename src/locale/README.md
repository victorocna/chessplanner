# Localization

Inspired by [Yargs package localization](https://github.com/yargs/yargs/tree/master/locales), we use a JSON file for each language. The keys for each file must match in order for the translation to take place.

## Keys with special meaning

- `_table` is used for [Material Table localization](https://material-table.com/#/docs/features/localization). For the default language (English), this key with an empty string as its value is required to prevent warnings.
