//import './Header.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
} from '@chakra-ui/react';
import '../';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
// React component that renders the header of the app.

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(Cookies.get('email') || '');
  const [username, setUsername] = useState(Cookies.get('username') || '');
  const [password, setPassword] = useState(Cookies.get('password') || '');
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <>
      {showLogin && (
        <LoginForm setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
      )}
      {showRegister && (
        <RegisterForm setShowRegister={setShowRegister} />
      )}
      <nav id='navbar'>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box><h1>BookStock {t('catalog')}</h1></Box>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
                <LanguageSwitcher />
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                {(isLoggedIn) ? (
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
                        <p>{username}</p>
                      </Center>
                      <Center>
                        <p>{email}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem onClick={() => {
                        Cookies.remove('email');
                        Cookies.remove('username');
                        Cookies.remove('password');
                        setIsLoggedIn(false);
                        window.location.reload();
                      }}>
                        {t('logout')}
                      </MenuItem>
                    </MenuList>
                  </Menu>) : (
                  <>
                    <Button onClick={() => setShowLogin(true)}>
                      {t('login')}
                    </Button>
                    <Button onClick={() => setShowRegister(true)}>
                      {t('register')}
                    </Button>
                  </>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </nav>
    </>
  );
};

export default Header;
