interface IID {
  id?: string;
}

interface ILanguageEn {
  en?: string;
}

interface ILanguageRu {
  ru?: string;
}

export interface IWord extends IID, ILanguageEn, ILanguageRu {}

export class Word implements Required<Omit<IWord, 'id'>> {
  en: string = '1';
  ru: string = '1';
}
