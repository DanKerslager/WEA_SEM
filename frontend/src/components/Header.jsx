//import './Header.css';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import '../'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

// React component that renders the header of the app.

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t, i18n } = useTranslation();

  return (
    <nav id='navbar'>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box><h1>BookStock {t('catalog')}</h1></Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <LanguageSwitcher/>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{t('username')}</p>
                    <p>Email</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>{t('logout')}</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </nav>

  );
};

export default Header;
