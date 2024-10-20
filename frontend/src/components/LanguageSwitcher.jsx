import React from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

//React component that creates buttons for switching languages

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <HStack spacing={4}>
      <Button colorScheme="blue" onClick={() => changeLanguage('cs')}>
        Čeština
      </Button>
      <Button colorScheme="green" onClick={() => changeLanguage('en')}>
        English
      </Button>
    </HStack>
  );
}

export default LanguageSwitcher;
