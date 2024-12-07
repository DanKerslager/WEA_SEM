//import './Header.css';
import { useState, useEffect } from 'react';
import ShoppingCardIcon from '../img/shopping-cart.png';
import Cookies from 'js-cookie';
import {
  Box,
  Flex,
  Avatar,
  Text,
  HStack,
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
import '..';
import { MoonIcon, SunIcon, Icon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './Utils/LanguageSwitcher';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// React component that renders the header of the app.

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user, isAuthenticated, logout} = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const cMode = useColorModeValue('gray.100', 'gray.900');

  return (
    <>
      <ToastContainer />
      {showLogin && (
        <LoginForm setShowLogin={setShowLogin} />
      )}
      {showRegister && (
        <RegisterForm setShowRegister={setShowRegister} />
      )}
      <nav id='navbar'>
        <Box bg={cMode} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Box as={Link} to='/'>
              <h1>BookStock Catalog</h1>
            </Box>
            {isAuthenticated && (
              <>
              <Button ml={5} colorScheme="green" as={Link} to='/userDetail'>
                {t('user_detail')}
              </Button>
              <Button ml={5} colorScheme="green" as={Link} to='/shoppingCart'>
                <img src={ShoppingCardIcon} alt="Shopping Card" />
              </Button>
              <Button ml={5} colorScheme="green" as={Link} to='/showOrders'>
                {t('orders')}
              </Button>
              </>

            )}
          </Flex>
            <Flex alignItems={'center'}>

              <Stack direction={'row'} spacing={7}>
                <LanguageSwitcher />
                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                {(isAuthenticated) ? (
                  <>
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
                          <p>{user?.username}</p>
                        </Center>
                        <Center>
                          <p>{user?.email}</p>
                        </Center>
                        <br />
                        <MenuDivider />
                        <MenuItem onClick={() => {
                          sessionStorage.clear();
                          localStorage.setItem("onFavorites", false);
                          localStorage.setItem("onRated", false);
                          window.location.reload();
                          logout();
                        }}>
                          {t('logout')}
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </>
                ) : (
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
