import { z } from 'zod';
import { isOver18YearsOld, isValidDate } from './date.validations';

export const InputDtoSchema = z.object({
  leistungsVorgabe:
    z.enum([
      'Beitrag',
      'Einmalbeitrag',
      'Garantierte Mindestrente',
      'Garantiekapital',
      'Gesamtkapital',
      'Gesamtrente',
    ]).nullish(),

  beitrag: z
    .number()
    .min(500, 'Der Beitrag muss mindestens 500€ betragen')
    .max(100000, 'Der Beitrag darf höchstens 100.000€ betragen'),

  berechnungDerLaufzeit:
    z.enum(['Alter bei Rentenbeginn', 'Aufschubdauer']).nullish(),

  laufzeit: z
    .number()
    .min(1, 'Die Laufzeit muss mindestens 1 Jahr betragen')
    .max(100, 'Die Laufzeit darf höchstens 40 Jahre betragen'),

  beitragszahlungsweise:
    z.enum(['Einmalbeitrag', 'Monatliche Beiträge']).nullish(),

  rentenzahlungsweise:
    z.enum([
      'Monatliche Renten',
      'Vierteljährliche Renten',
      'Halbjährliche Renten',
      'Jährliche Renten',
    ]).nullish(),

  birthdate: z
    .iso.date()
    .refine(isValidDate, { error: 'Birthdate must be a valid date', abort: true })
    .refine(isOver18YearsOld, 'User must be at least 18 years old'),
});

export type InputDto = z.infer<typeof InputDtoSchema>;
