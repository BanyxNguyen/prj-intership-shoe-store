interface Notify {
  notify?: string;
}

interface CheckOther extends Notify {
  name: 'noEmpty' | 'email';
}

interface CheckLength extends Notify {
  name: 'maxLength' | 'minLength';
  value: number;
}

interface CheckRegex extends Notify {
  name: 'regex';
  value: RegExp;
}

// export type ValidationInputName = 'noEmpty' | 'email' | 'maxLength' | 'minLength' | 'regex';

export type ValidationInput = CheckLength | CheckOther | CheckRegex;
