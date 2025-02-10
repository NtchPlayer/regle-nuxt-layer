import { createScopedUseRegle, defineRegleConfig } from '@regle/core';
import { required, email, url, withMessage } from '@regle/rules';

const { useRegle } = defineRegleConfig({
  rules: () => ({
    required: withMessage(required, 'Veuillez renseigner ce champ.'),
    email: withMessage(email, 'Veuillez saisir une adresse e-mail valide.'),
    url: withMessage(url, 'Veuillez saisir un lien valide.'),
  }),
});

export const { useScopedRegle, useCollectScope } = createScopedUseRegle({
  customUseRegle: useRegle,
});
