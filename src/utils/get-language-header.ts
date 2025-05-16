export enum LANG {
  DE = 'de',
  EN = 'en',
}
export const LANG_DEFAULT = LANG.DE

const supportedLanguages = [LANG.DE, LANG.EN]

export const getLanguageFromHeaders = (request: Request) => {
  const language = (request.headers.get('app-language') ?? LANG_DEFAULT) as LANG
  if (!supportedLanguages.includes(language)) {
    throw new Error('Invalid language. Only "de" and "en" are supported.')
  }
  return language
}
